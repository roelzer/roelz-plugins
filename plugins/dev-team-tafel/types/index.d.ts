export type Lauf = {
  id: string
  agent: string
  beschreibung: string
  modell: string
  start: number
  ende?: number
  status: 'laeuft' | 'fertig' | 'abgebrochen'
}

export type Tafel = {
  /** Kasten oben in docs/STATUS.md: [Bezeichnung, Wert] (Jetzt, Zuletzt fertig, Als Nächstes, Geschätzt fertig, Fortschritt) */
  kasten: [string, string][]
  /** Grund aus „Angehalten wegen“, wenn die Ampel rot ist – dann braucht der Lauf Simon */
  angehalten: string
  /** .dev-team/durchlauf vorhanden: der Auftrag läuft ohne Nachfragen durch */
  durchlauf: boolean
  /** offene Fragen und Freigaben an Simon laut docs/OFFENE_FRAGEN.md */
  fragen: number
  /** offene Punkte der „Nur Simon“-Liste (- [ ]), halten den Lauf nicht an */
  nurSimon: number
  phase: string
  ampel: string
  test: string
  ergebnisse: string[]
  sperren: string[]
}

declare module 'claude-code' {
  interface PluginState {
    'dev-team-tafel': { laeufe: Shaped<Lauf[]>; tafel: Shaped<Tafel> }
  }
}
