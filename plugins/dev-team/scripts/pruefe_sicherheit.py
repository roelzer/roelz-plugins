#!/usr/bin/env python3
"""Sicherheits-Schranke des Dev-Teams: einfache Lücken mechanisch finden, bevor sie ausgeliefert werden.

Grundsatz: **rot (FEHLER) nur, was fast sicher falsch ist** – sonst würde ein autonomer Lauf an harmlosem Code
hängen bleiben. Alles Unscharfe ist eine WARNUNG: Der Reviewer bewertet jede neue Warnung einzeln (Pflichtfrage 8),
der Sicherheitsprüfer am Meilenstein alle. Ein Regex-Scanner sieht keine Datenflüsse über mehrere Zeilen und keine
Logikfehler in Berechtigungen – dafür gibt es die verdeckten Abnahmetests (fremde ID) und die Angriffsversuche.

Prüft (ohne Netz, ohne Zusatzpakete):
  1. Geheimnisse: Schlüssel bekannter Anbieter, private Schlüssel, feste Passwörter/Schlüssel/Tokens im Code
     (auch als Rückfallwert wie `process.env.X || "…"`), Zugangsdaten in Adressen, versionierte .env-/Schlüsseldateien.
  2. Browser-Code: Variablen, die das Build-Werkzeug in den Browser-Code einbaut (VITE_, NEXT_PUBLIC_, REACT_APP_ …),
     mit Geheimnis-Namen.
  3. Gefährliche Muster in Programmcode (Injection, XSS, Pfade/Adressen aus der Anfrage, verschluckte Fehler …).
  4. --build: ausgelieferte Dateien auf Schlüssel und auf Werte geheimer Variablen aus der lokalen .env.
  5. --historie: ganze Git-Historie auf Schlüssel bekannter Anbieter und private Schlüssel. Schon beim Anbieter
     ausgetauschte Schlüssel trägt man in docs/SCHLUESSEL_GETAUSCHT.md ein (`Datum | Datei | Commit | Art`).

Bewusste Ausnahme für einen Fund der Klassen 2 und 3: Kommentar `// dev-team: sicher – <Grund>` (bzw. `# …`) in
derselben Zeile. Wird als WARNUNG gemeldet. Schlüssel bekannter Anbieter im Programmcode haben keine Ausnahme.

Aufruf:  python3 pruefe_sicherheit.py [--basis <commit>] [--alles] [--build] [--historie]
Exit 0 = keine Fehler, Exit 1 = mindestens ein FEHLER. Ändert nichts. Gibt nie einen gefundenen Wert aus.
"""

import argparse
import math
import os
import re
import subprocess
import sys
import time

HIER = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HIER)
import bereiche  # noqa: E402

# Ausnahme nur als Kommentar mit Grund (mindestens ein paar Zeichen)
MARKE = re.compile(r"(?://|#|/\*|<!--|\{/\*)\s*dev-team:\s*sicher\s*[–—:-]\s*\S.{3,}", re.IGNORECASE)

STARK = [  # (Name, Muster, nur_warnung)
    ("AWS-Zugangsschlüssel", r"\b(?:AKIA|ASIA)[0-9A-Z]{16}\b", False),
    ("GitHub-Token", r"\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{60,})\b", False),
    ("Slack-Token", r"\bxox[baprs]-[A-Za-z0-9-]{10,}", False),
    ("Stripe-Geheimschlüssel", r"\b(?:sk|rk)_live_[A-Za-z0-9]{20,}", False),
    ("Anthropic-API-Schlüssel", r"\bsk-ant-[A-Za-z0-9_\-]{20,}", False),
    ("OpenAI-API-Schlüssel", r"\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_\-]{40,}", False),
    ("SendGrid-Schlüssel", r"\bSG\.[A-Za-z0-9_\-]{22}\.[A-Za-z0-9_\-]{43}\b", False),
    ("Azure-Speicherschlüssel", r"AccountKey=[A-Za-z0-9+/=]{40,}", False),
    ("privater Schlüssel", r"-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY-----", False),
    # Google-Browser-Schlüssel (Firebase, Maps) sind absichtlich öffentlich – nur einschränken (Domains/APIs)
    ("Google-API-Schlüssel (in der Google-Konsole auf Domains/APIs einschränken)", r"\bAIza[0-9A-Za-z_\-]{35}\b", True),
]
# Offensichtliche Beispielwerte im gefundenen Schlüssel selbst
BEISPIEL = re.compile(r"EXAMPLE|x{4,}|X{4,}|0{8,}|1234567|abcdefghij|your|dein|dummy|fake|placeholder|lorem|ipsum|"
                      r"(?:-[a-z]+){4,}", re.IGNORECASE)
