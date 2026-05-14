import { useState, useEffect } from 'react'
import './Page.css'
import content from '../content.json'
import { loadScheme, loadHomeView } from '../seeds.js'
import BirthdayCarousel from '../components/BirthdayCarousel'
import PeopleCarousel from '../components/PeopleCarousel'

const { anniversaries: ANNIVERSARIES, birthdays: BIRTHDAYS, cards: CARDS, discover: DISCOVER, recognitionNudge, benefitsCTA, infoCard, heartCard, voiceCard, welcomeBanner, savingsCard } = loadScheme(content).home

const ANNIV_PEOPLE = ANNIVERSARIES?.map(a => ({ ...a, sublabel: `${a.years} ${a.years === 1 ? 'year' : 'years'}`, note: a.date }))

function WelcomeBanner() {
  return (
    <div className="welcome-banner">
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

function RecognitionNudge() {
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

function WorkAnniversaries() {
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

function BenefitsCTA() {
  return (
    <div className="benefits-card">
      <div className="benefits-img-wrap">
        <img className="benefits-img" src={benefitsCTA.image} alt={benefitsCTA.title} style={benefitsCTA.imagePosition ? { objectPosition: benefitsCTA.imagePosition } : undefined} />
        <div className="content-card-img-overlay" />
      </div>
      <div className="benefits-body">
        <h3 className="benefits-title">{benefitsCTA.title}</h3>
        {benefitsCTA.text && <p className="benefits-text">{benefitsCTA.text}</p>}
        <button className="benefits-btn">{benefitsCTA.ctaLabel}</button>
      </div>
    </div>
  )
}

function InfoCard() {
  return (
    <div className="benefits-card">
      <div className="benefits-img-wrap">
        <img className="benefits-img" src={infoCard.image} alt={infoCard.title} style={infoCard.imagePosition ? { objectPosition: infoCard.imagePosition } : undefined} />
        <div className="content-card-img-overlay" />
      </div>
      <div className="benefits-body">
        <h3 className="benefits-title">{infoCard.title}</h3>
        <button className="benefits-btn">{infoCard.ctaLabel}</button>
      </div>
    </div>
  )
}

function VoiceCard() {
  return (
    <div className="benefits-card">
      <div className="benefits-img-wrap">
        <img className="benefits-img" src={voiceCard.image} alt={voiceCard.title} style={voiceCard.imagePosition ? { objectPosition: voiceCard.imagePosition } : undefined} />
        <div className="content-card-img-overlay" />
      </div>
      <div className="benefits-body">
        <h3 className="benefits-title">{voiceCard.title}</h3>
        {voiceCard.text && <p className="benefits-text">{voiceCard.text}</p>}
      </div>
    </div>
  )
}

function HeartCard() {
  return (
    <div className="benefits-card">
      <div className="benefits-img-wrap">
        <img className="benefits-img" src={heartCard.image} alt={heartCard.title} style={heartCard.imagePosition ? { objectPosition: heartCard.imagePosition } : undefined} />
        <div className="content-card-img-overlay" />
      </div>
      <div className="benefits-body">
        <h3 className="benefits-title">{heartCard.title}</h3>
        <p className="benefits-text">{heartCard.text}</p>
      </div>
    </div>
  )
}

function SavingsCard() {
  return (
    <div className="benefits-card">
      <div className="benefits-img-wrap">
        <img className="benefits-img" src={savingsCard.image} alt={savingsCard.title} />
        <div className="content-card-img-overlay" />
      </div>
      <div className="benefits-body">
        <h3 className="benefits-title">{savingsCard.title}</h3>
        <p className="benefits-text">{savingsCard.text}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [homeView, setHomeView] = useState(() => loadHomeView())

  useEffect(() => {
    const handler = () => setHomeView(loadHomeView())
    window.addEventListener('home-view-changed', handler)
    return () => window.removeEventListener('home-view-changed', handler)
  }, [])

  if (homeView === 'web') {
    return (
      <div className="page" style={{ padding: 0 }}>
        <img src="/hub-web-view.png" alt="Web view" style={{ width: '100%', display: 'block' }} />
      </div>
    )
  }

  return (
    <div className="page">
      {welcomeBanner ? <WelcomeBanner /> : <p className="page-subtitle" style={{ color: 'var(--color-text-secondary)' }}>Welcome back!</p>}
      {recognitionNudge && <RecognitionNudge />}
      {infoCard ? <InfoCard /> : <BenefitsCTA />}
      <HeartCard />
      {savingsCard && <SavingsCard />}
      {voiceCard && <VoiceCard />}
      <PeopleCarousel people={ANNIV_PEOPLE} eyebrow="Work Anniversary" ctaLabel="Recognise" seeMoreLabel="See more anniversaries" />
      <h2 className="section-heading">Discover More</h2>
      <div className="discover-list">
        {DISCOVER.map((item) => (
          <div key={item.id} className="discover-list-card">
            <div className="discover-list-img-wrap">
              <img className="discover-img" src={item.image} alt={item.title} style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined} />
              <div className="content-card-img-overlay" />
            </div>
            <div className="discover-body">
              <p className="discover-title">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card-list" style={{ marginTop: 32, marginBottom: 96 }}>
        {CARDS.map((card) => (
          <div key={card.id} className="card">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
