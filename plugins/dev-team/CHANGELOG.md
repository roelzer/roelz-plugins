# Änderungsprotokoll Dev-Team

## 3.20.0 – Besetzung nach Bedarf, mechanisch abgesichert

Anlass: Simon: „Bau Sinnvolles ein und sichere die Risiken.“ Risiken der freien Wahl: Der Projektleiter spart an Prüfungen, oder Entscheidungen werden unvorhersehbar.
- **Untergrenzen ohne KI geprüft:** Die Schranke `--rolle projektleiter` verlangt im laufenden Auftrag (`.dev-team/plugin-version`) einen Teamplan (`docs/TEAMPLAN.md`) und Berichte der Pflichtrollen seit Auftragsbeginn in `docs/pruefberichte/`: immer `reviewer`; bei `"kundendaten": true` bzw. `kunde`/`voll` zusätzlich `sicherheitspruefer` und verdeckte Abnahmetests; bei Profil `fachsoftware` der `fachpruefer`. Ohne sie kein Merge. Simon kann mit einer Freigabe (Geltung `teamplan`) eine Ausnahme machen.
- **Risiko-Auslöser erkennt die Schranke selbst:** neue Codezeilen mit Passwort, Anmeldung, Schlüssel, Token, Zahlung o. Ä. → `sicherheitspruefer` ist Pflicht.
- **Kein Herunterstufen ohne Simon:** `besetzung` darf nur steigen (bedarf → kunde → voll), `kundendaten` nur auf true – zurück nur mit Freigabe.
- **Teamplan mit Bilanz:** Vorlage `vorlagen/teamplan.md` (Aufgabe → wer → warum, Änderungen unterwegs, Bilanz: was hat jede Rolle gefunden, hat es sich gelohnt). Rollen im Plan, die nie liefen, meldet die Schranke als Warnung.
- **Klare Regeln zum Hochstufen:** zweimal rot an derselben Stelle → Reviewer/Architekt; Rechen-/Regelfrage → Tester/Fachprüfer; neuer Risiko-Auslöser → Sicherheitsprüfer. Im Zweifel holen.
- Tests: Teamplan und Untergrenzen, nur im laufenden Auftrag, Risiko im Code, Kundendaten, nur hochstufen.

## 3.19.0 – Besetzung nach Bedarf: der Projektleiter entscheidet selbst

Anlass: Simon: „Ich würde das alles variabel gestalten – der Projektleiter soll überlegen, wen er für was braucht, und was einfach solo läuft. Und zwar immer.“
- Keine festen Besetzungen mehr (ersetzt auch „Gemischt“ aus 3.18.0). Der Projektleiter baut selbst und erstellt je Auftrag einen **Teamplan** (*Aufgabe → wer → warum*) für Planung, Gestaltung, Tests vorab, Bauen, Prüfen, Übergabe; unterwegs hoch- oder herunterstufen, vermerkt in `docs/ENTSCHEIDUNGEN.md`.
- Grundgesetz: Tabelle „Rolle – holen, wenn …“ und feste **Untergrenzen** (Schranken immer; Review vor `main`; Kundendaten → verdeckte Abnahmetests, Sicherheitsprüfung, Übergabe; Geldfolgen → Fachprüfer, Abnahmetests, Mutationstest; viele Nutzer mit Rechten/sensiblen Daten → Prüfung je Paket).
- `"besetzung"` in `.claude/dev-team.json` ist nur noch ein Mindestmaß: `bedarf` (Standard), `kunde`, `voll`; `solo` und `gemischt` wirken wie `bedarf`.
- Skill `auftrag` (Teamplan, Ablauf „Aufbau → Fertigstellung“ als Grundlage), Sitzungsstart, Vorlage, Designer/Reviewer-Steckbriefe, ANLEITUNG angepasst.

## 3.18.0 – Besetzung „Gemischt“: Team plant und testet, dann Solo

Anlass: Simon: „Der Teamleiter sollte auch eine Mischung aus Solo und Team machen können – für Planung und Tests ist das Team gut, danach kann er auf Solo laufen.“
- Neue Besetzung **Gemischt**: `architekt` (Entwurf), `kritiker` (Plan), bei Berechnungen `fachpruefer` (Plan), bei Oberfläche `designer` (Entwurf); vor dem Bauen schreibt der `tester` die verdeckten Abnahmetests. Danach baut der Projektleiter wie Solo (Schnellprüfung, Vorschau, Werkstatt), mit blindem Lauf der Abnahmetests je Abschnitt; Fertigstellung wie Solo.
- Der Projektleiter wählt Gemischt von selbst, wenn Planung oder Richtigkeit das Schwierige sind (Rechen-, Spielregeln, Datenmodell, Schnittstelle), das Bauen aber nicht. Simon kann jederzeit „ab jetzt Solo“ oder „ab jetzt Team“ sagen.
- Grundgesetz (Tabelle Besetzung), Skill `auftrag`, Vorlage `dev-team.json` und Sitzungsstart ergänzt.

## 3.17.2 – Gehirn auch in Cloud-Sitzungen

- Anlass: Simon arbeitet fast nur noch in Cloud-Sitzungen, dort war kein Gehirn eingetragen, also schrieb das Team seit Ende Oktober nichts mehr ins Gehirn. Der Sitzungsstart holt das Gehirn (`roelzer/brain`) in Cloud-Sitzungen jetzt selbst nach `~/roelz-brain`, trägt den Pfad in `~/.claude/CLAUDE.md` ein und lädt die Dev-Team-Lektionen. `gehirn.py` schreibt und pusht danach wie lokal. Ohne Zugriff (Claude-GitHub-App nicht auf `brain`) läuft die Sitzung unverändert weiter.
- Quelle für Tests umstellbar über `DEV_TEAM_GEHIRN_QUELLE`. 4 neue Tests.

## 3.17.1 – Video-Studio in neuen Projekten

- Projektvorlage schaltet das neue Plugin `video-studio` (KI-Videos mit Storyboard, Higgsfield, Kritiker) mit ein; bestehende Projekte bekommen es beim nächsten Abgleich der Einstellungen.

## 3.17.0 – Schnell aufbauen, robust fertigstellen, mit Wow-Effekt

Anlass: Simon hat einige Tage mit einem anderen Chat-Werkzeug gebaut und war „locker 10-mal schneller“. Beim Ausprobieren vieler Zwischenschritte war das Warten auf das volle Prüfprogramm nach jedem Feature mühsam. Seine Vorgabe: „Erst wenn das Produkt finalisiert wird, also das Grundgerüst mit Funktionen steht, soll das Testteam alles robust bauen.“ Dazu die fünf Leitfäden zum Wow-Effekt (Experience/Art/Motion Director, Reverse Engineering), die Simon mit Copilot erarbeitet hat, und sein Wunsch, fertige Werkzeuge und Bibliotheken aus dem Internet zu nutzen.

**Tempo (Solo)**
- **Zwei Phasen:** *Aufbau* – der Projektleiter baut das Grundgerüst mit allen Funktionen schnell, Tests nur für Kernlogik, nach jedem Feature die **Schnellprüfung** (`pruefe-tests.sh --rolle solo --schnell`: Diff-Regeln, Sicherheits- und Abhängigkeits-Schranke, dazu `schnelltestbefehl` – Sekunden statt Minuten, nie ein Grün-Nachweis). *Fertigstellung* – beginnt von selbst, sobald das Grundgerüst steht: `tester` Modus `haerten` (neu: Tests für jede Anforderung, Fall-Matrix, Ende-zu-Ende mit Konsolen-Wächter), ab dann volle Schranke, `reviewer`, `designer` mit Video, bei Risiko `sicherheitspruefer`, Feinschliff-Runde, Merge nach `main`. In der Aufbau-Phase kommt nichts nach `main`.
- **Vorschau:** sichtbare Änderungen kann Simon sofort ausprobieren (Entwicklungsserver, Port einmal melden), Arbeitsbranch nach jedem Feature gepusht.
- **Werkstatt:** kleine Änderungswünsche zwischendurch sofort umsetzen – Schnellprüfung, Commit, eine Zeile Antwort, kein Plan, kein Agent.
- Kunde und Voll bleiben streng (volle Schranke je Paket); Vorschau und Werkstatt gibt es dort auch, die Werkstatt mit voller Schranke.
- `schnelltestbefehl` in `.claude/dev-team.json` ist frei einstellbar (keine Freigabe nötig, weil er nie grün belegt). `--schnell` ist nur mit Rolle `solo` erlaubt.

**Wow-Effekt**
- **Designer = Gestaltungs-Verantwortlicher** für Optik, Bewegung und Gefühl: im Entwurf 2–3 Vorbilder mit abgeleiteten Prinzipien (Reverse Engineering, nie kopieren) und eine **Bewegungssprache** (Zeiten 100–250/250–500/500–1000 ms, Federn, Erfolgsmomente).
- **Prüfen mit Video:** Designer Modus `treue` nimmt die Hauptabläufe per Playwright als Video auf und bewertet sie (Rückmeldung bei jeder Aktion? harte Sprünge? Erfolgsmomente? „Würde man das Video teilen?“), dazu der **Screenshot-Test** (Produkt, wichtigste Aktion, Zustand sofort erkennbar).
- **Oberflächen-Standard** erweitert: Bewegung (Zweck je Animation, 60 FPS nur mit transform/opacity, reduzierte Bewegung), Rückmeldung, Erfolgsmomente, Spiele (PixiJS/Phaser/Three.js) und ein **Werkzeugkasten** mit geprüften Bibliotheken (Motion, GSAP, AutoAnimate, Magic UI, Aceternity UI, Sonner, Vaul, cmdk, Lottie, Rive, canvas-confetti, Lucide/Phosphor, Fontsource, Playwright, Lighthouse, axe-core) samt Regeln für Material aus dem Internet (gepflegt, Lizenz für Firmen, Abhängigkeits-Schranke, nichts zur Laufzeit nachladen).
- **Harte Prüfungen ohne KI:** Konsolen-Wächter für Ende-zu-Ende-Tests (Vorlage im Standard) und neues Skript `scripts/ohne_warnungen.py` (Build muss ohne Fehler **und** ohne Warnungen laufen; für `meilensteinbefehle`).
- **Feinschliff-Runde** am Ende der Fertigstellung (Solo) bzw. jedes Meilensteins (Kunde): Gastgeber und Designer nennen die 3 Stellen mit dem größten Wow-Potenzial, der Projektleiter setzt sie um.
- Nicht übernommen: „TypeScript bevorzugen“ als allgemeine Regel (Python-/VBA-Projekte); der Rest des „Agent Operating System“ stand schon im Grundgesetz.
- Tests: Schnellprüfung (grün ohne Nachweis, übersprungener Test und roter Schnelltest bleiben rot, nur Rolle solo, frei einstellbar), `ohne_warnungen.py`.

## 3.16.3 – Jeder Bau-Auftrag läuft bis zum Ende

Anlass: In `simfit` baute der Projektleiter den ersten lauffähigen Stand und fragte dann „Womit soll ich weitermachen?“. Simon hatte einfach beschrieben, was gebaut werden soll – ohne `/dev-team-auftrag`; damit gab es weder Startfreigabe noch Durchlauf-Marke, und der Projektleiter verhielt sich wie im Gespräch.
- Grundgesetz „Eigenständig bauen“: Jeder Bau-Auftrag ist ein Auftrag nach dem Skill `auftrag`, egal wie formuliert; Durchlauf-Marke sofort nach der Startfreigabe (bzw. bei Autopilot); fertig erst, wenn jede Anforderung gebaut, geprüft und zusammengeführt oder als „Nur Simon“/offene Frage dokumentiert ist; nie nach einem Teilstand fragen, womit es weitergeht.
- Skill `auftrag`, Solo: ausdrücklich bis alle Anforderungen fertig sind; naheliegende Pflichtpunkte aus den Projektregeln macht der Projektleiter einfach.
- Sitzungsstart nennt die Regel in jeder Sitzung.


