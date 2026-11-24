"""Tests für hooks/sperre.mjs (Veröffentlichen nur mit Rückfrage, keine fremden Server im Spiel, keine Grafik ohne Lizenz)
und hooks/abschluss.mjs (kein „fertig“, solange das Spiel ungeprüft ist)."""

import json
import os
import subprocess
import tempfile
import time
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def hook(name, eingabe):
    r = subprocess.run(["node", os.path.join(PLUGIN, "hooks", name)], input=json.dumps(eingabe), capture_output=True, text=True, timeout=30)
    return json.loads(r.stdout) if r.stdout.strip() else None


PROJEKT = tempfile.mkdtemp()
os.makedirs(os.path.join(PROJEKT, "spiele"), exist_ok=True)


def bash(befehl, cwd=PROJEKT):
    return hook("sperre.mjs", {"tool_name": "Bash", "tool_input": {"command": befehl}, "cwd": cwd})


def schreiben(pfad, inhalt):
    return hook("sperre.mjs", {"tool_name": "Write", "tool_input": {"file_path": pfad, "content": inhalt}, "cwd": "/tmp"})


def entscheidung(r):
    return r["hookSpecificOutput"]["permissionDecision"] if r else None


class Sperre(unittest.TestCase):
    def test_veroeffentlichen_fragt_simon(self):
        for b in ["npx wrangler deploy", "npx wrangler@4 deploy", "wrangler pages deploy spiele/fangen", "npm run deploy", "npm publish",
                  "netlify deploy --prod", "npx vercel", "npx gh-pages -d spiele/fangen", "git push origin main",
                  "rsync -av spiele/fangen/ server:/var/www", "scp -r spiele/fangen host:"]:
            self.assertEqual(entscheidung(bash(b)), "ask", b)

    def test_normale_befehle_frei(self):
        for b in ["node spielpruefen.mjs spiele/fangen spiele/fangen/arbeit --bot", "npm i -D playwright", "npm i kaplay@3001.0.19", "ls spiele"]:
            self.assertIsNone(bash(b), b)

    def test_heredoc_text_ist_kein_befehl(self):
        b = "cat > spiele/fangen/CREDITS.md <<'EOF'\n# Pflege\nSpäter per wrangler deploy oder git push online stellen.\nEOF\nls"
        self.assertIsNone(bash(b))

    def test_heredoc_an_shell_bleibt_gesperrt(self):
        self.assertEqual(entscheidung(bash("bash <<'EOF'\nnpx wrangler deploy\nEOF")), "ask")

    def test_befehl_nach_heredoc_zaehlt(self):
        self.assertEqual(entscheidung(bash("cat > a.txt <<'EOF'\nhallo\nEOF\ngit push")), "ask")

    def test_veroeffentlichen_laut_auftrag_ohne_rueckfrage(self):
        d = tempfile.mkdtemp()
        spiel = os.path.join(d, "spiele", "x"); arbeit = os.path.join(spiel, "arbeit")
        os.makedirs(arbeit)
        open(os.path.join(spiel, "index.html"), "w").write("<canvas></canvas>")
        self.assertEqual(entscheidung(bash("npx wrangler deploy", cwd=d)), "ask")
        open(os.path.join(arbeit, "veroeffentlichen.md"), "w").write("Simon: „mach das Spiel und stell es online“\n")
        time.sleep(0.05)
        open(os.path.join(arbeit, "pruefung.json"), "w").write('{"befunde": [{"schwere": "FEHLER", "fehler": "S1", "text": "x"}]}')
        self.assertEqual(entscheidung(bash("npx wrangler deploy", cwd=d)), "ask")
        open(os.path.join(arbeit, "pruefung.json"), "w").write('{"befunde": [{"schwere": "Hinweis", "fehler": "S6", "text": "x"}]}')
        self.assertEqual(entscheidung(bash("npx wrangler deploy", cwd=d)), "allow")

    def test_arbeit_ordner_nie_mitveroeffentlicht(self):
        d = tempfile.mkdtemp()
        spiel = os.path.join(d, "spiele", "fangen"); arbeit = os.path.join(spiel, "arbeit")
        os.makedirs(arbeit)
        open(os.path.join(spiel, "index.html"), "w").write("<canvas></canvas>")
        open(os.path.join(d, "wrangler.jsonc"), "w").write('{ "name": "fangen", "assets": { "directory": "./spiele/fangen" } }')
        open(os.path.join(arbeit, "veroeffentlichen.md"), "w").write("Simon: „stell's gleich online“\n")
        time.sleep(0.05)
        open(os.path.join(arbeit, "pruefung.json"), "w").write('{"befunde": []}')
        r = bash("npx wrangler deploy", cwd=d)
        self.assertEqual(entscheidung(r), "ask")
        self.assertIn(".assetsignore", r["hookSpecificOutput"]["permissionDecisionReason"])
        open(os.path.join(spiel, ".assetsignore"), "w").write("arbeit\ndienst\n")
        self.assertEqual(entscheidung(bash("npx wrangler deploy", cwd=d)), "allow")

    def test_andere_projekte_unberuehrt(self):
        self.assertIsNone(bash("git push origin main", cwd=tempfile.mkdtemp()))

    def test_fremde_schrift_im_spiel_gesperrt(self):
        for inhalt in ['<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet">',
                       '<script src="https://cdn.jsdelivr.net/npm/kaplay@3001/dist/kaplay.mjs"></script>',
                       '<script src="//unpkg.com/three"></script>',
                       "import kaplay from 'https://esm.sh/kaplay';",
                       'fetch("https://bestenliste.example.workers.dev/top")']:
            self.assertEqual(entscheidung(schreiben("/p/spiele/elfmeter/index.html", inhalt)), "deny", inhalt)
        self.assertEqual(entscheidung(schreiben("/p/spiele/elfmeter/stil.css", "@import url('https://fonts.bunny.net/inter.css');")), "deny")

    def test_lokales_spiel_frei(self):
        inhalt = ('<link rel="stylesheet" href="stil.css"><script src="assets/vendor/kaplay.mjs"></script>'
                  '<a href="https://sv-testdorf.example/">Zum Verein</a>'
                  '<div style="background:url(&quot;data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22%3E&quot;)"></div>')
        self.assertIsNone(schreiben("/p/spiele/elfmeter/index.html", inhalt))

    def test_credits_darf_adressen_nennen(self):
        self.assertIsNone(schreiben("/p/spiele/elfmeter/CREDITS.md", "Inter (OFL) von https://fonts.google.com/specimen/Inter, lokal als inter.woff2"))
        self.assertIsNone(schreiben("/p/spiele/elfmeter/QUELLEN.md", "<script src=\"https://cdn.jsdelivr.net/npm/x\"> wird NICHT genutzt"))

    def test_ausserhalb_spielordner_frei(self):
        self.assertIsNone(schreiben("/p/website/verein/site/notiz.html", '<link href="https://fonts.googleapis.com/css2?family=Inter">'))

    def test_bestenliste_nur_mit_freigabe(self):
        spiel = os.path.join(tempfile.mkdtemp(), "spiele", "elfmeter")
        os.makedirs(os.path.join(spiel, "arbeit"))
        datei = os.path.join(spiel, "main.js")
        inhalt = 'fetch("https://liste.sv-test.workers.dev/top")'
        self.assertEqual(entscheidung(schreiben(datei, inhalt)), "deny")
        with open(os.path.join(spiel, "arbeit", "freigabe-bestenliste.md"), "w") as d:
            d.write("Simon, 24.11.2026: „Ja, Worker so veröffentlichen.“ Adresse: https://liste.sv-test.workers.dev\n")
        self.assertIsNone(schreiben(datei, inhalt))
        self.assertEqual(entscheidung(schreiben(datei, '<script src="https://liste.sv-test.workers.dev/x.js"></script>')), "deny")

    def test_fremdgrafik_und_youtube_gesperrt(self):
        self.assertEqual(entscheidung(bash("curl -o fuchs.png https://example-bilder.test/fuchs.png")), "deny")
        self.assertEqual(entscheidung(bash("yt-dlp -x https://www.youtube.com/watch?v=abc")), "deny")

    def test_freie_quellen_erlaubt(self):
        self.assertIsNone(bash("curl -L -o pack.zip https://kenney.nl/media/pages/assets/x/pack.zip"))
        self.assertIsNone(bash("curl -L -o tile.png https://kenney.nl/assets/tile.png"))

    def test_upload_gesperrt(self):
        self.assertEqual(entscheidung(bash("curl -F file=@spiel.zip https://example.org/upload")), "deny")


