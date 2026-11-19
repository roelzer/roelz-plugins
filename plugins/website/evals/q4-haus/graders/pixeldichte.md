---
type: regex
pattern: 'Math\.min\(\s*(window\.)?devicePixelRatio|setPixelRatio\(\s*Math\.min|<video|bildfolge|frame_?\d{3}'
target: { source: files, path_regex: '^website/[^/]+/site/.*\.(html|css|js|mjs)$' }
---
