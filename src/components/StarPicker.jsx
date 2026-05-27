import { useState } from 'react'

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']

export default function StarPicker({ label, hint, value, onChange }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div>
      <label className="form-label">{label}</label>
      {hint && <p className="text-xs text-charcoal/40 font-medium mb-3">{hint}</p>}
      <div className="flex gap-0">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className="text-4xl cursor-pointer transition-all duration-100 bg-transparent border-none p-0 leading-none px-0.5"
            style={{ color: n <= (hovered || value) ? '#ffe17c' : 'rgba(23,30,25,0.12)' }}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(n)}
          >
            ★
          </button>
        ))}
      </div>
      <p className="text-xs font-bold text-charcoal/30 mt-1 h-4">
        {LABELS[hovered || value] || ''}
      </p>
    </div>
  )
}
