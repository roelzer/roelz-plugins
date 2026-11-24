---
type: regex
pattern: 'Nächstes bekanntes Spiel[\s\S]{0,200}unterscheidet sich in'
flags: i
target: { source: files, path_regex: '^spiele/[^/]+/arbeit/idee\.md$' }
arm: mit
---
