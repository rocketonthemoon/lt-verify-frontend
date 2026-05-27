import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { href: '/#how-it-works', label: 'HOW IT WORKS', hash: true },
  { href: '/#features', label: 'FEATURES', hash: true },
  { href: '/rate', label: 'RATE', hash: false },
  { href: '/request', label: 'GET VERIFIED', hash: false },
  { href: '/stats', label: 'STATS', hash: false },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768)

  const closeMenu = () => setMenuOpen(false)

  React.useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
          <Link to="/admin" className="hidden md:inline-block text-sm font-medium hover:opacity-70 transition-opacity">ADMIN</Link>
          <Link to="/verify" className="hidden md:inline-block bg-charcoal text-white px-8 py-3 rounded-full text-sm font-bold hover:scale-105 transition-brutalist">
            CHECK A NUMBER
          </Link>
          {isSmallScreen && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-charcoal text-3xl p-2 hover:text-yellow transition-colors bg-yellow rounded-lg"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>
      </nav>

      {isSmallScreen && menuOpen && (
        <div className="fixed inset-0 top-20 bg-white/95 backdrop-blur-md z-40 overflow-y-auto">
          <nav className="px-6 py-8 space-y-6">
            {NAV_LINKS.map(({ href, label, hash }) => (
              <div key={href}>
                {hash ? (
                  <a
                    href={href}
                    onClick={closeMenu}
                    className="text-lg font-anton text-charcoal hover:text-yellow transition-colors block"
                  >
                    {label}
                  </a>
                ) : (
                  <NavLink
                    to={href}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `text-lg font-anton block transition-colors ${isActive ? 'text-yellow' : 'text-charcoal hover:text-yellow'}`
                    }
                  >
                    {label}
                  </NavLink>
                )}
              </div>
            ))}
            <div className="pt-6 border-t border-charcoal/10 space-y-4">
              <Link
                to="/admin"
                onClick={closeMenu}
                className="block text-lg font-anton text-charcoal hover:text-yellow transition-colors"
              >
                ADMIN
              </Link>
              <Link
                to="/verify"
                onClick={closeMenu}
                className="block w-full bg-charcoal text-white px-6 py-3 rounded-xl text-center font-bold hover:bg-yellow hover:text-charcoal transition-brutalist"
              >
                CHECK A NUMBER
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
