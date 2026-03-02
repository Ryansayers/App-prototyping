import './Page.css'

const SAVING = { current: 300, target: 2000, color: '#22c55e' }

export default function Shop() {
  const pct = Math.min(Math.round((SAVING.current / SAVING.target) * 100), 100)
  return (
    <div className="page">
      <div className="cta-carousel">
        <div className="cta-card cta-discounts">
          <p className="cta-label">Total Savings</p>
          <p className="cta-value">£300.00</p>
          <p className="cta-sub">Save £2,000 by June</p>
          <div className="cta-bar-track">
            <div className="cta-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="cta-bar-footer">
            <span>£300.00</span>
            <span>{pct}% · £2,000.00</span>
          </div>
          <button className="cta-btn">View Discounts</button>
        </div>
        <div className="cta-card cta-rewards">
          <p className="cta-label">Reward Points</p>
          <p className="cta-value">4,750 pts</p>
          <p className="cta-sub">worth approx. £47.50</p>
          <button className="cta-btn">Redeem Rewards</button>
        </div>
      </div>

      <div className="shop-grid" />
    </div>
  )
}