PLATZHALTER = re.compile(r"x{3,}|\*{3,}|<[^>]*>|\$\{|\{\{|example|beispiel|changeme|dummy|placeholder|platzhalter|"
                         r"your[_-]|dein[_-]|fake|redacted|^test|^sk_test_|_test_|^pk_|lorem", re.IGNORECASE)
GEHEIM_NAME = r"[\w$]*(?:secret|passw(?:or)?d|passwort|kennwort|pwd|token|api_?key|apikey|_key|key_|" \
              r"private_?key|access_?key|credential|auth|bearer)[\w$]*|[\w$]*key\b"
WERT = r"[\"'`]([^\"'`\s]{8,})[\"'`]"
ALLGEMEIN = [  # (Name, Muster)
    ("fester Geheimwert", r"(?i)\b(?:" + GEHEIM_NAME + r")[\"']?\s*(?:[:=]|=>)\s*" + WERT),
    ("Geheimwert als Rückfallwert",
     r"(?i)(?:\|\||\?\?|\bor\b|getenv\([^,()]*,|environ\.get\([^,()]*,|\benv\.get\([^,()]*,)\s*" + WERT),
    ("Bearer-Token im Code", r"(?i)\bBearer\s+([A-Za-z0-9\-._~+/]{20,}=*)"),
    ("Zugangsdaten in einer Adresse", r"\b[a-z][a-z0-9+.\-]*://[^/\s:@\"'`]+:([^/\s:@\"'`]{3,})@([^/\s:\"'`]+)"),
]
FRONTEND = re.compile(r"\b(?:VITE|NEXT_PUBLIC|REACT_APP|PUBLIC|NUXT_PUBLIC|EXPO_PUBLIC|GATSBY|VUE_APP)_[A-Z0-9_]*"
                      r"(?:SECRET|PASSWORD|PASSWD|PRIVATE|TOKEN|KEY|_SK|CREDENTIAL|SERVICE_?ROLE)\b")
FRONTEND_OK = re.compile(r"PUBLISHABLE|ANON|SITE_?KEY|PUBLIC_?KEY|FIREBASE|MAPS|MAPBOX|RECAPTCHA|SENTRY_DSN|POSTHOG|"
                         r"ALGOLIA_SEARCH|STRIPE_PK", re.IGNORECASE)

_SQL = r"(?:SELECT\b[^{q}]*?(?:\*|\bFROM\b[^{q}]*?\b(?:WHERE|JOIN|ORDER\s+BY|GROUP\s+BY|LIMIT)\b)|INSERT\s+INTO\b[^{q}]*?" \
       r"(?:VALUES|\()|UPDATE\s+\w+\s+SET\b|DELETE\s+FROM\s+\w+\s+WHERE\b)"
SQL_MUSTER = "(?i)" + "|".join(
    [r"{q}\s*{sql}[^{q}]*{q}\s*\+".format(q=q, sql=_SQL.format(q=q)) for q in ("\"", "'")] +
    [r"`\s*{sql}[^`]*\$\{{".format(sql=_SQL.format(q="`"))] +
    [r"\bf{q}\s*{sql}[^{q}]*\{{".format(q=q, sql=_SQL.format(q=q)) for q in ("\"", "'")] +
    [r"{q}\s*{sql}[^{q}]*{q}\s*(?:%\s*[\(\w]|\.format\()".format(q=q, sql=_SQL.format(q=q)) for q in ("\"", "'")])

