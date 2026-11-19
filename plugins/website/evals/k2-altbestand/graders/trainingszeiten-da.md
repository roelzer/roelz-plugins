---
type: regex
pattern: 'Dienstag(\s|<[^>]+>|,|:)*17[:.]30'
target: { source: files, path_regex: '^website/verein/site/.*\.html$' }
---