## 3.16.2 – Still bleibt still, auch nach dem Sitzungswechsel

Anlass: In `ichkannalles` schrieb der Projektleiter nach dem Sitzungswechsel wieder viel in den Chat und legte Simon Freigabe-Zeilen zum Einfügen vor.
- **Durchlauf kommt automatisch zurück:** Eine neue Cloud-Sitzung hat einen neuen Container ohne `.dev-team/durchlauf`; der Projektleiter fiel in den Gesprächsmodus. Jetzt schaltet der Sitzungsstart den Durchlauf selbst wieder ein, wenn die Übergabe es sagt („Durchlauf: an“ oder „Durchlauf neu starten“). Der stille Modus gilt ab der Startfreigabe ohnehin, auch ohne Marke.
- **Alte Projektregel erkannt:** In der `CLAUDE.md` älterer Projekte stand aus der Vorlage „Freigaben, nur von Simon von Hand“ – Projektregeln gehen vor, also fragte der Projektleiter weiter Simon. Der Sitzungsstart meldet die Zeile, der Projektleiter ersetzt sie selbst.
- **Push-Mitteilung statt Chat:** Gibt es ein Werkzeug dafür, schickt der Projektleiter genau dann eine kurze Mitteilung, wenn Simon gebraucht wird oder der Auftrag fertig ist.
- Tests: Durchlauf aus der Übergabe (an / neu starten / aus / unausgefüllte Vorlage), alte Freigabe-Zeile.


## 3.16.1 – Oberflächen immer topmodern, auch in Solo

Anlass: Simon: „Meine Oberflächen sollen immer topmodern aussehen“ – in Solo fiel der Designer weg.

- **Oberflächen-Standard** `wissen/oberflaeche.md`: Technik-Grundlage (Tailwind + shadcn/ui bzw. shadcn-svelte, lucide-Symbole, shadcn-Charts/Tremor, Inter/Geist selbst gehostet), Gestaltungsregeln (Abstands-Skala, eine Akzentfarbe, Hell/Dunkel über Tokens, Radien, Zustände leer/lädt/Fehler, Dashboards, Handy, Barrierefreiheit), was nie vorkommt („KI-Look“) und eine Prüfliste mit Bildschirmfotos (1440/390 px, Dunkelmodus) nach jedem Feature. Wird nur gelesen, wenn eine Oberfläche gebaut wird – kostet sonst nichts.
- **Designer in Solo und Kunde:** einmal `entwurf` zu Beginn, `treue` je Abschnitt bzw. Meilenstein mit konkreter Mängelliste (statt je Paket).


## 3.16.0 – Drei Besetzungen: so viel Team wie nötig

Anlass: Simons Vergleich „SiRo habe ich an einem Nachmittag mit einem Chat gebaut, und jetzt reden wir über Tage?“ – am 30.09. entstanden in SiRo in rund zwei Stunden Anmeldung mit Rollen, Sicherung, Rechnungsprüfung, E-Rechnung und Einstellungen. Das Team brauchte in M7 für fünf Pakete 11,5 Stunden mit 87 Agentenläufen; den Großteil der Zeit und des Kontingents kostete Kontrolle, nicht das Bauen. Den wirksamsten Teil der Sicherheit liefern die Schranken ohne KI und ein unabhängiges Review je Abschnitt.

- **Besetzung Solo (Standard):** Der Projektleiter baut selbst, Feature für Feature mit Tests; nach jedem Feature die Test-Schranke mit der neuen Rolle `solo` (Code und neue Tests frei, geänderte bestehende Tests als Warnung, übersprungene oder leere Tests, Geheimnisse und gefährliche Muster weiter rot). Je Abschnitt ein `reviewer` (gesamt, mit Sicherheit und neuer Pflichtfrage 14 zu geänderten bestehenden Tests). Bei Risiko-Auslösern einmal der Sicherheitsprüfer mit Angriffsversuchen vor der ersten echten Nutzung.
- **Besetzung Kunde:** zusätzlich Architekt (Rückgrat, Sicherheits-Grundgerüst), Kritiker mit Bauplan-Probe, Fachprüfer bei Berechnungen, verdeckte Abnahmetests, je Meilenstein Tester, Reviewer, Sicherheitsprüfer parallel, vor der Übergabe Produktprüfer und Sicherheits-Tor. Gebaut wird vom Projektleiter; nur große, klar trennbare Teile von bis zu 3 Entwicklern parallel, ohne Prüfer je Paket. Keine Abwägungsrunde, kein Gastgeber, kein Langfrist-Architekt (auf Zuruf möglich).
- **Besetzung Voll:** der bisherige Ablauf mit Entwicklern je Paket und allen Prüfern – für hohes Risiko.
- Wahl nach Projekt und Risiko-Auslösern, in der Startfreigabe genannt; fest mit `"besetzung"` in `.claude/dev-team.json` (darf der Projektleiter ohne Freigabe setzen, ebenso `autopilot`). Der Sitzungsstart nennt die Besetzung.
- Grundgesetz: „Teamzwang“ wird „Besetzung“ + „Feste Rollen“ (wenn Agenten, dann nur die aus `team.json`); die Stufen gelten für die Besetzung Voll.
- Team-Tafel 0.3.1: „Gerade kein Agent – der Projektleiter arbeitet selbst“.
- Tests: Rolle `solo`, Besetzung selbst einstellen.


## 3.15.0 – Ein Stopp oder keiner: Simon muss sich nicht mehr um den Lauf kümmern

Anlass: Pilotnacht M7 in `ichkannalles` (03.11. 20:13 bis 04.11. 07:41: 87 Agentenstarts, davon 10 Klarstellungen des Architekten mitten im Bau, 18 Tester-Läufe für Vorarbeit und Umstellungen, 14 Sicherheitsprüfungen, nach jeder Fix-Runde Nachprüfung durch drei Prüfer, ab 23:20 nur noch ein Entwickler gleichzeitig) und Simons Vorgabe „Fehler und Umstände sollen im Team gelöst werden, ich hätte gern keine Stopps mehr“. Was die Nacht langsam machte: alles nacheinander (M7-3 und M7-4 hingen aneinander), sechs Klarstellungen des Architekten mitten im Bau, Fertigmeldungen zurückgewiesen wegen fehlender Freigaben, fertige Pakete nur im Container, Fragen an Simon, deren Text nirgends stand.

- **Ein Stopp statt drei:** Stopp 1 entfällt; Anforderungen, Verständnisfragen, Plan, Entscheidungen und alle nötigen Freigaben kommen in **einer Startfreigabe**. Stufe Klein läuft ohne Rückfrage. Harte Stopps halten nur das betroffene Paket an, der Rest läuft weiter.
- **Autopilot (ganz ohne Stopp):** „Autopilot“ beim Auftrag oder `"autopilot": true` in `.claude/dev-team.json`. Entscheidungen nach Empfehlung (im Abschlussbericht zum Prüfen), unbestätigte Fachregeln als „vorläufig“ gekennzeichnet, was nur Simon darf (bestehende Abnahmetests ändern, veröffentlichen, Geld, Daten löschen), wird gebaut, geprüft und geparkt statt gewartet.
- **Technische Freigaben ohne Simon** (Simon: „von Abnahmetests habe ich keine Ahnung, das kann er machen“): Einen bestehenden Abnahmetest an eine geänderte Anforderung anpassen, Format-/Altdaten, Testeinstellungen – das prüft ein frischer `kritiker` im neuen Modus `freigabe` (verlangt eine Anforderung genau diese Änderung? ist der neue Test mindestens so streng? ist die Geltung eng? ist es wirklich nicht fachlich?), bei 🟢 trägt der Projektleiter die Zeile ein. Der Bedarf wird vor dem Bau ermittelt und in einem Auftrag geprüft; mitten im Lauf sofort. Fachliche Sollwerte und Fachregeln bestätigt weiterhin nur Simon (Autopilot: als „vorläufig“ gebaut).
- **Merge nach `main` durch den Projektleiter** (Simon: „ich klicke sowieso immer auf Merge“): am Auftragsende, wenn alles belegt grün ist; liefert `main` automatisch aus, zusätzlich das Sicherheits-Tor. Per Pull Request mit dem Abschlussbericht als Beschreibung. Die Sperrregel `git push origin main` entfällt (wird aus bestehenden Projekten entfernt), Force-Push bleibt gesperrt.
- **Nachprüfen nur, wer Befunde hatte:** Nach einer Fix-Runde prüft der Reviewer alle Befunde mittel/niedrig mit; Designer und Sicherheitsprüfer prüfen nur bei eigenen Befunden „kritisch“/„hoch“ selbst nach. In M7 liefen nach jeder Fix-Runde drei Prüfer erneut.
- **Bauplan-Probe:** Der Kritiker liest jeden Bauplan, als müsste er ihn allein bauen, und listet alle Rückfragen je Paket (Pflichtfrage 9); der Architekt beantwortet sie in einer Runde vor der Startfreigabe. Eine Rückfrage mitten im Bau ist ein Befund gegen den Bauplan.
- **Schnittstelle zuerst:** Abhängige Pakete laufen parallel gegen einen vorab festgelegten Vertrag (Typen, Signaturen, Formate); der Plan nennt den kritischen Pfad, läuft mehr als die Hälfte nacheinander, wird neu geschnitten (Architekt; Kritiker Pflichtfrage 10).
- **Fragen nur ausgeschrieben:** Jede Frage an Simon steht vollständig in `docs/OFFENE_FRAGEN.md` (neue Vorlage: Fragen, Freigaben als fertige Zeilen, „Nur Simon“-Liste mit Anleitung). Ein Verweis auf nicht Ausgeschriebenes gilt als nicht gestellt. Die „Nur Simon“-Liste hält den Lauf nie an.
- **Projekteinstellungen selbst aktuell:** Meldet der Sitzungsstart veraltete Projekteinstellungen, bringt der Projektleiter den Dev-Team-Teil selbst auf den Stand (`settings_zusammenfuehren.py`, eigene Einträge bleiben) und sagt es Simon in einer Zeile.
- **Team-Tafel 0.3.0:** zählt „Nur Simon“-Punkte getrennt von Fragen (eigene, ruhige Karte); Vorlagenzeilen zählen nicht.


## 3.14.1 – Rest aus dem Pilot M3–M7

