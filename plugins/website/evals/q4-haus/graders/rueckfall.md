---
type: regex
pattern: '(catch\s*\(|getContext\([\x27"]webgl|WebGL)[\s\S]{0,400}(fallback|ruckfall|rückfall|standbild|ohne3d|no-webgl|classList\.add)|prefers-reduced-motion'
flags: i
target: { source: files, path_regex: '^website/[^/]+/site/.*\.(html|css|js|mjs)$' }
---
