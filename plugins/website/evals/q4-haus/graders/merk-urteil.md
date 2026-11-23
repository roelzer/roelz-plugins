---
type: regex
pattern: 'Merk-Urteil:\s*\**\s*merkt man sich'
flags: i
target: { source: files, path_regex: '^website/[^/]+/arbeit/runden/[^/]+/kritik\.md$' }
arm: mit
---
