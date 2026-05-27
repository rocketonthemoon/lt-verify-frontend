import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Nav from '../components/Nav'
import { api } from '../lib/api'

export default function Request() {
  const [form, setForm] = useState({ ownerName: '', phoneNumber: '', email: '', description: '' })
  const [status, setStatus] = useState('idle')
  const [requestId, setRequestId] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const { ok, data } = await api.phone.requestVerification(form)
      if (!ok) { setErrorMsg(data.error || data.message || 'Failed to submit.'); setStatus('error'); return }
      setRequestId(data.requestId || '—')
      setStatus('success')
    } catch {
      setErrorMsg('Could not reach the server. Make sure the backend is running on port 4000.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <main className="grid-pattern pt-36 pb-20 px-6 min-h-screen flex items-center justify-center">
          <div className="bg-white brutalist-border rounded-2xl p-10 text-center shadow-sm max-w-md w-full">
            <div className="w-20 h-20 bg-yellow rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="lucide:check" className="text-4xl text-charcoal" />
            </div>
            <h2 className="font-anton text-4xl mb-4">REQUEST SENT!</h2>
            <p className="text-charcoal/60 font-medium mb-2">Your verification request has been submitted.</p>
            <p className="text-charcoal/40 text-sm font-medium mb-8">Request ID: <span className="font-bold text-charcoal/70">{requestId}</span></p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/verify" className="inline-flex items-center justify-center gap-2 bg-yellow font-anton text-xl px-8 py-4 rounded-xl hover:scale-105 transition-brutalist">
                VERIFY A NUMBER <Icon icon="lucide:search" />
              </Link>
              <Link to="/" className="inline-flex items-center justify-center gap-2 brutalist-border font-anton text-xl px-8 py-4 rounded-xl hover:scale-105 transition-brutalist">
                GO HOME
              </Link>
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
              <Icon icon="lucide:shield-plus" className="text-yellow" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Join The Verified List</span>
            </div>
            <h1 className="font-anton text-6xl md:text-7xl mb-4">GET<br />VERIFIED</h1>
            <p className="text-charcoal/60 font-medium text-lg leading-relaxed">Submit your phone number for admin review. Once approved, your profile will appear as verified in the community directory.</p>
          </div>

          <div className="bg-yellow rounded-2xl p-6 mb-10 flex items-start gap-4">
            <Icon icon="lucide:info" className="text-2xl text-charcoal flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-charcoal">A community admin will manually review your request. You'll be added to the verified list only after confirmation.</p>
          </div>

          <div className="bg-white brutalist-border rounded-2xl p-8 md:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="form-label">Your Full Name</label>
                <input type="text" value={form.ownerName} onChange={e => set('ownerName', e.target.value)} className="form-input" placeholder="Jonas Jonaitis" required />
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <input type="tel" value={form.phoneNumber} onChange={e => set('phoneNumber', e.target.value)} className="form-input" placeholder="+37060123456" required />
                <p className="text-xs text-charcoal/40 mt-2 font-medium">Include country code. Lithuanian: +370 · Indian: +91</p>
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="form-input" placeholder="you@example.com" required />
              </div>
              <div>
                <label className="form-label">About Your Transfers <span className="normal-case font-medium opacity-60">(optional)</span></label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} className="form-input" rows={4} style={{ resize: 'vertical' }} placeholder="e.g. I'm a Lithuanian student in India, regularly exchanging EUR/INR..." />
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-700 text-sm font-medium">{errorMsg}</div>
              )}

              <button type="submit" disabled={status === 'loading'} className="w-full bg-charcoal text-white font-anton text-2xl py-5 rounded-xl hover:bg-yellow hover:text-charcoal transition-brutalist flex items-center justify-center gap-3 disabled:opacity-60">
                {status === 'loading' ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin-custom" /> SUBMITTING...</>
                ) : (
                  <>SUBMIT FOR REVIEW <Icon icon="lucide:send" /></>
                )}
              </button>
              <p className="text-center text-xs font-bold text-charcoal/30 uppercase tracking-widest">Reviewed by community admins · Usually within 24 hours</p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
