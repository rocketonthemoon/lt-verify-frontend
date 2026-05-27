import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal grid-pattern-dark flex flex-col items-center justify-center px-6 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-anton text-[40vw] text-white/[0.03]">404</span>
      </div>
      <div className="relative z-10 max-w-xl">
        <div className="animate-float mb-8">
          <Icon icon="lucide:shield-x" style={{ fontSize: 80, color: '#ffe17c' }} />
        </div>
        <div className="font-anton text-[120px] md:text-[180px] text-yellow leading-none mb-4">404</div>
        <h1 className="font-anton text-4xl md:text-5xl mb-4">PAGE NOT FOUND</h1>
        <p className="text-sage/60 font-medium text-lg mb-12 leading-relaxed">
          This number doesn't check out. The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="bg-yellow text-charcoal font-anton text-xl px-10 py-4 rounded-xl hover:scale-105 transition-brutalist flex items-center justify-center gap-3">
            GO HOME <Icon icon="lucide:arrow-right" />
          </Link>
          <Link to="/verify" className="border border-sage/20 text-white font-anton text-xl px-10 py-4 rounded-xl hover:bg-white/5 transition-brutalist flex items-center justify-center gap-3">
            VERIFY A NUMBER <Icon icon="lucide:search" />
          </Link>
        </div>
        <p className="mt-12 text-xs font-bold text-sage/20 uppercase tracking-widest">TransferShield. · Secure Student Transfers</p>
      </div>
    </div>
  )
}
