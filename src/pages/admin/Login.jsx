import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { api } from '../../lib/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [status, setStatus] = useState('checking')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    api.admin.me().then(({ ok }) => {
      if (ok) navigate('/admin/dashboard', { replace: true })
      else setStatus('idle')
    })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const { ok, data } = await api.admin.login(form)
      if (!ok) { setErrorMsg(data.error || data.message || 'Invalid credentials.'); setStatus('error'); return }
      navigate('/admin/dashboard', { replace: true })
    } catch {
      setErrorMsg('Could not reach the server. Make sure the backend is running on port 4000.')
      setStatus('error')
    }
  }

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/10 border-t-yellow rounded-full animate-spin-custom" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <Link to="/" className="font-anton text-4xl text-white inline-block mb-2">LT VERIFY<span className="text-yellow">.</span></Link>
          <p className="text-sage/60 text-sm font-medium uppercase tracking-widest">Admin Panel</p>
        </div>

        <div className="bg-dark-gray rounded-2xl p-8 md:p-10" style={{ border: '1px solid rgba(183,198,194,0.1)' }}>
          <div className="flex items-center gap-3 mb-8">
            <Icon icon="lucide:lock" className="text-yellow text-3xl" />
            <h1 className="font-anton text-3xl text-white">ADMIN LOGIN</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[['username', 'Username', 'admin', 'text'], ['password', 'Password', '••••••••', 'password']].map(([key, label, ph, type]) => (
              <div key={key}>
                <label className="form-label" style={{ color: 'rgba(183,198,194,0.6)' }}>{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={ph}
                  required
                  className="w-full px-5 py-4 rounded-xl text-white font-medium text-base outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(183,198,194,0.2)', fontFamily: 'Satoshi, sans-serif' }}
                  onFocus={e => { e.target.style.borderColor = '#ffe17c'; e.target.style.boxShadow = '0 0 0 3px rgba(255,225,124,0.15)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(183,198,194,0.2)'; e.target.style.boxShadow = 'none' }}
                />
              </div>
            ))}

            {status === 'error' && (
              <div className="bg-red-900/40 border border-red-500/30 rounded-xl px-5 py-4 text-red-300 text-sm font-medium">{errorMsg}</div>
            )}

            <button type="submit" disabled={status === 'loading'} className="w-full bg-yellow text-charcoal font-anton text-2xl py-5 rounded-xl hover:scale-105 transition-brutalist flex items-center justify-center gap-3 disabled:opacity-60">
              {status === 'loading' ? (
                <><div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin-custom" /> SIGNING IN...</>
              ) : (
                <>SIGN IN <Icon icon="lucide:arrow-right" /></>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="text-sm font-medium text-sage/50 hover:text-sage transition-colors">← Back to main site</Link>
        </div>
      </div>
    </div>
  )
}