class Abschluss(unittest.TestCase):
    def setUp(self):
        self.ws = tempfile.mkdtemp()
        self.spiel = os.path.join(self.ws, "spiele", "fangen")
        os.makedirs(os.path.join(self.spiel, "arbeit"))

    def test_ohne_spieleordner_nichts(self):
        self.assertIsNone(hook("abschluss.mjs", {"cwd": tempfile.mkdtemp()}))

    def test_ungeprueftes_spiel_blockt(self):
        open(os.path.join(self.spiel, "index.html"), "w").close()
        self.assertEqual(hook("abschluss.mjs", {"cwd": self.ws})["decision"], "block")

    def test_geprueftes_spiel_frei(self):
        open(os.path.join(self.spiel, "index.html"), "w").close()
        time.sleep(1.2)
        for n in ["pruefung.json", "leistung.json"]:
            open(os.path.join(self.spiel, "arbeit", n), "w").close()
        self.assertIsNone(hook("abschluss.mjs", {"cwd": self.ws}))

    def test_nur_ideen_noch_kein_spiel_frei(self):
        open(os.path.join(self.spiel, "arbeit", "idee.md"), "w").close()
        self.assertIsNone(hook("abschluss.mjs", {"cwd": self.ws}))

    def test_nur_einmal_je_stopp(self):
        open(os.path.join(self.spiel, "index.html"), "w").close()
        self.assertIsNone(hook("abschluss.mjs", {"cwd": self.ws, "stop_hook_active": True}))


if __name__ == "__main__":
    unittest.main()
