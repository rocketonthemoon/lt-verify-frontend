import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Nav from '../components/Nav'

const Section = ({ id, icon, title, children }) => (
  <div id={id} className="mb-32 scroll-mt-24">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-12 h-12 bg-yellow rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon icon={icon} className="text-charcoal text-2xl" />
      </div>
      <h2 className="font-anton text-4xl">{title}</h2>
    </div>
    <div className="pl-16 space-y-6 text-charcoal/70 font-medium leading-relaxed">{children}</div>
  </div>
)

const Subsection = ({ title, children }) => (
  <div className="mb-10">
    <h3 className="font-anton text-2xl text-charcoal mb-4">{title}</h3>
    <div className="space-y-3 text-charcoal/70">{children}</div>
  </div>
)

const FlowStep = ({ num, title, desc }) => (
  <div className="flex gap-4 mb-6">
    <div className="w-10 h-10 bg-yellow text-charcoal rounded-lg flex items-center justify-center flex-shrink-0 font-anton font-bold">
      {num}
    </div>
    <div>
      <p className="font-bold text-charcoal">{title}</p>
      <p className="text-sm text-charcoal/60">{desc}</p>
    </div>
  </div>
)

export default function Docs() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="pt-40 pb-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-24 pb-16 border-b border-charcoal/10">
            <div className="inline-flex items-center gap-2 brutalist-border rounded-full px-4 py-1.5 mb-8">
              <Icon icon="lucide:book-open" className="text-yellow" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Documentation</span>
            </div>
            <h1 className="font-anton text-6xl md:text-7xl mb-6">DOCUMENTATION</h1>
            <p className="text-charcoal/60 font-medium text-lg max-w-2xl">
              Complete guide to TransferShield: how the system works, admin controls, data flow, and responsibilities.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="bg-[#f8f9fa] brutalist-border rounded-2xl p-10 mb-24">
            <h2 className="font-anton text-2xl mb-6">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { href: '#overview', label: 'System Overview', icon: 'lucide:layers' },
                { href: '#user-flow', label: 'User Flow', icon: 'lucide:users' },
                { href: '#admin', label: 'Admin Controls', icon: 'lucide:shield' },
                { href: '#data-flow', label: 'Data Flow', icon: 'lucide:git-branch' },
                { href: '#security', label: 'Security', icon: 'lucide:lock' },
                { href: '#responsibility', label: 'Responsibility Matrix', icon: 'lucide:checklist' },
                { href: '#repositories', label: 'Source Code', icon: 'lucide:github' },
              ].map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-brutalist border border-charcoal/5"
                >
                  <Icon icon={icon} className="text-yellow text-xl" />
                  <span className="font-medium text-charcoal">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* System Overview */}
          <Section id="overview" icon="lucide:layers" title="System Overview">
            <p>
              TransferShield is a <strong>community-driven trust platform</strong> that helps students verify money transfer contacts and rate transactions. The system operates on three core pillars: <strong>verification, rating, and community trust</strong>.
            </p>
            <Subsection title="Core Features">
              <p>🔍 <strong>Instant Number Lookup</strong> - Search any phone number to see their trust profile, verification status, and community ratings.</p>
              <p>⭐ <strong>Community Ratings</strong> - Users rate transfers on reliability and timeliness after completing transactions.</p>
              <p>✅ <strong>Admin Verification</strong> - Admins manually verify phone numbers to prevent fraud and establish trust.</p>
              <p>🛡️ <strong>Single-Use Tokens</strong> - Rating tokens are cryptographically random, one-time use only, and expire after 30 days.</p>
            </Subsection>
          </Section>

          {/* User Flow */}
          <Section id="user-flow" icon="lucide:users" title="How Users Interact">
            <Subsection title="User Journey">
              <FlowStep num="1" title="Search a Number" desc="Users enter a phone number (+370 or +91) to check trust profile" />
              <FlowStep num="2" title="View Profile" desc="See verification status, ratings, and trust scores (reliability & timeliness)" />
              <FlowStep num="3" title="Make Transfer" desc="User decides whether to transfer based on the profile information" />
              <FlowStep num="4" title="Rate Transaction" desc="After transfer, user uses an admin token to rate the experience" />
              <FlowStep num="5" title="Community Feedback" desc="Ratings update the person's average scores for future users" />
            </Subsection>

            <Subsection title="Getting Verified">
              <FlowStep num="1" title="Submit Request" desc="User fills out verification form with name, phone, email, description" />
              <FlowStep num="2" title="Admin Review" desc="Admin reviews the request and approves or rejects it" />
              <FlowStep num="3" title="Verified Status" desc="Phone number appears as 'VERIFIED' with admin's name (Vouched by X)" />
              <FlowStep num="4" title="Build Trust" desc="Community ratings accumulate to build trust score" />
            </Subsection>
          </Section>

          {/* Admin Controls */}
          <Section id="admin" icon="lucide:shield" title="Admin Controls & Responsibilities">
            <Subsection title="Admin Capabilities">
              <div className="space-y-3">
                <div className="bg-yellow/10 rounded-lg p-4 border border-yellow/20">
                  <p className="font-bold text-charcoal mb-1">📋 Pending Verifications</p>
                  <p className="text-sm text-charcoal/70">Review verification requests, approve or reject with comments</p>
                </div>
                <div className="bg-yellow/10 rounded-lg p-4 border border-yellow/20">
                  <p className="font-bold text-charcoal mb-1">🎫 Generate Tokens</p>
                  <p className="text-sm text-charcoal/70">Create rating tokens (1-5 at a time), set purpose, expiry in 30 days</p>
                </div>
                <div className="bg-yellow/10 rounded-lg p-4 border border-yellow/20">
                  <p className="font-bold text-charcoal mb-1">📊 Token Management</p>
                  <p className="text-sm text-charcoal/70">View token history, deactivate individual tokens or all active tokens</p>
                </div>
                <div className="bg-yellow/10 rounded-lg p-4 border border-yellow/20">
                  <p className="font-bold text-charcoal mb-1">👥 Admin Management (Super Admin Only)</p>
                  <p className="text-sm text-charcoal/70">Create new admins, toggle admin status (activate/deactivate accounts)</p>
                </div>
              </div>
            </Subsection>

            <Subsection title="Admin Login & Session">
              <p>Admins log in with username/password. Session is stored as an <strong>HTTP-only cookie</strong> (7-day expiry). Every request validates the JWT token and checks if the admin account is active.</p>
              <p className="mt-3"><strong>Rate Limiting:</strong> 10 login attempts per 15 minutes per IP address to prevent brute force attacks.</p>
            </Subsection>

            <Subsection title="Admin Roles">
              <div className="space-y-3 mt-3">
                <div className="border-l-4 border-yellow px-4 py-3 bg-white">
                  <p className="font-bold text-charcoal">👮 Admin</p>
                  <p className="text-sm text-charcoal/60">Review verifications, generate tokens, manage their own tokens</p>
                </div>
                <div className="border-l-4 border-charcoal px-4 py-3 bg-white">
                  <p className="font-bold text-charcoal">👑 Super Admin</p>
                  <p className="text-sm text-charcoal/60">All admin permissions + create new admins, deactivate all tokens, manage other admins</p>
                </div>
              </div>
            </Subsection>
          </Section>

          {/* Data Flow */}
          <Section id="data-flow" icon="lucide:git-branch" title="Data Flow & Architecture">
            <Subsection title="User Verification Flow">
              <div className="bg-white border border-charcoal/10 rounded-xl p-6 font-mono text-sm space-y-2">
                <p>User → <span className="text-yellow font-bold">/api/phone/request</span> → Backend</p>
                <p>Backend → MongoDB (VerificationRequest) → Status: "pending"</p>
                <p>Admin → <span className="text-yellow font-bold">/api/admin/approve-verification</span></p>
                <p>Backend → Update PhoneNumber (verified: true, vouchedByAdminName: "admin_name")</p>
                <p>Backend → Update VerificationRequest (status: "approved")</p>
                <p>Backend → Log activity (AdminActivityLog)</p>
              </div>
            </Subsection>

            <Subsection title="Rating Flow">
              <div className="bg-white border border-charcoal/10 rounded-xl p-6 font-mono text-sm space-y-2">
                <p>User → <span className="text-yellow font-bold">/api/rating/add</span> (with token)</p>
                <p>Backend → Validate token (one-time use, not expired)</p>
                <p>Backend → Create Rating in MongoDB</p>
                <p>Backend → Mark token as used (isUsed: true)</p>
                <p>Backend → Update PhoneNumber averages (reliability, timeliness)</p>
                <p>Backend → Log activity (RatingActivityLog)</p>
              </div>
            </Subsection>

            <Subsection title="Database Collections">
              <div className="space-y-2 text-sm">
                <p><strong>PhoneNumber:</strong> Verified numbers with ratings, owner name, verification date, admin who verified</p>
                <p><strong>VerificationRequest:</strong> Pending, approved, or rejected requests with documents and admin comments</p>
                <p><strong>Rating:</strong> Individual ratings with reliability/timeliness scores, comments, transaction details</p>
                <p><strong>AdminToken:</strong> Rating tokens (hashed) with usage status, expiry, and tracking</p>
                <p><strong>Admin:</strong> Admin accounts with roles, token stats, and verification stats</p>
                <p><strong>AdminActivityLog:</strong> Audit trail of all admin actions (login, approve, reject, token generation)</p>
                <p><strong>RatingActivityLog:</strong> Audit trail of all ratings submitted with token used</p>
              </div>
            </Subsection>
          </Section>

          {/* Security */}
          <Section id="security" icon="lucide:lock" title="Security & Token Management">
            <Subsection title="Token Security">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Icon icon="lucide:check-circle" className="text-yellow text-2xl flex-shrink-0" />
                  <div>
                    <p className="font-bold text-charcoal">256-Bit Random Generation</p>
                    <p className="text-sm text-charcoal/60">crypto.randomBytes(32).toString('hex') - Cryptographically secure</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon icon="lucide:check-circle" className="text-yellow text-2xl flex-shrink-0" />
                  <div>
                    <p className="font-bold text-charcoal">SHA-256 Hashing</p>
                    <p className="text-sm text-charcoal/60">Tokens stored as hash only, never in plain text</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon icon="lucide:check-circle" className="text-yellow text-2xl flex-shrink-0" />
                  <div>
                    <p className="font-bold text-charcoal">Single-Use Only</p>
                    <p className="text-sm text-charcoal/60">Marked as used immediately after rating submission</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon icon="lucide:check-circle" className="text-yellow text-2xl flex-shrink-0" />
                  <div>
                    <p className="font-bold text-charcoal">30-Day Expiration</p>
                    <p className="text-sm text-charcoal/60">MongoDB TTL index auto-deletes expired tokens</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon icon="lucide:check-circle" className="text-yellow text-2xl flex-shrink-0" />
                  <div>
                    <p className="font-bold text-charcoal">Admin Deactivation</p>
                    <p className="text-sm text-charcoal/60">Admins can deactivate individual or all tokens</p>
                  </div>
                </div>
              </div>
            </Subsection>

            <Subsection title="Other Security Features">
              <p>🔐 <strong>HTTP-Only Cookies</strong> - JWT tokens stored securely, inaccessible to JavaScript</p>
              <p>🛡️ <strong>Helmet.js</strong> - Protects against common HTTP vulnerabilities (XSS, clickjacking)</p>
              <p>🔒 <strong>CORS Configured</strong> - Only allows specified origins</p>
              <p>⏱️ <strong>Rate Limiting</strong> - 100 req/15min on public APIs, 10 req/15min on login</p>
              <p>✅ <strong>Input Validation</strong> - Phone numbers validated with strict regex before database queries</p>
              <p>📝 <strong>Activity Logging</strong> - All admin and rating actions logged to database for auditing</p>
            </Subsection>
          </Section>

          {/* Responsibility */}
          <Section id="responsibility" icon="lucide:checklist" title="Responsibility Matrix">
            <Subsection title="Community Users">
              <div className="space-y-2 text-sm">
                <p>✓ Search phone numbers to check trust profiles</p>
                <p>✓ Submit verification requests with accurate information</p>
                <p>✓ Use rating tokens to submit honest ratings after transfers</p>
                <p>✓ Report suspicious profiles or ratings to admins</p>
                <p>✗ Should NOT: Share tokens, submit duplicate ratings, falsify information</p>
              </div>
            </Subsection>

            <Subsection title="Admins">
              <div className="space-y-2 text-sm">
                <p>✓ Carefully review verification requests with supporting documents</p>
                <p>✓ Approve only legitimate requests with proper vetting</p>
                <p>✓ Generate rating tokens and distribute to community members</p>
                <p>✓ Monitor and deactivate suspicious tokens</p>
                <p>✓ Maintain integrity of the verification system</p>
                <p>✗ Should NOT: Approve unverified numbers, sell tokens, misuse admin access</p>
              </div>
            </Subsection>

            <Subsection title="Super Admins">
              <div className="space-y-2 text-sm">
                <p>✓ Oversee all admin activities through activity logs</p>
                <p>✓ Create and manage admin accounts</p>
                <p>✓ Deactivate compromised or inactive admins</p>
                <p>✓ Emergency: Deactivate all tokens if security breach detected</p>
                <p>✓ Review audit logs for suspicious patterns</p>
                <p>✗ Should NOT: Approve verifications directly (unless also acting as admin)</p>
              </div>
            </Subsection>

            <Subsection title="System">
              <div className="space-y-2 text-sm">
                <p>✓ Validate all inputs and prevent injection attacks</p>
                <p>✓ Maintain secure token storage (hashed, never plain text)</p>
                <p>✓ Enforce role-based access control</p>
                <p>✓ Log all actions for audit trails</p>
                <p>✓ Auto-expire tokens after 30 days</p>
                <p>✓ Rate limit API endpoints to prevent abuse</p>
              </div>
            </Subsection>
          </Section>

          {/* Repositories */}
          <Section id="repositories" icon="lucide:github" title="Source Code & Repositories">
            <p>
              TransferShield is fully open source. Both frontend and backend repositories are publicly available for review, contribution, and deployment.
            </p>

            <Subsection title="Frontend Repository">
              <div className="space-y-3">
                <p className="font-medium text-charcoal">
                  <strong>Repository:</strong> <a href="https://github.com/rocketonthemoon/lt-verify-frontend" target="_blank" rel="noopener noreferrer" className="text-yellow hover:underline">github.com/rocketonthemoon/lt-verify-frontend</a>
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Tech Stack:</strong> React, Tailwind CSS, Vite, React Router</p>
                  <p><strong>Key Features:</strong></p>
                  <div className="pl-4 space-y-1">
                    <p>• Homepage with interactive number verification search</p>
                    <p>• Verify page showing trust profiles with ratings and verification status</p>
                    <p>• Rate page for submitting transaction ratings using admin tokens</p>
                    <p>• Request page for submitting phone number verification requests</p>
                    <p>• Stats page displaying cumulative transfer volume by currency</p>
                    <p>• Admin dashboard for verification request management and token generation</p>
                    <p>• Responsive design with mobile-first approach</p>
                    <p>• Mobile hamburger menu for navigation</p>
                    <p>• Admin activity logging and monitoring</p>
                  </div>
                </div>
              </div>
            </Subsection>

            <Subsection title="Backend Repository">
              <div className="space-y-3">
                <p className="font-medium text-charcoal">
                  <strong>Repository:</strong> <a href="https://github.com/rocketonthemoon/lt-verify-backend" target="_blank" rel="noopener noreferrer" className="text-yellow hover:underline">github.com/rocketonthemoon/lt-verify-backend</a>
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Tech Stack:</strong> Node.js, Express, MongoDB, JWT, Helmet, CORS</p>
                  <p><strong>Key Features:</strong></p>
                  <div className="pl-4 space-y-1">
                    <p>• RESTful API for phone number queries and verification</p>
                    <p>• Rating submission with cryptographically secure token validation</p>
                    <p>• Admin authentication with JWT and HTTP-only cookies</p>
                    <p>• Verification request management (pending, approved, rejected)</p>
                    <p>• Token generation and management (single-use, 30-day expiry)</p>
                    <p>• Admin activity logging to MongoDB</p>
                    <p>• Rating activity logging with audit trail</p>
                    <p>• Rate limiting and security headers (Helmet.js)</p>
                    <p>• CORS protection and input validation</p>
                    <p>• Role-based access control (Admin vs Super Admin)</p>
                  </div>
                </div>
              </div>
            </Subsection>

            <Subsection title="Getting Started">
              <div className="space-y-3 text-sm">
                <p><strong>Clone and Setup:</strong></p>
                <div className="bg-[#f8f9fa] rounded-lg p-4 font-mono text-xs overflow-x-auto">
                  <p className="mb-2">{"# Clone repositories"}</p>
                  <p>git clone https://github.com/rocketonthemoon/lt-verify-frontend</p>
                  <p>git clone https://github.com/rocketonthemoon/lt-verify-backend</p>
                  <p className="mt-2 mb-2">{"# Install dependencies and run"}</p>
                  <p>cd lt-verify-frontend && npm install && npm run dev</p>
                  <p>cd lt-verify-backend && npm install && npm run dev</p>
                </div>
                <p className="mt-3">Frontend runs on <code className="bg-[#f8f9fa] px-2 py-1 rounded">http://localhost:5173</code></p>
                <p>Backend runs on <code className="bg-[#f8f9fa] px-2 py-1 rounded">http://localhost:4000</code></p>
              </div>
            </Subsection>
          </Section>

          {/* CTA */}
          <div className="mt-32 pt-16 border-t border-charcoal/10">
            <div className="bg-charcoal text-white rounded-2xl p-12 text-center">
              <h2 className="font-anton text-3xl mb-6 text-yellow">Ready to Get Started?</h2>
              <p className="text-white/70 mb-10 max-w-xl mx-auto">
                If you're an admin or want to learn more about becoming part of the TransferShield community, reach out or explore the GitHub repositories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/rocketonthemoon/lt-verify-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-yellow text-charcoal px-8 py-3 rounded-xl font-bold hover:scale-105 transition-brutalist"
                >
                  <Icon icon="lucide:github" /> Frontend Repo
                </a>
                <a
                  href="https://github.com/rocketonthemoon/lt-verify-backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-brutalist border border-white/20"
                >
                  <Icon icon="lucide:github" /> Backend Repo
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
