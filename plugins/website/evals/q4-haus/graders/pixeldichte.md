---
type: regex
pattern: 'Math\.min\(\s*(window\.)?devicePixelRatio|setPixelRatio\(\s*Math\.min|\.webp|\.avif|<video'
target: { source: files, path_regex: '^website/[^/]+/site/.*\.(html|css|js|mjs)$' }
---
