import { Icon } from '@iconify/react'

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-white grid-pattern flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-anton text-[20vw] text-charcoal/[0.03]">MAINTENANCE</span>
      </div>
      <div className="relative z-10 max-w-xl w-full">
        <div className="flex items-center justify-center gap-2 mb-10">
          <Icon icon="lucide:settings" className="animate-spin-slow" style={{ fontSize: 56, color: '#ffe17c' }} />
          <Icon icon="lucide:settings" className="animate-spin-reverse" style={{ fontSize: 36, color: '#171e19', opacity: 0.3 }} />
        </div>
        <div className="inline-flex items-center gap-2 brutalist-border rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Scheduled Maintenance</span>
        </div>
        <h1 className="font-anton text-6xl md:text-7xl mb-6">
          WE'LL BE<br /><span className="text-yellow rotate-highlight">BACK SOON</span>
        </h1>
        <p className="text-charcoal/60 font-medium text-lg mb-10 leading-relaxed">
          We're doing some work behind the scenes to make LT Verify faster and more reliable. Sit tight — we'll be back shortly.
        </p>
        <div className="bg-charcoal/8 rounded-full h-2 mb-2 overflow-hidden">
          <div className="animate-progress h-full bg-yellow rounded-full" />
        </div>
        <p className="text-xs font-bold text-charcoal/30 uppercase tracking-widest mb-10">Work in progress</p>
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { icon: 'lucide:database', label: 'Database', status: 'Operational', color: 'text-green-500', scolor: 'text-green-600', dark: false },
            { icon: 'lucide:server', label: 'Server', status: 'Updating', color: 'text-yellow', scolor: 'text-orange-400', dark: true },
            { icon: 'lucide:wifi', label: 'Network', status: 'Operational', color: 'text-green-500', scolor: 'text-green-600', dark: false },
          ].map(({ icon, label, status, color, scolor, dark }) => (
            <div key={label} className={`${dark ? 'bg-charcoal' : 'bg-white brutalist-border'} rounded-xl p-4`}>
              <Icon icon={icon} className={`text-2xl ${color} mb-2 block`} />
              <p className={`text-xs font-bold uppercase tracking-wider ${dark ? 'text-sage/50' : 'text-charcoal/50'}`}>{label}</p>
              <p className={`text-xs font-bold mt-1 ${scolor}`}>{status}</p>
            </div>
          ))}
        </div>
        <p className="text-xs font-bold text-charcoal/30 uppercase tracking-widest">LT VERIFY. · Lithuanian Student Transfer Community</p>
      </div>
    </div>
  )
}
