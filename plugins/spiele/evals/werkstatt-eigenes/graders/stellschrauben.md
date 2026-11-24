---
type: regex
pattern: 'min\s*:[^,}\n]{1,20},\s*max\s*:[^,}\n]{1,20},\s*step\s*:'
target: { source: files, path_regex: '^spiele/[^/]+/[^/]+\.(html|m?js)$' }
---
