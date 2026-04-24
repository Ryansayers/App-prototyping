import { useEffect, useState } from 'react'
import './Page.css'
import './DesktopPageNav2.css'
import content from '../content.json'
import DiscoverCarousel from '../components/DiscoverCarousel'
import BirthdayCarousel from '../components/BirthdayCarousel'
import PeopleCarousel from '../components/PeopleCarousel'
import FAB from '../components/FAB'
import {
  loadScheme,
  applySchemeAttr,
  applyImageFilter, loadImageFilter,
  applyTheme, loadTheme,
  applySeeds, loadSeeds,
  PRIMARY_PRESETS, SECONDARY_PRESETS, NEUTRAL_PRESETS,
  applyFont, loadFont,
  LOGO_PRESETS, loadLogo,
  applyBg, loadBg,
} from '../seeds.js'

// ── Content ──────────────────────────────────────────────────
const {
  anniversaries: ANNIVERSARIES_RAW,
  birthdays: BIRTHDAYS,
  cards: CARDS,
  discover: DISCOVER,
  recognitionNudge,
  benefitsCTA,
  infoCard,
  heartCard,
  voiceCard,
  welcomeBanner,
  savingsCard,
} = loadScheme(content).home

const ANNIVERSARIES = ANNIVERSARIES_RAW
const ANNIV_PEOPLE = ANNIVERSARIES_RAW?.map(a => ({ ...a, sublabel: `${a.years} ${a.years === 1 ? 'year' : 'years'}` }))
const { news: NEWS = [], recognition: RECOGNITION = [] } = loadScheme(content).feed || {}

// ── Icons ─────────────────────────────────────────────────────
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
)

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 7h18l-3-5H6z" />
    <path d="M3 7l1.5 11a2 2 0 002 1.5h11a2 2 0 002-1.5L21 7" />
    <path d="M9 11v4M15 11v4" />
  </svg>
)

const YouIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
)

const AppsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const BrandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

// ── Side nav icons ────────────────────────────────────────────
const HomeNavIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
)
const FeedNavIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M4 10h16M4 14h10M4 18h7" />
  </svg>
)
const ShopNavIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 7h18l-1.5 10a2 2 0 01-2 1.5H6.5a2 2 0 01-2-1.5L3 7" />
    <path d="M16 11a4 4 0 01-8 0" />
  </svg>
)
const RecNavIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
)
const BenefitsNavIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
  </svg>
)
const PeopleNavIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
)
const EventsNavIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)
const SurveysNavIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
)
const MoreNavIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
)
const StarNavIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

