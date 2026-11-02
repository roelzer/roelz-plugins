import { expect, test } from 'claude-code/testing'

import { auswerten, balken, fortschritt, kasten, kurzname, modellname, offeneFragen, zustand } from './register'

const PANE = {
  plugin: 'dev-team-tafel',
  component: 'Pane',
  requestId: 'dev-team-tafel',
  props: {
    title: 'Dev-Team',
    isFocused: false,
    bodyColumns: 60,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 30 },
    view: {},
  },
} as const

test('Namen und Modelle werden kurz angezeigt', async () => {
  expect(kurzname('dev-team:entwickler')).toBe('entwickler')
  expect(modellname('claude-sonnet-5-5')).toBe('sonnet')
  expect(modellname('opus')).toBe('opus')
})

test('Status, Log und Testnachweis werden gelesen', async () => {
  const status = '# Status\n\n## Gerade läuft\nPhase 7: Bauen – P3 ⏳\n\n## Ampel\n🟢 läuft\n'
  const log =
    '| Zeit | | Agent | Auftrag |\n|---|---|---|---|\n' +
    '| 2026-10-27 10:00 | ▶ | entwickler | P3 |\n' +
    '| 2026-10-27 10:05 | ⛔ | entwickler | Schreiben außerhalb des Worktrees |\n' +
    '| 2026-10-27 10:09 | ■ 🟢 | reviewer | 🟢 Paket P2 sauber ([Bericht](docs/pruefberichte/x.md)) |\n'
  const test = '| 2026-10-27 10:10 | abc123 | tester | 🟢 | 42 | 0 | – |\n'
  const t = auswerten(status, log, test)
  expect(t.phase).toBe('Phase 7: Bauen – P3 ⏳')
  expect(t.ampel).toBe('🟢 läuft')
  expect(t.ergebnisse.length).toBe(1)
  expect(t.ergebnisse[0]).toBe('10:09 🟢 reviewer: Paket P2 sauber')
  expect(t.sperren[0]).toBe('10:05 ⛔ entwickler: Schreiben außerhalb des Worktrees')
  expect(t.test).toBe('🟢 42 bestanden, 0 Fehler · tester · 10:10 (abc123)')
})

test('Stand-Kasten, Halt und offene Fragen', async () => {
  const status =
    '# Status\n\n> **Jetzt:** P3 im Review · **Zuletzt fertig:** P2 🟢 · **Als Nächstes:** P4 · **Geschätzt fertig:** [Meilenstein – Uhrzeit/Tag] · **Fortschritt:** 2 von 5 Paketen gemergt\n\n' +
    '## Ampel\n🔴 angehalten\n\n## Angehalten wegen\n(nur bei 🔴) Was ist passiert\nReferenzfall F3 rot, Simon entscheidet\n'
  expect(kasten(status)).toEqual([
    ['Jetzt', 'P3 im Review'],
    ['Zuletzt fertig', 'P2 🟢'],
    ['Als Nächstes', 'P4'],
    ['Fortschritt', '2 von 5 Paketen gemergt'],
  ])
  const t = auswerten(status, '', '', '- **Q1** Farbe?\n- ~~Q2~~ erledigt\n- Q3 Logo? ✅\n', true)
  expect(t.angehalten).toBe('Referenzfall F3 rot, Simon entscheidet')
  expect(t.fragen).toBe(1)
  expect(t.durchlauf).toBe(true)
  expect(offeneFragen('')).toBe(0)
})

test('ein gestarteter Agent erscheint auf der Tafel, auf jeder Oberfläche', async ($, on) => {
  on('command.register', () => ({ value: { command: 'tafel' } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('clock.every', () => ({ value: undefined }))
  on('fs.read', () => {
    throw new Error('fehlt')
  })
  on('agent.list', () => ({ value: [{ id: 'a1', type: 'dev-team:entwickler', description: 'P3', status: 'running' }] }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('agent.spawn', () => ({ model: 'claude-sonnet-5-5', agentId: 'a1' }))

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  await $.agent.spawn({ prompt: 'x', description: 'P3 Rechenkern', subagentType: 'dev-team:entwickler' })

  for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    const zeile = await ui.find({ type: 'Text', text: /entwickler/ })
    expect(zeile?.text.includes('entwickler')).toBe(true)
    expect(zeile?.text.includes('sonnet')).toBe(true)
    await ui.unmount()
  }
})

test('leere Tafel ohne Projektdateien', async ($, on) => {
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  const zeile = await ui.find({ type: 'Text', text: /kein Agent/ })
  expect(zeile !== undefined).toBe(true)
  await ui.unmount()
})

test('angehaltener Lauf steht oben, auf jeder Oberfläche', async ($, on) => {
  on('command.register', () => ({ value: { command: 'tafel' } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('clock.every', () => ({ value: undefined }))
  on('ui.status', () => ({ value: undefined }))
  on('fs.exists', () => ({ value: false }))
  on('agent.list', () => ({ value: [] }))
  on('fs.read', (_, e) => {
    if (String(e.path).toLowerCase().endsWith('docs/status.md')) {
      return { value: '> **Jetzt:** wartet · **Fortschritt:** 3 von 5\n\n## Ampel\n🔴 angehalten\n\n## Angehalten wegen\nZahlung freigeben\n' }
    }
    throw new Error('fehlt')
  })
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  await $.command.run({ command: 'tafel' } as any)
  for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    const kopf = await ui.find({ type: 'Text', text: /Braucht dich/ })
    expect(kopf !== undefined).toBe(true)
    const zeile = await ui.find({ type: 'Text', text: /Zahlung freigeben/ })
    expect(zeile !== undefined).toBe(true)
    await ui.unmount()
  }
})

test('Fortschritt, Balken und Zustand', async () => {
  expect(fortschritt('3 von 5 Paketen gemergt')).toEqual({ anteil: 0.6, text: '3 / 5' })
  expect(fortschritt('noch offen')).toBe(null)
  expect(balken(0.5, 10)).toBe('━━━━━╌╌╌╌╌')
  const leer = auswerten('', '', '')
  expect(zustand(leer, 0).text).toBe('Bereit')
  expect(zustand({ ...leer, durchlauf: true }, 0).text).toBe('Läuft')
  expect(zustand({ ...leer, angehalten: 'x' }, 2).text).toBe('Braucht dich')
})