# (Name, Muster, Endungen, rot?)  rot = fast sicher eine Lücke; sonst Warnung zum Bewerten
GEFAEHRLICH = [
    ("SQL aus zusammengesetztem Text (SQL-Injection)", None, "js py cs java php go rb", True),
    ("Shell-Aufruf mit eingesetzten Werten (Command-Injection)",
     r"\bexec(?:Sync)?\s*\(\s*(?:`[^`]*\$\{|[\"'][^\"']*[\"']\s*\+)|\bspawn(?:Sync)?\s*\([^)]*shell\s*:\s*true|"
     r"\bshell\s*=\s*(?:True|1)\b|\bos\.(?:system|popen)\s*\(\s*(?![\"'][^\"']*[\"']\s*\))|"
     r"\bspawn(?:Sync)?\s*\(\s*[\"'](?:sh|bash|cmd|cmd\.exe|powershell)[\"']\s*,\s*\[\s*[\"'](?:-c|/c|-Command)[\"']\s*,\s*(?![\"'])",
     "js py", True),
    ("eval/new Function (führt Text als Code aus)", r"(?<![.\w$])eval\s*\(|\bnew\s+Function\s*\(", "js py", True),
    ("Zertifikatsprüfung abgeschaltet",
     r"rejectUnauthorized\s*:\s*false|NODE_TLS_REJECT_UNAUTHORIZED\s*=\s*[\"']?0|\bverify\s*=\s*False\b|"
     r"_create_unverified_context|InsecureSkipVerify\s*:\s*true", "js py go", True),
    ("JWT ohne Signaturprüfung",
     r"(?i)algorithms?\s*[:=]\s*\[?\s*[\"']none[\"']|verify_signature[\"']?\s*:\s*False|jwt\.decode\([^)]*verify\s*=\s*False",
     "js py", True),
    ("interne Fehlerdetails an den Nutzer",
     r"\.(?:send|json|write|end)\s*\([^)]*\b(?:err|error|e|ex)\.stack\b|\.status\(\s*5\d\d\s*\)\.(?:send|json)\(\s*(?:err|error|e)\s*\)",
     "js", True),
    ("HTML aus Daten ohne Maskierung (XSS)",
     r"\.(?:inner|outer)HTML\s*\+?=(?!\s*[\"'`]{2})(?!\s*[\"'][^\"'$]*[\"']\s*;?\s*(?://.*)?$)(?!.*(?:sanitize|DOMPurify|escape))|"
     r"dangerouslySetInnerHTML(?!.*(?:sanitize|DOMPurify))|insertAdjacentHTML\s*\(|document\.write\s*\(|\bv-html\b(?!=[\"']\$t\()|"
     r"\{@html\b|bypassSecurityTrust|\brender_template_string\s*\(\s*(?:f[\"']|[^)]*\+)|\bMarkup\s*\(\s*f[\"']",
     "js py", True),
    ("Datei-Zugriff mit Pfad aus der Anfrage (Path Traversal)",
     r"(?:sendFile|download|readFile(?:Sync)?|createReadStream)\s*\([^)]*\b(?:req|request)\.(?:params|query|body|files)",
     "js", True),
    ("Datei-Zugriff mit Pfad aus der Anfrage (Path Traversal)",
     r"(?:send_file|send_from_directory|FileResponse|(?<![.\w])open)\s*\([^)]*\brequest\.(?:args|form|files|GET|POST|"
     r"query_params|path_params)", "py", True),
    ("Abruf einer Adresse aus der Anfrage (SSRF)",
     r"(?:\bfetch|axios(?:\.\w+)?|\bgot|requests\.\w+|urlopen|httpx\.\w+)\s*\(\s*(?:f?[\"'`][^\"'`]*(?:\$\{|\{)\s*)?"
     r"(?:req|request)\.(?:params|query|body|args|form|GET|POST)", "js py", True),
    ("Weiterleitung auf Adresse aus der Anfrage (Open Redirect)",
     r"\bredirect\s*\(\s*(?:req|request)\.(?:params|query|body|args|form|GET|POST)", "js py", True),
    ("CORS für jede Herkunft offen",
     r"Access-Control-Allow-Origin[\"']?\s*[:,]\s*[\"']\*|\borigin\s*:\s*[\"']\*[\"']|allow_origins\s*=\s*\[\s*[\"']\*",
     "js py", False),
    ("unsichere Deserialisierung",
     r"\bpickle\.loads?\s*\(|\byaml\.load\s*\((?![^)]*Loader)|\bmarshal\.loads\s*\(|BinaryFormatter|\bunserialize\s*\(",
     "py cs php", False),
    ("Anfrage-Daten ungefiltert ins Datenmodell (Mass Assignment) – erlaubte Felder ausdrücklich nennen",
     r"(?<!parse)(?<!validate)\(\s*(?:\{\s*\.\.\.)?(?:req|request)\.body\s*[,)}]|data\s*:\s*(?:req|request)\.body\b|"
     r"\bnew\s+\w+\s*\(\s*(?:req|request)\.body\b|\*\*request\.(?:json|form|data)\b",
     "js py", False),
    ("schwaches Verfahren für Passwörter oder Zufallswerte (Passwörter: bcrypt/scrypt/Argon2, Zufall: crypto/secrets)",
     r"(?i)\b(?:md5|sha1|sha256|sha512)\s*\(.*passw|createHash\(\s*[\"'](?:md5|sha1|sha256|sha512)[\"']\s*\).*passw|"
     r"\brandom\.choices?\(.*(?:token|secret|passw|k\s*=\s*\d{2})|Math\.random\(\).*(?:token|secret|passw|otp|reset)|"
     r"(?:token|secret|passw|otp|reset)\w*\s*=.*Math\.random\(\)|\brandom\.(?:random|randint|choice)\(.*(?:token|secret|passw)",
     "js py", False),
    ("JWT nur gelesen, nicht geprüft (jwt.decode statt jwt.verify)", r"\bjwt\.decode\s*\(", "js", False),
    ("Fehlertext an den Nutzer (kann Interna verraten)",
     r"\.(?:send|json)\s*\([^)]*\b(?:err|error|e)\.message\b|\.(?:send|json)\s*\(\s*String\(\s*(?:err|error|e)\s*\)|"
     r"[\"']detail[\"']\s*:\s*str\(\s*(?:e|ex|err|exc)\s*\)", "js py", False),
    ("Debug-Modus", r"^\s*DEBUG\s*=\s*True\b|\bapp\.run\([^)]*debug\s*=\s*True", "py", False),
    ("Anmeldedaten im Browser-Speicher",
     r"(?i)(?:local|session)Storage\.setItem\s*\(\s*[\"'`][^\"'`]*(?:access_?token|refresh_?token|auth_?token|jwt|"
     r"passw)", "js", False),
    ("HTML-Einfügung über jQuery/Vorlage", r"\$\([^)]*\)\.html\s*\(\s*[^)\"'`\s]|\|\s*safe\b", "js py html", False),
]
ENDUNGEN = {"js": (".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".vue", ".svelte", ".astro"),
            "html": (".html", ".htm", ".jinja", ".jinja2", ".j2"),
            "py": (".py",), "cs": (".cs",), "java": (".java", ".kt"), "php": (".php",), "go": (".go",), "rb": (".rb",)}
VERSCHLUCKT = [  # über mehrere neue Zeilen einer Datei – Warnung (oft ein bewusster Schutz, z. B. um localStorage)
    (r"except\s*(?:Exception|BaseException)?\s*(?:as\s+\w+)?\s*:[ \t]*(?:\n[ \t]*)?pass\b", "py"),
    (r"catch\s*(?:\([^)]*\))?\s*\{\s*(?:/\*[^*]*\*/|//[^\n]*)?\s*\}", "js cs java"),
    (r"except\s*(?:Exception|BaseException)?\s*(?:as\s+\w+)?\s*:[ \t]*(?:\n[ \t]*)?(?:\.\.\.|return None)[ \t]*$", "py"),
    (r"contextlib\.suppress\(\s*(?:Exception|BaseException)\s*\)|\.catch\(\s*noop\s*\)", "py js"),
    (r"\.catch\s*\(\s*(?:\(\s*\w*\s*\)|\w+)\s*=>\s*(?:\{\s*\}|null|undefined|void 0)\s*\)", "js"),
]
GEHEIM_DATEI = re.compile(r"(^|/)(\.env(\.(?!example$|sample$|template$|dist$|defaults$)[^/]+)?|[^/]+\.(pem|key|p12|pfx|jks|keystore)|"
                          r"id_(rsa|dsa|ecdsa|ed25519)|credentials\.json|service-account[^/]*\.json)$", re.IGNORECASE)
BUILD_ORDNER = ("dist", "build", "out", os.path.join(".next", "static"), os.path.join(".output", "public"))
OHNE = ("node_modules/", ".git/", ".dev-team/", ".claude/worktrees/", "vendor/", "package-lock.json",
        "yarn.lock", "pnpm-lock.yaml", "poetry.lock", "uv.lock", ".min.", ".umd.", ".bundle.", ".map")
MAX_BYTES = 2_000_000


def git(wurzel, *args):
    r = subprocess.run(["git", "-c", "core.quotePath=false", *args], cwd=wurzel, capture_output=True, text=True,
                       encoding="utf-8", errors="replace")
    return r.stdout if r.returncode == 0 else ""


def entropie(s):
    if not s:
        return 0.0
    return -sum(s.count(c) / len(s) * math.log2(s.count(c) / len(s)) for c in set(s))


def sieht_geheim_aus(wert):
    """Zufällig wirkender Wert (Schlüssel, Token) statt Wort, Satz oder Beispiel."""
    if PLATZHALTER.search(wert):
        return False
    ziffern = sum(c.isdigit() for c in wert)
    buchst = sum(c.isalpha() for c in wert)
    return len(wert) >= 16 and ziffern >= 3 and buchst >= 3 and entropie(wert) >= 3.3


def endung_passt(pfad, klassen):
    return any(pfad.lower().endswith(e) for k in klassen.split() for e in ENDUNGEN[k])


def ist_test(pfad):
    p = "/" + pfad.lower()
    return bool(re.search(r"/(tests?|__tests__|e2e|spec|fixtures?|__mocks__|testdata)/|\.(test|spec)\.|/test_[^/]*\.py$|"
                          r"_test\.(py|go)$|/conftest\.py$", p))


def ist_werkzeug(pfad):
    """Entwickler-Werkzeuge (scripts/, tools/) werden nicht ausgeliefert: gefährliche Muster dort nur als Warnung."""
    return bool(re.match(r"(scripts|tools)/", pfad.lower()))


def ist_unterlage(pfad):
    """Unterlagen und Entwürfe werden nicht ausgeliefert: dort nur Schlüssel bekannter Anbieter prüfen."""
    return bool(re.match(r"(docs|design)/", pfad.lower())) or pfad.lower().endswith((".md", ".txt", ".rst"))


def uebersprungen(pfad):
    return any(o in pfad for o in OHNE)


def zeile_pruefen(pfad, zeile, funde):
    """funde: Liste (stufe, text). stufe 'f' = Fehler, 'w' = Warnung."""
    if uebersprungen(pfad):
        return
    test, unterlage = ist_test(pfad), ist_unterlage(pfad)
    for name, muster, nur_warnung in STARK:
        for m in re.finditer(muster, zeile):
            if BEISPIEL.search(m.group(0)):
                continue
            stufe = "w" if (nur_warnung or ((test or unterlage) and name == "privater Schlüssel")) else "f"
            funde.append((stufe, "%s in %s%s" % (name, pfad, " – echte Schlüssel gehören nie ins Repo (in die Umgebung "
                                                 "des Servers/Hosters). Beim Anbieter sperren und neu erzeugen: er steht "
                                                 "jetzt in der Git-Historie." if stufe == "f" else "")))
            return
    if len(zeile) > 3000 or unterlage:
        return
    markiert = bool(MARKE.search(zeile))
    for name, muster in ALLGEMEIN:
        m = re.search(muster, zeile)
        if not m:
            continue
        wert = m.group(1) or ""
        if name == "Zugangsdaten in einer Adresse":
            lokal = re.match(r"(localhost|127\.|0\.0\.0\.0|\[::1\]|db\b|postgres\b|mysql\b|redis\b|mongo\b)", m.group(2) or "")
            ernst = (not lokal and len(wert) >= 6 and not PLATZHALTER.search(wert)
                     and wert.lower() not in ("password", "passwort", "postgres", "secret", "admin", "root"))
        else:
            ernst = sieht_geheim_aus(wert)
        if not ernst and (PLATZHALTER.search(wert) or sum(c.isdigit() for c in wert) < 2):
            continue   # Wort, Satz oder Beispiel (z. B. Prüfmeldung „Mindestens8Zeichen“), kein Geheimnis
        stufe = "f" if (ernst and not markiert and not test and not wert.startswith("AIza")) else "w"
        funde.append((stufe, "%s in %s%s" % (name, pfad, " (als geprüft markiert)" if markiert else
                                                 " (Testdatei: nur offensichtliche Testwerte verwenden)" if test else
                                                 " – Wert in die Umgebung (.env) und über process.env/os.environ lesen"
                                                 if stufe == "f" else " – prüfen, ob das ein echtes Geheimnis ist")))
    if not test:
        for m in FRONTEND.finditer(zeile):
            if FRONTEND_OK.search(m.group(0)):
                continue
            funde.append(("w" if markiert else "f",
                          "Browser-Variable %s in %s: alles mit diesem Präfix steht im ausgelieferten Code und ist für "
                          "jeden lesbar. Geheimnisse nur auf dem Server%s" % (
                              m.group(0), pfad, " (als geprüft markiert)" if markiert else
                              " (der Aufruf des Dienstes läuft über einen eigenen Server-Endpunkt).")))
    if test:
        return
    for name, muster, klassen, rot in GEFAEHRLICH:
        if endung_passt(pfad, klassen) and re.search(muster or SQL_MUSTER, zeile):
            stufe = "f" if (rot and not markiert and not ist_werkzeug(pfad)) else "w"
            funde.append((stufe, "%s in %s: %s%s" % (
                name, pfad, zeile.strip()[:100], " (als geprüft markiert)" if markiert else
                " – sichere Alternative nehmen oder mit „// dev-team: sicher – <Grund>“ begründen." if stufe == "f"
                else " – bewerten.")))


SQL_MEHRZEILIG = "(?i)" + "|".join(
    [r"`\s*{sql}[^`]*\$\{{".format(sql=_SQL.format(q="`")),
     r'\bf"""\s*{sql}[\s\S]*?\{{'.format(sql=_SQL.format(q='"')),
     r"\bf'''\s*{sql}[\s\S]*?\{{".format(sql=_SQL.format(q="'"))])


def verschluckt_pruefen(pfad, zeilen, funde):
    if ist_test(pfad) or ist_unterlage(pfad) or uebersprungen(pfad):
        return
    text = "\n".join(z for z in zeilen if len(z) <= 3000)
    if endung_passt(pfad, "js py"):
        for m in re.finditer(SQL_MEHRZEILIG, text):
            if "\n" in m.group(0) and not MARKE.search(m.group(0)):
                funde.append(("w" if ist_werkzeug(pfad) else "f",
                              "SQL aus zusammengesetztem Text über mehrere Zeilen (SQL-Injection) in %s: %s – "
                              "parametrisierte Abfrage verwenden." % (pfad, " ".join(m.group(0).split())[:80])))
    for muster, klassen in VERSCHLUCKT:
        if endung_passt(pfad, klassen):
            for m in re.finditer(muster, text):
                anfang = text.rfind("\n", 0, m.start()) + 1
                ende = text.find("\n", m.end())
                zeile = text[anfang: len(text) if ende < 0 else ende]
                if MARKE.search(zeile):
                    continue
                funde.append(("w", "Fehler wird ohne Meldung übergangen in %s: %s – bewusst (z. B. Speicher-Schutz) "
                                   "oder fehlt eine Meldung/ein Protokolleintrag? Nie „gespeichert“ anzeigen, wenn es "
                                   "nicht geklappt hat." % (pfad, m.group(0).replace("\n", " ")[:60])))


def lesen(pfad):
    """Textdatei lesen, höchstens MAX_BYTES, Binärdateien überspringen. -> Liste von Zeilen oder None."""
    try:
        if os.path.getsize(pfad) > MAX_BYTES:
            return None
        with open(pfad, "rb") as f:
            roh = f.read()
    except OSError:
        return None
    if b"\0" in roh[:8192]:
        return None
    return roh.decode("utf-8", errors="replace").splitlines()


def neue_zeilen(wurzel, basis):
    """-> {pfad: [zeilen]} gegenüber basis, inkl. nicht committeter und neuer Dateien."""
    aus = {}
    pfad = None
    for z in git(wurzel, "diff", "--no-color", "-U0", "--no-renames", "--no-ext-diff", basis).splitlines():
        if z.startswith("+++ "):
            kopf = z[4:].rstrip("\t")
            if kopf.startswith('"') and kopf.endswith('"'):
                kopf = kopf[1:-1]
            pfad = kopf[2:] if kopf.startswith("b/") else None
        elif pfad and z.startswith("+") and not z.startswith("+++"):
            aus.setdefault(pfad, []).append(z[1:])
    for p in git(wurzel, "ls-files", "--others", "--exclude-standard", "-z").split("\0"):
        if p and not uebersprungen(p):
            inhalt = lesen(os.path.join(wurzel, p))
            if inhalt is not None:
                aus[p] = inhalt
    return aus


def geheim_dateien(wurzel, nur=None):
    funde = []
    liste = nur if nur is not None else git(wurzel, "ls-files", "-z").split("\0")
    for p in liste:
        p = bereiche.norm(p)
        if p and GEHEIM_DATEI.search(p) and not ist_test(p) and os.path.exists(os.path.join(wurzel, p)):
            funde.append(("f", "Geheimnis-Datei %s ist versioniert oder würde es – aus dem Repo nehmen "
                               "(git rm --cached), in .gitignore eintragen, enthaltene Schlüssel neu erzeugen." % p))
    return funde


def pruefe_basis(wurzel, basis):
    funde = []
    zeilen = neue_zeilen(wurzel, basis)
    for pfad, liste in zeilen.items():
        p = bereiche.norm(pfad)
        for z in liste:
            zeile_pruefen(p, z, funde)
        verschluckt_pruefen(p, liste, funde)
    funde += geheim_dateien(wurzel, nur=list(zeilen))
    return funde


def pruefe_alles(wurzel):
    funde = geheim_dateien(wurzel)
    for p in git(wurzel, "ls-files", "-z").split("\0"):
        if not p or uebersprungen(p):
            continue
        inhalt = lesen(os.path.join(wurzel, p))
        if inhalt is None:
            continue
        for z in inhalt:
            zeile_pruefen(bereiche.norm(p), z, funde)
        verschluckt_pruefen(bereiche.norm(p), inhalt, funde)
    return funde


GEHEIME_ENV = re.compile(r"SECRET|PASSW|TOKEN|KEY|PRIVATE|CREDENTIAL|DSN|DATABASE_URL|_URI$|CONNECTION", re.IGNORECASE)
BROWSER_PRAEFIX = re.compile(r"(VITE|NEXT_PUBLIC|REACT_APP|PUBLIC|NUXT_PUBLIC|EXPO_PUBLIC|GATSBY|VUE_APP)_")


def env_werte(wurzel):
    """Werte geheimer Server-Variablen aus lokalen .env-Dateien (Name -> Wert). Nur zum Vergleich, nie ausgegeben."""
    werte = {}
    try:
        namen = os.listdir(wurzel)
    except OSError:
        return werte
    for name in namen:
        if not re.fullmatch(r"\.env(\.[\w.-]+)?", name) or re.search(r"example|sample|template", name):
            continue
        for z in lesen(os.path.join(wurzel, name)) or []:
            m = re.match(r"\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*[\"']?([^\"'#\s]+)", z)
            if m and len(m.group(2)) >= 10 and GEHEIME_ENV.search(m.group(1)) and not BROWSER_PRAEFIX.match(m.group(1)):
                werte[m.group(1)] = m.group(2)
    return werte


def pruefe_build(wurzel):
    funde = []
    werte = env_werte(wurzel)
    gefunden = False
    kopf_zeit = int((git(wurzel, "log", "-1", "--format=%ct").strip() or "0"))
    for ordner in BUILD_ORDNER:
        basis = os.path.join(wurzel, ordner)
        if not os.path.isdir(basis):
            continue
        gefunden = True
        neueste = max((os.path.getmtime(os.path.join(o, d)) for o, _, ds in os.walk(basis) for d in ds), default=0)
        if kopf_zeit and neueste < kopf_zeit - 60:
            funde.append(("w", "Build-Ordner %s ist älter als der letzte Commit – nicht geprüft. Erst neu bauen." % ordner))
            continue
        karten = 0
        for o, unter, dateien in os.walk(basis):
            unter[:] = [u for u in unter if u != "node_modules"]
            for d in dateien:
                voll = os.path.join(o, d)
                rel = bereiche.norm(os.path.relpath(voll, wurzel))
                if d.endswith(".map"):
                    karten += 1
                    continue
                if not d.endswith((".js", ".mjs", ".cjs", ".html", ".css", ".json", ".txt", ".svg")):
                    continue
                try:
                    if os.path.getsize(voll) > 20_000_000:
                        continue
                    with open(voll, encoding="utf-8", errors="replace") as f:
                        text = f.read()
                except OSError:
                    continue
                for name, muster, nur_warnung in STARK:
                    for m in re.finditer(muster, text):
                        if not BEISPIEL.search(m.group(0)):
                            funde.append(("w" if nur_warnung else "f",
                                          "%s im ausgelieferten Code %s – jeder Besucher kann ihn lesen." % (name, rel)))
                            break
                for name, wert in werte.items():
                    if wert in text:
                        funde.append(("f", "Wert der geheimen Server-Variable %s (aus .env) steht im ausgelieferten "
                                           "Code %s – jeder Besucher kann ihn lesen. Nur auf dem Server verwenden."
                                      % (name, rel)))
        if karten:
            funde.append(("w", "%d Quellkarten (.map) in %s: zeigen jedem den Quellcode. Für die Auslieferung "
                               "abschalten, falls der Code nicht öffentlich sein soll." % (karten, ordner)))
    if not gefunden:
        funde.append(("w", "Kein Build-Ordner gefunden (dist/, build/, out/, .next/static, .output/public) – "
                           "ausgelieferter Code nicht geprüft. Erst bauen, dann --build."))
    return funde


def getauscht(wurzel):
    """Einträge aus docs/SCHLUESSEL_GETAUSCHT.md: Menge von (datei, commit-anfang)."""
    aus = set()
    for z in lesen(os.path.join(wurzel, "docs", "SCHLUESSEL_GETAUSCHT.md")) or []:
        teile = [t.strip().strip("`") for t in z.strip().strip("|").split("|")]
        if len(teile) >= 3 and re.fullmatch(r"[0-9a-f]{7,40}", teile[2]):
            aus.add((bereiche.norm(teile[1]), teile[2][:7]))
    return aus


def pruefe_historie(wurzel, zeitgrenze=600):
    funde = []
    gesehen = set()
    bekannt = getauscht(wurzel)
    commit = pfad = ""
    proc = subprocess.Popen(["git", "-c", "core.quotePath=false", "log", "--all", "-p", "--no-color", "-U0",
                             "--no-ext-diff", "--format=@@commit %H"], cwd=wurzel, stdout=subprocess.PIPE,
                            stderr=subprocess.DEVNULL, text=True, encoding="utf-8", errors="replace")
    start = time.time()
    for z in proc.stdout:
        if time.time() - start > zeitgrenze:
            proc.kill()
            funde.append(("w", "Historie nach %d s abgebrochen (sehr großes Repo) – nur teilweise geprüft." % zeitgrenze))
            break
        if z.startswith("@@commit "):
            commit = z.split()[1]
        elif z.startswith("+++ "):
            pfad = z[4:].rstrip("\n").rstrip("\t").strip('"')
            pfad = pfad[2:] if pfad.startswith("b/") else pfad
        elif z.startswith("+") and not z.startswith("+++") and len(z) < 20000 and not uebersprungen(pfad):
            for name, muster, nur_warnung in STARK:
                m = re.search(muster, z)
                if nur_warnung or not m or BEISPIEL.search(m.group(0)) or (name, pfad) in gesehen:
                    continue
                if name == "privater Schlüssel" and (ist_test(pfad) or ist_unterlage(pfad)):
                    continue
                gesehen.add((name, pfad))
                quittiert = any(d == pfad and commit.startswith(c) for d, c in bekannt)
                funde.append(("w" if quittiert else "f",
                              "%s in der Git-Historie (%s, Commit %s)%s" % (
                                  name, pfad, commit[:10], " – als ausgetauscht eingetragen" if quittiert else
                                  " – beim Anbieter sperren und neu erzeugen, dann in docs/SCHLUESSEL_GETAUSCHT.md "
                                  "eintragen (Datum | Datei | Commit | Art). Löschen aus der Historie allein reicht nicht.")))
    proc.wait()
    return funde


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--basis")
    a.add_argument("--alles", action="store_true")
    a.add_argument("--build", action="store_true")
    a.add_argument("--historie", action="store_true")
    arg = a.parse_args()
    if not (arg.basis or arg.alles or arg.build or arg.historie):
        a.error("--basis, --alles, --build oder --historie angeben")
    wurzel = git(os.getcwd(), "rev-parse", "--show-toplevel").strip() or os.getcwd()
    funde = []
    if arg.basis:
        funde += pruefe_basis(wurzel, arg.basis)
    if arg.alles:
        funde += pruefe_alles(wurzel)
    if arg.build:
        funde += pruefe_build(wurzel)
    if arg.historie:
        funde += pruefe_historie(wurzel)
    for stufe, text in funde:
        print(("FEHLER:  " if stufe == "f" else "WARNUNG: ") + text)
    fehler = sum(1 for s, _ in funde if s == "f")
    print("\nSICHERHEIT: %s" % ("OK" if not fehler else "NICHT OK (%d Fehler)" % fehler))
    sys.exit(1 if fehler else 0)


if __name__ == "__main__":
    main()
