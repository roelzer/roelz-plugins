#!/usr/bin/env python3
"""Sicherheits-Schranke des Dev-Teams: einfache Lücken mechanisch finden, bevor sie ausgeliefert werden.

Prüft (ohne Netz, ohne Zusatzpakete):
  1. Geheimnisse: Schlüssel bekannter Anbieter (AWS, GitHub, Stripe, Google, OpenAI, Anthropic, Slack, SendGrid,
     Azure), private Schlüssel, Zugangsdaten in Adressen, „password = '…'“ und Ähnliches – in neuen Zeilen.
  2. Frontend: Variablen, die das Build-Werkzeug absichtlich in den Browser-Code einbaut (VITE_, NEXT_PUBLIC_,
     REACT_APP_, PUBLIC_, NUXT_PUBLIC_, EXPO_PUBLIC_, GATSBY_), dürfen keine Geheimnisse sein.
  3. Gefährliche Muster in Programmcode: eval, innerHTML mit Daten, zusammengesetztes SQL, Shell-Aufrufe mit
     eingesetzten Werten, Pfade/Adressen/Weiterleitungen aus der Anfrage (Path Traversal, SSRF, Open Redirect),
     Anfrage-Daten ungefiltert ins Datenmodell, interne Fehlerdetails an Nutzer, verschluckte Fehler, schwache
     Verfahren für Passwörter/Zufallswerte, JWT ohne Signatur, abgeschaltete Zertifikatsprüfung, CORS „*“,
     unsichere Deserialisierung, Debug an, Anmeldedaten im Browser-Speicher.
  4. Versionierte Geheimnis-Dateien (.env, *.pem, *.key, id_rsa, *.p12, *.pfx).
  5. --build: ausgelieferte Dateien (dist/, build/, out/, .next/static, .output/public) auf Schlüssel und auf Werte
     aus den lokalen .env-Dateien (nur Name wird gemeldet, nie der Wert).
  6. --historie: die ganze Git-Historie auf Schlüssel bekannter Anbieter und private Schlüssel.

Ausnahme für einen Fund der Klassen 2 und 3 (z. B. bewusst geprüftes innerHTML mit festem Text): Kommentar
„dev-team: sicher – <Grund>“ in derselben Zeile. Er wird als WARNUNG gemeldet; der Sicherheitsprüfer bewertet
jede Stelle. Schlüssel bekannter Anbieter und private Schlüssel haben keine Ausnahme: echte Schlüssel gehören nie
ins Repo, Testwerte sehen offensichtlich falsch aus (z. B. „sk_test_xxx“).

Aufruf:  python3 pruefe_sicherheit.py [--basis <commit>] [--alles] [--build] [--historie]
Exit 0 = keine Fehler, Exit 1 = mindestens ein FEHLER. Ändert nichts. Gibt nie einen gefundenen Wert aus.
"""

import argparse
import os
import re
import subprocess
import sys

HIER = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HIER)
import bereiche  # noqa: E402

MARKE = re.compile(r"dev-team:\s*sicher\b", re.IGNORECASE)

STARK = [  # (Name, Muster) – keine Ausnahme möglich
    ("AWS-Zugangsschlüssel", r"\b(?:AKIA|ASIA)[0-9A-Z]{16}\b"),
    ("GitHub-Token", r"\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{60,})\b"),
    ("Slack-Token", r"\bxox[baprs]-[A-Za-z0-9-]{10,}"),
    ("Stripe-Geheimschlüssel", r"\b(?:sk|rk)_live_[A-Za-z0-9]{20,}"),
    ("Google-API-Schlüssel", r"\bAIza[0-9A-Za-z_\-]{35}\b"),
    ("Anthropic-API-Schlüssel", r"\bsk-ant-[A-Za-z0-9_\-]{20,}"),
    ("OpenAI-API-Schlüssel", r"\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_\-]{40,}"),
    ("SendGrid-Schlüssel", r"\bSG\.[A-Za-z0-9_\-]{22}\.[A-Za-z0-9_\-]{43}\b"),
    ("Azure-Speicherschlüssel", r"AccountKey=[A-Za-z0-9+/=]{40,}"),
    ("privater Schlüssel", r"-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY-----"),
]
PLATZHALTER = re.compile(r"x{3,}|\*{3,}|<[^>]*>|\$\{|\{\{|example|beispiel|changeme|dummy|placeholder|platzhalter|"
                         r"your[_-]|dein[_-]|fake|test|sample|todo|redacted|process\.env|import\.meta\.env|os\.environ|"
                         r"getenv", re.IGNORECASE)
