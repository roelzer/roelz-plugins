# Freigaben
#
# Diese Datei bearbeitet NUR Simon von Hand (z. B. in VS Code). Claude kann sie nicht schreiben.
# Eine Freigabe zählt für die Test-Schranke nur, wenn ihr Stichwort hier GENAU so steht
# und die Spalte "Geltung" den betroffenen Pfad bzw. die Prüfung nennt.
#
# Format, eine Zeile je Freigabe (Zeilen mit # zählen nicht):
#   Datum | Stichwort | Geltung | Grund
#
# Geltung = Pfade oder Muster (durch Komma getrennt), oder die Prüfungen
#   testzahl      (weniger Tests als beim letzten grünen Lauf ist erlaubt)
#   uebersprungen (übersprungene Tests sind erlaubt)
#
# Beispiele (zum Benutzen das # am Zeilenanfang entfernen):
# 2026-10-26 | rohrtabelle-2026 | tests/referenz/fall3.json, tests/referenz/fall4.json | Neue Herstellertabelle
# 2026-10-26 | alte-api-raus | tests/test_alt_api.py, testzahl | Alte Schnittstelle entfernt, Tests entfallen
#
# Ablage im Projekt: .claude/freigaben.md
