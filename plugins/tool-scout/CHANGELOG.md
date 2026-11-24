# Änderungsprotokoll

## 1.1.0 – GitHub-Abgleich (24.11.2026)
- **Sicherheit:** Auch reine Markdown-Skills und MCP-Beschreibungen werden auf versteckte Anweisungen geprüft (HTML-Kommentare, unsichtbare Unicode-Zeichen, Base64, Zugriff auf `.env`, Download-Links, zu weite `allowed-tools`). Idee NVIDIA SkillSpector, Snyk agent-scan.
- **Installationsvorschläge** nur mit fester Version (`sha`/`ref` bzw. exakte Paketversion), ein Update wird neu geprüft.
- **Lizenz** aus der LICENSE-Datei des genutzten Unterordners.
- **Abgrenzung zu recherche:profi:** „Nicht für“ in der Beschreibung, wegen gleicher Auslösesätze.
