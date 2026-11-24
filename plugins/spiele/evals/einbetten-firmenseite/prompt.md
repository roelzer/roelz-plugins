---
description: "Herkunft: Lücke „nicht geprüft“ (Probelauf: Einbetten nie getestet)"
tags: [grenzfall]
expected_outcome: "Im iframe auf langer Seite scrollt ein Wisch die Seite nicht; touch-action nicht auf html/body"
max_turns: 120
timeout_seconds: 3600
allowed_tools: [Read, Write, Edit, Bash, Glob, Grep, Skill, Agent, WebFetch, WebSearch]
---

Wir wollen auf unserer Firmenseite (lange Seite, Handwerksbetrieb) ein kleines Spiel per iframe einbetten, gesteuert mit Wischen. Bau mir eins. Mach einfach. Leg das Spiel unter spiele/<name>/ ab (index.html).
