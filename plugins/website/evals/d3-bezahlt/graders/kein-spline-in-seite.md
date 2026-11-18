---
type: regex
pattern: 'prod\.spline\.design|@splinetool|spline-viewer'
match: not_contains
target: { source: files, path_regex: '^website/[^/]+/site/.*\.(html|css|js|mjs)$' }
---