// ── Nav items — boom! hierarchy ───────────────────────────────
const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeNavIcon },
  {
    id: 'benefits',
    label: 'Benefits',
    icon: BenefitsNavIcon,
    children: [
      { id: 'benefits-app', label: 'App Centre' },
      { id: 'mental',       label: 'Mental Wellbeing' },
      { id: 'physical',     label: 'Physical Wellbeing' },
      { id: 'financial',    label: 'Financial Wellbeing' },
      { id: 'career-wb',    label: 'Career Wellbeing' },
      { id: 'social-wb',    label: 'Social Wellbeing' },
      { id: 'family-wb',    label: 'Family Wellbeing' },
    ],
  },
  {
    id: 'appreci8',
    label: 'Recognition',
    icon: StarNavIcon,
    children: [
      { id: 'rec-overview', label: 'Overview' },
      { id: 'appreci8-hub', label: 'Appreci8 Hub' },
      { id: 'wow-wall',     label: 'Wow Wall' },
      { id: 'send-rec',     label: 'Send recognition' },
      { id: 'goal-nom',     label: 'Strategic Nomination' },
      { id: 'moments',      label: 'Moments that Matter' },
    ],
  },
  {
    id: 'news',
    label: 'News',
    icon: FeedNavIcon,
    children: [
      { id: 'boom-news',  label: 'boom! News' },
      { id: 'aus-news',   label: 'AUS Product News' },
      { id: 'uk-news',    label: 'UK News' },
      { id: 'epic-news',  label: 'EP!C News' },
    ],
  },
  {
    id: 'edenred',
    label: 'Company',
    icon: BrandIcon,
    children: [
      { id: 'purpose',   label: 'Purpose' },
      { id: 'values',    label: 'Values' },
      { id: 'brief',     label: 'Brief' },
      { id: 'strategy',  label: 'Strategy' },
      { id: 'careers',   label: 'Careers' },
      { id: 'csr',       label: 'CSR Strategy' },
      { id: 'group-news',label: 'Group News' },
    ],
  },
  {
    id: 'our-strategy',
    label: 'Strategy',
    icon: SurveysNavIcon,
    children: [
      { id: 'amplify',     label: 'Amplify 2025–28' },
      { id: 'beyond',      label: 'Beyond 2022–25' },
      { id: 'connection',  label: 'Great Connection' },
      { id: 'connect60',   label: 'Connect60' },
      { id: 'edenvoice',   label: 'EdenVoice' },
      { id: 'edenred-rg',  label: 'edenred+rg' },
    ],
  },
  {
    id: 'heart',
    label: 'Wellbeing',
    icon: RecNavIcon,
    children: [
      { id: 'heart-hub',       label: 'HEART Hub' },
      { id: 'prev-support',    label: 'Preventative Support' },
      { id: 'daily-support',   label: 'Daily Support' },
      { id: 'crisis-support',  label: 'Crisis Support' },
      { id: 'wellbeing-plus',  label: 'Wellbeing+' },
      { id: 'wellbeing-centre',label: 'Wellbeing Centre' },
      { id: 'unmind',          label: 'Unmind' },
      { id: 'nudge',           label: 'nudge' },
    ],
  },
  {
    id: 'epic',
    label: 'EP!C',
    icon: PeopleNavIcon,
    children: [
      { id: 'culture-cal',    label: 'Culture Calendar' },
      { id: 'epic-networks',  label: 'EP!C Networks' },
      { id: 'inclusive-rec',  label: 'Inclusive Recruitment' },
      { id: 'epic-communities',label: 'EP!C Communities' },
    ],
  },
  {
    id: 'learning',
    label: 'Learning',
    icon: ShopNavIcon,
    children: [
      { id: 'ld-hub',      label: 'L&D Hub' },
      { id: 'onboarding',  label: 'Onboarding' },
      { id: 'motiv8',      label: 'Motiv8' },
      { id: 'elev8',       label: 'Elev8' },
      { id: 'our-values',  label: 'Values & Behaviours' },
      { id: 'handbook',    label: 'Our Handbook' },
      { id: 'our-brand',   label: 'Our Brand' },
      { id: 'manager-hub', label: 'Manager Hub' },
    ],
  },
  {
    id: 'people',
    label: 'People',
    icon: PeopleNavIcon,
    children: [
      { id: 'directory',    label: 'People Directory' },
      { id: 'offices',      label: 'Offices' },
      { id: 'biz-support',  label: 'Business Support' },
      { id: 'team-comms',   label: 'Team Comms' },
      { id: 'leadership',   label: 'Leadership Team' },
      { id: 'emp-groups',   label: 'Employee Groups' },
    ],
  },
  {
    id: 'essentials',
    label: 'Essentials',
    icon: MoreNavIcon,
    children: [
      { id: 'expenses',   label: 'Expenses' },
      { id: 'payslips',   label: 'Payslips' },
      { id: 'egencia',    label: 'Egencia' },
      { id: 'mobile-apps',label: 'Mobile Apps' },
      { id: 'workday',    label: 'Workday' },
      { id: 'emp-handbook',label: 'Employee Handbook' },
      { id: 'pay-phil',   label: 'Pay Philosophy' },
    ],
  },
  {
    id: 'innohub',
    label: 'External Links',
    icon: EventsNavIcon,
    children: [
      { id: 'innohub-hq',  label: 'InnoHub HQ',            external: true },
      { id: 'primetime',   label: 'Primetime Newsletter',   external: true },
      { id: 'power-hour',  label: 'Product Power Hour',     external: true },
      { id: 'status',      label: 'Status Update',          external: true },
    ],
  },
]

