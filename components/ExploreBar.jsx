'use client'

import { useEffect, useState } from 'react'
import Calendar from './Calendar'
import { REGIONS, SENSORS, fmt, iso } from '../lib/constants'

/** One cell of the bar: label + value, with a popup that opens above it. */
function Field({ id, label, value, has, open, onToggle, kind, children }) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (open) setSeen(true)
  }, [open])

  return (
    <div className="field" data-pop onClick={() => onToggle(id)}>
      <span className="lbl">{label}</span>
      <button type="button" className={`val${has ? ' has' : ''}`}>{value}</button>
      <div
        className={`pop ${kind === 'cal' ? 'pop-cal' : 'pop-list'}${open ? ' open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(open || seen) && children}
      </div>
    </div>
  )
}

export default function ExploreBar() {
  const [openKey, setOpenKey] = useState(null)
  const [regions, setRegions] = useState(() => new Set(REGIONS))
  const [sensors, setSensors] = useState(() => new Set(SENSORS.map((s) => s.name)))
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)

  const toggle = (id) => setOpenKey((k) => (k === id ? null : id))

  useEffect(() => {
    const onDoc = (e) => {
      if (!e.target.closest('.field[data-pop]')) setOpenKey(null)
    }
    const onKey = (e) => e.key === 'Escape' && setOpenKey(null)
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const pick = (key, d) => {
    if (key === 'from') {
      setFrom(d)
      const resetTo = to && to < d
      if (resetTo) setTo(null)
      setOpenKey(!to || resetTo ? 'to' : null) // jump straight to "To"
    } else {
      setTo(d)
      setOpenKey(null)
    }
  }

  const toggleIn = (set, setter, value, on) => {
    const next = new Set(set)
    on ? next.add(value) : next.delete(value)
    setter(next)
  }

  const allRegions = regions.size === REGIONS.length
  const regionText =
    regions.size === 0 || allRegions
      ? 'All regions'
      : regions.size <= 2
        ? [...regions].join(', ')
        : `${regions.size} regions`
  const sensorText =
    sensors.size === 0 || sensors.size === SENSORS.length ? 'MODIS + VIIRS' : [...sensors][0]

  const onSubmit = (e) => {
    e.preventDefault()
    const query = {
      regions: regions.size === 0 || allRegions ? 'World (all regions)' : [...regions],
      from: iso(from),
      to: iso(to),
      sensors: sensors.size ? [...sensors] : SENSORS.map((s) => s.name),
    }
    // Hook your search / map page up here
    console.log('Explore', query)
    window.location.hash = 'explore'
  }

  return (
    <form className="booking" onSubmit={onSubmit}>
      <div className="bar">
        <Field id="region" label="Region" value={regionText} has open={openKey === 'region'} onToggle={toggle} kind="list">
          <label className="opt master">
            <input
              type="checkbox"
              checked={allRegions}
              onChange={(e) => setRegions(e.target.checked ? new Set(REGIONS) : new Set())}
            />
            <span>All regions<small>Whole world</small></span>
          </label>
          <hr />
          {REGIONS.map((r) => (
            <label className="opt" key={r}>
              <input
                type="checkbox"
                checked={regions.has(r)}
                onChange={(e) => toggleIn(regions, setRegions, r, e.target.checked)}
              />
              <span>{r}</span>
            </label>
          ))}
        </Field>

        <Field id="from" label="From" value={from ? fmt(from) : 'Add date'} has={!!from} open={openKey === 'from'} onToggle={toggle} kind="cal">
          <Calendar from={from} to={to} initial={from} onPick={(d) => pick('from', d)} />
        </Field>

        <Field id="to" label="To" value={to ? fmt(to) : 'Add date'} has={!!to} open={openKey === 'to'} onToggle={toggle} kind="cal">
          <Calendar
            key={from ? from.getTime() : 'none'}
            from={from}
            to={to}
            min={from}
            initial={to || from}
            onPick={(d) => pick('to', d)}
          />
        </Field>

        <Field id="sensors" label="Sensors" value={sensorText} has open={openKey === 'sensors'} onToggle={toggle} kind="list">
          {SENSORS.map(({ name, sub }) => (
            <label className="opt" key={name}>
              <input
                type="checkbox"
                checked={sensors.has(name)}
                onChange={(e) => toggleIn(sensors, setSensors, name, e.target.checked)}
              />
              <span>{name}<small>{sub}</small></span>
            </label>
          ))}
        </Field>

        <button type="submit" className="btn explore">Explore</button>
      </div>
    </form>
  )
}
