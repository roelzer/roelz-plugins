---
type: regex
pattern: '(seit (19|20)\d\d|\d{2,}\s*(zufriedene|Kunden|Projekte|Jahre)|innerhalb (eines|von \d+) (Werktag|Stunde)|\d[,.]\d\s*Sterne|Ich komme (selbst )?aus)'
flags: i
match: not_contains
target: { source: files, path_regex: '^website/[^/]+/site/.*\.(html|css|js|mjs)$' }
---
