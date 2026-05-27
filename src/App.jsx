import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Verify from './pages/Verify'
import Rate from './pages/Rate'
import Request from './pages/Request'
import Stats from './pages/Stats'
import Docs from './pages/Docs'
import Maintenance from './pages/Maintenance'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import CookieBanner from './components/CookieBanner'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/rate" element={<Rate />} />
        <Route path="/request" element={<Request />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  )
}
