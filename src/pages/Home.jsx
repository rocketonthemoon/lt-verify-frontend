import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Nav from '../components/Nav'

export default function Home() {
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    if (phone.trim()) navigate(`/verify?phone=${encodeURIComponent(phone.trim())}`)
  }

  return (
    <div className="min-h-screen">
      <Nav />

      {/* HERO */}
      <section className="grid-pattern pt-48 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 brutalist-border rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-yellow animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Community-Verified Transfer Network</span>
          </div>
          <h1 className="font-anton text-6xl md:text-8xl lg:text-9xl mb-8">
            TRUST BEFORE<br />
            <span className="rotate-highlight">YOU SEND.</span>
          </h1>
          <p className="text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            The Lithuanian student community's tool for verifying money transfer contacts. Check a phone number's trust score before you transfer a single euro or rupee.
          </p>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+370 600 00000 or +91 98765 43210"
              className="flex-1 px-6 py-5 rounded-xl brutalist-border focus:outline-none focus:ring-2 focus:ring-yellow text-lg"
            />
            <button type="submit" className="bg-yellow px-10 py-5 rounded-xl font-anton text-2xl hover:bg-charcoal hover:text-yellow transition-brutalist shadow-xl">
              VERIFY NOW
            </button>
          </form>
          <p className="mt-4 text-sm font-medium text-charcoal/40">Enter any Lithuanian or Indian phone number to check their trust score</p>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="flex flex-col md:flex-row min-h-[600px]">
        <div className="flex-1 bg-charcoal text-white p-12 lg:p-24 flex flex-col justify-center">
          <span className="font-medium text-sage/50 tracking-widest text-sm mb-6 uppercase">The Problem</span>
          <h2 className="font-anton text-6xl mb-12">THE OLD WAY</h2>
          <ul className="space-y-6">
            {[
              ['Scammers In The Group', 'Unknown people join via WhatsApp links and disappear after receiving money.'],
              ['No Accountability', "Once transferred, there's no record, no rating, and no way to warn others."],
              ['Blind Trust', 'You have no way to know if a number is legitimate before you send.'],
            ].map(([title, desc]) => (
              <li key={title} className="flex items-start gap-4">
                <Icon icon="lucide:x-circle" className="text-red-500 text-2xl mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xl font-bold mb-1">{title}</p>
                  <p className="text-sage text-sm">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 bg-dark-gray text-white p-12 lg:p-24 flex flex-col justify-center border-l-8 border-yellow">
          <span className="font-medium text-yellow tracking-widest text-sm mb-6 uppercase">The Solution</span>
          <h2 className="font-anton text-6xl mb-12 text-yellow">THE LT VERIFY WAY</h2>
          <ul className="space-y-6">
            {[
              ['Admin-Verified Members', 'Every verified number is manually approved by community admins before it appears.'],
              ['Public Trust Scores', 'Reliability and timeliness ratings from real past transactions, visible to everyone.'],
              ['Community Protection', 'Report bad actors so every student in the network stays safe.'],
            ].map(([title, desc]) => (
              <li key={title} className="flex items-start gap-4">
                <Icon icon="lucide:check-circle" className="text-yellow text-2xl mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xl font-bold mb-1">{title}</p>
                  <p className="text-sage text-sm">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-anton text-6xl mb-16">BUILT FOR <span className="text-yellow underline decoration-4">COMMUNITY</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
            <div className="md:col-span-2 bg-[#f8f9fa] brutalist-border rounded-3xl p-10 flex flex-col justify-between overflow-hidden relative group hover:shadow-2xl transition-brutalist">
              <div className="max-w-sm">
                <h3 className="font-anton text-4xl mb-4">INSTANT NUMBER LOOKUP</h3>
                <p className="text-charcoal/70">Search any Lithuanian (+370) or Indian (+91) phone number and get their full trust profile in seconds.</p>
              </div>
              <div className="mt-8 transform group-hover:scale-105 transition-brutalist">
                <div className="bg-charcoal rounded-xl p-4 shadow-2xl">
                  <div className="flex gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-yellow-400" /><div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="font-mono text-xs text-green-400">
                    <span className="opacity-50">$ </span>ltverify query +37060123456<br />
                    <span className="text-yellow">✓ VERIFIED</span><span className="text-white/60"> · Reliability: 4.8/5 · 23 transfers</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-charcoal rounded-3xl p-10 flex flex-col justify-between text-white hover:shadow-2xl transition-brutalist">
              <h3 className="font-anton text-4xl">TRUST<br />SCORE</h3>
              <div className="space-y-4">
                {[['Reliability', 96], ['Timeliness', 90]].map(([label, pct]) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-sage">{label}</span>
                      <span className="text-yellow font-bold">{(pct / 20).toFixed(1)}</span>
                    </div>
                    <div className="rating-bar"><div className="rating-fill" style={{ width: `${pct}%` }} /></div>
                  </div>
                ))}
                <span className="text-xs text-sage/60 uppercase tracking-widest">Based on 23 transactions</span>
              </div>
            </div>

            <div className="bg-yellow rounded-3xl p-10 flex flex-col justify-between brutalist-border hover:shadow-2xl transition-brutalist">
              <Icon icon="lucide:shield-check" className="text-6xl" />
              <h3 className="font-anton text-4xl">ADMIN<br />VERIFIED</h3>
              <p className="font-medium">Every member manually reviewed by trusted community admins.</p>
            </div>

            <div className="md:col-span-2 bg-white brutalist-border rounded-3xl p-10 flex flex-col md:flex-row gap-8 items-center hover:shadow-2xl transition-brutalist overflow-hidden">
              <div className="flex-1">
                <h3 className="font-anton text-4xl mb-4">RATE EVERY TRANSACTION</h3>
                <p className="text-charcoal/70">After a transfer, rate the experience. Your feedback protects the next student in the community.</p>
              </div>
              <div className="flex-1 space-y-4 w-full">
                <div className="bg-[#f8f9fa] rounded-2xl p-5">
                  {[['Reliability', 5], ['Timeliness', 4]].map(([label, stars]) => (
                    <div key={label} className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">{label}</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => <Icon key={i} icon="lucide:star" style={{ color: i <= stars ? '#ffe17c' : 'rgba(23,30,25,0.15)' }} />)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-charcoal rounded-2xl p-4 text-center">
                  <span className="text-yellow font-anton text-lg">SUBMIT RATING</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-32 px-6 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <h2 className="font-anton text-7xl lg:sticky lg:top-32">HOW IT<br />WORKS<span className="text-yellow">.</span></h2>
          </div>
          <div className="lg:w-2/3 space-y-32">
            {[
              ['01', 'SEARCH A NUMBER', 'Enter the phone number of the person you\'re about to transfer with — Lithuanian (+370) or Indian (+91). No account needed.'],
              ['02', 'CHECK THEIR PROFILE', 'See their verification status, trust score (reliability + timeliness), total transfer history, and recent community ratings.'],
              ['03', 'TRANSFER WITH CONFIDENCE', 'Verified? Good scores? Go ahead. Unverified or poor ratings? Think twice. Protect yourself and the community.'],
            ].map(([num, title, desc]) => (
              <div key={num} className="group">
                <span className="font-anton text-8xl text-yellow/20 group-hover:text-yellow transition-all duration-500 block mb-4">{num}</span>
                <h3 className="font-anton text-5xl mb-6">{title}</h3>
                <p className="text-xl text-charcoal/60 max-w-xl">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-yellow py-40 px-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none whitespace-nowrap overflow-hidden">
          <span className="font-anton text-[30rem] select-none">VERIFYVERIFYVERIFY</span>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-7xl md:text-9xl mb-12 leading-[0.85]">READY TO<br />GET SAFE?</h2>
          <p className="text-xl md:text-2xl font-bold mb-16 max-w-2xl mx-auto text-charcoal/80">
            Join the verified member list. Protect yourself and protect your community.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
            <Link to="/verify" className="bg-charcoal text-white font-anton text-3xl px-12 py-6 rounded-2xl hover:scale-105 transition-brutalist shadow-2xl flex items-center justify-center gap-4 group">
              VERIFY A NUMBER <Icon icon="lucide:search" className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/request" className="bg-white text-charcoal font-anton text-3xl px-12 py-6 rounded-2xl hover:scale-105 transition-brutalist shadow-2xl flex items-center justify-center gap-4 group brutalist-border">
              GET ME VERIFIED <Icon icon="lucide:shield-check" className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <p className="mt-8 text-sm font-bold opacity-50">FREE · COMMUNITY-DRIVEN · FOR LITHUANIAN STUDENTS</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-20 px-6" style={{ borderTop: '1px solid rgba(23,30,25,0.1)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <Link to="/" className="font-anton text-4xl mb-6 block">LT VERIFY.</Link>
            <p className="max-w-xs text-charcoal/60 font-medium">The trust layer for the Lithuanian student money transfer community. Verify before you send.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="flex flex-col gap-4">
              <span className="font-anton text-lg tracking-wider">PLATFORM</span>
              <Link to="/verify" className="text-sm font-medium hover:text-yellow">Verify a Number</Link>
              <Link to="/request" className="text-sm font-medium hover:text-yellow">Request Verification</Link>
              <Link to="/stats" className="text-sm font-medium hover:text-yellow">Stats</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-anton text-lg tracking-wider">COMMUNITY</span>
              <Link to="/rate" className="text-sm font-medium hover:text-yellow">Rate a Member</Link>
              <Link to="/#features" className="text-sm font-medium hover:text-yellow">Features</Link>
              <Link to="/admin" className="text-sm font-medium hover:text-yellow">Admin Login</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-anton text-lg tracking-wider">INFO</span>
              <Link to="/privacy" className="text-sm font-medium hover:text-yellow">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 flex justify-between items-center text-xs font-bold opacity-40 uppercase tracking-widest" style={{ borderTop: '1px solid rgba(23,30,25,0.1)' }}>
          <span>© 2025 LT Transfer Verify · Lithuanian Student Community</span>
        </div>
      </footer>
    </div>
  )
}
