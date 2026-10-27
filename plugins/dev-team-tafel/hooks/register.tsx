import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Lauf, Tafel } from '../types'

const PANE = 'dev-team-tafel'
const TITEL = 'Dev-Team'
const leer: Tafel = { phase: '', ampel: '', test: '', ergebnisse: [], sperren: [] }

const laeufe = atom({ plugin: 'dev-team-tafel', key: 'laeufe' } as const, [] as Lauf[], { shape: 'laeufe-1' })
const tafel = atom({ plugin: 'dev-team-tafel', key: 'tafel' } as const, leer, { shape: 'tafel-1' })

/** "dev-team:entwickler" → "entwickler" */
export const kurzname = (typ: string): string => typ.replace(/^dev-team:/, '')

/** "claude-sonnet-5-5" → "sonnet" */
export const modellname = (m: string): string => {
  const t = m.toLowerCase()
  for (const n of ['opus', 'sonnet', 'haiku', 'fable', 'mythos']) if (t.includes(n)) return n
  return m || '?'
}

export const dauer = (ms: number): string => {
  const s = Math.max(0, Math.round(ms / 1000))
  return s < 60 ? `${s} s` : s < 3600 ? `${Math.floor(s / 60)} min` : `${Math.floor(s / 3600)} h ${Math.floor((s % 3600) / 60)} min`
}

