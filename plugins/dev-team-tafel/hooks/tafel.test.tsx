import { expect, test } from 'claude-code/testing'

import { auswerten, kurzname, modellname } from './register'

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
  expect(t.ergebnisse[0]).toBe('10:09 🟢 reviewer: 🟢 Paket P2 sauber')
  expect(t.sperren[0]).toBe('10:05 ⛔ entwickler: Schreiben außerhalb des Worktrees')
  expect(t.test).toBe('🟢 42 bestanden, 0 Fehler · tester · 10:10 (abc123)')
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
    expect(zeile?.text.startsWith('⏳ entwickler · sonnet')).toBe(true)
    await ui.unmount()
  }
})

test('leere Tafel ohne Projektdateien', async ($, on) => {
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  const zeile = await ui.find({ type: 'Text', text: /Niemand/ })
  expect(zeile !== undefined).toBe(true)
  await ui.unmount()
})