const REC_VALUE_COLOURS = {
  'Innovation':      { background: '#dbeafe', color: '#1d4ed8' },
  'Collaboration':   { background: '#d1fae5', color: '#065f46' },
  'Customer Focus':  { background: '#fef3c7', color: '#92400e' },
  'Excellence':      { background: '#ede9fe', color: '#5b21b6' },
  'Accountability':  { background: '#fee2e2', color: '#991b1b' },
  'Respect':         { background: '#fce7f3', color: '#9d174d' },
  'Teamwork':        { background: '#e0f2fe', color: '#0369a1' },
  'Honesty':         { background: '#f0fdf4', color: '#166534' },
}

// ── Header ────────────────────────────────────────────────────
function DvHeader() {
  const [hasNotif, setHasNotif] = useState(true)
  const logoSrc = LOGO_PRESETS[loadLogo()]?.src

  return (
    <header className="dv-header">
      <div className="dv-header-inner">
        <div className="dv-header-logo">
          {logoSrc
            ? <img src={logoSrc} alt="Brand logo" className="dv-logo-img" />
            : <span className="dv-logo-word">Intranet</span>}
        </div>
        <div className="dv-header-actions">
          <button className="dv-icon-btn" aria-label="Basket">
            <CartIcon />
          </button>
          <button className="dv-icon-btn" onClick={() => setHasNotif(false)} aria-label="Notifications">
            <BellIcon />
            {hasNotif && <span className="dv-notif-dot" />}
          </button>
          <button className="dv-icon-btn dv-icon-btn--avatar" aria-label="You">
            <YouIcon />
          </button>
        </div>
      </div>
    </header>
  )
}

// ── Section components ────────────────────────────────────────
function WelcomeBannerSection() {
  if (!welcomeBanner) return null
  return (
    <div className="welcome-banner dv-banner-full">
      <div className="welcome-banner-stripe" />
      <div className="welcome-banner-body">
        <span className="welcome-banner-eyebrow">{welcomeBanner.eyebrow}</span>
        <p className="welcome-banner-headline">{welcomeBanner.headline}</p>
        <p className="welcome-banner-tagline">
          {welcomeBanner.tagline} <strong>{welcomeBanner.brandName}</strong>
        </p>
      </div>
    </div>
  )
}

function RecognitionNudgeSection() {
  if (!recognitionNudge) return null
  return (
    <div className="rec-nudge">
      <div className="rec-nudge-award">Reward pot reminder</div>
      <div className="rec-nudge-pts">
        <span className="rec-nudge-pts-value">{recognitionNudge.points}</span>
        <span className="rec-nudge-pts-unit">PNT</span>
      </div>
      <p className="rec-nudge-desc">left to send in the next {recognitionNudge.daysLeft} days</p>
      <button className="cta-btn">{recognitionNudge.ctaLabel}</button>
    </div>
  )
}

function WorkAnniversariesSection() {
  return (
    <div className="anniv-card">
      <h3 className="anniv-title">Work Anniversaries</h3>
      <div className="anniv-list">
        {ANNIVERSARIES.slice(0, 3).map((a) => (
          <div key={a.id} className="anniv-item">
            <div className="anniv-avatar" style={{ background: a.colour }}>{a.initials}</div>
            <div className="anniv-info">
              <span className="anniv-name">{a.name}</span>
              <span className="anniv-date">{a.date}</span>
            </div>
            <span className="anniv-years">{a.years} {a.years === 1 ? 'year' : 'years'}</span>
          </div>
        ))}
      </div>
      <button className="anniv-link">See all anniversaries</button>
    </div>
  )
}

function MainCardSection() {
  const card = infoCard || benefitsCTA
  return (
    <div className="content-card content-card--hero">
      <div className="content-card-img-wrap">
        <img
          className="content-card-img"
          src={card.image}
          alt={card.title}
          style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
        />
        <div className="content-card-img-overlay" />
      </div>
      <div className="content-card-body">
        <h1 className="content-card-title">{card.title}</h1>
        {card.subtitle && <p className="content-card-subtitle">{card.subtitle}</p>}
        {card.text && <p className="content-card-text">{card.text}</p>}
        {card.ctaLabel && <button className="content-card-btn">{card.ctaLabel}</button>}
      </div>
    </div>
  )
}

