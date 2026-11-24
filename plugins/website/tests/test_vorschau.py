# Vorschau-Werkzeug: packt eine kleine Seite in eine Datei (ohne esbuild, ohne Browser).
import os
import subprocess
import tempfile
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PNG = bytes.fromhex("89504e470d0a1a0a0000000d4948445200000001000000010806000000"
                    "1f15c4890000000d49444154789c6360000002000154a24f5d0000000049454e44ae426082")


class Vorschau(unittest.TestCase):
    def test_packt_alles_in_eine_datei(self):
        d = tempfile.mkdtemp()
        site = os.path.join(d, "site")
        for u in ("css", "js", "img"):
            os.makedirs(os.path.join(site, u))
        open(os.path.join(site, "img", "a.png"), "wb").write(PNG)
        open(os.path.join(site, "css", "s.css"), "w").write("body{background:url(../img/a.png)}")
        open(os.path.join(site, "js", "b.js"), "w").write("document.body.dataset.ok='1';")
        open(os.path.join(site, "impressum.html"), "w").write("<html><body><main><h1>Impressum</h1><p>Angaben</p></main></body></html>")
        open(os.path.join(site, "index.html"), "w").write(
            '<!doctype html><html><head><link rel="stylesheet" href="css/s.css"></head><body>'
            '<img src="img/a.png" alt=""><a href="impressum.html">Impressum</a>'
            '<script type="module" src="js/b.js"></script></body></html>')
        ziel = os.path.join(d, "v.html")
        r = subprocess.run(["node", os.path.join(PLUGIN, "scripts", "vorschau.mjs"), site, ziel], capture_output=True, text=True, cwd=d)
        self.assertEqual(r.returncode, 0, r.stderr)
        html = open(ziel).read()
        self.assertNotIn('href="css/s.css"', html)
        self.assertNotIn('src="img/a.png"', html)
        self.assertNotIn('src="js/b.js"', html)
        self.assertIn("data:image/png;base64", html)
        self.assertIn("dataset.ok", html)
        self.assertIn('href="#seite-impressum"', html)
        self.assertIn('id="seite-impressum"', html)
        self.assertIn("<h2>Impressum</h2>", html)


    def test_bild_nur_einmal_und_ohne_arbeitsordner(self):
        # Honig-Katalog 24.11.2026: 4 Fotos 13-mal eingebettet, Fotos-Ordner mitgepackt (165 MB), Absturz am iPhone.
        import re
        d = tempfile.mkdtemp()
        site = os.path.join(d, "katalog")
        os.makedirs(os.path.join(site, "img")); os.makedirs(os.path.join(site, "fotos"))
        open(os.path.join(site, "img", "a.png"), "wb").write(PNG)
        open(os.path.join(site, "fotos", "blatt.png"), "wb").write(PNG + b"x" * 5000)
        open(os.path.join(site, "index.html"), "w").write(
            '<!doctype html><html><head><style>.a{background:url(img/a.png)}.b{background:url("img/a.png")}</style></head><body>'
            + '<img src="img/a.png" alt="">' * 3 + '</body></html>')
        ziel = os.path.join(site, "katalog-vorschau.html")
        r = subprocess.run(["node", os.path.join(PLUGIN, "scripts", "vorschau.mjs"), site, ziel], capture_output=True, text=True, cwd=d)
        self.assertEqual(r.returncode, 0, r.stderr)
        html = open(ziel).read()
        self.assertEqual(len(re.findall(r"data:image/png;base64", html)), 1, "jedes Bild genau einmal")
        self.assertIn("var(--vb-0)", html)
        self.assertEqual(html.count('data-vb-src="0"'), 3)
        self.assertNotIn("blatt.png", html)
        # zweiter Lauf packt die eigene Ausgabe nicht mit ein
        subprocess.run(["node", os.path.join(PLUGIN, "scripts", "vorschau.mjs"), site, ziel], capture_output=True, text=True, cwd=d)
        self.assertLess(os.path.getsize(ziel), 20000)


if __name__ == "__main__":
    unittest.main()
