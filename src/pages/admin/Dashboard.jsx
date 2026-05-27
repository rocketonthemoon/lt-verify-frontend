import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { api } from '../../lib/api'

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatDateTime(d) {
  if (!d) return '—'
  return new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function tokenStatus(t) {
  if (t.deactivated) return { label: 'Deactivated', cls: 'bg-red-100 text-red-700' }
  if (t.isUsed) return { label: 'Used', cls: 'bg-charcoal/10 text-charcoal/50' }
  if (new Date(t.expiresAt) < new Date()) return { label: 'Expired', cls: 'bg-orange-100 text-orange-700' }
  return { label: 'Active', cls: 'bg-green-100 text-green-700' }
}

// ── Pending Tab ───────────────────────────────────────────────────────────────
function PendingTab({ onLogout }) {
  const [state, setState] = useState('loading')
  const [requests, setRequests] = useState([])
  const [rejectModal, setRejectModal] = useState(null)
  const [rejectReason, setRejectReason] = useState('')

  async function load() {
    setState('loading')
    const { ok, status, data } = await api.admin.pending()
    if (status === 401) { onLogout(); return }
    if (!ok) { setState('error'); return }
    setRequests(data.requests ?? [])
    setState('ready')
  }

  useEffect(() => { load() }, [])

  async function approve(id) {
    if (!confirm('Approve this verification request?')) return
    const { status } = await api.admin.approve({ requestId: id, generateTokens: false })
    if (status === 401) { onLogout(); return }
    setRequests(r => r.filter(x => x._id !== id))
  }

  async function confirmReject() {
    const { status } = await api.admin.reject({ requestId: rejectModal, reason: rejectReason })
    if (status === 401) { onLogout(); return }
    setRequests(r => r.filter(x => x._id !== rejectModal))
    setRejectModal(null)
    setRejectReason('')
  }

  return (
    <>
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-anton text-3xl sm:text-5xl mb-1">PENDING REQUESTS</h1>
          <p className="text-charcoal/50 font-medium text-sm sm:text-base">Review and approve or reject verification applications.</p>
        </div>
        <button onClick={load} className="bg-charcoal text-white px-4 sm:px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-brutalist flex items-center gap-2 flex-shrink-0">
          <Icon icon="lucide:refresh-cw" /> <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {state === 'loading' && (
        <div className="text-center py-16 flex flex-col items-center gap-4 text-charcoal/30">
          <div className="w-8 h-8 border-4 border-charcoal/10 border-t-yellow rounded-full animate-spin-custom" />
          <p className="font-medium">Loading requests...</p>
        </div>
      )}
      {state === 'error' && <p className="text-red-600 font-medium text-center py-16">Failed to load. Is the backend running?</p>}
      {state === 'ready' && requests.length === 0 && (
        <div className="text-center py-16">
          <Icon icon="lucide:inbox" className="text-6xl text-charcoal/20 mb-4" />
          <p className="font-anton text-3xl text-charcoal/30">ALL CLEAR</p>
          <p className="text-charcoal/40 font-medium mt-2">No pending verification requests.</p>
        </div>
      )}
      {state === 'ready' && (
        <div className="space-y-4">
          {requests.map(r => (
            <div key={r._id} className="bg-white brutalist-border rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-anton text-xl">{r.ownerName}</span>
                  <span className="pill bg-orange-100 text-orange-700"><Icon icon="lucide:clock" /> Pending</span>
                </div>
                <p className="text-sm font-medium text-charcoal/60 mb-1"><Icon icon="lucide:phone" className="inline mr-1" />{r.phoneNumber}</p>
                <p className="text-sm font-medium text-charcoal/60 mb-1"><Icon icon="lucide:mail" className="inline mr-1" />{r.email}</p>
                <p className="text-xs text-charcoal/30 font-bold uppercase tracking-widest">Submitted {formatDate(r.createdAt)}</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <button onClick={() => approve(r._id)} className="bg-yellow text-charcoal font-bold text-sm px-5 py-2.5 rounded-xl hover:scale-105 transition-brutalist flex items-center gap-2">
                  <Icon icon="lucide:check" /> APPROVE
                </button>
                <button onClick={() => { setRejectModal(r._id); setRejectReason('') }} className="bg-red-50 text-red-600 border border-red-200 font-bold text-sm px-5 py-2.5 rounded-xl hover:scale-105 transition-brutalist flex items-center gap-2">
                  <Icon icon="lucide:x" /> REJECT
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(23,30,25,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full brutalist-border shadow-2xl">
            <h3 className="font-anton text-3xl mb-4">REJECT REQUEST</h3>
            <p className="text-charcoal/60 font-medium mb-6">Provide a reason for rejection (optional but recommended).</p>
            <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} className="form-input mb-6" rows={3} placeholder="e.g. Insufficient documentation provided." />
            <div className="flex gap-4">
              <button onClick={() => setRejectModal(null)} className="flex-1 brutalist-border font-bold py-3 rounded-xl hover:bg-[#f8f9fa] transition-brutalist">CANCEL</button>
              <button onClick={confirmReject} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-brutalist">REJECT</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ── Generate Tokens Tab ───────────────────────────────────────────────────────
function TokensTab({ onLogout }) {
  const [quantity, setQuantity] = useState('1')
  const [purpose, setPurpose] = useState('rating')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [generated, setGenerated] = useState([])
  const [copied, setCopied] = useState(false)

  function clampQuantity(val) {
    const v = parseInt(val, 10)
    return isNaN(v) ? 1 : Math.min(5, Math.max(1, v))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const qty = clampQuantity(quantity)
    setQuantity(String(qty))
    setStatus('loading')
    setErrorMsg('')
    const { ok, status: s, data } = await api.admin.generateTokens({ quantity: qty, purpose })
    if (s === 401) { onLogout(); return }
    if (!ok) { setErrorMsg(data.error || data.message || 'Failed to generate tokens.'); setStatus('error'); return }
    setGenerated(data.tokens ?? [])
    setStatus('done')
  }

  function copyAll() {
    navigator.clipboard.writeText(generated.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-anton text-3xl sm:text-5xl mb-1">GENERATE TOKENS</h1>
        <p className="text-charcoal/50 font-medium text-sm sm:text-base">Create admin tokens to allow trusted members to submit ratings.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white brutalist-border rounded-2xl p-8">
          <h2 className="font-anton text-2xl mb-6">CREATE TOKENS</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Quantity (max 5)</label>
              <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                onBlur={e => setQuantity(String(clampQuantity(e.target.value)))}
                className="form-input"
                min={1}
                max={5}
                required
              />
            </div>
            <div>
              <label className="form-label">Purpose</label>
              <input type="text" value={purpose} onChange={e => setPurpose(e.target.value)} className="form-input" placeholder="e.g. rating" required />
            </div>
            {status === 'error' && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm font-medium">{errorMsg}</div>}
            <button type="submit" disabled={status === 'loading'} className="w-full bg-yellow text-charcoal font-anton text-xl py-4 rounded-xl hover:scale-105 transition-brutalist flex items-center justify-center gap-2 disabled:opacity-60">
              {status === 'loading' ? <><div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin-custom" /> GENERATING...</> : <>GENERATE <Icon icon="lucide:key" /></>}
            </button>
          </form>
        </div>

        <div className="bg-charcoal rounded-2xl p-8">
          <h2 className="font-anton text-2xl mb-6 text-yellow">GENERATED TOKENS</h2>
          {generated.length === 0 ? (
            <p className="text-sage/40 text-sm font-medium">Tokens will appear here after generation.</p>
          ) : (
            <>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {generated.map(t => (
                  <div key={t} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2 gap-3">
                    <code className="text-yellow text-xs font-mono break-all flex-1">{t}</code>
                    <button onClick={() => navigator.clipboard.writeText(t)} className="text-sage/40 hover:text-yellow transition-colors flex-shrink-0">
                      <Icon icon="lucide:copy" style={{ fontSize: 16 }} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={copyAll} className="mt-6 w-full border border-sage/20 text-yellow font-bold text-sm py-3 rounded-xl hover:bg-white/5 transition-brutalist flex items-center justify-center gap-2">
                <Icon icon={copied ? 'lucide:check' : 'lucide:copy'} /> {copied ? 'COPIED!' : 'COPY ALL TOKENS'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Token History Tab ─────────────────────────────────────────────────────────
function HistoryTab({ onLogout, isSuperAdmin, adminId }) {
  const [state, setState] = useState('loading')
  const [tokens, setTokens] = useState([])

  async function load() {
    setState('loading')
    const { ok, status, data } = await api.admin.listTokens()
    if (status === 401) { onLogout(); return }
    if (!ok) { setState('error'); return }
    setTokens(data.tokens ?? [])
    setState('ready')
  }

  useEffect(() => { load() }, [])

  async function deactivate(id) {
    if (!confirm('Deactivate this token? It can no longer be used to submit ratings.')) return
    const { status } = await api.admin.deactivateToken(id)
    if (status === 401) { onLogout(); return }
    load()
  }

  async function deactivateAll() {
    if (!confirm('Deactivate ALL active tokens? None of them will be usable after this.')) return
    const { data, status } = await api.admin.deactivateAll()
    if (status === 401) { onLogout(); return }
    alert(data.message || data.error)
    load()
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex-1">
          <h1 className="font-anton text-3xl sm:text-5xl mb-1">TOKEN HISTORY</h1>
          <p className="text-charcoal/50 font-medium text-sm sm:text-base">All generated tokens — active, used, and deactivated.</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {isSuperAdmin && (
            <button onClick={deactivateAll} className="bg-red-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:scale-105 transition-brutalist flex items-center gap-2">
              <Icon icon="lucide:ban" /> Deactivate All
            </button>
          )}
          <button onClick={load} className="bg-charcoal text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-brutalist flex items-center gap-2">
            <Icon icon="lucide:refresh-cw" />
          </button>
        </div>
      </div>

      {state === 'loading' && (
        <div className="text-center py-16 flex flex-col items-center gap-4 text-charcoal/30">
          <div className="w-8 h-8 border-4 border-charcoal/10 border-t-yellow rounded-full animate-spin-custom" />
          <p className="font-medium">Loading tokens...</p>
        </div>
      )}
      {state === 'error' && <p className="text-red-600 font-medium text-center py-16">Failed to load. Is the backend running?</p>}
      {state === 'ready' && tokens.length === 0 && (
        <div className="text-center py-16">
          <Icon icon="lucide:key" className="text-6xl text-charcoal/20 mb-4" />
          <p className="font-anton text-3xl text-charcoal/30">NO TOKENS YET</p>
        </div>
      )}
      {state === 'ready' && tokens.length > 0 && (
        <div className="bg-white brutalist-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: 600 }}>
            <table className="w-full text-sm min-w-[700px]">
              <thead className="sticky top-0 bg-charcoal text-white z-10">
                <tr>
                  {['Token', 'Purpose', 'Created By', 'Generated', 'Expires', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-5 py-4 font-bold text-xs uppercase tracking-widest text-sage/60 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/5">
                {tokens.map(t => {
                  const status = tokenStatus(t)
                  const isActive = !t.deactivated && !t.isUsed && new Date(t.expiresAt) > new Date()
                  const canDeactivate = isActive && (isSuperAdmin || t.issuedByAdmin?._id === adminId || t.issuedByAdmin === adminId)
                  return (
                    <tr key={t._id} className="hover:bg-[#f8f9fa] transition-colors">
                      <td className="px-5 py-4">
                        <code className="text-xs font-mono text-charcoal/60">{t.token}…</code>
                      </td>
                      <td className="px-5 py-4 font-medium capitalize">{t.purpose ?? 'rating'}</td>
                      <td className="px-5 py-4 text-charcoal/60 whitespace-nowrap">{t.issuedByAdmin?.username ?? '—'}</td>
                      <td className="px-5 py-4 text-charcoal/60 whitespace-nowrap">{formatDateTime(t.createdAt)}</td>
                      <td className="px-5 py-4 text-charcoal/60 whitespace-nowrap">{formatDateTime(t.expiresAt)}</td>
                      <td className="px-5 py-4">
                        <span className={`pill ${status.cls}`}>{status.label}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        {canDeactivate && (
                          <button onClick={() => deactivate(t._id)} className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 ml-auto">
                            <Icon icon="lucide:ban" style={{ fontSize: 14 }} /> Deactivate
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Create Admin Tab (super_admin only) ───────────────────────────────────────
function CreateAdminTab({ onLogout }) {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'admin' })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [admins, setAdmins] = useState([])
  const [listState, setListState] = useState('loading')

  async function loadAdmins() {
    setListState('loading')
    const { ok, status: s, data } = await api.admin.listAdmins()
    if (s === 401) { onLogout(); return }
    if (!ok) { setListState('error'); return }
    setAdmins(data.admins ?? [])
    setListState('ready')
  }

  useEffect(() => { loadAdmins() }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    const { ok, status: s, data } = await api.admin.createAdmin(form)
    if (s === 401) { onLogout(); return }
    if (!ok) { setErrorMsg(data.error || 'Failed to create admin.'); setStatus('error'); return }
    setForm({ username: '', email: '', password: '', role: 'admin' })
    setStatus('done')
    loadAdmins()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-anton text-3xl sm:text-5xl mb-1">CREATE ADMIN</h1>
        <p className="text-charcoal/50 font-medium text-sm sm:text-base">Add new admin accounts. Only super admins can do this.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white brutalist-border rounded-2xl p-8">
          <h2 className="font-anton text-2xl mb-6">NEW ADMIN</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[['username', 'Username', 'e.g. moderator1', 'text'], ['email', 'Email', 'admin@example.com', 'email'], ['password', 'Password', 'Min. 8 characters', 'password']].map(([key, label, ph, type]) => (
              <div key={key}>
                <label className="form-label">{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph} required className="form-input" />
              </div>
            ))}
            <div>
              <label className="form-label">Role</label>
              <select
                value={form.role}
                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                className="w-full px-5 py-4 rounded-xl text-charcoal font-medium text-base outline-none transition-all"
                style={{ background: 'white', border: '1px solid rgba(23,30,25,0.15)', fontFamily: 'Satoshi, sans-serif' }}
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            {status === 'error' && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm font-medium">{errorMsg}</div>}
            {status === 'done' && <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-sm font-medium">Admin created successfully.</div>}
            <button type="submit" disabled={status === 'loading'} className="w-full bg-yellow text-charcoal font-anton text-xl py-4 rounded-xl hover:scale-105 transition-brutalist flex items-center justify-center gap-2 disabled:opacity-60">
              {status === 'loading' ? <><div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin-custom" /> CREATING...</> : <>CREATE ADMIN <Icon icon="lucide:user-plus" /></>}
            </button>
          </form>
        </div>

        <div className="bg-charcoal rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-anton text-2xl text-yellow">ALL ADMINS</h2>
            <button onClick={loadAdmins} className="text-sage/40 hover:text-yellow transition-colors">
              <Icon icon="lucide:refresh-cw" style={{ fontSize: 18 }} />
            </button>
          </div>
          {listState === 'loading' && <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-sage/20 border-t-yellow rounded-full animate-spin-custom" /></div>}
          {listState === 'error' && <p className="text-red-400 text-sm font-medium">Failed to load admins.</p>}
          {listState === 'ready' && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {admins.map(a => (
                <div key={a._id} className="bg-white/5 rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div>
                      <p className="text-white font-bold text-sm">{a.username}</p>
                      <p className="text-sage/40 text-xs font-medium">{a.email}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${a.role === 'super_admin' ? 'bg-yellow/20 text-yellow' : 'bg-white/10 text-sage/60'}`}>
                      {a.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-xs font-bold text-green-400">
                      <Icon icon="lucide:check-circle" style={{ fontSize: 13 }} /> {a.verificationsApproved ?? 0} approved
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-red-400">
                      <Icon icon="lucide:x-circle" style={{ fontSize: 13 }} /> {a.verificationsRejected ?? 0} rejected
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-sage/40">
                      <Icon icon="lucide:key" style={{ fontSize: 13 }} /> {a.tokensIssued ?? 0} tokens
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Dashboard Shell ───────────────────────────────────────────────────────────
const BASE_TABS = [
  { id: 'pending', label: 'Pending Requests', icon: 'lucide:clock' },
  { id: 'tokens', label: 'Generate Tokens', icon: 'lucide:key' },
  { id: 'history', label: 'Token History', icon: 'lucide:history' },
]
const SUPER_TABS = [
  { id: 'create-admin', label: 'Create Admin', icon: 'lucide:user-plus' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('pending')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [authState, setAuthState] = useState('loading')

  useEffect(() => {
    api.admin.me().then(({ ok, data }) => {
      if (!ok) { navigate('/admin', { replace: true }); return }
      setAdmin(data.admin)
      setAuthState('ready')
    })
  }, [])

  async function logout() {
    await api.admin.logout()
    navigate('/admin', { replace: true })
  }

  function switchTab(id) {
    setActiveTab(id)
    setSidebarOpen(false)
  }

  if (authState === 'loading') {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/10 border-t-yellow rounded-full animate-spin-custom" />
      </div>
    )
  }

  const isSuperAdmin = admin?.role === 'super_admin'
  const tabs = isSuperAdmin ? [...BASE_TABS, ...SUPER_TABS] : BASE_TABS

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-[260px] bg-charcoal flex flex-col py-8 px-4 z-40 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

        <div className="flex items-center justify-between px-4 mb-2">
          <Link to="/" className="font-anton text-2xl text-white">LT VERIFY<span className="text-yellow">.</span></Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-sage/40 hover:text-white transition-colors">
            <Icon icon="lucide:x" style={{ fontSize: 20 }} />
          </button>
        </div>
        <p className="text-sage/40 text-xs font-bold uppercase tracking-widest px-4 mb-8">Admin Panel</p>

        <nav className="flex flex-col gap-2 flex-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl font-bold text-sm tracking-wider transition-all ${activeTab === tab.id ? 'bg-yellow/10 text-yellow' : 'text-sage/60 hover:bg-yellow/10 hover:text-yellow'}`}
            >
              <Icon icon={tab.icon} /> {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto px-2">
          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <p className="text-xs text-sage/50 font-bold uppercase tracking-widest mb-1">Logged in as</p>
            <p className="text-white font-bold text-sm">{admin?.username ?? 'Admin'}</p>
            <p className="text-xs text-sage/30 font-medium mt-0.5">{isSuperAdmin ? 'Super Admin' : 'Admin'}</p>
          </div>
          <button onClick={logout} className="flex items-center gap-3 px-5 py-3 rounded-xl font-bold text-sm tracking-wider text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all w-full">
            <Icon icon="lucide:log-out" /> Log Out
          </button>
        </div>
      </aside>

      {/* Content area */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-[260px]">

        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-20 bg-charcoal h-14 flex items-center justify-between px-4 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="text-white p-1">
            <Icon icon="lucide:menu" style={{ fontSize: 22 }} />
          </button>
          <span className="font-anton text-xl text-white">
            {tabs.find(t => t.id === activeTab)?.label ?? 'Dashboard'}
          </span>
          <button onClick={logout} className="text-red-400 p-1">
            <Icon icon="lucide:log-out" style={{ fontSize: 20 }} />
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
          {activeTab === 'pending' && <PendingTab onLogout={logout} />}
          {activeTab === 'tokens' && <TokensTab onLogout={logout} />}
          {activeTab === 'history' && <HistoryTab onLogout={logout} isSuperAdmin={isSuperAdmin} adminId={admin?.id} />}
          {activeTab === 'create-admin' && isSuperAdmin && <CreateAdminTab onLogout={logout} />}
        </main>
      </div>
    </div>
  )
}