function HeartCardSection() {
  return (
    <div className="content-card">
      <div className="content-card-img-wrap">
        <img
          className="content-card-img"
          src={heartCard.image}
          alt={heartCard.title}
          style={heartCard.imagePosition ? { objectPosition: heartCard.imagePosition } : undefined}
        />
        <div className="content-card-img-overlay" />
      </div>
      <div className="content-card-body">
        <h3 className="content-card-title">{heartCard.title}</h3>
        <p className="content-card-text">{heartCard.text}</p>
      </div>
    </div>
  )
}

function SavingsCardSection() {
  if (!savingsCard) return null
  return (
    <div className="content-card">
      <div className="content-card-img-wrap">
        <img className="content-card-img" src={savingsCard.image} alt={savingsCard.title} />
        <div className="content-card-img-overlay" />
      </div>
      <div className="content-card-body">
        <h3 className="content-card-title">{savingsCard.title}</h3>
        <p className="content-card-text">{savingsCard.text}</p>
      </div>
    </div>
  )
}

function VoiceCardSection() {
  if (!voiceCard) return null
  return (
    <div className="content-card">
      <div className="content-card-img-wrap">
        <img
          className="content-card-img"
          src={voiceCard.image}
          alt={voiceCard.title}
          style={voiceCard.imagePosition ? { objectPosition: voiceCard.imagePosition } : undefined}
        />
        <div className="content-card-img-overlay" />
      </div>
      <div className="content-card-body">
        <h3 className="content-card-title">{voiceCard.title}</h3>
        {voiceCard.text && <p className="content-card-text">{voiceCard.text}</p>}
      </div>
    </div>
  )
}

