# Manifest für eine Cloudflare-Upload-Sitzung (Workers Static Assets) aus site/, beachtet .assetsignore. Aufruf: python3 cf_manifest.py <site> <manifest.json>
import os, sys, json, hashlib, base64, fnmatch
root = sys.argv[1]
ignore = [l.strip() for l in open(os.path.join(root, ".assetsignore")) if l.strip()]
def ignoriert(rel):
    name = os.path.basename(rel); raus = False
    for m in ignore:
        neg = m.startswith("!"); m = m.lstrip("!")
        if fnmatch.fnmatch(name, m) or fnmatch.fnmatch(rel, m): raus = not neg
    return raus or rel in ("_headers", "_redirects")
man = {}
for d, _, fs in os.walk(root):
    for f in fs:
        p = os.path.join(d, f); rel = os.path.relpath(p, root).replace(os.sep, "/")
        if ignoriert(rel): continue
        b = open(p, "rb").read(); ext = os.path.splitext(p)[1][1:]
        man["/" + rel] = {"hash": hashlib.sha256((base64.b64encode(b).decode() + ext).encode()).hexdigest()[:32], "size": len(b)}
json.dump(man, open(sys.argv[2], "w"), indent=1)
print(len(man), "Dateien,", sum(v["size"] for v in man.values()) // 1024, "KB")
print("\n".join(sorted(man)))
