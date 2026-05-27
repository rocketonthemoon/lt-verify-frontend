import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Nav from '../components/Nav'
import { api } from '../lib/api'

function Stars({ score, max = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Icon key={i} icon="lucide:star" style={{ color: i < Math.round(score) ? '#ffe17c' : 'rgba(23,30,25,0.15)', fontSize: 18 }} />
      ))}
    </div>
  )
}

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Verify() {
  const [searchParams] = useSearchParams()
  const [phone, setPhone] = useState(searchParams.get('phone') || '')
  const [state, setState] = useState('idle') // idle | loading | found | notfound | error
  const [result, setResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const p = searchParams.get('phone')
    if (p) { setPhone(p); doSearch(p) }
  }, [])

  async function doSearch(overridePhone) {
    const q = (overridePhone ?? phone).trim()
    if (!q) return
    setState('loading')
    try {
      const { ok, status, data } = await api.phone.query(q)
      if (status === 404) { setState('notfound'); return }
      if (!ok) { setErrorMsg(data.error || data.message || `Error ${status}`); setState('error'); return }
      setResult(data)
      setState('found')
    } catch {
      setErrorMsg('Could not reach the server. Make sure the backend is running on port 4000.')
      setState('error')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    doSearch()
  }

  const verified = result?.verified

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="grid-pattern pt-36 pb-20 px-6 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 brutalist-border rounded-full px-4 py-1.5 mb-6">
              <Icon icon="lucide:shield" className="text-yellow" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Member Trust Check</span>
            </div>
            <h1 className="font-anton text-6xl md:text-7xl mb-4">VERIFY<br />A NUMBER</h1>
            <p className="text-charcoal/60 font-medium text-lg">Enter a Lithuanian (+370) or Indian (+91) phone number to see their trust profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-12">
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+37060123456"
              className="flex-1 px-6 py-5 rounded-xl brutalist-border focus:outline-none focus:ring-2 focus:ring-yellow text-lg font-medium bg-white"
              required
            />
            <button type="submit" className="bg-yellow px-10 py-5 rounded-xl font-anton text-2xl hover:bg-charcoal hover:text-yellow transition-brutalist shadow-xl flex items-center gap-3">
              SEARCH <Icon icon="lucide:search" />
            </button>
          </form>

          {state === 'loading' && (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 rounded-full border-4 border-charcoal/10 border-t-yellow animate-spin-custom" />
            </div>
          )}

          {state === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <Icon icon="lucide:alert-circle" className="text-red-500 text-5xl mb-4" />
              <h3 className="font-anton text-3xl mb-2 text-red-700">SOMETHING WENT WRONG</h3>
              <p className="text-red-600 font-medium">{errorMsg}</p>
            </div>
          )}

          {state === 'notfound' && (
            <div className="bg-[#f8f9fa] brutalist-border rounded-2xl p-10 text-center">
              <Icon icon="lucide:user-x" className="text-5xl mb-4 text-charcoal/30" />
              <h3 className="font-anton text-4xl mb-3">NUMBER NOT FOUND</h3>
              <p className="text-charcoal/60 font-medium mb-8 max-w-md mx-auto">This number has no ratings and hasn't been verified yet. Want to get it on the platform?</p>
              <Link to="/request" className="inline-flex items-center gap-3 bg-charcoal text-white font-anton text-xl px-8 py-4 rounded-xl hover:scale-105 transition-brutalist">
                REQUEST VERIFICATION <Icon icon="lucide:arrow-right" />
              </Link>
            </div>
          )}

          {state === 'found' && result && (
            <div className="space-y-6">
              {/* Header */}
              <div className={`rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${verified ? 'bg-charcoal text-white' : 'bg-[#f8f9fa] brutalist-border'}`}>
                <div>
                  <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold mb-4 ${verified ? 'bg-yellow text-charcoal' : 'bg-orange-100 text-orange-700'}`}>
                    <Icon icon={verified ? 'lucide:shield-check' : 'lucide:shield-alert'} />
                    {verified ? 'VERIFIED MEMBER' : 'NOT VERIFIED'}
                  </div>
                  {verified && result.vouchedByAdminName && (
                    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold mb-4 ml-2 bg-green-100 text-green-700`}>
                      <Icon icon="lucide:check-circle" />
                      Vouched by {result.vouchedByAdminName}
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="font-anton text-5xl">{result.ownerName}</h2>
                    {verified && <Icon icon="lucide:badge-check" className="text-4xl text-yellow flex-shrink-0" title="Verified member" />}
                  </div>
                  <p className={`text-lg font-medium ${verified ? 'text-white/60' : 'text-charcoal/60'}`}>{result.phoneNumber}</p>
                </div>
                <div className="text-right">
                  <div className="font-anton text-7xl" style={{ color: verified ? '#ffe17c' : '#171e19' }}>
                    {result.averageReliability > 0 ? (((result.averageReliability + result.averageTimeliness) / 2).toFixed(1) + '/5') : '—'}
                  </div>
                  <div className={`text-sm font-bold uppercase tracking-widest ${verified ? 'text-white/50' : 'text-charcoal/50'}`}>Overall Score</div>
                </div>
              </div>

              {/* Ratings & Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white brutalist-border rounded-2xl p-8">
                  <h3 className="font-anton text-2xl mb-6">TRUST RATINGS</h3>
                  {[['Reliability', result.averageReliability], ['Timeliness', result.averageTimeliness]].map(([label, val]) => (
                    <div key={label} className="mb-5">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold">{label}</span>
                        <span className="font-bold text-yellow">{val > 0 ? `${val.toFixed(1)}/5` : '—'}</span>
                      </div>
                      <div className="rating-bar"><div className="rating-fill" style={{ width: val > 0 ? `${(val / 5) * 100}%` : '0%' }} /></div>
                    </div>
                  ))}
                </div>
                <div className="bg-charcoal text-white rounded-2xl p-8">
                  <h3 className="font-anton text-2xl mb-6 text-yellow">TRANSFER STATS</h3>
                  {[['Total Ratings', result.totalRatings ?? 0], ['Total Transfers', result.totalTransactions ?? 0], ['Member Since', formatDate(result.verificationDate)]].map(([label, val]) => (
                    <div key={label} className="flex justify-between mb-4">
                      <span className="text-sage">{label}</span>
                      <span className="font-bold text-xl">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Ratings */}
              <div className="bg-white brutalist-border rounded-2xl p-8">
                <h3 className="font-anton text-2xl mb-6">RECENT COMMUNITY RATINGS</h3>
                {(result.recentRatings ?? []).length === 0 ? (
                  <p className="text-center py-8 text-charcoal/40 font-medium">No ratings yet. Be the first to rate after a transaction.</p>
                ) : (
                  <div className="space-y-4">
                    {result.recentRatings.map((r, i) => (
                      <div key={i} className="bg-[#f8f9fa] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex gap-3 mb-2">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-charcoal/50 font-bold uppercase mr-1">Reliability</span>
                              <Stars score={r.reliability ?? r.reliabilityRating ?? 0} />
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-charcoal/50 font-bold uppercase mr-1">Speed</span>
                              <Stars score={r.timeliness ?? r.timelinessRating ?? 0} />
                            </div>
                          </div>
                          {r.comment && <p className="text-sm text-charcoal/70 italic">"{r.comment}"</p>}
                        </div>
                        <span className="text-xs text-charcoal/40 font-bold whitespace-nowrap">{formatDate(r.ratedAt ?? r.timestamp ?? r.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rate CTA */}
              <div className="bg-charcoal text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-anton text-3xl text-yellow mb-2">HAD A TRANSFER?</h3>
                  <p className="text-sage/60 text-sm font-medium">Leave a rating to help the community know who to trust.</p>
                </div>
                <Link
                  to={`/rate?phone=${encodeURIComponent(result.phoneNumber)}`}
                  className="flex-shrink-0 bg-yellow text-charcoal font-anton text-xl px-8 py-4 rounded-xl hover:scale-105 transition-brutalist flex items-center gap-3 whitespace-nowrap"
                >
                  RATE THIS MEMBER <Icon icon="lucide:star" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
