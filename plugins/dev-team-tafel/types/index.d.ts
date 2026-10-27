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