/** Liest die Tafel-Daten aus den Dateien, die das Dev-Team im Projekt führt. */
export const auswerten = (status: string, log: string, test: string): Tafel => {
  const z = status.split('\n')
  let phase = ''
  const i = z.findIndex(l => /^##\s+Gerade läuft/.test(l))
  if (i >= 0) phase = z.slice(i + 1).find(l => l.trim() !== '')?.trim() ?? ''
  let ampel = ''
  const j = z.findIndex(l => /^##\s+Ampel/.test(l))
  if (j >= 0) ampel = z.slice(j + 1).find(l => l.trim() !== '')?.trim() ?? ''
  const zeilen = log.split('\n').filter(l => l.startsWith('| 20'))
  const zelle = (l: string) => l.split('|').map(s => s.trim())
  const ergebnisse = zeilen
    .filter(l => zelle(l)[2]?.startsWith('■'))
    .slice(-6)
    .reverse()
    .map(l => {
      const c = zelle(l)
      const text = (c[4] ?? '').replace(/\(\[Bericht\]\([^)]*\)\)/, '').replace(/[#*]/g, '').trim()
      return `${c[1]?.slice(11) ?? ''} ${(c[2] ?? '').replace('■', '').trim()} ${c[3]}: ${text}`.slice(0, 160)
    })
  const sperren = zeilen
    .filter(l => zelle(l)[2] === '⛔' || zelle(l)[2] === '⚠')
    .slice(-4)
    .reverse()
    .map(l => {
      const c = zelle(l)
      return `${c[1]?.slice(11) ?? ''} ${c[2]} ${c[3]}: ${c[4] ?? ''}`.slice(0, 140)
    })
  const t = test.split('\n').filter(l => l.startsWith('| 20')).pop()
  let testText = ''
  if (t) {
    const c = zelle(t)
    testText = `${c[4] ?? ''} ${c[5] ?? ''} bestanden, ${c[6] ?? '?'} Fehler · ${c[3] ?? ''} · ${c[1]?.slice(11) ?? ''} (${c[2] ?? ''})`
  }
  return { phase: phase.slice(0, 220), ampel: ampel.slice(0, 120), test: testText, ergebnisse, sperren }
}

const lies = async ($: any, pfad: string): Promise<string> => {
  try {
    return await $.fs.read(pfad)
  } catch {
    return ''
  }
}

const auffrischen = async ($: any) => {
  const [s, l, t] = await Promise.all([
    lies($, 'docs/STATUS.md'),
    lies($, 'docs/AGENTEN_LOG.md'),
    lies($, 'docs/TESTNACHWEIS.md'),
  ])
  const neu = auswerten(s, l, t)
  await update($, tafel, alt => (JSON.stringify(alt) === JSON.stringify(neu) ? alt : neu))
  // Laufende Agenten mit der Liste des Motors abgleichen.
  let liste: { id: string; status: string }[] = []
  try {
    liste = await $.agent.list()
  } catch {
    return
  }
  const jetzt = Date.now()
  await update($, laeufe, alt => {
    let geaendert = false
    const neu2 = alt.map(x => {
      if (x.status !== 'laeuft') return x
      const a = liste.find(y => y.id === x.id)
      if (a && ['pending', 'running', 'waiting'].includes(a.status)) return x
      if (!a && jetzt - x.start < 15000) return x
      geaendert = true
      const st: Lauf['status'] = a && (a.status === 'failed' || a.status === 'killed') ? 'abgebrochen' : 'fertig'
      return { ...x, status: st, ende: jetzt }
    })
    return geaendert ? neu2 : alt
  })
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'tafel', description: 'Dev-Team-Tafel öffnen: wer gerade arbeitet' })
    void $.ui.open({ id: PANE, title: TITEL })
    void auffrischen($)
    $.clock.every(5000, () => void auffrischen($))
    return next(e)
  })

  on('command.run', { command: 'tafel' }, async $ => {
    await $.ui.open({ id: PANE, title: TITEL })
    await auffrischen($)
    return { text: 'Dev-Team-Tafel geöffnet.' }
  })

  on('agent.spawn', async ($, e, next) => {
    const r = await next(e)
    if (r.deny === undefined && r.agentId) {
      const lauf: Lauf = {
        id: r.agentId,
        agent: kurzname(e.subagentType),
        beschreibung: (e.description ?? '').slice(0, 80),
        modell: modellname(r.model ?? ''),
        start: Date.now(),
        status: 'laeuft',
      }
      try {
        await update($, laeufe, alt => [...alt.filter(x => x.id !== lauf.id), lauf].slice(-60))
      } catch {
        // Anzeige nicht möglich: Start trotzdem durchlassen.
      }
    }
    return r
  }).catch((_, e, next) => next(e)) // die Tafel darf nie einen Agentenstart verhindern

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text } = $.ui.resolve(e)
    const alle = await read($, laeufe)
    const t = await read($, tafel)
    const jetzt = Date.now()
    const aktiv = alle.filter(x => x.status === 'laeuft')
    const fertig = alle.filter(x => x.status !== 'laeuft').slice(-5).reverse()
    return (
      <Box flexDirection="column">
        {t.phase !== '' && <Text bold wrap="wrap">{t.phase}</Text>}
        {t.ampel !== '' && <Text wrap="wrap">{t.ampel}</Text>}
        <Text bold>Arbeitet gerade ({aktiv.length})</Text>
        {aktiv.length === 0 && <Text dimColor>Niemand – der Projektleiter ist dran oder wartet.</Text>}
        {aktiv.map(x => (
          <Text wrap="truncate-end">
            ⏳ {x.agent} · {x.modell} · {dauer(jetzt - x.start)} · {x.beschreibung}
          </Text>
        ))}
        {fertig.length > 0 && <Text bold>Zuletzt fertig</Text>}
        {fertig.map(x => (
          <Text dimColor wrap="truncate-end">
            {x.status === 'fertig' ? '✓' : '✗'} {x.agent} · {x.modell} · {dauer((x.ende ?? jetzt) - x.start)} · {x.beschreibung}
          </Text>
        ))}
        {t.ergebnisse.length > 0 && <Text bold>Ergebnisse (Agenten-Log)</Text>}
        {t.ergebnisse.map(z => (
          <Text wrap="truncate-end">{z}</Text>
        ))}
        {t.sperren.length > 0 && <Text bold>Sperren und Warnungen</Text>}
        {t.sperren.map(z => (
          <Text color="warning" wrap="truncate-end">{z}</Text>
        ))}
        {t.test !== '' && <Text bold>Letzter Testnachweis</Text>}
        {t.test !== '' && <Text wrap="truncate-end">{t.test}</Text>}
      </Box>
    )
  })
}
