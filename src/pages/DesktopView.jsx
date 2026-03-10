import { useEffect, useState } from 'react'
import './Page.css'
import './DesktopView.css'
import content from '../content.json'
import {
  loadScheme,
  applySchemeAttr,
  applyImageFilter, loadImageFilter,
  applyTheme, loadTheme,
  applySeeds, loadSeeds,
  PRIMARY_PRESETS, SECONDARY_PRESETS, NEUTRAL_PRESETS,
  applyFont, loadFont,
  LOGO_PRESETS, loadLogo,
} from '../seeds.js'

// ── Content ──────────────────────────────────────────────────
const {
  anniversaries: ANNIVERSARIES,
  cards: CARDS,
  discover: DISCOVER,
  recognitionNudge,
  benefitsCTA,
  infoCard,
  heartCard,
  voiceCard,
  welcomeBanner,
} = loadScheme(content).home

// ── Shared icons (same as Header.jsx) ────────────────────────
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

const NAV_ITEMS = ['Home', 'Feed', 'Shop', 'Search', 'You']

// ── Header ────────────────────────────────────────────────────
function DvHeader() {
  const [hasNotif, setHasNotif] = useState(true)
  const logoSrc = LOGO_PRESETS[loadLogo()]?.src

  return (
    <header className="dv-header">
      <div className="dv-header-logo">
        {logoSrc
          ? <img src={logoSrc} alt="Brand logo" className="dv-logo-img" />
          : <span className="dv-logo-word">Intranet</span>}
      </div>
      <nav className="dv-nav">
        {NAV_ITEMS.map((item) => (
          <span key={item} className={`dv-nav-item${item === 'Home' ? ' dv-nav-item--active' : ''}`}>
            {item}
          </span>
        ))}
      </nav>
      <div className="dv-header-actions">
        <button className="dv-icon-btn" aria-label="Cart"><CartIcon /></button>
        <button className="dv-icon-btn" onClick={() => setHasNotif(false)} aria-label="Notifications">
          <BellIcon />
          {hasNotif && <span className="dv-notif-dot" />}
        </button>
      </div>
    </header>
  )
}

// ── Section components (same content, no new styles needed) ──
function WelcomeBannerSection() {
  if (!welcomeBanner) return (
    <p className="page-subtitle dv-subtitle">Welcome back!</p>
  )
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
        {ANNIVERSARIES.map((a) => (
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
      <button className="anniv-link">See more</button>
    </div>
  )
}

function MainCardSection() {
  const card = infoCard || benefitsCTA
  return (
    <div className="benefits-card">
      <img
        className="benefits-img"
        src={card.image}
        alt={card.title}
        style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
      />
      <div className="benefits-body">
        <h3 className="benefits-title">{card.title}</h3>
        {card.text && <p className="benefits-text">{card.text}</p>}
        {card.ctaLabel && <button className="benefits-btn">{card.ctaLabel}</button>}
      </div>
    </div>
  )
}

function HeartCardSection() {
  return (
    <div className="benefits-card">
      <img
        className="benefits-img"
        src={heartCard.image}
        alt={heartCard.title}
        style={heartCard.imagePosition ? { objectPosition: heartCard.imagePosition } : undefined}
      />
      <div className="benefits-body">
        <h3 className="benefits-title">{heartCard.title}</h3>
        <p className="benefits-text">{heartCard.text}</p>
      </div>
    </div>
  )
}

function VoiceCardSection() {
  if (!voiceCard) return null
  return (
    <div className="benefits-card">
      <img
        className="benefits-img"
        src={voiceCard.image}
        alt={voiceCard.title}
        style={voiceCard.imagePosition ? { objectPosition: voiceCard.imagePosition } : undefined}
      />
      <div className="benefits-body">
        <h3 className="benefits-title">{voiceCard.title}</h3>
        {voiceCard.text && <p className="benefits-text">{voiceCard.text}</p>}
      </div>
    </div>
  )
}

function DiscoverSection() {
  return (
    <>
      <h2 className="section-heading">Discover More</h2>
      <div className="discover-carousel">
        {DISCOVER.map((item) => (
          <div key={item.id} className="discover-card">
            <div className="discover-img-wrap">
              <img
                className="discover-img"
                src={item.image}
                alt={item.title}
                style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
              />
            </div>
            <div className="discover-body">
              <p className="discover-title">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
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
export default function DesktopView() {
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
  }, [])

  return (
    <div className="dv-root">
      <DvHeader />
      <main className="dv-main">
        <div className="dv-page">
          <WelcomeBannerSection />
          <div className="dv-grid">
            <div className="dv-col dv-col--main">
              <div className="dv-cards-row">
                <MainCardSection />
                <HeartCardSection />
              </div>
              <VoiceCardSection />
              <DiscoverSection />
            </div>
            <div className="dv-col dv-col--sidebar">
              <RecognitionNudgeSection />
              <WorkAnniversariesSection />
              <QuickLinksSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
