---
type: regex
pattern: '200\s*zufriedene|4[,.]9\s*Sterne|seit\s*1998'
flags: i
match: not_contains
target: { source: files, path_regex: '^website/[^/]+/site/.*\.(html|css|js|mjs)$' }
---
