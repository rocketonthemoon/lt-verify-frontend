const API_BASE = 'http://localhost:4000/api'

async function request(path, opts = {}) {
  const { headers: extraHeaders, ...restOpts } = opts
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
    ...restOpts,
  })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data }
}

export const api = {
  phone: {
    query: (phone) => request(`/phone/query?phoneNumber=${encodeURIComponent(phone)}`),
    requestVerification: (body) => request('/phone/request-verification', { method: 'POST', body: JSON.stringify(body) }),
  },
  rating: {
    add: (body) => request('/rating/add', { method: 'POST', body: JSON.stringify(body) }),
    stats: () => request('/rating/stats'),
  },
  admin: {
    login: (body) => request('/admin/login', { method: 'POST', body: JSON.stringify(body) }),
    logout: () => request('/admin/logout', { method: 'POST' }),
    me: () => request('/admin/me'),
    pending: () => request('/admin/pending-verifications'),
    approve: (body) => request('/admin/approve-verification', { method: 'POST', body: JSON.stringify(body) }),
    reject: (body) => request('/admin/reject-verification', { method: 'POST', body: JSON.stringify(body) }),
    generateTokens: (body) => request('/admin/generate-token', { method: 'POST', body: JSON.stringify(body) }),
    listTokens: () => request('/admin/tokens'),
    deactivateToken: (id) => request(`/admin/tokens/${id}/deactivate`, { method: 'POST' }),
    deactivateAll: () => request('/admin/tokens/deactivate-all', { method: 'POST' }),
    listAdmins: () => request('/admin/admins'),
    createAdmin: (body) => request('/admin/admins/create', { method: 'POST', body: JSON.stringify(body) }),
  },
}
