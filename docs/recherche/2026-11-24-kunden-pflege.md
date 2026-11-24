# Kunden pflegen ihre statische Website selbst (24.11.2026)

Methode: `recherche:profi`. Repos nur gelesen (flach geklont), nichts ausgeführt. Sterne gerundet (GitHub-API gesperrt), letzter Commit und Lizenz aus den Klonen.

## Kurzantwort
Ein Git-basiertes CMS bearbeitet nur Inhaltsdateien (`content/*.json`, `*.md`). Layout, 3D und Scroll bleiben im Code. Standard: **Sveltia CMS + Sveltia CMS Additions** (Worker auf Cloudflare Free, Login mit Benutzername und Passwort ohne GitHub-Konto, deutsche Oberfläche, WebP-Umwandlung). Webspace: dasselbe CMS, eine GitHub-Action lädt per SFTP hoch. Ohne Cloudflare: Pages CMS (Login per E-Mail-Code), mit Datenschutz-Vorbehalt.

## So machen es Agenturen (Belastbarkeit mittel bis niedrig, Anbieter-Blogs)
- Feste Felder und Sammlungen, Layout gesperrt (Readymag „layout-locked sections“, Wix Studio „without touching the design“) – mittel
- Kurze Anleitung mit Screenshots oder Videos, 1–2 Schulungstermine (Readymag, Wix) – mittel
- Übergabe als feste Schrittliste, Rollen und Rechte (Wix „SOP“) – niedrig

## Was es gibt
| Name | Sterne | letzter Commit | Lizenz | Kunden-Login | Kosten / Datenschutz | Urteil |
|---|---|---|---|---|---|---|
| Sveltia CMS (github.com/sveltia/sveltia-cms) | 3,1k | 23.11.2026 | MIT | GitHub/GitLab/Gitea; mit Additions Benutzername + Passwort | kostenlos, läuft im Browser, Inhalte im eigenen Repo | **Standard** |
| Sveltia CMS Additions (github.com/sveltia/sveltia-cms-additions) | k. A. | 22.11.2026 | MIT | Benutzername + Passwort, Rollen | Cloudflare Workers Free, Durable Object im eigenen Konto | übernehmen, sehr neu |
| sveltia-cms-auth | – | 22.11.2026 | MIT | GitHub-Konto | Worker | Rückfall |
| Decap CMS | 19,5k | 18.11.2026 | MIT | GitHub-OAuth, Git Gateway abgekündigt | – | abgelehnt (Sveltia ist der kompatible Nachfolger) |
| Pages CMS | 4,3k | 08.06.2026 | MIT | Einladung per E-Mail, Code-Login | gehostet gratis, Betreiber Singapur, Serverort unbekannt | Alternative mit Vorbehalt |
| Keystatic | 2,5k | 17.11.2026 | MIT | GitHub-Konto oder Cloud (3 Nutzer) | braucht Node | abgelehnt für statische Seiten |
| TinaCMS | 13,9k | 24.11.2026 | Apache-2.0 | Tina Cloud | ab 3 Nutzern 24 $/Monat | abgelehnt |
| Static CMS | 585 | archiviert 2024 | MIT | – | – | abgelehnt |

Belege: Sveltia `src/lib/locales/de.yaml` (3207 Zeilen, vollständig), `image/transform.js` (`format: 'webp', quality: 85`, wenn eingeschaltet). Additions-Doku: „no subscription and no usage fees“, „username and password, so people don't need a GitHub account“; Passkeys und 2FA geplant. Pages CMS `lib/auth.ts` nutzt `emailOTP`.

Weitere Wege: Google-Tabelle als CSV beim Bau (nur Terminlisten, keine Bilder, Daten bei Google). Eigenes Formular mit Worker abgelehnt (keine Versionen, keine Rechte).

## Übernommen
Regeln in `plugins/website/skills/bauen/SKILL.md` Abschnitt 7 („Kunden pflegen selbst“).

## Offen
- Wie Laien mit Sveltia zurechtkommen (nicht getestet)
- Additions: EU-Speicherort (Durable-Object-Jurisdiktion), Reife
- Pages CMS: Serverort, AVV
- CloudCannon, Storyblok, Contentful nicht geprüft (kostenpflichtig oder US)
