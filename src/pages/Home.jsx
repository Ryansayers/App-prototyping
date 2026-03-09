import './Page.css'
import content from '../content.json'
import { loadScheme } from '../seeds.js'

const { anniversaries: ANNIVERSARIES, cards: CARDS, discover: DISCOVER, recognitionNudge, benefitsCTA, infoCard, heartCard, voiceCard, welcomeBanner } = loadScheme(content).home

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
      <img className="benefits-img" src={benefitsCTA.image} alt={benefitsCTA.title} style={benefitsCTA.imagePosition ? { objectPosition: benefitsCTA.imagePosition } : undefined} />
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
      <img className="benefits-img" src={infoCard.image} alt={infoCard.title} style={infoCard.imagePosition ? { objectPosition: infoCard.imagePosition } : undefined} />
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
      <img className="benefits-img" src={voiceCard.image} alt={voiceCard.title} style={voiceCard.imagePosition ? { objectPosition: voiceCard.imagePosition } : undefined} />
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
      <img className="benefits-img" src={heartCard.image} alt={heartCard.title} style={heartCard.imagePosition ? { objectPosition: heartCard.imagePosition } : undefined} />
      <div className="benefits-body">
        <h3 className="benefits-title">{heartCard.title}</h3>
        <p className="benefits-text">{heartCard.text}</p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="page">
      {welcomeBanner ? <WelcomeBanner /> : <p className="page-subtitle" style={{ color: 'var(--color-text-secondary)' }}>Welcome back!</p>}
      {recognitionNudge && <RecognitionNudge />}
      {infoCard ? <InfoCard /> : <BenefitsCTA />}
      <HeartCard />
      {voiceCard && <VoiceCard />}
      <WorkAnniversaries />
      <h2 className="section-heading">Discover More</h2>
      <div className="discover-carousel">
        {DISCOVER.map((item) => (
          <div key={item.id} className="discover-card">
            <div className="discover-img-wrap">
              <img className="discover-img" src={item.image} alt={item.title} style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined} />
            </div>
            <div className="discover-body">
              <p className="discover-title">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card-list">
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
