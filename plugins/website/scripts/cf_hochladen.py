# Lädt die Dateien einer Upload-Sitzung zu Cloudflare (Workers Static Assets). Aufruf: CF_KONTO=<konto-id> python3 cf_hochladen.py <site> <upload-jwt> <buckets-json> <manifest.json>
# Das Upload-Token kommt aus der Sitzung (Cloudflare-Connector), ist kurzlebig und wird nirgends gespeichert außer dem Abschluss-Token neben dem Manifest.
import json, sys, os, base64, subprocess, mimetypes, tempfile
root, jwt = sys.argv[1], sys.argv[2]
buckets = json.loads(sys.argv[3])
man = json.load(open(sys.argv[4]))
nach_hash = {v["hash"]: k for k, v in man.items()}
typ = {".webp": "image/webp", ".woff2": "font/woff2", ".js": "text/javascript", ".css": "text/css", ".html": "text/html", ".md": "text/markdown", ".txt": "text/plain"}
tmp = tempfile.mkdtemp()
letzte = None
for b in buckets:
    args = ["curl", "-sS", "-X", "POST", "https://api.cloudflare.com/client/v4/accounts/%s/workers/assets/upload?base64=true" % os.environ["CF_KONTO"], "-H", "Authorization: Bearer " + jwt]
    for h in b:
        pfad = os.path.join(root, nach_hash[h].lstrip("/"))
        f = os.path.join(tmp, h); open(f, "w").write(base64.b64encode(open(pfad, "rb").read()).decode())
        args += ["-F", "%s=@%s;filename=%s;type=%s" % (h, f, h, typ.get(os.path.splitext(pfad)[1], "application/octet-stream"))]
    r = subprocess.run(args, capture_output=True, text=True)
    try: j = json.loads(r.stdout)
    except Exception: print("Antwort:", r.stdout[:300], r.stderr[:300]); sys.exit(1)
    print("Bucket", len(b), "Dateien:", j.get("success"), j.get("errors"))
    if j.get("result", {}).get("jwt"): letzte = j["result"]["jwt"]
open(os.path.join(os.path.dirname(sys.argv[4]), "fertig-jwt.txt"), "w").write(letzte or "")
print("Abschluss-Token erhalten" if letzte else "KEIN Abschluss-Token")
