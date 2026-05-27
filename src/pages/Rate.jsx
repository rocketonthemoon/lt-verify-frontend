import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Nav from '../components/Nav'
import StarPicker from '../components/StarPicker'
import { api } from '../lib/api'

export default function Rate() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    phoneNumber: searchParams.get('phone') || '',
    reliability: 0,
    timeliness: 0,
    transactionAmount: '',
    currency: '',
    comment: '',
    token: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [ratedPhone, setRatedPhone] = useState('')

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.reliability === 0 || form.timeliness === 0) {
      setErrorMsg('Please select a star rating for both Reliability and Timeliness.')
      setStatus('error')
      return
    }
    if (form.transactionAmount && !form.currency) {
      setErrorMsg('Please select a currency (EUR or INR) when entering a transaction amount.')
      setStatus('error')
      return
    }
    if (form.currency && !form.transactionAmount) {
      setErrorMsg('Please enter a transaction amount when selecting a currency.')
      setStatus('error')
      return
    }
    setStatus('loading')
    const payload = {
      phoneNumber: form.phoneNumber.trim(),
      reliabilityRating: form.reliability,
      timelinessRating: form.timeliness,
      token: form.token.trim(),
    }
    if (form.transactionAmount && form.currency) {
      payload.transactionAmount = parseFloat(form.transactionAmount)
      payload.currency = form.currency
    }
    if (form.comment.trim()) payload.comment = form.comment.trim()

    try {
      const { ok, data } = await api.rating.add(payload)
      if (!ok) { setErrorMsg(data.error || data.message || 'Failed to submit rating.'); setStatus('error'); return }
      setRatedPhone(form.phoneNumber.trim())
      setStatus('success')
    } catch {
      setErrorMsg('Could not reach the server. Make sure the backend is running on port 4000.')
      setStatus('error')
    }
  }

  function rateAnother() {
    setForm({ phoneNumber: '', reliability: 0, timeliness: 0, transactionAmount: '', currency: '', comment: '', token: '' })
    setStatus('idle')
    setErrorMsg('')
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <main className="grid-pattern pt-36 pb-20 px-6 min-h-screen flex items-center justify-center">
          <div className="bg-white brutalist-border rounded-2xl p-10 text-center shadow-sm max-w-md w-full">
            <div className="w-20 h-20 bg-yellow rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="lucide:star" className="text-4xl text-charcoal" />
            </div>
            <h2 className="font-anton text-4xl mb-4">RATING SUBMITTED!</h2>
            <p className="text-charcoal/60 font-medium mb-8 max-w-sm mx-auto">Thanks for helping keep the community safe. Your rating is now live.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/verify?phone=${encodeURIComponent(ratedPhone)}`} className="inline-flex items-center justify-center gap-2 bg-yellow font-anton text-xl px-8 py-4 rounded-xl hover:scale-105 transition-brutalist">
                VIEW PROFILE <Icon icon="lucide:search" />
              </Link>
              <button onClick={rateAnother} className="inline-flex items-center justify-center gap-2 brutalist-border font-anton text-xl px-8 py-4 rounded-xl hover:scale-105 transition-brutalist">
                RATE ANOTHER
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="grid-pattern pt-36 pb-20 px-6 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 brutalist-border rounded-full px-4 py-1.5 mb-6">
              <Icon icon="lucide:star" className="text-yellow" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Community Rating</span>
            </div>
            <h1 className="font-anton text-6xl md:text-7xl mb-4">RATE A<br />MEMBER</h1>
            <p className="text-charcoal/60 font-medium text-lg leading-relaxed">Had a transfer with someone? Rate your experience to protect the community.</p>
          </div>

          <div className="bg-yellow rounded-2xl p-5 mb-8 flex items-start gap-4">
            <Icon icon="lucide:key" className="text-2xl text-charcoal flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-charcoal">You need an <strong>admin token</strong> to submit a rating — this prevents fake reviews. Ask a community admin for one.</p>
          </div>

          <div className="bg-white brutalist-border rounded-2xl p-8 md:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="form-label">Phone Number You're Rating</label>
                <input type="tel" value={form.phoneNumber} onChange={e => set('phoneNumber', e.target.value)} className="form-input" placeholder="+37060123456" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <StarPicker label="Reliability" hint="Did they follow through?" value={form.reliability} onChange={v => set('reliability', v)} />
                <StarPicker label="Timeliness" hint="Did they transfer on time?" value={form.timeliness} onChange={v => set('timeliness', v)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Transaction Amount <span className="normal-case font-medium opacity-60">(optional)</span></label>
                  <input type="number" value={form.transactionAmount} onChange={e => set('transactionAmount', e.target.value)} className="form-input" placeholder="e.g. 150" min="0" step="any" />
                </div>
                <div>
                  <label className="form-label">Currency <span className="normal-case font-medium opacity-60">(optional)</span></label>
                  <select value={form.currency} onChange={e => set('currency', e.target.value)} className="form-input">
                    <option value="">— select —</option>
                    <option value="EUR">EUR €</option>
                    <option value="INR">INR ₹</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Comment <span className="normal-case font-medium opacity-60">(optional)</span></label>
                <textarea value={form.comment} onChange={e => set('comment', e.target.value)} className="form-input" rows={3} style={{ resize: 'vertical' }} placeholder="e.g. Super fast, transferred within 10 minutes." />
              </div>

              <div className="bg-[#f8f9fa] rounded-xl p-5">
                <label className="form-label">Admin Token</label>
                <input type="text" value={form.token} onChange={e => set('token', e.target.value)} className="form-input" placeholder="Paste your admin token here" required />
                <p className="text-xs text-charcoal/35 mt-2 font-medium">One-time token issued by a community admin. Prevents spam ratings.</p>
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-700 text-sm font-medium">{errorMsg}</div>
              )}

              <button type="submit" disabled={status === 'loading'} className="w-full bg-charcoal text-white font-anton text-2xl py-5 rounded-xl hover:bg-yellow hover:text-charcoal transition-brutalist flex items-center justify-center gap-3 disabled:opacity-60">
                {status === 'loading' ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin-custom" /> SUBMITTING...</>
                ) : (
                  <> SUBMIT RATING <Icon icon="lucide:send" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