ALLGEMEIN = [  # (Name, Muster) – Ausnahme mit Kommentar möglich
    ("Passwort/Schlüssel als fester Wert",
     r"(?i)[\"']?\b(?:password|passwort|passwd|pwd|secret|api[_-]?key|access[_-]?key|auth[_-]?token|"
     r"client[_-]?secret|private[_-]?key|bearer)\b[\"']?\s*[:=]\s*[\"']([^\"'\s]{8,})[\"']"),
    ("Zugangsdaten in einer Adresse", r"\b[a-z][a-z0-9+.\-]*://[^/\s:@\"'`]+:([^/\s:@\"'`]{3,})@"),
]
FRONTEND = re.compile(r"\b(?:VITE|NEXT_PUBLIC|REACT_APP|PUBLIC|NUXT_PUBLIC|EXPO_PUBLIC|GATSBY|VUE_APP)_[A-Z0-9_]*"
                      r"(?:SECRET|PASSWORD|PASSWD|PRIVATE|TOKEN|API_?KEY|ACCESS_?KEY|SERVICE_?ROLE)[A-Z0-9_]*")
FRONTEND_OK = re.compile(r"PUBLISHABLE|ANON|SITE_?KEY|PUBLIC_?KEY", re.IGNORECASE)
GEFAEHRLICH = [  # (Name, Muster, Endungen)
    ("eval/new Function (führt Text als Code aus)", r"\beval\s*\(|\bnew\s+Function\s*\(", "js"),
    ("HTML aus Daten ohne Maskierung (XSS)",
     r"dangerouslySetInnerHTML|\.(?:inner|outer)HTML\s*\+?=|insertAdjacentHTML\s*\(|document\.write\s*\(|"
     r"\bv-html\b|\{@html\b|\[innerHTML\]|bypassSecurityTrust", "js"),
    ("SQL aus zusammengesetztem Text (SQL-Injection)", None, "js py cs java php go rb"),
    ("Shell-Aufruf mit eingesetzten Werten (Command-Injection)",
     r"\bexec(?:Sync)?\s*\(\s*`[^`]*\$\{|\bshell\s*[:=]\s*(?:true|True)\b|\bos\.system\s*\(|\bos\.popen\s*\(", "js py"),
    ("Zertifikatsprüfung abgeschaltet",
     r"rejectUnauthorized\s*:\s*false|NODE_TLS_REJECT_UNAUTHORIZED|\bverify\s*=\s*False\b|_create_unverified_context|"
     r"InsecureSkipVerify\s*:\s*true|ServerCertificateValidationCallback\s*=", "js py go cs"),
    ("CORS für jede Herkunft offen",
     r"Access-Control-Allow-Origin[\"']?\s*[:,]\s*[\"']\*|\borigin\s*:\s*[\"']\*[\"']|\borigin\s*:\s*true\b|"
     r"allow_origins\s*=\s*\[\s*[\"']\*", "js py"),
    ("unsichere Deserialisierung",
     r"\bpickle\.loads?\s*\(|\byaml\.load\s*\((?![^)]*SafeLoader)|\bmarshal\.loads\s*\(|BinaryFormatter|\bunserialize\s*\(",
     "py cs php"),
    ("Debug-Modus in der Auslieferung", r"^\s*DEBUG\s*=\s*True\b|\bapp\.run\([^)]*debug\s*=\s*True", "py"),
    ("Datei-Zugriff mit Pfad aus der Anfrage (Path Traversal)",
     r"(?:sendFile|readFile(?:Sync)?|createReadStream|\bopen|send_file|FileResponse)\s*\([^)]*\b(?:req|request)\."
     r"(?:params|query|body|args|form|files|GET|POST)", "js py"),
    ("Abruf einer Adresse aus der Anfrage (SSRF)",
     r"(?:\bfetch|axios(?:\.\w+)?|got|requests\.\w+|urlopen|httpx\.\w+)\s*\(\s*(?:`[^`]*\$\{\s*)?(?:req|request)\."
     r"(?:params|query|body|args|form|GET|POST)", "js py"),
    ("Weiterleitung auf Adresse aus der Anfrage (Open Redirect)",
     r"\bredirect\s*\(\s*(?:req|request)\.(?:params|query|body|args|form|GET|POST)", "js py"),
    ("Anfrage-Daten ungefiltert ins Datenmodell (Mass Assignment)",
     r"\.(?:create|update|insert|findOneAndUpdate|updateOne|save)\s*\(\s*(?:[^,()]*,\s*)?(?:req|request)\.body\s*\)|"
     r"Object\.assign\s*\([^)]*(?:req|request)\.body|\.\.\.\s*(?:req|request)\.body\b|\*\*request\.(?:json|form|data)\b",
     "js py"),
    ("interne Fehlerdetails an den Nutzer",
     r"\.(?:send|json|write|end)\s*\([^)]*\b(?:err|error|e|ex)\.(?:stack|stacktrace)\b|"
     r"\.status\(\s*5\d\d\s*\)\.(?:send|json)\(\s*(?:err|error|e)\s*\)|traceback\.format_exc\(\)", "js py"),
    ("schwaches Verfahren für Passwörter oder Zufallswerte",
     r"(?i)(?:md5|sha1)\s*\(.*pass|pass\w*\s*=.*\b(?:md5|sha1)\s*\(|Math\.random\(\).*(?:token|secret|passw|key|code)|"
     r"(?:token|secret|passw|key)\w*\s*=.*Math\.random\(\)|\brandom\.(?:random|randint|choice)\(.*(?:token|secret|passw)",
     "js py"),
    ("JWT ohne Signaturprüfung",
     r"(?i)algorithms?\s*[:=]\s*\[?\s*[\"']none[\"']|verify_signature[\"']?\s*:\s*False|jwt\.decode\([^)]*verify\s*=\s*False",
     "js py"),
    ("Anmeldedaten im Browser-Speicher",
     r"(?i)(?:local|session)Storage\.setItem\s*\(\s*[\"'`][^\"'`]*(?:token|jwt|session|passw)", "js"),
]
_SQL = r"(?:SELECT\b[^{q}]*?\bFROM|INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM)\b"
SQL_MUSTER = "(?i)" + "|".join(
    [r"{q}\s*{sql}[^{q}]*{q}\s*\+".format(q=q, sql=_SQL.format(q=q)) for q in ("\"", "'")] +
    [r"`\s*{sql}[^`]*\$\{{".format(sql=_SQL.format(q="`"))] +
    [r"\bf{q}\s*{sql}[^{q}]*\{{".format(q=q, sql=_SQL.format(q=q)) for q in ("\"", "'")] +
    [r"{q}\s*{sql}[^{q}]*{q}\s*(?:%\s*[\(\w]|\.format\()".format(q=q, sql=_SQL.format(q=q)) for q in ("\"", "'")])
