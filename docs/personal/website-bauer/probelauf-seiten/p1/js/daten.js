/* =====================================================================
   INHALTE DER WEBSITE – hier pflegen, ohne HTML anfassen zu müssen.
   ---------------------------------------------------------------------
   So geht's:
   - Text zwischen Anführungszeichen "…" ändern, Kommas am Zeilenende stehen lassen.
   - Neue Neuigkeit: einen Block { … } bei "neuigkeiten" oben einfügen (neueste zuerst).
   - Datei speichern, Seite im Browser neu laden – fertig.
   ALLES, WAS HIER STEHT, IST EIN ENTWURF (Annahmen, Beispiele, Platzhalter).
   Bitte vor dem Veröffentlichen durch echte Angaben ersetzen und dann
   "entwurf" auf false setzen – dann verschwindet der gelbe Hinweis oben.
   ===================================================================== */

window.JFG = {
  entwurf: true,

  verein: {
    name: "JFG Seenland",
    saison: "2026/27",
    // Platzhalter: echte Ortsnamen der drei Stammvereine eintragen
    orte: ["Ort A", "Ort B", "Ort C"],
    stammvereine: ["SV Ort A", "TSV Ort B", "FC Ort C"],
    kinder: "180",
    // Platzhalter-Adresse (Endung .example ist absichtlich nicht echt)
    email: "jugend@jfg-seenland.example",
    telefon: "",            // z. B. "0123 456789" – leer lassen, wenn keins angezeigt werden soll
    instagram: ""           // z. B. "https://www.instagram.com/…" – leer = wird nicht angezeigt
  },

  // Eine Zeile je Mannschaft. "farbe" steuert die Kartenfarbe (hell = jung, dunkel = alt).
  mannschaften: [
    { id: "u9",  name: "U9",  klasse: "F-Jugend", jahrgang: "2018/2019", trainer: "Trainerteam folgt", motto: "Ball am Fuß, Spaß im Kopf. Hier fängt alles an.", farbe: "#d4ff3f" },
    { id: "u11", name: "U11", klasse: "E-Jugend", jahrgang: "2016/2017", trainer: "Trainerteam folgt", motto: "Dribbeln, passen, jubeln – und zusammen gewinnen lernen.", farbe: "#a6f06a" },
    { id: "u13", name: "U13", klasse: "D-Jugend", jahrgang: "2014/2015", trainer: "Trainerteam folgt", motto: "Großes Feld, große Schritte. Jetzt wird's taktisch.", farbe: "#5fe0c4" },
    { id: "u15", name: "U15", klasse: "C-Jugend", jahrgang: "2012/2013", trainer: "Trainerteam folgt", motto: "Tempo, Technik, Teamgeist. Elf gegen elf.", farbe: "#3cc6d6" },
    { id: "u17", name: "U17", klasse: "B-Jugend", jahrgang: "2010/2011", trainer: "Trainerteam folgt", motto: "Kopf hoch, Gas geben. Der Schritt Richtung Herren.", farbe: "#3d8fd6" },
    { id: "u19", name: "U19", klasse: "A-Jugend", jahrgang: "2008/2009", trainer: "Trainerteam folgt", motto: "Die Großen. Vorbild für alle, die nachkommen.", farbe: "#8a8cff" }
  ],

  // Trainingszeiten. tag: 1 = Montag … 5 = Freitag, 6 = Samstag.
  // BEISPIELZEITEN – bitte durch die echten Zeiten ersetzen.
  training: [
    { team: "u11", tag: 1, von: "17:00", bis: "18:30", ort: "Sportplatz Ort B" },
    { team: "u15", tag: 1, von: "18:00", bis: "19:30", ort: "Sportplatz Ort A" },
    { team: "u9",  tag: 2, von: "17:00", bis: "18:15", ort: "Sportplatz Ort A" },
    { team: "u13", tag: 2, von: "17:30", bis: "19:00", ort: "Sportplatz Ort C" },
    { team: "u17", tag: 2, von: "18:30", bis: "20:00", ort: "Sportplatz Ort B" },
    { team: "u15", tag: 3, von: "18:00", bis: "19:30", ort: "Sportplatz Ort A" },
    { team: "u19", tag: 3, von: "19:00", bis: "20:30", ort: "Sportplatz Ort C" },
    { team: "u11", tag: 4, von: "17:00", bis: "18:30", ort: "Sportplatz Ort B" },
    { team: "u13", tag: 4, von: "17:30", bis: "19:00", ort: "Sportplatz Ort C" },
    { team: "u9",  tag: 5, von: "16:30", bis: "17:45", ort: "Sportplatz Ort A" },
    { team: "u17", tag: 5, von: "18:00", bis: "19:30", ort: "Sportplatz Ort B" },
    { team: "u19", tag: 5, von: "19:00", bis: "20:30", ort: "Sportplatz Ort C" }
  ],
  trainingHinweis: "Im Winter trainieren wir zum Teil in der Halle. Die Hallenzeiten geben die Trainer in der Mannschaftsgruppe bekannt.",

  // Neuigkeiten – neueste zuerst. datum im Format JJJJ-MM-TT.
  // BEISPIELTEXTE – durch echte Meldungen ersetzen.
  neuigkeiten: [
    {
      datum: "2026-11-10",
      rubrik: "Verein",
      titel: "Ab in die Halle: So läuft das Wintertraining",
      text: "Wenn es draußen dunkel und nass wird, ziehen die jüngeren Jahrgänge in die Halle um. Welche Mannschaft wann wo trainiert, erfahrt ihr von euren Trainern."
    },
    {
      datum: "2026-10-24",
      rubrik: "Camp",
      titel: "Danke fürs Herbstferien-Camp!",
      text: "Drei Tage Fußball, Pommes und Elfmeterkönig – ein großes Dankeschön an alle Helferinnen und Helfer aus den drei Orten."
    },
    {
      datum: "2026-10-02",
      rubrik: "Mitmachen",
      titel: "Wir suchen Verstärkung an der Seitenlinie",
      text: "Du hast Lust, eine Mannschaft mitzutrainieren? Vorkenntnisse brauchst du nicht – wir helfen beim Einstieg und bei der Trainerlizenz."
    },
    {
      datum: "2026-09-12",
      rubrik: "Saison",
      titel: "Anpfiff zur Saison 2026/27",
      text: "Alle Mannschaften sind in die neue Saison gestartet. Die Spielpläne findet ihr bei euren Trainern und auf fussball.de."
    }
  ],

  // Häufige Fragen von Eltern
  fragen: [
    { f: "Ab welchem Alter kann mein Kind mitmachen?", a: "Bei uns geht es mit der U9 los, also mit Kindern, die im Jahr des Saisonstarts 7 oder 8 Jahre alt werden. Für Jüngere fragt bitte direkt bei den Stammvereinen nach." },
    { f: "Was kostet das?", a: "Das Probetraining ist kostenlos. Wer dauerhaft mitspielt, wird Mitglied in einem der drei Stammvereine – den Beitrag legt der jeweilige Verein fest." },
    { f: "Was muss mein Kind mitbringen?", a: "Sportkleidung, Turnschuhe und eine Trinkflasche reichen für den Anfang. Fußballschuhe und Schienbeinschoner kommen später dazu." },
    { f: "Spielen auch Mädchen bei euch?", a: "Ja, klar! Mädchen und Jungen trainieren und spielen bei uns gemeinsam." },
    { f: "Was ist eigentlich eine JFG?", a: "JFG heißt Jugendfördergemeinschaft. Die Jugendabteilungen mehrerer Vereine schließen sich zusammen, damit es in jedem Jahrgang genug Kinder für eine eigene Mannschaft gibt. Die Kinder bleiben Mitglied in ihrem Heimatverein." },
    { f: "Wie kommt mein Kind zum Training in den anderen Ort?", a: "Viele Eltern bilden Fahrgemeinschaften. Die Trainer helfen gern, Kontakte herzustellen." }
  ]
};
