import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { href: '/#how-it-works', label: 'HOW IT WORKS', hash: true },
  { href: '/#features', label: 'FEATURES', hash: true },
  { href: '/rate', label: 'RATE', hash: false },
  { href: '/request', label: 'GET VERIFIED', hash: false },
  { href: '/stats', label: 'STATS', hash: false },
]

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-md z-50 brutalist-border-b" style={{ borderBottom: '1px solid rgba(23,30,25,0.1)' }}>
      <nav className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <Link to="/" className="font-anton text-3xl text-charcoal">
          LT VERIFY<span className="text-yellow">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ href, label, hash }) => (
            <li key={href}>
              {hash ? (
                <a href={href} className="text-sm font-medium transition-colors hover:text-yellow">
                  {label}
                </a>
              ) : (
                <NavLink
                  to={href}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${isActive ? 'text-yellow' : 'hover:text-yellow'}`
                  }
                >
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <Link to="/admin" className="text-sm font-medium hover:opacity-70 transition-opacity">ADMIN</Link>
          <Link to="/verify" className="bg-charcoal text-white px-8 py-3 rounded-full text-sm font-bold hover:scale-105 transition-brutalist">
            CHECK A NUMBER
          </Link>
        </div>
      </nav>
    </header>
  )
}
