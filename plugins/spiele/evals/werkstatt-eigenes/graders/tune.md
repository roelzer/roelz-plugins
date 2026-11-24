---
type: regex
pattern: '[?&]tune|has\(\s*["'']tune["'']|get\(\s*["'']tune["'']'
target: { source: files, path_regex: '^spiele/[^/]+/[^/]+\.(html|m?js)$' }
---
