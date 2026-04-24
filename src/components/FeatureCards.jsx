const ICONS = {
  percent: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <circle cx="9" cy="9" r="2"/><circle cx="15" cy="15" r="2"/>
      <path d="M16 8L8 16"/>
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12"/>
      <rect x="2" y="7" width="20" height="5"/>
      <path d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3"/>
      <path d="M12 11v4M8 21h8M9 17c0-1.1.9-2 2-2h2a2 2 0 012 2"/>
      <polyline points="17 3 21 3 21 7"/><line x1="14" y1="6" x2="21" y2="3"/>
    </svg>
  ),
}

function FeatCard({ card }) {
  return (
    <div className="feat-card">
      <div className="feat-card-img-area">
        <div className="feat-card-circle" style={{ background: card.circleColor }}>
          <img src={card.image} alt={card.title} />
        </div>
        <div className="feat-card-badge">
          {ICONS[card.icon] || ICONS.gift}
        </div>
      </div>
      <div className="feat-card-body">
        <h3 className="feat-card-title">{card.title}</h3>
        <p className="feat-card-text">{card.text}</p>
        <button className="feat-card-btn">{card.ctaLabel}</button>
      </div>
    </div>
  )
}

export default function FeatureCards({ cards }) {
  if (!cards?.length) return null
  return (
    <div className="feat-cards-scroll">
      {cards.map(card => <FeatCard key={card.id} card={card} />)}
    </div>
  )
}
