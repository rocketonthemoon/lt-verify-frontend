import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Nav from '../components/Nav'

const Section = ({ icon, title, children }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 bg-yellow rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon icon={icon} className="text-charcoal text-lg" />
      </div>
      <h2 className="font-anton text-2xl">{title}</h2>
    </div>
    <div className="pl-12 space-y-3 text-charcoal/70 font-medium leading-relaxed">{children}</div>
  </div>
)

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 brutalist-border rounded-full px-4 py-1.5 mb-6">
              <Icon icon="lucide:shield-check" className="text-yellow" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">GDPR Compliant</span>
            </div>
            <h1 className="font-anton text-6xl md:text-7xl mb-6">PRIVACY<br /><span className="text-yellow">POLICY</span></h1>
            <p className="text-charcoal/60 font-medium text-lg leading-relaxed max-w-xl">
              LT Verify is built for the Lithuanian student community. We take your privacy seriously and are fully compliant with the General Data Protection Regulation (GDPR).
            </p>
            <p className="text-xs font-bold text-charcoal/30 uppercase tracking-widest mt-4">Last updated: May 2025</p>
          </div>

          {/* GDPR badge */}
          <div className="bg-charcoal rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 bg-yellow rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon icon="lucide:shield" className="text-charcoal text-3xl" />
            </div>
            <div>
              <p className="font-anton text-2xl text-white mb-1">GDPR COMPLIANT</p>
              <p className="text-sage/60 font-medium text-sm leading-relaxed">
                As a service operated within the European Union, LT Verify complies with Regulation (EU) 2016/679 — the General Data Protection Regulation. You have full rights over your personal data at any time.
              </p>
            </div>
          </div>

          {/* Sections */}
          <Section icon="lucide:database" title="WHAT DATA WE COLLECT">
            <p>We collect only the minimum data necessary to operate the service:</p>
            <ul className="space-y-2 mt-3">
              {[
                ['Phone numbers', 'submitted for community verification or rating purposes'],
                ['Owner name', 'provided voluntarily when requesting verification'],
                ['Email address', 'provided when submitting a verification request, used only for follow-up'],
                ['Transfer details', 'transaction amount and currency (EUR or INR) optionally logged with a rating — used only for aggregated community statistics'],
                ['Ratings', 'star scores (reliability and timeliness) and optional written comments submitted about verified members'],
                ['Usage data', 'standard server logs (IP address, timestamp) retained for security and abuse prevention — not linked to any profile'],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex items-start gap-2">
                  <span className="text-yellow mt-1 flex-shrink-0">·</span>
                  <span><strong className="text-charcoal">{bold}</strong> — {rest}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">We do <strong className="text-charcoal">not</strong> collect names linked to ratings, browsing history, device fingerprints, or any financial account information.</p>
          </Section>

          <Section icon="lucide:target" title="HOW WE USE YOUR DATA">
            <p>Data is used exclusively for the following purposes:</p>
            <ul className="space-y-2 mt-3">
              {[
                'To verify phone numbers as trusted community members',
                'To display trust scores and ratings to the community',
                'To produce anonymous, aggregated transfer statistics (total EUR / INR volume) — no individual is identifiable from these stats',
                'To prevent spam ratings via one-time admin tokens',
                'To investigate abuse reports or fraudulent activity',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-yellow mt-1 flex-shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">We do <strong className="text-charcoal">not</strong> sell, share, or use your data for advertising, profiling, or any commercial purpose.</p>
          </Section>

          <Section icon="lucide:share-2" title="DATA SHARING">
            <p>We do not sell or rent personal data to third parties. Data may only be shared in the following limited cases:</p>
            <ul className="space-y-2 mt-3">
              {[
                'With community administrators, who can see submitted verification requests and ratings in order to operate the platform',
                'With our infrastructure provider (hosting / database), who processes data solely on our behalf under a Data Processing Agreement',
                'If required by law or a valid legal order from a competent authority',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-yellow mt-1 flex-shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon="lucide:clock" title="DATA RETENTION">
            <p>We retain data only as long as necessary:</p>
            <ul className="space-y-2 mt-3">
              {[
                ['Verification records and ratings', 'kept for as long as the platform is active or until a deletion request is made'],
                ['Admin tokens', 'automatically expire after 30 days'],
                ['Server logs', 'retained for up to 90 days for security purposes, then deleted'],
                ['Email addresses', 'retained until the verification request is resolved, then deleted'],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex items-start gap-2">
                  <span className="text-yellow mt-1 flex-shrink-0">·</span>
                  <span><strong className="text-charcoal">{bold}</strong> — {rest}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon="lucide:user-check" title="YOUR GDPR RIGHTS">
            <p>Under GDPR, you have the following rights regarding your personal data:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {[
                ['lucide:eye', 'Right of Access', 'Request a copy of the personal data we hold about you'],
                ['lucide:edit', 'Right to Rectification', 'Have inaccurate data corrected'],
                ['lucide:trash-2', 'Right to Erasure', 'Request deletion of your data ("right to be forgotten")'],
                ['lucide:slash', 'Right to Restriction', 'Ask us to limit how we use your data'],
                ['lucide:download', 'Right to Portability', 'Receive your data in a structured, machine-readable format'],
                ['lucide:x-octagon', 'Right to Object', 'Object to processing based on legitimate interests'],
              ].map(([icon, title, desc]) => (
                <div key={title} className="bg-[#f8f9fa] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon icon={icon} className="text-yellow text-base" />
                    <p className="font-bold text-charcoal text-sm">{title}</p>
                  </div>
                  <p className="text-xs text-charcoal/50">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4">To exercise any of these rights, contact us at the address below. We will respond within <strong className="text-charcoal">30 days</strong> as required by GDPR.</p>
          </Section>

          <Section icon="lucide:cookie" title="COOKIES">
            <p>LT Verify uses the minimum number of cookies necessary to operate:</p>
            <ul className="space-y-2 mt-3">
              {[
                ['lt_consent', 'Remembers that you have accepted this cookie notice. Expires after 1 year. No personal data stored.'],
                ['lt_admin_jwt', 'HTTP-only session cookie issued only to admin users upon login. Contains a signed JWT used to authenticate admin actions. Not accessible to JavaScript. Expires after 7 days or on logout.'],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex items-start gap-2">
                  <span className="text-yellow mt-1 flex-shrink-0">·</span>
                  <span><strong className="text-charcoal font-mono text-sm">{bold}</strong> — {rest}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">We do <strong className="text-charcoal">not</strong> use tracking cookies, advertising cookies, or any third-party analytics scripts (e.g. Google Analytics).</p>
          </Section>

          <Section icon="lucide:lock" title="SECURITY">
            <p>We implement appropriate technical measures to protect your data:</p>
            <ul className="space-y-2 mt-3">
              {[
                'Admin passwords are hashed using bcrypt — we never store plaintext passwords',
                'Admin tokens are stored as SHA-256 hashes in the database',
                'Admin session cookies are HTTP-only and SameSite=Strict — inaccessible to JavaScript and protected against cross-site request forgery',
                'All API communication is rate-limited to prevent brute-force attacks',
                'HTTP security headers are applied via Helmet',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-yellow mt-1 flex-shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon="lucide:user-check" title="DATA CONTROLLER">
            <p>LT Verify is operated as a community project for Lithuanian students. To exercise any of your GDPR rights or report a privacy concern, reach out through the community WhatsApp group.</p>
            <p className="mt-3 text-xs text-charcoal/40">You also have the right to lodge a complaint with your national data protection authority. In Lithuania: <strong className="text-charcoal/60">State Data Protection Inspectorate</strong> — <span className="font-mono">ada.lt</span>.</p>
          </Section>

          <div className="border-t border-charcoal/10 pt-8 mt-4 text-sm text-charcoal/40 font-medium">
            <p>We may update this policy from time to time. Any significant changes will be communicated through the community channel. Continued use of the platform after changes constitutes acceptance of the updated policy.</p>
          </div>

          <div className="mt-10">
            <Link to="/" className="inline-flex items-center gap-2 bg-charcoal text-white font-anton text-lg px-8 py-4 rounded-xl hover:scale-105 transition-brutalist">
              <Icon icon="lucide:arrow-left" /> BACK TO HOME
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}
