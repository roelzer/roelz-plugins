"""Tests für hooks/sperre.mjs (Veröffentlichen nur mit Rückfrage, keine fremden Server, keine fremden Dateien)
und hooks/abschluss.mjs (kein „fertig“, solange die Seite ungeprüft ist)."""

import json
import os
import subprocess
import tempfile
import time
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def hook(name, eingabe):
    r = subprocess.run(["node", os.path.join(PLUGIN, "hooks", name)], input=json.dumps(eingabe), capture_output=True, text=True)
    return json.loads(r.stdout) if r.stdout.strip() else None


PROJEKT = tempfile.mkdtemp()
os.makedirs(os.path.join(PROJEKT, "website"), exist_ok=True)


def bash(befehl, cwd=PROJEKT):
    return hook("sperre.mjs", {"tool_name": "Bash", "tool_input": {"command": befehl}, "cwd": cwd})


def schreiben(pfad, inhalt):
    return hook("sperre.mjs", {"tool_name": "Write", "tool_input": {"file_path": pfad, "content": inhalt}, "cwd": "/tmp"})


def entscheidung(r):
    return r["hookSpecificOutput"]["permissionDecision"] if r else None


class Sperre(unittest.TestCase):
    def test_veroeffentlichen_fragt_simon(self):
        for b in ["npx wrangler deploy", "npm run deploy", "wrangler pages deploy site", "npx gh-pages -d site", "netlify deploy --prod",
                  "npx wrangler@4 deploy", "npx wrangler -c wrangler.jsonc deploy", "wrangler versions upload", "git push origin main",
                  "rsync -av site/ server:/var/www", "scp -r site host:"]:
            self.assertEqual(entscheidung(bash(b)), "ask", b)

    def test_normale_befehle_frei(self):
        for b in ["npx playwright test", "node pruefen.mjs website/x/site", "npm i -D three@0.187.0", "ls website"]:
            self.assertIsNone(bash(b), b)

    def test_upload_gesperrt(self):
        self.assertEqual(entscheidung(bash("curl -F file=@site.zip https://example.org/upload")), "deny")

    def test_fremde_schrift_in_lieferung_gesperrt(self):
        r = schreiben("/p/website/verein/site/index.html", '<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet">')
        self.assertEqual(entscheidung(r), "deny")
        r = schreiben("/p/website/verein/site/index.html", "<script async src='https://www.googletagmanager.com/gtag/js?id=G-1'></script>")
        self.assertEqual(entscheidung(r), "deny")

    def test_fremde_schrift_ausserhalb_lieferung_frei(self):
        self.assertIsNone(schreiben("/p/website/verein/arbeit/notizen.md", "fonts.googleapis.com wird nicht genutzt"))

    def test_quellenliste_darf_adressen_nennen(self):
        self.assertIsNone(schreiben("/p/website/verein/site/QUELLEN.md", "werkstatt.jpg · https://unsplash.com/photos/abc · Unsplash-Lizenz"))
        self.assertIsNone(schreiben("/p/website/verein/site/index.html", '<a href="https://www.instagram.com/verein/">Instagram</a>'))

    def test_andere_projekte_unberuehrt(self):
        anderes = tempfile.mkdtemp()
        self.assertIsNone(bash("git push origin main", cwd=anderes))
        self.assertIsNone(bash("npx wrangler deploy", cwd=anderes))

    def test_upload_per_daten_gesperrt(self):
        self.assertEqual(entscheidung(bash("curl -d @site.zip https://example.org/x")), "deny")

    def test_lokale_seite_frei(self):
        self.assertIsNone(schreiben("/p/website/verein/site/index.html", '<link href="fonts/mona.woff2"><script src="vendor/three.module.js"></script>'))

    def test_dateien_fremder_vorbilder_gesperrt(self):
        self.assertEqual(entscheidung(bash("curl -o helm.glb https://landonorris.com/assets/helmet.glb")), "deny")
        self.assertEqual(entscheidung(bash("wget https://www.igloo.inc/textures/ice.ktx2")), "deny")

    def test_freie_quellen_erlaubt(self):
        self.assertIsNone(bash("curl -o h.hdr https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/brown_photostudio_02_1k.hdr"))
        self.assertIsNone(bash("curl -L -o werkstatt.jpg 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=2400'"))

    def test_vorbild_ansehen_erlaubt(self):
        self.assertIsNone(bash("curl -s https://landonorris.com/ | head"))


class Abschluss(unittest.TestCase):
    def setUp(self):
        self.ws = tempfile.mkdtemp()
        os.makedirs(os.path.join(self.ws, "website", "x", "site"))
        os.makedirs(os.path.join(self.ws, "website", "x", "arbeit", "pruefung"))

    def test_ohne_websiteordner_nichts(self):
        self.assertIsNone(hook("abschluss.mjs", {"cwd": tempfile.mkdtemp()}))

    def test_ungepruefte_seite_blockt(self):
        open(os.path.join(self.ws, "website", "x", "site", "index.html"), "w").close()
        r = hook("abschluss.mjs", {"cwd": self.ws})
        self.assertEqual(r["decision"], "block")

    def test_gepruefte_seite_frei(self):
        open(os.path.join(self.ws, "website", "x", "site", "index.html"), "w").close()
        time.sleep(1.2)
        open(os.path.join(self.ws, "website", "x", "arbeit", "pruefung", "pruefung.json"), "w").close()
        self.assertIsNone(hook("abschluss.mjs", {"cwd": self.ws}))

    def test_nur_einmal_je_stopp(self):
        open(os.path.join(self.ws, "website", "x", "site", "index.html"), "w").close()
        self.assertIsNone(hook("abschluss.mjs", {"cwd": self.ws, "stop_hook_active": True}))


if __name__ == "__main__":
    unittest.main()