function DvFeedSection() {
  if (!NEWS.length && !RECOGNITION.length) return null
  return (
    <div className="dv-feed-grid">
      <div className="dv-feed-col">
        <div className="dv-feed-col-header">
          <h2 className="section-heading">Latest News</h2>
          <button className="dv-ghost-btn">Write a post</button>
        </div>
        <div className="dv-news-list">
          {NEWS.slice(0, 2).map((item) => (
            <div key={item.id} className="dv-news-item">
              {item.image && (
                <img className="dv-news-img" src={item.image} alt={item.title} />
              )}
              <div className="dv-news-item-body">
                {item.author && (
                  <div className="nc-author">
                    <div className="nc-author-avatar" style={{ background: item.authorColour }}>{item.authorInitials}</div>
                    <span className="nc-author-name">{item.author}</span>
                  </div>
                )}
                <p className="dv-news-excerpt">{item.body}</p>
                <span className="dv-news-time">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="anniv-link">See all news</button>
      </div>
      <div className="dv-feed-col">
        <div className="dv-feed-col-header">
          <h2 className="section-heading">Recognition</h2>
          <button className="dv-ghost-btn">Send recognition</button>
        </div>
        <div className="dv-rec-list">
          {RECOGNITION.slice(0, 2).map((item) => (
            <div key={item.id} className="dv-rec-item">
              <div className="dv-rec-header">
                <div className="dv-rec-avatar" style={{ background: item.fromColour }}>{item.fromInitials}</div>
                <div className="dv-rec-from">
                  <span className="dv-rec-from-name">{item.from}</span>
                  <span className="dv-rec-from-role">{item.fromRole}</span>
                </div>
                <span className="dv-rec-value" style={REC_VALUE_COLOURS[item.value]}>{item.value}</span>
              </div>
              <div className="dv-rec-to">
                <div className="dv-rec-avatar dv-rec-avatar--sm" style={{ background: item.toColour }}>{item.toInitials}</div>
                <span className="dv-rec-to-label">Recognised <strong>{item.to}</strong></span>
              </div>
              <p className="dv-rec-message">{item.message}</p>
              <span className="dv-rec-time">{item.time}</span>
            </div>
          ))}
        </div>
        <button className="anniv-link">See all recognition</button>
      </div>
    </div>
  )
}

function DiscoverSection() {
  return <DiscoverCarousel items={DISCOVER} title="Discover More" />
}

function QuickLinksSection() {
  return (
    <div className="card-list">
      {CARDS.map((card) => (
        <div key={card.id} className="card">
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </div>
      ))}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────
export default function DesktopPageNav2() {
  const [expanded, setExpanded] = useState({ benefits: true })
  const [activeItem, setActiveItem] = useState('home')
  const [activeChild, setActiveChild] = useState(null)


  function toggleExpanded(id) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    applySchemeAttr()
    applyImageFilter(loadImageFilter())
    applyFont(loadFont())
    const seeds = loadSeeds()
    applySeeds({
      primary:   PRIMARY_PRESETS[seeds.primary]   || PRIMARY_PRESETS[0],
      secondary: SECONDARY_PRESETS[seeds.secondary] || SECONDARY_PRESETS[0],
      neutral:   NEUTRAL_PRESETS[seeds.neutral]   || NEUTRAL_PRESETS[0],
    })
    applyTheme(loadTheme())
    // Capture the scheme's header colour before applyBg may set it to transparent,
    // and store it in --dv-strip-bg so the strip is never affected by the bg dropdown.
    const root = document.documentElement
    root.style.removeProperty('--header-home-bg')
    const schemeHeaderBg = getComputedStyle(root).getPropertyValue('--header-home-bg').trim()
    if (schemeHeaderBg) root.style.setProperty('--dv-strip-bg', schemeHeaderBg)
    const bg = loadBg()
    applyBg(bg.idx, bg.url)
  }, [])

  return (
    <div className="dv-root">
      <DvHeader />
      {/* Content area — no strip */}
      <div className="dv-content-area">
        <div className="dv-body">
          {/* Brand-coloured tree nav panel */}
          <nav className="dv-nav-panel">
            <ul className="dv-nav-list-tree">
              {NAV_ITEMS.map(({ id, label, icon: Icon, children }) => (
                <li key={id}>
                  <button
                    className={`dv-nav-item${expanded[id] ? ' dv-nav-item--expanded' : ''}${activeItem === id && !activeChild ? ' dv-nav-item--active' : ''}`}
                    onClick={() => { setActiveItem(id); if (children) toggleExpanded(id); else setActiveChild(null) }}
                  >
                    <span className="dv-nav-icon"><Icon /></span>
                    <span className="dv-nav-label">{label}</span>
                  </button>
                  {children && (
                    <div className={`dv-nav-children-wrap${expanded[id] ? ' dv-nav-children-wrap--open' : ''}`}>
                      <ul className="dv-nav-children">
                        {children.map(child => (
                          <li key={child.id}>
                            <button
                              className={`dv-nav-child${activeChild === child.id ? ' dv-nav-child--active' : ''}`}
                              onClick={() => { setActiveItem(id); setActiveChild(child.id) }}
                            >
                              {child.label}
                              {child.external && <span className="dv-nav-child-external"><ExternalLinkIcon /></span>}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Main content */}
          <main className="dv-main">
            <div className="dv-page">
              <WelcomeBannerSection />
              {savingsCard && <MainCardSection />}
              <div className="dv-col dv-col--main">
                {!savingsCard && <MainCardSection />}
                {savingsCard ? (
                  <>
                    <div className="dv-cards-row">
                      <SavingsCardSection />
                      <HeartCardSection />
                    </div>
                    <VoiceCardSection />
                  </>
                ) : (
                  <div className="dv-cards-row">
                    <HeartCardSection />
                    <VoiceCardSection />
                  </div>
                )}
                <DvFeedSection />
              </div>
              <div className="dv-col dv-col--sidebar">
                <RecognitionNudgeSection />
                <QuickLinksSection />
                <BirthdayCarousel birthdays={BIRTHDAYS} />
              </div>
              <div className="dv-discover">
                <DiscoverSection />
              </div>
            </div>
          </main>
        </div>
      </div>

      <FAB activePage="search" />
    </div>
  )
}