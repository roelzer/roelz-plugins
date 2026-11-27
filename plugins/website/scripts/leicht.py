#!/usr/bin/env python3
"""Leichte Kopie einer Site fürs Handy (Simon, 27.11.2026: „im Chat lädt das ewig und kommt dann nur der Code,
und wenn ich's wem schick, lädt es eeewig“). Kopiert den Ordner und verkleinert alle Bilder:
JPEG/PNG/WebP über 40 KB auf höchstens 1280 px Kantenlänge (Standbilder ohne WebGL: 720 px), JPEG Qualität 68,
WebP Qualität 64. Dateinamen und Formate bleiben, damit kein Verweis bricht. Danach vorschau.mjs/mappe.mjs auf die Kopie.

Aufruf: python3 leicht.py <site-ordner> <ziel-ordner>
"""
import os, shutil, sys
from PIL import Image

quelle, ziel = sys.argv[1], sys.argv[2]
if os.path.exists(ziel): shutil.rmtree(ziel)
shutil.copytree(quelle, ziel, symlinks=False, ignore=shutil.ignore_patterns('bau', 'fotos', 'pruefung*', 'node_modules'))
vorher = nachher = 0
for d, _, fs in os.walk(ziel):
    for f in fs:
        p = os.path.join(d, f); e = f.lower().rsplit('.', 1)[-1]
        if e not in ('jpg', 'jpeg', 'png', 'webp'): continue
        g = os.path.getsize(p); vorher += g
        if g < 40_000: nachher += g; continue
        try:
            im = Image.open(p); im.load()
        except Exception:
            nachher += g; continue
        rand = 720 if 'standbild' in f or 'endzustand' in f else 1280
        if max(im.size) > rand: im.thumbnail((rand, rand), Image.LANCZOS)
        tmp = p + '.tmp'
        if e in ('jpg', 'jpeg'): im.convert('RGB').save(tmp, 'JPEG', quality=68, optimize=True, progressive=True)
        elif e == 'webp': im.save(tmp, 'WEBP', quality=64, method=6)
        else: im.save(tmp, 'PNG', optimize=True)
        if os.path.getsize(tmp) < g: os.replace(tmp, p)
        else: os.remove(tmp)
        nachher += os.path.getsize(p)
print(f'Bilder: {vorher/1e6:.1f} MB -> {nachher/1e6:.1f} MB ({ziel})')
