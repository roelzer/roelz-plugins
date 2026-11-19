# Stimmen (Sprachausgabe)

Stand: 18.11.2026, Recherche mit eigenen Messungen auf CPU ohne Grafikkarte (`docs/personal/video-editor/recherche.md`). Simon will Erzähler- und Charakterstimmen (z. B. für Trailer). Die Stimme „thorsten“ will er nicht. Es gibt **keinen unabhängigen Hörvergleich für Deutsch**. Deshalb entscheidet Simon an Stopp 2 nach Gehör.

## Werkzeuge
| Zweck | Werkzeug | Lizenz | Tempo ohne Grafikkarte |
|---|---|---|---|
| **Hauptweg:** Erzähler und Charaktere, Stimme aus Beschreibung, Klonen mit Einwilligung | **VoxCPM2** (OpenBMB) | Apache-2.0 für Code und Gewichte, kommerziell frei | langsam: etwa 5–6 min für 30 s Sprache (mit NVIDIA-Grafikkarte etwa 10 s) |
| **Rückfall**, schnell | **Pocket TTS** (Kyutai), Sprache `german`, für Endfassungen `german_24l` | Code MIT, Gewichte CC BY 4.0 → Nennung „Stimme: Kyutai Pocket TTS (CC BY 4.0)“ in der Beschreibung | etwa 2× Echtzeit (`german`) bzw. 0,5× (`german_24l`) |

**Nicht verwenden:**
- Mit nicht-kommerzieller oder Forschungslizenz: F5-TTS, MaskGCT, Spark-TTS, XTTS, Fish, Higgs Audio v3, VibeVoice.
- Kokoro und MeloTTS (kein Deutsch).
- Piper-Stimmen `thorsten_emotional`, `pavoque`, `karlsson` (Lizenzkette).
- Jeder Cloud-Dienst (ElevenLabs, HeyGen usw.).

## Einrichtung (einmal)
- **VoxCPM2:** Python 3.10–3.12. Mit Grafikkarte zuerst PyTorch in der CUDA-Variante von pytorch.org installieren, dann `pip install voxcpm`. Ohne Grafikkarte: `pip install voxcpm --extra-index-url https://download.pytorch.org/whl/cpu`. Der erste Lauf lädt etwa 5 GB. Danach `HF_HUB_OFFLINE=1` setzen, damit nichts mehr nach außen geht.
- **Pocket TTS:** `pip install pocket-tts` (unter Windows alternativ die Einzeldatei aus den GitHub-Releases; braucht eine CPU mit AVX2). Für viele Sätze `pocket-tts serve`, dann bleibt das Modell geladen.

## Benutzung
- **Charakterstimme aus Beschreibung (VoxCPM2):**
  `voxcpm design --text "(Ein alter Wächter, tiefe raue Stimme, langsam, misstrauisch)Was führt dich hierher?" --output waechter.wav`
  - Beschreibung in Klammern vor dem Text: Alter, Klangfarbe, Tempo, Gefühl.
  - Je Charakter dieselbe Beschreibung beibehalten, damit die Stimme gleich bleibt.
- **Simons eigene Stimme (nur mit Einwilligung):**
  `voxcpm clone --text "…" --reference-audio simon_referenz.wav --output satz.wav`
  - Referenz: 10–30 s, ruhig aufgenommen, ohne Hintergrundgeräusch.
  - Einwilligung als `einwilligung.txt` (wer, wann, wofür) neben dem Clip.
- **Schneller Erzähler (Pocket TTS):** `pocket-tts generate --language german --text "…" --output-path satz.wav`.
  - Die Lizenz der eingebauten Stimmen ist nicht dokumentiert. Für veröffentlichte Videos lieber eine geklonte Stimme mit Einwilligung nehmen.

## Regeln
1. **Satzweise erzeugen**, je Satz 2–3 Fassungen. Modell, Beschreibung bzw. Referenz und Parameter in `LIZENZEN.md` festhalten.
2. **Jede Fassung prüfen:** mit `scripts/transkribieren.py` zurück in Text verwandeln und mit dem Skript vergleichen. Bei Abweichung neu erzeugen oder umformulieren.
3. **Aussprache-Lexikon** `video/<name>/aussprache.txt`: Zahlen und Einheiten ausschreiben („minus fünfzehn Grad“, „D N zwanzig“), Anglizismen und Firmennamen umschreiben, bis die Transkription stimmt.
4. **Einwilligung:** Stimmen echter Personen nur mit deren Einwilligung nachbilden. Nie Prominente, nie Dritte.
5. **Kennzeichnen:** Eine KI-Stimme wird in der Beschreibung bzw. im Abspann genannt („Stimme KI-erzeugt“). Wasserzeichen eines Modells nie entfernen.
6. **Zeit ehrlich planen:** Ohne Grafikkarte dauert VoxCPM2 lange. Bei mehr als etwa 60 s Sprache vorher Simon fragen, oder für Entwürfe Pocket TTS nehmen und erst für die Endfassung VoxCPM2.
7. **Mischung:** Stimme vorne, Musik 6–10 dB darunter, Endmischung wie in `ton.md`.