Was aus dem früheren Umbau (PR #8) auf `main` noch fehlte; der Rest steckt schon in 3.13/3.14.

- **Entwickler: Opus für `mittel` und `schwer`**, Sonnet nur für `einfach` – Ergebnis des Versuchs aus 3.12 (Pilot M3–M6: Opus 0–1 Nachbesserungsrunde je Paket, Sonnet 1–2). Standardmodell im Steckbrief jetzt Opus.
- **Designer nach Risiko:** reine Oberflächen-Pakete ohne Daten- oder Eingaberisiko sieht er einmal gesammelt am Meilenstein-Ende statt je Paket.
- **Kleiner Folge-Meilenstein:** eine gemeinsame Gesamtprüfung statt zwei.
- **Merge-Schranke rot nur durch Zeitüberschreitung:** einmal ohne parallele Testläufe wiederholen, flackernde Tests an den Tester.
- **Cloud:** fertig geprüfte Paketstände, die auf eine Freigabe warten, als `dev-team/zwischenstand-<paket>` pushen statt nur im Container (M7: fünf fertige Pakete lagen über Nacht nur lokal); entfernte Branches löscht nur Simon.
- **fehlerprobe.py** nennt bei „UNGÜLTIG“ die Zeile mit dem Ladefehler.
- **Lektionen** (Rückfall-Datei): Gleitkomma-Grenzwerte, Gegenprobe-Suchtext, userEvent mit Fake-Timern, Sichtprüfung von Überlagerungen.

## 3.14.0 – Sicherheit: einfache Lücken kommen nicht mehr durch

Anlass: Simons Vorgabe „man darf sich nicht durch einfache Lücken hacken lassen – gerade bei Kundenprojekten“ und seine Liste der zwölf häufigsten Schwachstellen bei KI-Entwicklung. Bisher hing Sicherheit vollständig am Urteil des Sicherheitsprüfers und des Reviewers; es gab keine technische Sperre im Projektcode, keine Regel für den Browser-Code und keine echten Angriffsversuche.

- **Sicherheits-Schranke** (`scripts/pruefe_sicherheit.py`, ohne Zusatzpakete und ohne Netz), läuft in der Test-Schranke bei jedem Paket und Merge für jede Rolle:
  - Schlüssel bekannter Anbieter (AWS, GitHub, Stripe, Google, OpenAI, Anthropic, Slack, SendGrid, Azure) und private Schlüssel – ohne Ausnahme, mit Hinweis „beim Anbieter sperren und neu erzeugen“; feste Passwörter/Schlüssel im Code; Zugangsdaten in Adressen; versionierte `.env`-, Schlüssel- und Zertifikatsdateien. Gefundene Werte werden nie ausgegeben.
  - **Browser-Code:** Variablen mit `VITE_`, `NEXT_PUBLIC_`, `REACT_APP_`, `PUBLIC_` usw., deren Name nach Geheimnis klingt (öffentliche wie `…PUBLISHABLE_KEY`/`…ANON_KEY` ausgenommen).
  - **Gefährliche Muster:** zusammengesetztes SQL, Shell mit eingesetzten Werten, Pfad/Adresse/Weiterleitung aus der Anfrage (Path Traversal, SSRF, Open Redirect), Anfrage-Daten ungefiltert ins Datenmodell, `innerHTML`/`eval`, verschluckte Fehler, interne Fehlerdetails an Nutzer, schwache Verfahren für Passwörter/Zufallswerte, JWT ohne Signatur, abgeschaltete Zertifikatsprüfung, CORS „*“, unsichere Deserialisierung, Debug an, Anmeldedaten im Browser-Speicher. Bewusste Ausnahme nur mit `dev-team: sicher – <Grund>` in der Zeile (Warnung, wird einzeln bewertet).
  - Am Meilenstein: ausgelieferter Build (Schlüssel und Werte aus der lokalen `.env` im Browser-Code, Quellkarten) und der Scanner für Lücken in Abhängigkeiten (`sicherheitsbefehl`, ohne Netz „nicht geprüft“ statt rot). Vor der Übergabe die ganze Git-Historie.
  - Unterlagen und Entwürfe (`docs/`, `design/`) nur auf Geheimnisse geprüft. Am Stand von `ichkannalles` nachgeprüft: drei Stellen zum Bewerten, keine Geheimnisse.
- **Sicherheitsprüfer:** neuer Modus `angriff` – einfache Angriffe gegen die lokal laufende Anwendung wirklich ausprobieren (fremde ID, ohne Anmeldung, Injection, XSS, Pfade/interne Adressen, Massenanmeldung, große Eingaben, Fehlerseiten, Header, Cookies, Browser-Code), mit Beleg. Pflichtfragen 9–12 (Werkzeuge selbst ausgeführt, Browser-Code, Gleichzeitigkeit/Fehler/Backup, Angriffsversuche). Läuft am Meilenstein und vor jeder Übergabe.
- **Tester:** Pflicht-Fälle Sicherheit und Fehler (fremde Daten, ohne Anmeldung, bösartige Eingaben, gleichzeitige Änderung, Fehlschlag, doppelt absenden) und eine Fall-Matrix je Anforderung.
- **Architekt:** Sicherheits-Grundgerüst bei jedem Risiko-Auslöser (Geheimnisse nur auf dem Server, Berechtigung an einer Stelle mit Architekturtest, Eingaben an der Grenze, Fehler-Konvention, Gleichzeitigkeit, bewährte Anmeldung, Sicherheits-Header, Sicherheits-Linter und Scanner, Backup, signierte Updates).
- **Reviewer:** Pflichtfrage 8 prüft Sicherheits-Schranke, jede `dev-team: sicher`-Stelle und für jede neue Operation Berechtigung plus Test mit fremder ID.
- **Übergabe:** Sicherheits-Tor (Schranke mit Historie und Build, Scanner, Angriffsversuche ohne „kritisch“/„hoch“); Betriebs-Checkliste mit getesteter Wiederherstellung für jede Anwendung mit Daten.
- **Checkliste `sicherheit`:** Übersicht „Die häufigsten Schwachstellen und wer sie abfängt“ – alle zwölf Punkte aus Simons Liste plus weitere, je mit technischer Prüfung und Besitzer (liegt in der Checkliste, die der Sicherheitsprüfer liest; im Grundgesetz nur die Kernregeln, damit nicht jede Sitzung die ganze Tabelle lädt). Grundgesetz: Befunde „kritisch“/„hoch“ werden nie zurückgestellt. Neue Risiko-Auslöser: mehrere Nutzer an denselben Daten, Daten von außen (Upload/Import), Zahlungen, externe Dienste. Checkliste `sicherheit` mit Mindeststandard für Kundenprojekte.
- **Gegenfrage (Simons Vorgabe „ist harmloser Code wirklich harmlos?“):** Jedes „harmlos“, „entfällt“ oder „✅“ bei einer Sicherheitsfrage braucht Angriffsweg, Grund, warum er scheitert, und Beleg – sonst „nicht geprüft“. Entwickler: Selbstprüfung Punkt 9 für jede Stelle mit Daten von außen. Reviewer: versucht jede Warnung und jede Ausnahme selbst auszunutzen; gelingt ein plausibler Angriffsweg, ist es „hoch“. Sicherheitsprüfer: Pflichtfrage 13. Wer eine Ausnahme schreibt, bewertet sie nie selbst.
- **Intern heißt nicht sicher:** auch bei Anwendungen nur im Firmennetz Rechte, Injection, Geheimnisse, Fehler, Gleichzeitigkeit und Backup voll; nur Header, Massenanmeldung und externer Penetrationstest entfallen. Der Plan nennt den Einsatz (intern/öffentlich).
- **Nach unabhängiger Prüfung neu kalibriert:** Rot nur noch, was fast sicher falsch ist; Unscharfes (Mass Assignment, verschluckte Fehler, Browser-Speicher, CORS, Deserialisierung, Fehlertexte an Nutzer, schwache Hashes) ist eine Warnung, die der Reviewer einzeln bewertet – sonst hätte harmloser Alltagscode (Speicher-Schutz mit `catch {}`, Firebase-Schlüssel, „Select … from“ in UI-Texten, `innerHTML = ""`) den Lauf blockiert. Gemessen an rund 200 typischen Fällen: von 103 gefährlichen werden 82 gefunden (51 rot, 31 Warnung); die übrigen sind fast alle Datenflüsse über mehrere Zeilen, die kein Muster sieht (dafür Tests und Angriffsversuche). Von 72 harmlosen bleiben 59 frei, 11 werden Warnung, 2 rot (beide vertretbar). Außerdem: feste Schlüssel als Rückfallwert (`process.env.X || "…"`), Namen wie `SECRET_KEY`/`dbPassword`/`token`/`…Key`, Browser-Variablen auf `_KEY`, mehrzeiliges SQL, Shell über `spawn('sh', ['-c', …])`, Dateinamen mit Umlauten oder Leerzeichen, große oder binäre Dateien (kein Hängen mehr), `npm audit` mit Lücken wird nie als „kein Netz“ gedeutet, Entwickler-Werkzeuge (`scripts/`, `tools/`) nur Warnung, ausgetauschte Schlüssel in der Historie über `docs/SCHLUESSEL_GETAUSCHT.md` quittierbar, veralteter Build-Ordner wird nicht geprüft statt falsch.
- **Stiller Durchlauf und Team-Tafel:** Während eines freigegebenen Auftrags schreibt der Projektleiter nichts mehr in den Chat (keine Zeilen vor/nach Agenten, keine Zwischen- oder Meilensteinberichte) – nur bei festen Stopps, auf Simons Frage (kurz) und wenn er etwas braucht, das nur Simon kann. Den Stand zeigt die **Team-Tafel** (`dev-team-tafel` 0.2.0, neu gestaltet: Kopf mit farbigem Zustand „Läuft / Offene Punkte / Braucht dich / Bereit“, Hinweiskarte für Entscheidungen, Fortschrittsbalken, Abschnitte mit Laufzeiten rechtsbündig) neben dem Chat: neu mit „🔴 Braucht dich“ und offenen Fragen ganz oben, dem Stand-Kasten aus `docs/STATUS.md`, Durchlauf aktiv ja/nein, Kurzzeile in der Statusleiste; findet jetzt auch `docs/status.md` (in der Cloud zählt die Schreibweise). Die Projekteinstellungen schalten die Tafel ein.
- **Warten ohne Text, Durchlauf-Wächter repariert:** Wartet der Projektleiter auf Agenten, endet seine Runde ohne jeden Text (kein „Ruhig weiter“, kein Status-Link). Der Durchlauf-Wächter zählte ein Agentenende je Meldung – ein Agent, den die Fertig-Prüfung zurückschickt, endet aber mehrmals. Dann galt „niemand läuft mehr“, der Projektleiter wurde aufgescheucht und schrieb jedes Mal eine Zeile (gesehen in `ichkannalles`). Jetzt zählt jedes Agentenende je Kennung einmal (letzte 4 Stunden); ein seit 45 Minuten stiller offener Start gilt als hängen geblieben.
- **Schlankerer Ablauf** (aus dem Agenten-Protokoll von `ichkannalles`, rund 450 Läufe): Sicherheitsprüfer je Paket nur bei Risiko-Auslöser im Bauplan (in M6 waren es sechs Einzelläufe), Code- und Angriffsprüfung in einem Lauf, Tester-Vorarbeit für eine Paketgruppe in einem Auftrag, blinder Lauf der verdeckten Tests nie über einen Agenten, Architekt plant so, dass Vorarbeit selten nötig ist. Grundgesetz um rund 4.300 Zeichen kürzer als im ersten 3.14-Stand.
- Tests: `tests/test_sicherheit.py` (Anbieter-Schlüssel ohne Ausnahme, Platzhalter, Browser-Variablen, Muster JS und Python, Ausnahme mit Begründung, Tests und Unterlagen, versionierte `.env`, Build mit Server-Geheimnis, Historie, Schranke sperrt jede Rolle).


## 3.13.0 – Vollautomatisch: voller Kontext und Freigaben halten den Lauf nicht mehr an

Anlass: Simons Vorgaben „das Team soll eigenständig alles fertig bringen“ und „nicht noch 20 Verbesserungsrunden“. Ausgewertet: die Lektionsvorschläge aus `ichkannalles` (Meilensteine M3–M6), die Freigabe-Zeilen, die Simon von Hand eintragen musste (vier in drei Tagen, zuletzt `m6-referenz-format`, das wegen „ordner/“ statt „ordner/**“ zusätzlich nicht griff), und die Doku von Claude Code zu Zusammenfassung, Hooks und Agenten.

**Voller Kontext – automatisch weiter**
- `autoCompactWindow: 400000` in den Projekteinstellungen: Claude Code fasst bei 400.000 statt rund 967.000 Tokens zusammen (1-Mio-Modelle). Jeder Schritt liest den ganzen Kontext neu, sehr lange Kontexte machen ungenauer; der Stand liegt ohnehin in Dateien. Eigener Wert eines Projekts bleibt.
- **Kontext-Wächter** (`scripts/kontext.sh`, Bash mit tail/grep, rund 20 ms) misst die echte Kontextgröße (letzte Token-Abrechnung im Sitzungsprotokoll). Projektleiter: ab 70 % „STATUS aktuell halten“, ab 85 % „jetzt `docs/SITZUNGSUEBERGABE.md` schreiben (neue Vorlage), committen, weiterarbeiten“. Kein Stopp, keine Frage an Simon.
- Nach dem Zusammenfassen (SessionStart, Quelle `compact`) lädt der Sitzungsstart Grundgesetz und Übergabe wieder; der Durchlauf bleibt an. In einer neuen Sitzung genauso.
- Agenten: eigene Grenze 200.000 (`kontext_grenze_agent`). Wer sie erreicht, schließt sauber ab (BLOCKIERT „Kontext voll“), ein frischer Agent macht weiter – zählt nicht als Fix-Runde.

**Keine Handstopps mehr für Routine-Freigaben**
- **Prüfsummen der Abnahmetests werden nur ergänzt:** neue Abnahmetests eines Meilensteins kommen ohne Freigabe dazu. Vorher ersetzte `abnahme_pruefsummen.py --schreiben` die Liste und verlangte deshalb bei jedem Meilenstein eine Freigabe (und jede Schranke danach `--freigabe cockpit-welle3`). Ein versionierter Eintrag ändert sich weiter nie ohne Simon; eine freigegebene Änderung wird in der Liste vermerkt und danach ohne erneute Freigabe anerkannt.
- **Neue Referenzdateien legt der Tester an** (eingefrorene Altdaten, unabhängig hergeleitete Werte, `LIESMICH.md` mit Herkunft). Nur bestehende Referenzwerte ändern/löschen braucht Simon.
- **Einstellungen verschärfen ohne Freigabe:** Prüfbefehle in `zusatzbefehle`/`meilensteinbefehle` ergänzen (z. B. den Pflicht-Mutationstest der Fachsoftware) und Kontextgrenzen setzen. Testbefehl, Zählmuster, Setup, `plugin_stand` und Entfernen bleiben freigabepflichtig.
- Freigaben: ein Ordner in der Geltung (`tests/referenz/x/` oder `tests/referenz/x`) deckt alle Dateien darin; mehrere Stichwörter mit `--freigabe a,b` oder mehrfach `--freigabe`.
- Grundgesetz: **Simon nur fragen, was nur Simon kann** (Produkt-/Fachentscheidungen, Konten/Geräte/Zahlungen, geänderte bestehende Referenzwerte oder Abnahmetests, Unumkehrbares). Alles andere entscheidet der Projektleiter nach Empfehlung des zuständigen Agenten und informiert.

**Reibung aus dem Pilot beseitigt**
- **Tester- und Architekt-Vorarbeit** auf dem Paketzweig (Commit-Betreff `Tester-Vorarbeit P3: …` / `Architekt-Vorarbeit P3: …`): Die Schranke rechnet sie nicht dem Entwickler zu, solange er die Dateien danach nicht ändert; Vorarbeit mit Programmcode ist rot. Vorher: rote Vorarbeit auf dem Arbeitsbranch blockierte parallele Pakete, und Vorarbeit im Entwickler-Worktree galt als Entwickler-Verstoß (M6-1/M6-2/M6-3/M6-4). Entwickler: Tests der Vorarbeit dürfen am Startpunkt rot sein. Architekt: Bauplan hat einen eigenen Punkt „Vorarbeit“. Tester: Modus `vorarbeit`.
- Entwickler dürfen Anleitungen und Hilfetexte unter `docs/` schreiben, die der Bauplan nennt (neuer Bereich `doku`); die Prozessdateien des Projektleiters bleiben gesperrt.
- **Wächter:** `npm ci`/`npm install` (auch pnpm/yarn) in einem Worktree mit verknüpftem `node_modules` ist für alle Rollen gesperrt – leerte im Pilot den Hauptordner. Reines Bash, kein Programmstart.
- **Prüfberichte:** Berichte, die ein Agent über SubagentHandback abgibt, landen vollständig in `docs/pruefberichte/` (vorher nur „Bericht übergeben.“).
- Projektleiter committet eigene Dateien nur mit ausdrücklichen Pfaden.

**Abgesichert nach unabhängiger Prüfung des Umbaus** (frischer Prüf-Agent, 12 Befunde, alle eingearbeitet)
- Vorarbeit zählt nur, wenn der Projektleiter den Commit unter `.dev-team/vorarbeit/<Hash>` einträgt (für Entwickler gesperrt) – der Betreff allein konnte vom Entwickler selbst geschrieben werden.
- Prüfsummen-Einträge verschwinden nie; eine Freigabe für einen geänderten Abnahmetest muss die Liste **und** genau diesen Test nennen und steht bei jeder Schranke im Testnachweis. Vermerk-Format erlaubt Leerzeichen im Testnamen.
- Bereich `doku` nur für Markdown (`docs/**/*.md`) – Testdateien unter `docs/` bleiben geschützt.
- Entwickler dürfen `.claude/dev-team.json` nie ändern (auch nicht „verschärfen“); ein ergänzter Mutationstest zählt nur mit echtem Aufruf und Schwelle ≥ 60.
- Kontext-Wächter: Modelle mit 200.000er Fenster werden am Modellnamen erkannt; ab Stufe 1 wird bei jedem Aufruf gemessen; nur Antworten des Modells zählen (nicht Abrechnungen in Werkzeugergebnissen).
- Jeder feste Stopp entfernt auch die Übergabe – sonst schaltete eine neue Sitzung den Durchlauf wieder ein.
- Wächter: `yarn test`/`yarn build` bleiben erlaubt; `cd <worktree> && npm ci` und Befehle mit Anführungszeichen werden erkannt.

**Umstieg bestehender Projekte (einmalig, ohne Simon):** Meldet die Schranke „Eintrag … fehlt“, führt der Projektleiter `abnahme_pruefsummen.py --schreiben` aus – das nimmt die Einträge wieder auf, die ältere Versionen beim Neuschreiben entfernt hatten. Wurde ein aufgedeckter Test früher mit Freigabe geändert, mit `--freigabe <dieses Stichwort>` (am Stand von `ichkannalles` geprüft: `--freigabe m5-format-v3`, danach grün).

**Geprüft und bewusst nicht gemacht**
- Skills fest in Agenten laden (`skills:` im Steckbrief): Die Dev-Team-Skills sind Abläufe für den Projektleiter; ihr voller Text käme bei jedem Agentenstart mit (Tokens) und würde Agenten Projektleiter-Schritte vorgeben. Die einzige Checkliste für einen Agenten (`sicherheit`) bekommt der Sicherheitsprüfer schon als Datei.
- `effort`/`color`/`memory` je Agent: kein messbarer Nutzen gegenüber den Modellregeln, `memory` würde projektübergreifend Wissen am Gehirn vorbei sammeln.

**Einmal je Projekt:** `/dev-team:projekt-aufnehmen` (bringt `autoCompactWindow` und die Hooks des Kontext-Wächters; der Sitzungsstart erinnert).

Tests: Kontext-Wächter (Stufen, Grenzen aus Einstellungen/Projekt, Agenten-Protokoll, Zurücksetzen, Sitzungsstart nach `compact`), Prüfsummen nur ergänzen inkl. Vermerk, Ordner-Freigabe und mehrere Stichwörter, neue Referenzdateien durch den Tester, Vorarbeit (erkannt / danach geändert / mit Programmcode), Anleitungen unter `docs/`, Einstellungen verschärfen, Handback-Bericht, `npm ci` im verknüpften Worktree.

## 3.12.0 – Schneller ohne Qualitätsverlust: Durchlauf, eine Prüfrunde, Selbstprüfung, ehrliche Gegenproben

Anlass: Auswertung von Meilenstein 2 in `ichkannalles` (30.10.2026). Fast jedes Paket brauchte 1–2 Nachbesserungsrunden für dieselben Punkte; Gegenproben meldeten in Node-Projekten immer „ERKANNT“; viele Berichte in `docs/pruefberichte/` enthielten nur die Kopfzeile. Simons Vorgabe: „Effizienz ohne Qualitätsverlust – bau das so um.“

Messung im Pilot (Agenten-Log 28.–30.10.): Simon musste rund 80-mal „mach weiter“ und rund 25-mal „wie weit bist du / Link zum Stand“ schreiben – der Lauf stand jedes Mal, bis er sich meldete. Das war der größte Zeitfresser, vor den Nachbesserungsrunden (28 in Meilenstein 2).

- **Durchlauf-Wächter** (`scripts/durchlauf.sh`, Stop-Hook): Nach Simons Freigabe legt der Projektleiter `.dev-team/durchlauf` an. Will er ohne festen Stopp anhalten, schickt ihn der Hook einmal zurück an die Arbeit; laufen Agenten im Hintergrund (Starts minus Enden in `kennzahlen.jsonl`), darf er warten. Vor Stopp 3 oder einem harten Stopp löscht er die Datei. Regeln „Durchlaufen ohne Leerlauf“ im Skill `auftrag`, eine Zeile im Grundgesetz.
- **Stand ohne Nachfragen:** Kasten „Jetzt / Zuletzt fertig / Als Nächstes / Geschätzt fertig / Fortschritt“ oben in `docs/STATUS.md`, jede Nachricht an Simon endet mit dem Link. In Cloud-Sitzungen wird der Arbeitsbranch nach jedem Merge gepusht.
- **Eine Prüfrunde je Paket:** Reviewer und Designer prüfen gleichzeitig, der Projektleiter führt die Befunde zu einer Liste zusammen, der Entwickler bessert einmal nach.
- **Kein doppelter Ausgangslauf:** Die grüne Schranke im Hauptordner hinterlegt `.dev-team/gruen/<commit>`; `worktree_vorbereiten.py` meldet dann „AUSGANGSLAGE BELEGT GRÜN“ und der Entwickler spart sich einen vollen Testlauf je Paket.
- **Verdeckte Tests in der Cloud gesichert** (`scripts/verdeckt_sichern.py`): eigener Branch `dev-team-verdeckt` (eigener Index, Arbeitsordner unberührt, nie zusammengeführt); der Sitzungsstart holt sie in einer neuen Cloud-Sitzung zurück und prüft die Prüfsummen. Der Wächter sperrt den Branch für Entwickler.
- **Veraltete Projekteinstellungen werden erkannt** (alter Wächter mit `onFailure: block`/ConfigChange, fehlende Startmarke, fehlender Durchlauf-Wächter) – in `ichkannalles` lief deshalb vor jedem Werkzeugaufruf der alte Wächter bis zu 60 s, und die Laufzeitmessung fehlte (2 Startmarken auf über 140 Agentenläufe).
- **Versuch Opus für mittlere Pakete:** abwechselnd Sonnet/Opus, Auswertung der Nachbesserungsrunden im Meilenstein-Bericht.
- **Selbstprüfung vor dem Review** (Steckbrief `entwickler`, Pflichtfrage 10): Plan-Treue, Gegenproben, Grenzfälle, Sichtprüfung bei allem Sichtbaren, keine Duplikate, Texte und Werte mit Herkunft, bestehende Tests nicht ändern, Schranke. Je Punkt erledigt / nicht zutreffend / Grund im Bericht. Eine projekt-eigene `docs/SELBSTPRUEFUNG.md` gilt zusätzlich. Der `reviewer` prüft sie stichprobenartig nach (wiederholt Gegenproben, sieht Bildschirmfotos an; Pflichtfrage 13).
- **`fehlerprobe.py` repariert:** `node_modules` wird aus Worktree bzw. Hauptordner verknüpft statt weggelassen (vorher scheiterte jeder Lauf am Import und galt als „ERKANNT“). Neu: Leerlauf ohne Ersetzung muss grün sein; rot nur wegen Lade- oder Syntaxfehler ergibt „UNGÜLTIG“ (Exit 2) statt eines Treffers; `--befehl` für einen schnellen Lauf nur der passenden Testdateien; Zeitgrenze wird sauber gemeldet. Ersetzt das projekt-eigene `gegenprobe.sh` aus dem Pilot.
- **Vollständige Berichte:** `agenten-log.sh` und die Fertig-Prüfung lesen den Bericht aus dem Agenten-Protokoll (`agent_transcript_path`), wenn `last_assistant_message` leer ist (Hintergrund-Agenten). Ereignisse ohne Agententyp (in Cloud-Sitzungen kam dort Simons Chatnachricht an, „? | mach weiter“) werden nicht mehr protokolliert. Neues Hilfsskript `scripts/letzte_nachricht.py`. Damit greift die Fertig-Prüfung der Entwickler auch bei Hintergrund-Agenten wieder.
- **Auftrag:** Bauplan-Änderungen an bestehenden Tests sind Tester-Vorarbeit in einem eigenen Commit vor der Paketvergabe; neue Testfälle als neue Testdatei. Jeder Entwickler-Auftrag nennt die Selbstprüfung; Aufträge klein und klar begrenzt.
- **Abhängigkeits-Schranke stürzt nicht mehr ab** bei Manifesten, die nicht UTF-8 sind (UTF-16 aus `pip freeze >` in der PowerShell, cp1252): vorher `UnicodeDecodeError`, die Schranke lief gar nicht. UTF-16 wird erkannt und richtig gelesen.
- **Test-Schranke:** Fachregeln unter „Vorgeschlagen (… noch nicht bestätigt)“ zählen nicht mehr als bestätigt (das Wort „bestätigt“ in der Überschrift löste einen Fehlalarm in der Abschluss-Schranke aus). Bestätigt ist nur ein Abschnitt, dessen Überschrift mit „Bestätigt“ beginnt, oder eine Zeile mit Spalte „bestätigt“.
- **Test-Schranke, parallele Pakete:** Der Vergleich „weniger bestandene Tests als beim letzten grünen Lauf“ gilt nur noch, wenn der gemerkte Stand ein Vorgänger des geprüften ist. Vorher blockierte ein gemergtes Nachbarpaket (mit neuen Tests) jedes parallel gestartete Paket (Pilot: M3-1 blockierte M3-2).
- **Lektionen** (Rückfall-Datei): Selbstprüfung, Tester-Vorarbeit als eigener Commit, gültige Gegenprobe.
- Tests: `tests/test_bericht.py` neu, drei neue Fehlerprobe-Tests, je ein Test für Nicht-UTF-8-Manifeste und vorgeschlagene Fachregeln, `tests/test_durchlauf.py` (Durchlauf-Wächter, Sicherung der verdeckten Tests), Grün-Nachweis und Ausgangslage.

## 3.11.0 – Minimaler Wächter, Team ohne Selbstblockade

Anlass: Pilot „Unöder Haus“ (28./29.10.2026) und eine Cloud-Sitzung in `ichkannalles`, die sogar `git push` nicht mehr ausführen durfte. Der alte Wächter (1.500 Zeilen Python, vor jedem Werkzeugaufruf) blockierte bei Last alles, sperrte normale Arbeit (App starten, Browser, npx, Speicherorte) und legte ganze Läufe lahm. Simons Vorgabe: Das Team soll Vorteile bringen – der Wächter so minimal wie möglich.

- **Wächter neu, reines Bash, ohne Python** (`scripts/waechter.sh`). Er prüft nur noch, und nur bei Entwickler und Tester:
  1. Entwickler und Tester reden nicht miteinander (keine Agenten starten, keine Nachrichten).
  2. Der Entwickler ändert keine bestehenden Tests, Testkonfigurationen oder Referenzwerte (neue anlegen und weiter bearbeiten darf er) und rührt die verdeckten Tests unter `.dev-team/` nicht an.
  Für jeden anderen Aufruf endet er sofort ohne weiteres Programm. Kann er nicht laufen, wird nichts blockiert (kein `onFailure: block`).
- **Entfernt:** Erlaubnislisten, Schreibrechte je Rolle als Sperre, Teamzwang-Sperren (eingebaute Helfer, Workflow, unbekannte Werkzeuge, Modellwahl), Shell-Analyse, Schutzschalter und Einstellungsschutz (ConfigChange-Hook), verwaltete Einstellung, Einstellungs-Stolperdraht in der Test-Schranke, Totalsperre in Cloud-Sitzungen ohne Plugin, Sperre `git push origin main*` (traf auch Branches wie `main-1tg5m0`). Das sind jetzt Regeln im Grundgesetz und sichtbar im Agenten-Protokoll.
- **Bleibt ohne zu bremsen:** Test-Schranke (erkennt geänderte Tests/Referenzwerte auch über die Shell), Prüfsummen und blinder Lauf der verdeckten Tests, Fertig-Prüfung der Entwickler, Sperrregeln in den Einstellungen für Force-Push, Push auf main und Geheimnisse.
- **Projekt-Aufnahme räumt auf:** `settings_zusammenfuehren.py` entfernt die alten Sperren und Hooks aus bestehenden Projekten.
- **Worktrees:** `worktree.baseRef: head` auch in den Benutzereinstellungen; `scripts/worktree_vorbereiten.py` übernimmt `node_modules` aus dem Hauptordner (gleiche Lockdatei), statt je Paket `npm ci`; `--trennen` vor neuer Abhängigkeit, `--nur-trennen` vor dem Aufräumen.
- **Auftrag ohne Leerlauf:** Aufnahme-Prüfung als Allererstes; höchstens 5 Pakete je Meilenstein, kein Stopp zwischen Meilensteinen (Simons Freigabe gilt für den Plan); kein einzelnes Vorab-Paket; Testkonfiguration über den Tester; neue Abhängigkeit mit grüner Schranke ist kein harter Stopp; Dev-Server im Hintergrund.
- **Versionswarnung** bei automatischem Update mitten im Auftrag; Hinweis auf alte Projekt-Hooks beim Sitzungsstart.
- **Reibungstests** (`tests/test_reibung.py`): ganzer Auftrag mit allen Rollen nachgespielt; nur die zwei Regeln dürfen sperren.

## 3.10.0 – Jede Frage hat einen Besitzer

- **Grundgesetz „Wer prüft was“:** Sicherheit/Betrieb → Sicherheitsprüfer, Komplexität → Pragmatiker, Struktur → Architekt/Reviewer, Testqualität → Tester, Fachliches → Fachprüfer, Plan → Kritiker.
- **Kritiker:** nur noch 8 Pflichtfragen (Sicherheit, Betrieb und Komplexität entfallen, sie gehören den Besitzern). Reviewer prüft Sicherheitsmuster nur grob.
- **Abwägungsrunde:** einmalige Aussprache bei Widersprüchen, jeder sieht die Urteile der anderen und antwortet kurz.
- **Rückfragen** (Entwickler → Architekt u. a.) beantwortet der Projektleiter sofort im selben Schritt.
- Entwickler und Tester sowie die prüfenden Rollen untereinander reden weiterhin nie direkt.

## 3.9.1 – Lücken fallen auf

- **Fehlerbehebung Wächter:** Das Werkzeug `SubagentHandback` (Berichtsrückgabe nur lesender Agenten) war gesperrt, dadurch kamen die Urteile von Kritiker und Abwägungsrunde nicht beim Projektleiter an und der Auftrag blieb stehen. Es steht jetzt in der festen Liste harmloser Werkzeuge, mit Test. Ein Eintrag in `team.json` ist nicht mehr nötig.
- **Sicherheitsprüfer** läuft bei Stufe Normal und Groß immer, nicht mehr nur bei erkanntem Risiko-Auslöser.
- **Auslöser-Checkliste:** Der Plan führt jeden Risiko-Auslöser mit ja/nein und Begründung; der Kritiker prüft sie (neue Pflichtfrage 11).
- **Kritiker, Frage 2:** unbelegte Annahmen und Fachwissen-Lücken einzeln auflisten.
- **Fachwissen-Inventur** (Profil `fachsoftware`): vor dem Bauen Bibliothek gegen Anforderungen abgleichen; Berechnungen ohne bestätigte Regel werden nicht gebaut; jede Lücke geht automatisch an den Rechercheur, das Ergebnis steht sofort als „Vorgeschlagen“ im Gehirn, Simon bestätigt nur noch.
- **Designer** prüft jedes Paket mit Oberflächenänderung vor dem Merge (Aussehen, Anordnung, bei Bedarf neu anordnen), auch bei Excel- und AutoCAD-Oberflächen. Die Ausnahme aus 3.9.0 ist zurückgenommen.

## 3.9.0 – Schlanker Ablauf, Messung

- **Messung:** `.dev-team/kennzahlen.jsonl` bekommt je Agentenlauf eine Startmarke (`ereignis: start`) und ein Ende mit Zeitstempel, Modell, Länge des Berichts sowie Zahl der Befunde „Kritisch“ und „Wichtig“ (Näherung aus dem Berichtstext). So lässt sich je Rolle ausrechnen, was sie kostet und was sie findet, bevor weiter gekürzt wird.
- **Phase 8:** `architekt` Modus `struktur` läuft nur noch bei Stufe Groß, bei Strukturänderung im Meilenstein oder wenn ein Paketreview Strukturbefunde hatte; sonst deckt `reviewer` Modus `gesamt` die Architekturprüfung ab.
- **Gastgeber** Modus `ideen` nur bei Stufe Groß mit Nutzern oder auf Zuruf (`/dev-team:wow`).
- **Designer** entfällt, wenn die Oberfläche in Excel oder AutoCAD vorgegeben ist.
- Abwägungsrunde bleibt unverändert (Simons Vorgabe).

## 3.8.2 – Einrichten auf einem frischen Rechner

- `/dev-team:einrichten privat` bricht mit Gehirn nicht mehr ab, wenn das Plugin als Kopie im Cache liegt (Lektionen kommen aus dem Gehirn).
- Alter Dev-Team-Block ohne Marker in `~/.claude/CLAUDE.md` wird erkannt und mit Simon entfernt, damit nicht zwei Grundgesetze gelten.

## 3.8.1 – Gehirn beim Sitzungsstart abgleichen

- Der Sitzungsstart holt das Gehirn zuerst von GitHub (höchstens 8 Sekunden, ohne Rückfragen, eigene ungespeicherte Änderungen bleiben erhalten). So gelten Lektionen vom anderen Laptop sofort, auch wenn Obsidian dort zu ist. Ohne Netz oder bei einem offenen Konflikt gilt der lokale Stand, mit Hinweis.
- 236 automatische Tests.

## 3.8.0 – Gastgeber für den Wow-Effekt

- **Neuer Agent `gastgeber`** (Opus, nur lesend): denkt an das, woran niemand gedacht hat. Modus `ideen` (Phase 2, Schritt 3c): Nutzerreise vom ersten Start bis zum Weitergeben, Nebensätze aus dem Lastenheft, höchstens drei Wow-Vorschläge mit Aufwand und Prüfkriterium; fehlende Grundanforderungen getrennt als „Lücken im Fundament“. Modus `nachschliff` (Phase 8, Stufe Groß): Verbesserungen für den nächsten Auftrag.
- **Neuer Skill `/dev-team:wow`**: Gastgeber auch außerhalb eines Auftrags, für eine Idee, ein Lastenheft oder ein fertiges Produkt. Gewählte Ideen werden Anforderungen mit A-Nummer und Test, der Rest landet in `docs/wow-ideen.md`, Entscheidungen im Gehirn.
- **`wissen/wow-prinzipien.md`**: zehn Prinzipien (W1–W10) aus Recherche zu Ritz-Carlton, Will Guidara (Eleven Madison Park), Emirates, Disney, Omotenashi, Kano-Modell und Peak-End-Regel, mit Quellen. Quelle der Wahrheit ist die Notiz „Wow-Effekt“ im Gehirn.
- Stopp 2 (Freigabe) zeigt die Wow-Vorschläge zur Auswahl. ANLEITUNG: „bis zu drei“ parallele Entwickler korrigiert.
- `gehirn.py wissen`: keine doppelte Überschrift mehr, wenn die Datei schon eine hat.
- 235 automatische Tests.

## 3.7.0 – Designer, Team-Tafel, Gehirn

- **Neuer Agent `designer`** (Opus): Modus `entwurf` (Gestaltungsrichtung, Farben mit Kontrast 4,5:1, Schriften, Raster, alle Zustände für Desktop und 390 px, echte Texte, Pflichtboden Tastatur/Fokus/44 px), `vorgabe` (`design/vorgabe.md`, `design/tokens.json`) und `treue` (Screenshots 1280×800 und 390×844 gegen `docs/DESIGN.md`). Im Ablauf: Phase 2 bei Oberflächen, Phase 8 Treue-Prüfung. Bereich `design` im Rechtesystem. Produktprüfer prüft zusätzlich Bedienbarkeit nach sieben Punkten.
- **Team-Tafel** als eigenes Plugin `dev-team-tafel`: zeigt neben dem Chat laufende Agenten (Rolle, Modell, Laufzeit), zuletzt fertige, Phase/Ampel, Ergebnisse, Sperren und Testnachweis. Nur lesend; ein Fehler der Tafel verhindert nie einen Agentenstart.
- **Gehirn-Anbindung:** neues Skript `scripts/gehirn.py` (projekt, lektion, entscheidung, wissen) schreibt in Simons Obsidian-Tresor – mit `git pull`, Prüfung auf Zugangsdaten und Sperrwörter (Liste im Gehirn), Commit und Push; streicht nie Zeilen bestehender Wissensnotizen. `claude_md_block.py --gehirn`, Sitzungsstart und Agenten-Kontext laden die bestätigten Lektionen aus dem Gehirn. Abläufe auftrag (Phase 9), lektion, neues-projekt, projekt-aufnehmen, recherche und einrichten schreiben ins Gehirn; ohne Gehirn `docs/GEHIRN_NACHTRAG.md`. `wissen/lessons.md` und `wissen/fachwissen/` sind nur noch Rückfall.
- 231 automatische Tests (neu: `tests/test_gehirn.py`, Klasse `Designer`), dazu 4 Tests der Tafel (`claude plugin test`).

## 3.6.1 – Reibung aus dem Pilotlauf (Meilenstein-Ende)

- Live-Kontrolle 27.10.2026: Ohne verwaltete Einstellung lässt sich der Schutz über `settings.local.json` (`disableAllHooks` + umgelenkter `PATH`) für die nächste Sitzung abschalten – bestätigt. Die verwaltete Einstellung selbst ist noch nicht live geprüft (Einrichten in der Testumgebung abgelehnt); Probe für Simon in ANLEITUNG 9a, Schritt 5.

- Heredocs: Inhalt mit Anführungszeichen (`<<'E'`) wird nicht mehr als Befehl gelesen (Backticks in Notizen lösten Sperren aus); ungequotete Heredocs werden auf `$( … )`/Backticks geprüft.
- Python-Heredocs nur zum Rechnen (ohne Datei-, Netz- oder Prozesszugriff) sind für alle Prüfer erlaubt; Shell-Heredocs werden inhaltlich geprüft statt pauschal gesperrt.
- Neues Skript `scripts/fehlerprobe.py`: Prüfer bauen einen Fehler in eine Kopie ein und sehen, ob die Tests ihn finden – ohne selbst Code zu schreiben (Reviewer, Fachprüfer, Tester, Produktprüfer).
- Entwickler dürfen im System-Temp lesen (Sicherungskopien, Hilfsskripte); Temp-Kopien des blinden Laufs bleiben gesperrt.
- `/dev/full`, `/dev/stdout` u. ä. zählen nicht als Schreibziel.
- 221 automatische Tests.

## 3.6.0 – Befunde der Nachprüfung 3.5.0 (Umsetzung von P0/P1 nachgeschärft)

### Warum
Nachprüfung 3.5.0 (6/10, `docs/AUDIT-3.5.0.md`): Der Einstellungsschutz blockierte nur die laufende Sitzung, `env.PATH` konnte den Wächter umlenken, der Mutationstest zählte wegen Bytecode-Cache zu gut, Prüfsummen ließen sich durch Umbenennen/Löschen umgehen, die Fachregel-Abdeckung passte nicht zur eigenen Vorlage, Tester und Architekt durften wieder beliebige Einzeiler.

### Einstellungen und Wächter-Start
- `einstellungs_schutz.py` entfernt die schädlichen Einträge wieder aus der Datei (schützt auch die nächste Sitzung), erkennt `env.PATH`/`PYTHON*`/`CLAUDE_*` u. a., eigene Hooks in lokalen Einstellungen, pauschale Shell-Erlaubnis und Marktplatz-Umlenkung; prüft nur die geänderte Quelle (kein Dauer-Fehlalarm durch alte Benutzereinstellungen).
- Die Test-Schranke ist rot, solange so ein Eintrag existiert (Stolperdraht auch ohne Hooks).
- `waechter.sh` und `einstellungs-schutz.sh` bevorzugen feste Python-Pfade; der Wächter muss einen Einmal-Code zurückgeben, sonst wird blockiert (ein falsches „python“ fällt auf).
- Neu: `scripts/verwaltete_einstellungen.py` erzeugt die verwaltete Einstellung (managed settings) – der einzige Weg, den Wächter dauerhaft gegen Abschalten zu sichern (ANLEITUNG 9a, macht Simon einmal als Administrator). Ist sie eingerichtet, tritt der Plugin-Wächter zurück.

### Schranken
- Mutationstest: ohne Bytecode-Cache (`PYTHONDONTWRITEBYTECODE`, Cache je Mutante gelöscht), neue Mutation „Rückgabe → None“, Windows über Git Bash.
- Prüfsummen: Liste wird gegen ihre erste versionierte Fassung verglichen; gelöschte verdeckte Tests, fehlende Liste (beim Merge/Meilenstein) und am Meilenstein jede nicht unverändert aufgedeckte Fassung (auch unter anderem Namen) sind rot.
- Abdeckung nur über Testnamen (Syntaxbaum bzw. Titel von `it()/test()`), Lastenheft auch mit Überschriften `## A1`. Fachregeln: F- und R-Nummern im Abschnitt „Bestätigt“ (passend zur Vorlage). Mutationspflicht nur mit echtem Werkzeug (`mutationstest.py`, mutmut, Stryker …).
- Blinder Lauf prüft, dass die verdeckten Tests wirklich mitgelaufen sind (Testzahl mit/ohne).

### Wächter
- Einzeiler und Interpreter-Heredocs mit Netz- oder Prozesszugriff (subprocess, urllib, fetch …) sind für alle gesperrt; Architekt gehört nicht mehr zu den Rollen, die nicht prüfbaren Code ausführen dürfen.
- Projektleiter: gesperrt sind `git pull`, `rebase`, `reset` (außer `--keep ORIG_HEAD` und Entstagen), `branch -f`, `switch -C`/`checkout -B`, `update-index` (außer `--refresh`), `remote add/set-url`, Push an andere Ziele als `origin`, `git -c remote.*/branch.*/push.*`.
- Weitere Veröffentlichungswege gesperrt (`yarn npm publish`, `gem push`, `mvn deploy`, `gradle publish`, `python -m twine`, `setup.py upload`, `git send-email`).
- Höchstens 3 Entwickler gleichzeitig jetzt **technisch** (Zählung über das Agenten-Log, `team.json` → `max_parallele_entwickler`).
- Fehlalarme behoben: Projektleiter liest mit `sed -n`/`awk`, Reviewer mit `git archive | tar -t`, `.claude` im Pfad gilt nicht als Claude-Aufruf.

### Doku
- „Stark erschwert“ ersetzt durch „direkter Weg gesperrt, mit eigenem Skript möglich – deshalb Nachweise“; Einstellungsschutz ehrlich (nur mit verwalteter Einstellung dicht); Fachregeln einheitlich F-Nummern.
- 215 automatische Tests.

## 3.5.0 – Maßnahmen P0 und P1 aus dem Systemaudit (von Simon freigegeben)

### Warum
Systemaudit nach Simons Auftrag (`docs/AUDIT-SYSTEM-3.4.0.md`, 6/10): Schutz-Hooks per Programm abschaltbar, Merge-Prüfung bei Fast-Forward blind, Abnahmetests ohne Spur änderbar, Außenwirkung (Push, Veröffentlichen, Hochladen) nicht gesperrt, Prüfberichte nicht gespeichert, Wirksamkeit nicht gemessen. Simon hat P0 1–6, P1 1–4 und „3 parallele Entwickler“ freigegeben; Verschlankung der Rollen erst nach Messung. Dazu Reibung aus dem Pilotlauf.

### P0
1. **Einstellungsschutz:** neuer Hook `ConfigChange` (`scripts/einstellungs_schutz.py`) blockiert Änderungen, die Hooks, Plugin, Workflows oder Freigaben abschalten, und vermerkt ⛔ im Log. Stolperdraht im Grundgesetz: Einstellungsdateien zu Sitzungsbeginn prüfen.
2. **Merge nur mit `--no-ff` und Nachweis:** Der Wächter lässt `git merge` nur mit `--no-ff` zu, nur wenn für den Branch-Kopf ein grüner Schranken-Nachweis vorliegt, nie auf main/master, kein `--continue`. Die Schranke (`--rolle merge`) ist rot, wenn HEAD kein Merge-Commit ist.
3. **Prüfsummen der Abnahmetests** (`scripts/abnahme_pruefsummen.py` → `docs/ABNAHME_PRUEFSUMMEN.txt`, versioniert mit dem Plan). Jede Abweichung ist in der Schranke rot; Neuschreiben nur mit Simons Freigabe.
4. **Keine Außenwirkung:** Nur der Projektleiter pusht, nur `dev-team/…` mit ausdrücklichem Ziel. Gesperrt für alle: Veröffentlichen (npm/pnpm/yarn publish, twine, cargo, nuget), Hochladen/Senden (`curl -d/-F/-T/-X POST`, `wget --post-*`, scp, rsync host:), Cloud- und Server-Werkzeuge (gh, vercel, docker push, ssh …). Zusatz-Werkzeuge (MCP) nur lesend (Erlaubnisliste).
5. **Cloud ehrlich:** ANLEITUNG Abschnitt 7 – in claude.ai-Projekt-Threads gilt das Team nur mit Plugin-Eintrag in den Projekteinstellungen. `.claude/dev-team-start.sh` darf nur einmal angelegt werden.
6. **Testbefehl und Referenzfälle nur von Simon:** `.claude/dev-team.json` darf der Projektleiter nur ausfüllen, solange sie unversioniert ist; Referenzfälle gar nicht. Beides danach nur über `scripts/geschuetzt_schreiben.py` mit Freigabe (Geltung = Zielpfad), protokolliert mit Prüfsumme in `docs/FREIGABEN_LOG.md`.

### P1
1. **Vollständige Prüfberichte** je Agent in `docs/pruefberichte/` (Link im Agenten-Log), Kennzahl je Lauf in `.dev-team/kennzahlen.jsonl`; beides für Agenten gesperrt.
2. **Blinder Lauf der verdeckten Tests nach jedem Merge** (`scripts/verdeckt_blind.py`): meldet nur grün/rot und betroffene Anforderungsnummern, nie Testnamen oder Werte.
3. **Anforderungs-Abdeckung:** Am Meilenstein-Ende ist die Schranke rot, wenn eine Anforderung (A-Nummer) ohne Test ist.
4. **Fachsoftware:** jede bestätigte Fachregel (R-Nummer) braucht einen Test (Eigenschaftstest über viele Eingaben); Mutationstest in `meilensteinbefehle` ist Pflicht. Neues Skript `scripts/mutationstest.py` ohne Zusatzpakete (Python). Erwartete Rechenwerte nur aus Referenzfällen oder unabhängiger Herleitung.

### Weitere
- **Höchstens 3 parallele Entwickler** (vorher 4).
- Reibung aus dem Pilot: `for`/`if`-Schleifen für den Projektleiter, `ReadNotifications` u. a. als harmlos, bauende Rollen (Entwickler, Tester, Architekt) dürfen Hilfsskripte ausführen (Sicherung über Nachweise), Heredoc-Inhalt zählt nicht als Lesezugriff, `cd` in den eigenen Worktree, `git worktree remove --force` für schon zusammengeführte Worktrees.
- Doku ehrlich: „eigenes Skript kann die Shell-Sperren der bauenden Rollen umgehen – Sicherung über Nachweise“.
- 197 automatische Tests.

## 3.4.0 – Befunde der Nachprüfung 3.3.0, Modellwahl

### Warum
Nachprüfung 3.3.0 (7/10, Tendenz 8, `docs/AUDIT-3.3.0.md`): neue Claude-Code-Werkzeuge (`Monitor`, `Workflow`) liefen am Wächter vorbei, weitere Shell-Wege, Merge-Schranke am Meilenstein-Ende fälschlich rot. Simons Wunsch: Modelle je Agent festlegen bzw. pro Aufgabe wählen, um Token zu sparen. Pilotlauf: Hintergrund-Agenten wurden im unbeaufsichtigten Modus nach 10 Minuten abgebrochen.

### Teamzwang und Werkzeuge
- Der Wächter sieht jetzt **alle** Werkzeuge (Matcher `*`). `Workflow` ist gesperrt (zusätzlich `CLAUDE_CODE_DISABLE_WORKFLOWS`, `disableWorkflows`, Sperrregel). `Monitor` wird wie die Shell geprüft. **Unbekannte Werkzeuge sind gesperrt**, bis Simon sie in `team.json` → `harmlose_werkzeuge` aufnimmt. Zusatz-Werkzeuge (MCP), die Befehle ausführen oder Dateien schreiben, sind gesperrt; Agenten des Teams nutzen keine.
- **Modelle:** Standard je Agent in Steckbrief und `team.json` (`modell`), erlaubte Abweichungen in `modelle`. Prüfer, die Qualität absichern, immer Opus; Entwickler Sonnet, Opus bei Bauplan-Schwierigkeit `schwer` und ab Fix-Runde 3; kein Haiku. Der Wächter sperrt andere Modelle; das Modell steht im Agenten-Log. Der Architekt schätzt im Bauplan die Schwierigkeit.

### Shell
- **Erlaubnisliste für den Projektleiter:** Git, Lese- und Dateibefehle, Plugin-Skripte und die Befehle aus `.claude/dev-team.json`. Keine eigenen Skripte (auch nicht im Temp), keine Einzeiler, kein curl.
- Befehlsersetzungen (`$( … )`, Backticks, `<( … )`) werden mitgeprüft, auch in Anführungszeichen. Zeilenumbrüche trennen Befehle. Heredocs nur außerhalb von Anführungszeichen (getarnter Heredoc geschlossen). `cd` im selben Befehl und fest zugewiesene Variablen werden berücksichtigt.
- `git -c alias./core./…` gesperrt; Entwickler ohne `git -C/--git-dir/--work-tree`. Weitere Git-Sperren: Push auf `refs/heads/main`, `--all`, `branch -d -f`, `checkout -f`, `switch --discard-changes`, `stash drop/clear`, `worktree remove --force`, `reflog expire`, `gc --prune`.
- Schreibziele von `curl -o`, `wget -O`, `sort -o` u. a., `<>`-Umleitung; Editoren, `script -c`, `setsid` & Co.; mehr Einzeiler-Muster (`os.open`, `copyFileSync`, `pathlib` …); PowerShell `[IO.File]` u. ä.; `uv run --with`, `uvx --from`, `pip install <datei>`.
- Entwickler schreibt nur im eigenen Worktree; Lesen über Elternordner (`/`, oberhalb von HOME, `..`) gesperrt.
- `~/.claude/CLAUDE.md` nur über `scripts/claude_md_block.py`; Sitzungsstart gibt das Grundgesetz mit, wenn die Verknüpfung fehlt. `settings_zusammenfuehren.py` schreibt nur `.claude/settings.json`.

### Schranken
- Merge-Prüfung mit `--basis HEAD^1` (nur das Paket); Planungsstand wird vor der Meilenstein-Basis committet.
- Tests, die das Testwerkzeug verändern (assert-Methoden überschreiben, `except AssertionError`, `sys.exit`/`os._exit`, `setattr` auf unittest/pytest), und geänderte Testeinstellungen in `pyproject.toml`/`package.json` durch Entwickler sind rot.
- Bei geändertem Manifest/Lockfile läuft die Abhängigkeits-Schranke automatisch. `overrides`/`resolutions` werden geprüft, Lockfile-Adressen außerhalb der offiziellen Registry sind rot.
- Warnung bei Basis = HEAD und bei Fachsoftware ohne Mutationstests.
- Fertig-Prüfung: Satzzeichen, Pfade in Backticks (mit Leerzeichen), `/c/…`, nur der eigene Worktree.

### Sonstiges
- Projektvorlage: `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS=0` (Hintergrund-Agenten werden in unbeaufsichtigten Läufen nicht mehr abgebrochen).
- CI-Vorlage `vorlagen/ci-github.yml`: Schranken laufen bei GitHub, außerhalb der Reichweite der Agenten.
- Doku ehrlich: Sandbox nur unter Linux/macOS/WSL2; Schritt 7 mit `Monitor` und getarntem Heredoc.
- 176 automatische Tests.

## 3.3.0 – Restpunkte aus Audit 3.1.0

- Schranke erkennt Tests ohne echte Prüfung: nur Konstanten (`assert True`, `expect(true).toBe(true)`, `assert.equal(a, a)`) oder `return` vor der ersten Prüfung (Python per Syntaxbaum).
- Testkonfiguration (auch neue, z. B. `conftest.py` mit `collect_ignore`) legt nur der Tester an.
- Prüfer dürfen Git nur lesen (kein commit, merge, stash, tag, checkout -b, config).
- Skills mit eigenem Agenten (`context: fork`) aus anderen Quellen sind gesperrt (Wächter prüft jetzt auch das Skill-Werkzeug).
- Abhängigkeits-Schranke: Tippfehler-Namen bekannter Pakete (Typosquatting) sind rot.
- Windows: Testbefehle laufen über Git Bash statt cmd.exe.
- Cloud-Start: `plugin_stand` in `.claude/dev-team.json` nagelt den Dev-Team-Stand fest; ohne Angabe Warnung.
- Reviewer: Datenmodell/Typen (ungültige Zustände), Kommentare noch wahr, Verlauf der geänderten Stellen (Pflichtfrage 12).
- Vorlage: Mutationstests (mutmut/Stryker) als empfohlener Zusatzbefehl im Profil fachsoftware.
- 152 automatische Tests.

## 3.2.0 – Befunde der Nachprüfung 3.1.0 behoben

### Warum
Nachprüfung durch einen frischen Auditor (7/10, `docs/AUDIT-3.1.0.md`): zwei von mir in 3.1 neu verursachte Fehler (Merge-Schranke immer rot, Freigabe per Teilwort) und weitere Umgehungswege.

### Schranken
- Neue Rolle `merge` für die Prüfung nach jedem Zusammenführen: Entwickler-Regeln, aber die Prozessdateien des Projektleiters zählen nicht. Rücknahme mit `git reset --keep ORIG_HEAD`.
- Freigaben: Format `Datum | Stichwort | Geltung | Grund`, Stichwort muss genau passen, Freigabe gilt nur für die genannten Pfade bzw. Prüfungen (`testzahl`, `uebersprungen`). Vorlage auskommentiert.
- Testkonfiguration (conftest.py, pytest.ini, vitest/jest/playwright-Konfiguration …) ist ein eigener Bereich: bestehende ändert nur der Tester.
- Nachweise (Agenten-Log, Testnachweis, Schranken-Nachweise) kann kein Agent schreiben.
- Im Worktree muss die Basis der Abzweigpunkt sein (das ganze Paket wird geprüft, nicht nur der letzte Commit).
- Fertig-Prüfung: Worktree-Pfad muss im Bericht stehen, der Worktree sauber committet sein und der Nachweis zu dessen aktuellem Stand passen. Höchstens zwei Zurückweisungen, dann „NICHT belegt“ im Log.
- Abhängigkeits-Schranke: umgelenkte Paketquellen (`.npmrc`, `pip.conf`, `uv`-/`poetry`-Index in `pyproject.toml` …) sind rot; aufgeweichte feste Versionen eine Warnung.

### Wächter
- Hüllen werden geprüft oder gesperrt: `bash -c` (Inhalt wird mitgeprüft), `eval`, `source`, Befehl aus Variable, Pipe oder Heredoc in einen Interpreter, `find -delete`, `xargs rm`, `tar x`, `unzip`, `patch`, `awk -i inplace`, `cp -t`, `git checkout <ref> <pfad>`.
- Plugin-Skripte gelten nur als erlaubt, wenn sie der einzige Befehl sind. Der Projektleiter führt keine Skripte aus dem Projekt aus.
- `python -m pip install`, `npx`/`bunx`/`uvx`/`pnpm dlx`/`npm exec`/`pipx run` nur mit Paketen aus `package.json`.
- Gesperrt: `git clean`, `git reset --hard` (außer Entwickler im eigenen Worktree), `git branch -D`, Push auf main/master, `--force`, `+branch`, `:branch`.
- Windows-Pfade im Git-Bash-Format (`/c/…`) werden erkannt. Der Projektleiter schreibt außerhalb des Projekts nur `~/.claude/CLAUDE.md`, `~/.claude/dev-team/`, das Baukasten-Repo und das System-Temp.
- Im Plugin-Ordner sind nur `wissen/lessons.md` und `wissen/fachwissen/` beschreibbar.
- Entwickler-Lesesperre: auch Grep/Glob außerhalb des Worktrees, absolute Muster, `cd ..`, Platzhalter in versteckten Ordnern und das Home-Verzeichnis.

### Sonstiges
- Sitzungsstart nennt das feste Team wieder (liest `team.json` per Python).
- Reviewer prüft die Projektregeln aus `CLAUDE.md` (Pflichtfrage 11). Entwickler hat eine Liste „Ausreden, die nicht zählen“ (Idee Superpowers).
- ANLEITUNG ehrlich: Lesesperre „stark erschwert, nicht unmöglich“; Schritt 7 um `bash -c` und `/c/…`-Pfad ergänzt.
- 145 automatische Tests.

## 3.1.0 – Vorbilder übernommen, Audit-Befunde behoben

### Warum
Audit 3.0.0 (unabhängiger Auditor, 6/10) und Simons Wunsch: die Agententexte mit den besten Ideen aus öffentlichen Agenten-Projekten bauen, mehrere Entwickler für mehr Tempo, ein Architekt, der den Code vorher plant. Vergleich und Herkunft: `docs/VORBILDER.md`.

### Agenten
- **Architekt** plant jetzt konkret: Architektur-Rückgrat mit Festlegungen „bindet / verhindert / Regel“ (Idee BMAD), Bauplan je Paket mit exakten Schnittstellen „nutzt / liefert“ und Prüf-Schwerpunkt (Idee Superpowers), tragende Entscheidungen mit Alternativen für Simon, Websuche für aktuelle Versionen.
- **Entwickler**: fester Status FERTIG / FERTIG_MIT_BEDENKEN / BLOCKIERT / BRAUCHT_KONTEXT, ausdrückliche Abbruchgründe, strenges „erst roter Test“, Regeln für gute Tests, Ursache vor Behebung, keine KI-Notizen im Code, Schranke nach dem Commit.
- **Reviewer**: „Glaub dem Bericht nicht“, fehlt / zu viel / missverstanden, Prüffragen für verschluckte Fehler (Idee Anthropic), Kalibrierung der Schwere, Stärken zuerst, neuer Modus `nachpruefung` (behoben / nicht behoben), führt die Schranke mit `--rolle entwickler` selbst aus.
- **Tester**: Standardfälle in jedem Auftrag (Idee wshobson), Testlücken nach Wichtigkeit 1–10, Hinweis auf Sonderfall-Code beim Aufdecken.
- Kritiker prüft Baupläne und still getroffene Entscheidungen; Produktprüfer prüft Grundlagen der Barrierefreiheit.

### Ablauf
- Stufe Klein mit Reviewer und kurzer Bestätigung durch Simon; Abwägungsrunde bei Normal immer.
- Bis zu 4 parallele Entwickler (CAID-Studie), Fix-Schleife bis 5 Runden mit frischem Entwickler ab Runde 4, kleine Befunde gesammelt.
- „Entscheiden statt stehen bleiben“ mit `docs/ENTSCHEIDUNGEN.md`; im Bericht vollständige Liste „Entscheidungen, die ich für dich getroffen habe“.
- Nach jedem Merge Schranke mit `--rolle entwickler` gegen die Meilenstein-Basis (unabhängige Prüfung, dass kein Entwickler Tests geändert hat).

### Technik (Audit-Befunde)
- Wächter v2: UTF-8 erzwungen (Windows), interner Fehler oder unlesbare Eingabe blockiert, `onFailure: block`, PowerShell überwacht.
- Shell-Prüfung: Umleitungen, `tee`, `sed -i`, `cp`, `mv`, `rm`, `touch`, `git checkout/restore/rm/mv/apply`, Skript-Einzeiler mit Schreibzugriff, `claude`-Aufrufe, Paket-Installationen per Befehl, Schutzschalter.
- Identität: lokal nur `dev-team:`-Agenten; ohne Präfix nur mit Cloud-Kopie. Isolation des Entwicklers nicht abschaltbar.
- Entwickler liest nur in seinem eigenen Worktree; darf seine im Paket neuen Tests weiter bearbeiten.
- Einstellungsdateien nur über `settings_zusammenfuehren.py` (nur mit Plugin-Vorlagen), `.claude/dev-team.json` nicht löschbar, Freigaben nur aus `.claude/freigaben.md` (nur Simon).
- Test-Schranke: weitere Skip-Varianten, übersprungene Tests im Lauf, Tests ohne Prüfung, Änderung der Teamkonfiguration, Nachweis je Commit.
- SubagentStop-Hook `fertig_pruefung.py`: „FERTIG“ ohne Schranken-Nachweis wird zurückgewiesen.
- Abhängigkeits-Schranke: direkte Quellen (git, URL, github:, npm-Alias), pyproject mit `tomllib` inkl. Extras und optionaler Gruppen, NuGet, Warnung bei ungeprüften Paketsystemen.
- `.gitattributes` (LF für Skripte), `.pyc` entfernt.
- Plugin-Tests: 120+.

### Ehrliche Grenzen
- Shell-Umgehungen sind stark erschwert, nicht unmöglich (z. B. eigene Skripte). Erkannt werden veränderte Tests, Referenzwerte und Einstellungen nachträglich; Projektleiter-Code per Skript nicht.
- Windows ist nachgestellt getestet (Kodierung), nicht auf echtem Windows.
- Alle Agenten nutzen Claude-Modelle und teilen blinde Flecken.

## 3.0.0 – Festes Team, Teamzwang, Entwickler und Architekt

### Warum
Simons Vorgaben (26.10.2026): Es wird immer genau im festen Team gearbeitet – der Projektleiter erstellt keine Helfer. Aufgaben fester definieren, klar trennen, wer eigenständig ist und was zusammengelegt wird. Mehrere Entwickler bei mehreren Aufgaben, ein Architekt für sauberen Aufbau, alle Tests grün, eigener Test-Agent. KI-Schwachstellen in der Softwareentwicklung abdecken; gute Ideen aus fremden Agenten-Repos übernehmen.

### Neu
- **Teamzwang technisch:** `team.json` als einzige Teamliste; Wächter-Hook `scripts/waechter.py` blockiert eingebaute Helfer, Agenten ohne Namen, fremde und erfundene Agenten, Teammates, Agenten, die Agenten starten, und das Überschreiben des Modells. Zusätzlich Sperrregeln in `vorlagen/projekt-settings.json` (`Agent(Explore)` …, Verschachtelung aus).
- **Schreibrechte technisch:** Code nur Entwickler; Tests nur Tester und (neue) Entwickler; Architektur nur Architekt; Referenzfälle ändert niemand; Projektleiter schreibt nur Projektunterlagen. Agenten-, Skill- und Hook-Dateien kann niemand anlegen. Wartungsmodus nur über `DEV_TEAM_WARTUNG=1`, das Claude nicht setzen kann.
- **Agent `entwickler`:** ein Paket pro Aufruf, eigener Git-Worktree, testgetrieben, bis zu drei parallel bei überschneidungsfreien Paketen.
- **Agent `architekt`:** Struktur, Abhängigkeitsrichtung, Paketschnitt, `docs/ARCHITEKTUR.md`, Architekturtests; Strukturprüfung je Meilenstein.
- **Verdeckte Abnahmetests:** Tester schreibt sie vor dem Bauen; für den Entwickler gesperrt.
- **Paket-Review vor jedem Merge** in zwei Stufen (Plan-Treue, dann Qualität) – Idee aus obra/superpowers.
- **Test-Schranke** `scripts/pruefe-tests.sh`: alle Tests und Zusatzbefehle grün, keine skip/only, keine geänderten Referenzfälle, keine gelöschten Tests, Testzahl sinkt nicht, keine 0-Tests-Läufe, Entwickler ändert keine bestehenden Tests; Nachweis in `docs/TESTNACHWEIS.md`.
- **Abhängigkeits-Schranke** `scripts/pruefe-abhaengigkeiten.sh` gegen erfundene und frisch registrierte Pakete (npm, PyPI), Lockfile-Pflicht.
- **Steckbrief für jeden Agenten:** Wann · Bekommt / bekommt nicht · Darf / darf nicht · Pflichtfragen · Ausgabe · Fertig, wenn. Sicherheit 0–100 pro Befund, unter 80 nicht in der Befundliste – Idee aus Anthropics code-review-Plugin.
- **Profile** `fachsoftware` und `web` in `.claude/dev-team.json`, neue Vorlagen `dev-team.json`, `architektur.md`.
- Produktprüfer mit Screenshots Desktop + Handy; Betriebs-Checkliste in `uebergabe`; Abschnitt KI-Schwächen in der Sicherheits-Checkliste.
- `scripts/settings_zusammenfuehren.py` für bestehende Projekte; Teamnachweis im Abschlussbericht.
- Plugin-Tests in `tests/` (Wächter, Schranken, Vorlagen, Steckbriefe), in `pruefe-plugin.sh` eingebunden.

### Geändert
- `rechercheur` und `quellenpruefer` zusammengelegt (Modi `recherche` und `gegenpruefung`, immer getrennte Aufrufe).
- Projektleiter baut und prüft nicht mehr selbst, auch nicht bei Stufe Klein.
- Skill `architekt` heißt jetzt `loesungsweg` (Verwechslung mit dem Agenten vermeiden).
- Grundgesetz, Team-Protokoll, Anleitung, `auftrag` neu gefasst.

### Ehrliche Grenzen
- Über die Shell kann der Projektleiter Dateien trotz Sperre ändern; das ist verboten und wird von Test-Schranke, Reviewer und Teamnachweis erkannt, aber nicht technisch verhindert.
- Es gibt Fehlermeldungen (April 2026), dass Hook- und Berechtigungs-Sperren für Agenten-Aufrufe nicht immer griffen. Deshalb doppelte Sperre und Pflicht-Test auf Simons Rechner (Anleitung, Abschnitt 9, Schritt 7).
- Skills Dritter, die selbst einen Agenten mitbringen, laufen eventuell an der Agenten-Sperre vorbei; deshalb fremde Skills nur nach `/tool-scout:scout check`.
- Alle Agenten nutzen Claude-Modelle und teilen blinde Flecken. Mechanische Prüfungen und menschliche Abnahme bleiben nötig.


## 2.4.0 – Senior-Entwicklungsprozess

### Änderungen
- Agentenbeschreibungen für alle bestehenden Dev-Team-Rollen präzisiert: Auftrag, Grenzen, Evidenz, Ampel und Ausgabeformat.
- Neuen unabhängigen Agenten `sicherheitspruefer` ergänzt.
- `auftrag` als risikobasierte Projektleitungs-Pipeline überarbeitet: klare Stufen, Freigabegrenzen, Qualitätsgates, Umgang mit Befunden und Abschlussnachweise.
- Sicherheits-Checkliste erweitert für Desktop-Apps, Tauri, zentrale APIs, Datenbankmigrationen, Updates, Supply Chain und KI-gestützte Entwicklung.
- Reviewer und Tester klarer getrennt: Tester weist Verhalten nach; Reviewer beurteilt den tatsächlichen Diff und technische Qualität; Produktprüfer nimmt Anforderungen aus Nutzersicht ab; Sicherheitsprüfer prüft Angriffswege und Datenschutz.

### Wichtige Hinweise
- Diese Regeln verbessern den Prozess, garantieren aber keine Fehlerfreiheit oder vollständige Sicherheit.
- Agenten können ähnliche blinde Flecken haben; unabhängige Tests, fachlich belastbare Referenzwerte und menschliche Prüfung kritischer Entscheidungen bleiben erforderlich.
- `sicherheitspruefer` wird für größere sicherheitsrelevante Änderungen eingeplant; die Verfügbarkeit hängt von der korrekt installierten Plugin-Version ab.
- Vor dem Update den bestehenden Plugin-Ordner bzw. das Git-Repository sichern und nach dem Update Claude Code/VS Code neu starten, damit die aktualisierten Agenten geladen werden.

## 2.4.1 – Änderungen nach dem Audit (docs/AUDIT-2.4.0.md)
- `auftrag`: feste Stopps bei Anforderungen, Freigabe und Bericht wiederhergestellt; Sichtbarkeit, offene Fragen, Lektionsvorschläge, harte Stopps, „Fachregel erst rot“, Tester-Isolation und Baukasten-Prüfung wieder drin; Meilensteine, „nur analysieren“-Modus, Wiederaufnahme nach Kontextverlust neu.
- Grundgesetz: eine einzige Stufen-Definition mit Risiko-Auslösern; Abschnitte „Fertig heißt belegt“, „Grenzen der Autonomie“, „Große Aufträge und Kontextverlust“; Sicherheitsprüfer aufgenommen; falschen Satz „Fachprüfer holt Rechercheur“ korrigiert.
- Alle Agenten: Lessons und Fachwissen lesen, Ampel und einfache Sprache, „nicht geprüft“ ehrlich benennen, `maxTurns`. Tester: Fachregeln über erzeugte Fälle wieder genau beschrieben.
- Neu: Agent `auditor`, Skill `audit`, Selbstprüfskript `scripts/pruefe-plugin.sh`.
- Sicherheits-Checkliste: Abschnitt Mehrbenutzer, Datenintegrität und Migration.
- Cloud-Start: Variable `DEV_TEAM_REF` zum Festnageln auf einen geprüften Stand; Repo ist öffentlich, README und Anleitung angepasst.
- Tote Verweise auf ein nicht mitgeliefertes Firmen-Plugin entfernt; `TEAM-PROTOKOLL.md` enthält keine zweite Stufen-Definition mehr.
