---
type: regex
pattern: 'isWebGL2?Available|WebGL[^\n]{0,60}(nicht|kein|fehlt|not|unavailable|unsupported)|(nicht|kein|ohne|no)[^\n]{0,30}WebGL'
flags: i
target: { source: files, path_regex: '^spiele/[^/]+/(?!arbeit/).+\.(html|m?js)$' }
---
