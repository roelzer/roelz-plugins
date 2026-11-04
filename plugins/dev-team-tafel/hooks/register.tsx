import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Lauf, Tafel } from '../types'

const PANE = 'dev-team-tafel'
const TITEL = 'Dev-Team'
const leer: Tafel = { kasten: [], angehalten: '', durchlauf: false, fragen: 0, nurSimon: 0, phase: '', ampel: '', test: '', ergebnisse: [], sperren: [] }

const laeufe = atom({ plugin: 'dev-team-tafel', key: 'laeufe' } as const, [] as Lauf[], { shape: 'laeufe-1' })
const tafel = atom({ plugin: 'dev-team-tafel', key: 'tafel' } as const, leer, { shape: 'tafel-3' })

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

/** "> **Jetzt:** P3 baut · **Als Nächstes:** P4" → [["Jetzt", "P3 baut"], ["Als Nächstes", "P4"]] */
export const kasten = (status: string): [string, string][] => {
  const zeile = status.split('\n').find(l => /^>\s*\*\*Jetzt:\*\*/.test(l))
  if (!zeile) return []
  return zeile
    .replace(/^>\s*/, '')
    .split(/\s+·\s+(?=\*\*)/)
    .map(teil => /^\*\*([^*]+?):\*\*\s*(.*)$/.exec(teil.trim()))
    .filter((m): m is RegExpExecArray => m !== null && !/^\[.*\]$/.test(m[2].trim()))
    .map(m => [m[1].trim(), m[2].trim().slice(0, 160)] as [string, string])
}

/** Offene Fragen: Listenpunkte in docs/OFFENE_FRAGEN.md, die nicht als erledigt markiert sind (ohne „Nur Simon“). */
export const offeneFragen = (text: string): number => {
  let nurSimon = false
  let n = 0
  for (const l of text.split('\n')) {
    if (/^#{1,3}\s/.test(l)) nurSimon = /nur simon/i.test(l)
    else if (!nurSimon && /^\s*[-*]\s+(?!\[[ xX]\])\S/.test(l) && !/~~|✅|erledigt|beantwortet|entschieden/i.test(l) && !/:\*\*\s*\[[^\]]+\]/.test(l)) n++
  }
  return n
}

