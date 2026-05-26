import { useState } from 'react'
import { getPresetRange, getCustomRange, toDateStr } from '../data/analyticsMock.js'
import './DateRangeFilter.css'

const PRESETS = [
  { id: 'this_month', label: 'This month' },
  { id: 'last_month', label: 'Last month' },
  { id: 'last_3_months', label: 'Last 3 months' },
]

export default function DateRangeFilter({ onChange }) {
  const today = new Date()
  const defaultStart = toDateStr(new Date(today.getFullYear(), today.getMonth(), 1))
  const defaultEnd = toDateStr(today)

  const [preset, setPreset] = useState('this_month')
  const [customStart, setCustomStart] = useState(defaultStart)
  const [customEnd, setCustomEnd] = useState(defaultEnd)
  const [showCalendar, setShowCalendar] = useState(false)

  const applyPreset = (id) => {
    setPreset(id)
    setShowCalendar(false)
    const range = getPresetRange(id)
    if (range) onChange(range)
  }

  const applyCustom = () => {
    const range = getCustomRange(customStart, customEnd)
    if (!range) return
    setPreset('custom')
    onChange(range)
    setShowCalendar(false)
  }

  return (
    <div className="date-filter">
      <div className="date-filter__presets">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`date-filter__pill ${preset === p.id ? 'date-filter__pill--active' : ''}`}
            onClick={() => applyPreset(p.id)}
          >
            {p.label}
          </button>
        ))}
        <button
          type="button"
          className={`date-filter__pill ${preset === 'custom' ? 'date-filter__pill--active' : ''}`}
          onClick={() => setShowCalendar((v) => !v)}
        >
          Custom range
        </button>
      </div>

      {showCalendar && (
        <div className="date-filter__calendar">
          <label>
            <span>From</span>
            <input
              type="date"
              value={customStart}
              max={customEnd}
              onChange={(e) => setCustomStart(e.target.value)}
            />
          </label>
          <label>
            <span>To</span>
            <input
              type="date"
              value={customEnd}
              min={customStart}
              max={defaultEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
            />
          </label>
          <button type="button" className="date-filter__apply" onClick={applyCustom}>
            Apply range
          </button>
        </div>
      )}
    </div>
  )
}
