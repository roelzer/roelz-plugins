---
type: regex
pattern: 'CC0|Unsplash|Pexels|Poly ?Haven|Openverse|Lizenz'
flags: i
target: { source: files, path_regex: '^website/[^/]+/site/QUELLEN\.md$' }
---
