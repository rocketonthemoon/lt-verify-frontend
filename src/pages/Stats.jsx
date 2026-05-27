import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Doughnut, Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler } from 'chart.js'
import Nav from '../components/Nav'
import { api } from '../lib/api'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler)

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function fmt(n) {
  if (n == null || isNaN(n)) return '—'
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

function buildLabels() {
  const now = new Date()
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1)
    return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
  })
}

function monthKey(year, month) {
  const d = new Date(year, month - 1, 1)
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

const chartFont = { family: 'Satoshi', size: 11 }

export default function Stats() {
  const [state, setState] = useState('loading')
  const [data, setData] = useState(null)

  useEffect(() => {
    api.rating.stats().then(({ ok, data }) => {
      if (!ok) { setState('error'); return }
      setData(data)
      setState('ready')
    }).catch(() => setState('error'))
  }, [])

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center flex-col gap-4">
        <div className="w-12 h-12 border-4 border-charcoal/10 border-t-yellow rounded-full animate-spin-custom" />
        <p className="font-bold text-charcoal/40 text-sm uppercase tracking-widest">Loading stats...</p>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center flex-col gap-4">
        <Icon icon="lucide:alert-circle" className="text-red-500 text-5xl" />
        <p className="font-bold text-red-500 text-sm">Could not load stats. Is the backend running on port 4000?</p>
      </div>
    )
  }

  const { currencyTotals, monthly, totalRatings, totalTransactions } = data
  const eur = currencyTotals.find(c => c._id === 'EUR')
  const inr = currencyTotals.find(c => c._id === 'INR')

  const labels = buildLabels()
  const eurMonthly = new Array(12).fill(0)
  const inrMonthly = new Array(12).fill(0)
  const countMonthly = new Array(12).fill(0)

  monthly.forEach(m => {
    const idx = labels.indexOf(monthKey(m._id.year, m._id.month))
    if (idx === -1) return
    if (m._id.currency === 'EUR') eurMonthly[idx] = m.total
    if (m._id.currency === 'INR') inrMonthly[idx] = m.total
    countMonthly[idx] += m.count
  })

  const hasDonut = (eur?.total || 0) + (inr?.total || 0) > 0
  const hasBar = eurMonthly.some(v => v > 0) || inrMonthly.some(v => v > 0)
  const hasCount = countMonthly.some(v => v > 0)

  const axisStyle = { grid: { color: 'rgba(23,30,25,0.05)' }, ticks: { font: chartFont, color: 'rgba(23,30,25,0.4)' } }
  const axisStyleDark = { grid: { color: 'rgba(183,198,194,0.08)' }, ticks: { font: chartFont, color: 'rgba(183,198,194,0.4)' } }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Nav />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="grid-pattern rounded-3xl p-10 md:p-16 mb-10 bg-white brutalist-border">
            <div className="inline-flex items-center gap-2 brutalist-border rounded-full px-4 py-1.5 mb-6 bg-white">
              <Icon icon="lucide:bar-chart-2" className="text-yellow" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Live Community Data</span>
            </div>
            <h1 className="font-anton text-6xl md:text-8xl mb-4">COMMUNITY<br /><span className="text-yellow">STATS</span></h1>
            <p className="text-charcoal/60 font-medium text-lg max-w-xl">A transparent look at how much the Lithuanian student community transfers — in euros and rupees.</p>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-charcoal text-white rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-sage/50 mb-2">Total EUR</p>
              <p className="font-anton text-4xl text-yellow">{eur ? `€${fmt(eur.total)}` : '€0'}</p>
              <p className="text-xs text-sage/40 font-medium mt-1">{eur ? eur.count : 0} transactions</p>
            </div>
            <div className="bg-yellow rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-charcoal/50 mb-2">Total INR</p>
              <p className="font-anton text-4xl text-charcoal">{inr ? `₹${fmt(inr.total)}` : '₹0'}</p>
              <p className="text-xs text-charcoal/40 font-medium mt-1">{inr ? inr.count : 0} transactions</p>
            </div>
            <div className="bg-white brutalist-border rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-2">Total Ratings</p>
              <p className="font-anton text-4xl">{fmt(totalRatings)}</p>
              <p className="text-xs text-charcoal/30 font-medium mt-1">community reviews</p>
            </div>
            <div className="bg-white brutalist-border rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-2">With Amount</p>
              <p className="font-anton text-4xl">{fmt(totalTransactions)}</p>
              <p className="text-xs text-charcoal/30 font-medium mt-1">logged transfers</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white brutalist-border rounded-2xl p-8 flex flex-col">
              <h2 className="font-anton text-2xl mb-1">EUR vs INR</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-charcoal/30 mb-6">Volume split by currency</p>
              <div className="flex-1 flex items-center justify-center" style={{ minHeight: 220 }}>
                {!hasDonut ? (
                  <div className="text-center text-charcoal/30 font-medium text-sm">
                    <Icon icon="lucide:pie-chart" className="text-4xl mb-2 block opacity-20" />No data yet
                  </div>
                ) : (
                  <Doughnut
                    data={{ labels: ['EUR €', 'INR ₹'], datasets: [{ data: [eur?.total || 0, inr?.total || 0], backgroundColor: ['#ffe17c', '#171e19'], borderWidth: 0, hoverOffset: 8 }] }}
                    options={{ cutout: '65%', plugins: { legend: { position: 'bottom', labels: { font: { family: 'Satoshi', weight: '700', size: 12 }, padding: 16, color: '#171e19' } }, tooltip: { callbacks: { label: ctx => ` ${ctx.label.includes('EUR') ? '€' : '₹'}${fmt(ctx.raw)}` } } } }}
                  />
                )}
              </div>
            </div>

            <div className="md:col-span-2 bg-white brutalist-border rounded-2xl p-8 flex flex-col">
              <h2 className="font-anton text-2xl mb-1">MONTHLY VOLUME</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-charcoal/30 mb-6">Last 12 months — EUR &amp; INR transferred</p>
              <div className="flex-1" style={{ minHeight: 220, position: 'relative' }}>
                {!hasBar ? (
                  <div className="text-center text-charcoal/30 font-medium text-sm pt-16">
                    <Icon icon="lucide:bar-chart-2" className="text-4xl mb-2 block opacity-20" />No monthly data yet
                  </div>
                ) : (
                  <Bar
                    data={{ labels, datasets: [{ label: 'EUR €', data: eurMonthly, backgroundColor: '#ffe17c', borderRadius: 6, borderSkipped: false }, { label: 'INR ₹', data: inrMonthly, backgroundColor: '#171e19', borderRadius: 6, borderSkipped: false }] }}
                    options={{ responsive: true, plugins: { legend: { labels: { font: { family: 'Satoshi', weight: '700', size: 12 }, color: '#171e19' } } }, scales: { x: { ...axisStyle, grid: { display: false } }, y: axisStyle } }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="bg-charcoal rounded-2xl p-8">
            <h2 className="font-anton text-2xl text-yellow mb-1">MONTHLY TRANSACTION COUNT</h2>
            <p className="text-xs font-bold uppercase tracking-widest text-sage/30 mb-6">Number of rated transfers per month</p>
            <div style={{ minHeight: 200 }}>
              {!hasCount ? (
                <div className="text-center text-sage/20 font-medium text-sm pt-10">
                  <Icon icon="lucide:activity" className="text-4xl mb-2 block opacity-20" />No data yet
                </div>
              ) : (
                <Line
                  data={{ labels, datasets: [{ label: 'Transactions', data: countMonthly, borderColor: '#ffe17c', backgroundColor: 'rgba(255,225,124,0.08)', borderWidth: 2.5, pointBackgroundColor: '#ffe17c', pointRadius: 4, pointHoverRadius: 6, fill: true, tension: 0.35 }] }}
                  options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: axisStyleDark, y: { ...axisStyleDark, beginAtZero: true, ticks: { ...axisStyleDark.ticks, precision: 0 } } } }}
                />
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
