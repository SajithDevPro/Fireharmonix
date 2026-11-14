'use client'

import { useState } from 'react'
import { MONTHS, DAYS, same } from '../lib/constants'
import { PrevIcon, NextIcon } from './Icons'

/**
 * Month calendar used by the From / To pickers.
 * Future days are disabled (satellite data can't exist yet), as are days before `min`.
 */
export default function Calendar({ from, to, min, initial, onPick }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const base = initial || today
  const [view, setView] = useState(new Date(base.getFullYear(), base.getMonth(), 1))

  const y = view.getFullYear()
  const m = view.getMonth()
  const start = new Date(y, m, 1 - new Date(y, m, 1).getDay())
  const atCurrentMonth = y === today.getFullYear() && m === today.getMonth()

  const cells = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    const other = d.getMonth() !== m
    const off = other || d > today || (min && d < min)
    const selected = !other && (same(d, from) || same(d, to))
    const inRange = !other && from && to && d > from && d < to
    const cls = ['day', same(d, today) && 'today', selected && 'sel', inRange && 'range']
      .filter(Boolean)
      .join(' ')
    cells.push(
      <button key={i} type="button" className={cls} disabled={off} onClick={() => onPick(d)}>
        {d.getDate()}
      </button>
    )
  }

  return (
    <>
      <div className="cal-head">
        <button
          type="button"
          className="cal-nav"
          aria-label="Previous month"
          onClick={() => setView(new Date(y, m - 1, 1))}
        >
          <PrevIcon />
        </button>
        <strong>{MONTHS[m]} {y}</strong>
        <button
          type="button"
          className="cal-nav"
          aria-label="Next month"
          disabled={atCurrentMonth}
          onClick={() => setView(new Date(y, m + 1, 1))}
        >
          <NextIcon />
        </button>
      </div>
      <div className="cal-week">
        {DAYS.map((d) => <span key={d}>{d}</span>)}
      </div>
      <div className="cal-days">{cells}</div>
    </>
  )
}
