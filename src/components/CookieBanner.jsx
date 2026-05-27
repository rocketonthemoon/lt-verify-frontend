import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

function getConsent() {
  return document.cookie.split('; ').some(c => c.startsWith('lt_consent=1'))
}

function setConsent() {
  const maxAge = 365 * 24 * 60 * 60
  document.cookie = `lt_consent=1; max-age=${maxAge}; path=/; samesite=strict`
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!getConsent()) setVisible(true)
  }, [])

  function accept() {
    setConsent()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-charcoal rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl" style={{ border: '1px solid rgba(183,198,194,0.15)' }}>
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-9 h-9 bg-yellow rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon icon="lucide:cookie" className="text-charcoal text-base" />
          </div>
          <p className="text-sage/70 text-sm font-medium leading-relaxed">
            We use a single session cookie to keep admin users logged in. No tracking, no analytics, no third-party cookies.{' '}
            <Link to="/privacy" className="text-yellow hover:underline font-bold">Privacy Policy</Link>
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={accept}
            className="flex-1 sm:flex-none bg-yellow text-charcoal font-anton text-base px-6 py-2.5 rounded-xl hover:scale-105 transition-brutalist"
          >
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  )
}