ENDUNGEN = {"js": (".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".vue", ".svelte", ".html", ".astro"),
            "py": (".py",), "cs": (".cs",), "java": (".java", ".kt"), "php": (".php",), "go": (".go",), "rb": (".rb",)}
GEHEIM_DATEI = re.compile(r"(^|/)(\.env(\.(?!example$|sample$|template$|dist$)[^/]+)?|[^/]+\.(pem|key|p12|pfx|jks|keystore)|"
                          r"id_(rsa|dsa|ecdsa|ed25519)|credentials\.json|service-account[^/]*\.json)$", re.IGNORECASE)
BUILD_ORDNER = ("dist", "build", "out", os.path.join(".next", "static"), os.path.join(".output", "public"))
OHNE = ("node_modules/", ".git/", ".dev-team/", ".claude/worktrees/", "package-lock.json", "yarn.lock",
        "pnpm-lock.yaml", ".min.js")


def git(wurzel, *args):
    r = subprocess.run(["git", *args], cwd=wurzel, capture_output=True, text=True, encoding="utf-8", errors="replace")
    return r.stdout if r.returncode == 0 else ""


def endung_passt(pfad, klassen):
    return any(pfad.lower().endswith(e) for k in klassen.split() for e in ENDUNGEN[k])


def ist_unterlage(pfad):
    """Unterlagen und Entwürfe (docs/, design/) werden nicht ausgeliefert: dort nur Geheimnisse prüfen."""
    return bool(re.match(r"(docs|design)/", pfad.lower()))


def ist_test(pfad):
    p = "/" + pfad.lower()
    return bool(re.search(r"/(tests?|__tests__|e2e|spec|fixtures?|__mocks__)/|\.(test|spec)\.|(^|/)test_[^/]*\.py$|"
                          r"_test\.(py|go)$", p))


VERSCHLUCKT = [  # über mehrere neue Zeilen einer Datei
    (r"except[^\n:]*:[ \t]*(?:\n[ \t]*)?pass\b", "py"),
    (r"catch\s*(?:\([^)]*\))?\s*\{\s*\}", "js cs java"),
    (r"\.catch\s*\(\s*(?:\(\s*\w*\s*\)|\w+)\s*=>\s*(?:\{\s*\}|null|undefined|void 0)\s*\)", "js"),
]


def verschluckt_pruefen(pfad, zeilen, funde):
    if ist_test(pfad) or ist_unterlage(pfad) or any(o in pfad for o in OHNE):
        return
    text = "\n".join(zeilen)
    for muster, klassen in VERSCHLUCKT:
        if endung_passt(pfad, klassen):
            for m in re.finditer(muster, text):
                ende = text.find("\n", m.end())
                zeile = text[text.rfind("\n", 0, m.start()) + 1: len(text) if ende < 0 else ende]
                markiert = bool(MARKE.search(zeile)) or bool(MARKE.search(text[m.start():m.end() + 80]))
                funde.append(("w" if markiert else "f",
                              "Fehler wird verschluckt in %s: %s%s" % (pfad, m.group(0).replace("\n", " ")[:80],
                              " (als geprüft markiert)" if markiert else " – Fehler melden oder protokollieren; "
                              "nie „gespeichert“ anzeigen, wenn es nicht geklappt hat. Bewusst ignoriert: "
                              "„dev-team: sicher – <Grund>“.")))


def zeile_pruefen(pfad, zeile, funde):
    """funde: Liste (stufe, text). stufe 'f' = Fehler, 'w' = Warnung."""
    if any(o in pfad for o in OHNE) or len(zeile) > 2000:
        return
    ort = pfad
    for name, muster in STARK:
        if re.search(muster, zeile):
            funde.append(("f", "%s in %s – echte Schlüssel gehören nie ins Repo (in die Umgebung des Servers/Hosters; "
                               "Testwerte offensichtlich falsch schreiben). Den Schlüssel außerdem beim Anbieter "
                               "sperren und neu erzeugen, er ist jetzt in der Git-Historie." % (name, ort)))
            return
    markiert = bool(MARKE.search(zeile))
    for name, muster in ALLGEMEIN:
        m = re.search(muster, zeile)
        if m and not PLATZHALTER.search(m.group(1) or "") and not PLATZHALTER.search(zeile):
            stufe = "w" if (markiert or ist_test(pfad)) else "f"
            funde.append((stufe, "%s in %s%s" % (name, ort, " (als geprüft markiert)" if markiert else
                                                    " (Testdatei: nur Testwerte verwenden)" if stufe == "w" else "")))
    for m in FRONTEND.finditer(zeile):
        if FRONTEND_OK.search(m.group(0)):
            continue
        funde.append(("w" if markiert else "f",
                      "Browser-Variable %s in %s: alles mit diesem Präfix steht im ausgelieferten Code und ist für jeden "
                      "lesbar. Geheimnisse nur auf dem Server%s" % (m.group(0), ort, " (als geprüft markiert)" if markiert
                                                                    else " (Architekt legt fest, wo der Schlüssel liegt).")))
    if ist_test(pfad) or ist_unterlage(pfad):
        return
    for name, muster, klassen in GEFAEHRLICH:
        if endung_passt(pfad, klassen) and re.search(muster or SQL_MUSTER, zeile):
            funde.append(("w" if markiert else "f", "%s in %s: %s%s" % (
                name, ort, zeile.strip()[:100], " (als geprüft markiert – Sicherheitsprüfer bewertet)" if markiert else
                " – sichere Alternative nehmen oder mit „dev-team: sicher – <Grund>“ begründen.")))


def neue_zeilen(wurzel, basis):
    """-> {pfad: [zeilen]} gegenüber basis, inkl. nicht committeter und neuer Dateien."""
    aus = {}
    pfad = None
    for z in git(wurzel, "diff", "--no-color", "-U0", "--no-renames", basis).splitlines():
        if z.startswith("+++ "):
            pfad = z[6:] if z.startswith("+++ b/") else None
        elif pfad and z.startswith("+") and not z.startswith("+++"):
            aus.setdefault(pfad, []).append(z[1:])
    for p in git(wurzel, "ls-files", "--others", "--exclude-standard").splitlines():
        try:
            with open(os.path.join(wurzel, p), encoding="utf-8", errors="replace") as f:
                aus[p] = f.read().splitlines()
        except (OSError, UnicodeError):
            pass
    return aus


def geheim_dateien(wurzel, nur=None):
    funde = []
    for p in (nur if nur is not None else git(wurzel, "ls-files").splitlines()):
        p = bereiche.norm(p)
        if GEHEIM_DATEI.search(p) and not ist_test(p) and os.path.exists(os.path.join(wurzel, p)):
            funde.append(("f", "Geheimnis-Datei %s ist versioniert oder würde es – aus dem Repo nehmen "
                               "(git rm --cached), in .gitignore eintragen, enthaltene Schlüssel neu erzeugen." % p))
    return funde


def pruefe_basis(wurzel, basis):
    funde = []
    zeilen = neue_zeilen(wurzel, basis)
    for pfad, liste in zeilen.items():
        for z in liste:
            zeile_pruefen(bereiche.norm(pfad), z, funde)
        verschluckt_pruefen(bereiche.norm(pfad), liste, funde)
    funde += geheim_dateien(wurzel, nur=list(zeilen))
    return funde


def pruefe_alles(wurzel):
    funde = geheim_dateien(wurzel)
    for p in git(wurzel, "ls-files").splitlines():
        try:
            if os.path.getsize(os.path.join(wurzel, p)) > 2_000_000:
                continue
            with open(os.path.join(wurzel, p), encoding="utf-8", errors="strict") as f:
                inhalt = f.read().splitlines()
            for z in inhalt:
                zeile_pruefen(bereiche.norm(p), z, funde)
            verschluckt_pruefen(bereiche.norm(p), inhalt, funde)
        except (OSError, UnicodeError):
            continue
    return funde


def env_werte(wurzel):
    """Werte aus lokalen .env-Dateien, die nicht für den Browser bestimmt sind (Name -> Wert). Nur zum Vergleich."""
    werte = {}
    for name in os.listdir(wurzel):
        if not re.fullmatch(r"\.env(\.[\w.-]+)?", name) or re.search(r"example|sample|template", name):
            continue
        try:
            with open(os.path.join(wurzel, name), encoding="utf-8", errors="replace") as f:
                for z in f:
                    m = re.match(r"\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*[\"']?([^\"'#\s]+)", z)
                    if m and len(m.group(2)) >= 12 and not FRONTEND.match(m.group(1)) and \
                            not re.match(r"(VITE|NEXT_PUBLIC|REACT_APP|PUBLIC|NUXT_PUBLIC|EXPO_PUBLIC|GATSBY|VUE_APP)_",
                                         m.group(1)) and not re.fullmatch(r"(true|false|\d+|https?://[^@]*)", m.group(2)):
                        werte[m.group(1)] = m.group(2)
        except OSError:
            pass
    return werte


def pruefe_build(wurzel):
    funde = []
    werte = env_werte(wurzel)
    gefunden = False
    for ordner in BUILD_ORDNER:
        basis = os.path.join(wurzel, ordner)
        if not os.path.isdir(basis):
            continue
        gefunden = True
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
                for name, muster in STARK:
                    if re.search(muster, text):
                        funde.append(("f", "%s im ausgelieferten Code %s – jeder Besucher kann ihn lesen." % (name, rel)))
                for name, wert in werte.items():
                    if wert in text:
                        funde.append(("f", "Wert der Server-Variable %s (aus .env) steht im ausgelieferten Code %s – "
                                           "jeder Besucher kann ihn lesen. Nur auf dem Server verwenden." % (name, rel)))
        if karten:
            funde.append(("w", "%d Quellkarten (.map) in %s: zeigen jedem den Quellcode. Für die Auslieferung "
                               "abschalten, falls der Code nicht öffentlich sein soll." % (karten, ordner)))
    if not gefunden:
        funde.append(("w", "Kein Build-Ordner gefunden (dist/, build/, out/, .next/static, .output/public) – "
                           "ausgelieferter Code nicht geprüft. Erst bauen, dann --build."))
    return funde


def pruefe_historie(wurzel):
    funde = []
    gesehen = set()
    commit = pfad = ""
    proc = subprocess.Popen(["git", "log", "--all", "-p", "--no-color", "-U0", "--format=@@commit %H"], cwd=wurzel,
                            stdout=subprocess.PIPE, text=True, encoding="utf-8", errors="replace")
    for z in proc.stdout:
        if z.startswith("@@commit "):
            commit = z.split()[1][:10]
        elif z.startswith("+++ b/"):
            pfad = z[6:].strip()
        elif z.startswith("+") and not z.startswith("+++"):
            for name, muster in STARK:
                if re.search(muster, z) and (name, pfad) not in gesehen:
                    gesehen.add((name, pfad))
                    funde.append(("f", "%s in der Git-Historie (%s, Commit %s) – beim Anbieter sperren und neu "
                                       "erzeugen; Löschen aus der Historie allein reicht nicht." % (name, pfad, commit)))
    proc.wait()
    return funde


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--basis")
    a.add_argument("--alles", action="store_true")
    a.add_argument("--build", action="store_true")
    a.add_argument("--historie", action="store_true")
    arg = a.parse_args()
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
    if not (arg.basis or arg.alles or arg.build or arg.historie):
        a.error("--basis, --alles, --build oder --historie angeben")
    for stufe, text in funde:
        print(("FEHLER:  " if stufe == "f" else "WARNUNG: ") + text)
    fehler = sum(1 for s, _ in funde if s == "f")
    print("\nSICHERHEIT: %s" % ("OK" if not fehler else "NICHT OK (%d Fehler)" % fehler))
    sys.exit(1 if fehler else 0)


if __name__ == "__main__":
    main()