/** „Nur Simon“-Liste: offene Kästchen `- [ ]` (Vorlagenzeile mit eckigen Platzhaltern zählt nicht). */
export const nurSimonOffen = (text: string): number =>
  text.split('\n').filter(l => /^\s*[-*]\s+\[ \]\s+(?!\[)/.test(l)).length

/** Liest die Tafel-Daten aus den Dateien, die das Dev-Team im Projekt führt. */
export const auswerten = (status: string, log: string, test: string, fragen = '', durchlauf = false): Tafel => {
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
      const text = (c[4] ?? '').replace(/\(\[Bericht\]\([^)]*\)\)/, '').replace(/[#*]/g, '').trim().replace(/^[🟢🟡🔴]\s*/u, '')
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
  let angehalten = ''
  if (ampel.includes('🔴')) {
    const k = z.findIndex(l => /^##\s+Angehalten/.test(l))
    const grund = k >= 0 ? z.slice(k + 1).find(l => l.trim() !== '' && !l.startsWith('#') && !/^\(nur bei/.test(l.trim())) : ''
    angehalten = (grund ?? '').trim().slice(0, 220) || 'Ampel rot – siehe docs/STATUS.md'
  }
  return {
    kasten: kasten(status),
    angehalten,
    durchlauf,
    fragen: offeneFragen(fragen),
    nurSimon: nurSimonOffen(fragen),
    phase: phase.slice(0, 220),
    ampel: ampel.slice(0, 120),
    test: testText,
    ergebnisse,
    sperren,
  }
}

const lies = async ($: any, pfad: string): Promise<string> => {
  try {
    return await $.fs.read(pfad)
  } catch {
    return ''
  }
}

const da = async ($: any, pfad: string): Promise<boolean> => {
  try {
    return await $.fs.exists(pfad)
  } catch {
    return false
  }
}

const auffrischen = async ($: any) => {
  const [s1, s2, l, t, f, d] = await Promise.all([
    lies($, 'docs/STATUS.md'),
    lies($, 'docs/status.md'), // unter Linux (Cloud) zählt die Schreibweise
    lies($, 'docs/AGENTEN_LOG.md'),
    lies($, 'docs/TESTNACHWEIS.md'),
    lies($, 'docs/OFFENE_FRAGEN.md'),
    da($, '.dev-team/durchlauf'),
  ])
  const neu = auswerten(s1 || s2, l, t, f, d)
  await update($, tafel, alt => (JSON.stringify(alt) === JSON.stringify(neu) ? alt : neu))
  // Kurzzeile in der Statusleiste, auch wenn die Tafel zu ist
  try {
    const fortschritt = neu.kasten.find(([k]) => k === 'Fortschritt')?.[1] ?? ''
    const kurz = neu.angehalten !== '' ? '🔴 braucht dich' : `${neu.ampel.slice(0, 2)}${fortschritt !== '' ? ' ' + fortschritt : ''}`
    $.ui.status(s1 || s2 ? `Dev-Team: ${kurz.trim() || 'läuft'}${neu.fragen > 0 ? ` · ${neu.fragen} Fragen` : ''}` : undefined)
  } catch {
    // ohne Statusleiste weiter
  }
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

/** Gesamtzustand für den Kopf der Tafel. */
export const zustand = (t: Tafel, aktiv: number): { zeichen: string; text: string; farbe: string } => {
  if (t.angehalten !== '') return { zeichen: '●', text: 'Braucht dich', farbe: 'error' }
  if (t.ampel.includes('🔴')) return { zeichen: '●', text: 'Angehalten', farbe: 'error' }
  if (t.ampel.includes('🟡') || t.fragen > 0) return { zeichen: '●', text: aktiv > 0 ? 'Läuft · offene Punkte' : 'Offene Punkte', farbe: 'warning' }
  if (aktiv > 0 || t.durchlauf) return { zeichen: '●', text: 'Läuft', farbe: 'success' }
  return { zeichen: '○', text: 'Bereit', farbe: 'subtle' }
}

/** "3 von 5 Paketen gemergt" → { anteil: 0.6, text: "3 / 5" } */
export const fortschritt = (text: string): { anteil: number; text: string } | null => {
  const m = /(\d+)\s*(?:von|\/|of)\s*(\d+)/.exec(text)
  if (!m) return null
  const n = Number(m[1])
  const g = Number(m[2])
  if (!g) return null
  return { anteil: Math.max(0, Math.min(1, n / g)), text: `${n} / ${g}` }
}

/** Balken aus Blockzeichen – sieht auf jeder Oberfläche gleich aus. */
export const balken = (anteil: number, breite: number): string => {
  const voll = Math.round(anteil * breite)
  return '━'.repeat(voll) + '╌'.repeat(Math.max(0, breite - voll))
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
    // Zeichenbalken: im Terminal so breit wie die Tafel, sonst fest (Proportionalschrift)
    const breite = e.surface === 'terminal' ? Math.max(12, Math.min(40, (e.props?.bodyColumns ?? 40) - 12)) : 22
    const aktiv = alle.filter(x => x.status === 'laeuft')
    const fertig = alle.filter(x => x.status !== 'laeuft').slice(-4).reverse()
    const lage = zustand(t, aktiv.length)
    const feld = (k: string) => t.kasten.find(([n]) => n === k)?.[1] ?? ''
    const fort = fortschritt(feld('Fortschritt'))
    const weitere = t.kasten.filter(([k]) => k !== 'Fortschritt')

    const abschnitt = (titel: string, anzahl?: number) => (
      <Box marginTop={1} gap={1}>
        <Text size="caption" weight="semibold" color="subtle">
          {titel.toUpperCase()}
        </Text>
        {anzahl !== undefined && (
          <Text size="caption" color="subtle" tabular>
            {String(anzahl)}
          </Text>
        )}
      </Box>
    )
    const zeile = (links: any, rechts: string, key: string) => (
      <Box key={key} justifyContent="space-between" gap={1}>
        <Box flexShrink={1}>{links}</Box>
        <Text size="footnote" color="subtle" tabular>
          {rechts}
        </Text>
      </Box>
    )

    return (
      <Box flexDirection="column" paddingX={1}>
        {/* Kopf: Titel und Zustand */}
        <Box justifyContent="space-between" alignItems="center">
          <Text size="heading" weight="bold">
            Dev-Team
          </Text>
          <Text weight="semibold" color={lage.farbe}>
            {lage.zeichen} {lage.text}
          </Text>
        </Box>
        {t.durchlauf && (
          <Text size="caption" color="subtle">
            Durchlauf aktiv · arbeitet ohne Nachfragen
          </Text>
        )}

        {/* Braucht dich: die wichtigste Nachricht steht immer oben */}
        {(t.angehalten !== '' || t.fragen > 0) && (
          <Box flexDirection="column" marginTop={1} borderStyle="round" borderColor={t.angehalten !== '' ? 'error' : 'warning'} paddingX={1}>
            {t.angehalten !== '' && (
              <Text size="caption" weight="semibold" color="error">
                DEINE ENTSCHEIDUNG
              </Text>
            )}
            {t.angehalten !== '' && (
              <Text weight="semibold" wrap="wrap">
                {t.angehalten}
              </Text>
            )}
            {t.fragen > 0 && (
              <Text color="warning" weight="semibold">
                {t.fragen === 1 ? '1 offene Frage an dich' : `${t.fragen} offene Fragen an dich`}
              </Text>
            )}
            {t.fragen > 0 && (
              <Text size="caption" color="subtle">
                docs/OFFENE_FRAGEN.md
              </Text>
            )}
          </Box>
        )}
        {t.nurSimon > 0 && t.angehalten === '' && t.fragen === 0 && (
          <Box flexDirection="column" marginTop={1} borderStyle="round" borderColor="subtle" paddingX={1}>
            <Text weight="semibold">{t.nurSimon === 1 ? '1 Punkt nur für dich' : `${t.nurSimon} Punkte nur für dich`}</Text>
            <Text size="caption" color="subtle">
              „Nur Simon“ in docs/OFFENE_FRAGEN.md · hält den Lauf nicht an
            </Text>
          </Box>
        )}

        {/* Fortschritt */}
        {fort !== null && abschnitt('Fortschritt')}
        {fort !== null && (
          <Box gap={1} alignItems="center">
            <Text color={t.angehalten !== '' ? 'error' : 'success'}>{balken(fort.anteil, breite)}</Text>
            <Text size="footnote" weight="semibold" tabular>
              {fort.text}
            </Text>
          </Box>
        )}

        {/* Stand-Kasten */}
        {weitere.length > 0 && abschnitt('Stand')}
        {weitere.map(([k, v]) => (
          <Box key={'k-' + k} flexDirection="column">
            <Text size="caption" color="subtle">
              {k}
            </Text>
            <Text wrap="wrap">{v}</Text>
          </Box>
        ))}
        {weitere.length === 0 && t.phase !== '' && (
          <Text wrap="wrap" color="subtle">
            {t.phase}
          </Text>
        )}

        {/* Wer arbeitet */}
        {abschnitt('Arbeitet gerade', aktiv.length)}
        {aktiv.length === 0 && (
          <Text size="footnote" color="subtle">
            Gerade kein Agent – der Projektleiter arbeitet selbst oder wartet.
          </Text>
        )}
        {aktiv.map(x =>
          zeile(
            <Text wrap="truncate-end">
              <Text color="claude">● </Text>
              <Text weight="semibold">{x.agent}</Text>
              <Text color="subtle">
                {' '}
                · {x.modell} · {x.beschreibung}
              </Text>
            </Text>,
            dauer(jetzt - x.start),
            'a-' + x.id,
          ),
        )}

        {/* Zuletzt fertig */}
        {fertig.length > 0 && abschnitt('Zuletzt fertig')}
        {fertig.map(x =>
          zeile(
            <Text wrap="truncate-end">
              <Text color={x.status === 'fertig' ? 'success' : 'error'}>{x.status === 'fertig' ? '✓ ' : '✗ '}</Text>
              <Text>{x.agent}</Text>
              <Text color="subtle"> · {x.beschreibung}</Text>
            </Text>,
            dauer((x.ende ?? jetzt) - x.start),
            'f-' + x.id,
          ),
        )}

        {/* Ergebnisse mit Ampel aus dem Agenten-Protokoll */}
        {t.ergebnisse.length > 0 && abschnitt('Ergebnisse')}
        {t.ergebnisse.slice(0, 4).map((z, i) => (
          <Text key={'e-' + i} size="footnote" wrap="truncate-end">
            {z}
          </Text>
        ))}

        {/* Sperren und Warnungen */}
        {t.sperren.length > 0 && (
          <Box flexDirection="column" marginTop={1} borderStyle="round" borderColor="warning" paddingX={1}>
            <Text size="caption" weight="semibold" color="warning">
              SPERREN UND WARNUNGEN
            </Text>
            {t.sperren.map((z, i) => (
              <Text key={'s-' + i} size="footnote" wrap="truncate-end">
                {z}
              </Text>
            ))}
          </Box>
        )}

        {/* Tests */}
        {t.test !== '' && abschnitt('Tests')}
        {t.test !== '' && (
          <Text size="footnote" wrap="truncate-end">
            {t.test}
          </Text>
        )}
      </Box>
    )
  })
}
