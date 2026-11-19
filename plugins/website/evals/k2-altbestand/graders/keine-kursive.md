---
type: regex
pattern: 'font-style\s*:\s*italic|<em\b[^>]*>[^<]*</em>\s*</h[12]>'
match: not_contains
target: { source: files, path_regex: '^website/verein/site/.*\.(html|css)$' }
---
