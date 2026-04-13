import { useState, useEffect } from 'react'
import './Page.css'
import content from '../content.json'
import { loadCardBg, loadScheme } from '../seeds.js'

const { saving: SAVING, savedRetailers: SAVED_RETAILERS, spotlight: SPOTLIGHT, summerDeals: SUMMER_DEALS, savingsForYou: SAVINGS_FOR_YOU } = loadScheme(content).shop

const SMARTER_LEGACY_IDX = 1

export default function Shop() {
  const pct = Math.min(Math.round((SAVING.current / SAVING.target) * 100), 100)
  const [barWidth, setBarWidth] = useState(0)
  const showDiscountsImg = loadCardBg('discounts').idx === SMARTER_LEGACY_IDX
  const showRewardsImg = loadCardBg('rewards').idx === SMARTER_LEGACY_IDX

  useEffect(() => {
    const id = setTimeout(() => setBarWidth(pct), 50)
    return () => clearTimeout(id)
  }, [])
  return (
    <div className="page">
      <div className="cta-carousel">
        <div className="cta-card cta-discounts">
          {showDiscountsImg && <img className="cta-card-bg-img" src="/card-bg-smarter.png" alt="" />}
          <p className="cta-title">Discounts</p>
          <p className="cta-label">Total Savings</p>
          <p className="cta-value">£300.00</p>
          <p className="cta-sub">Save £2,000 by June</p>
          <div className="cta-bar-track">
            <div className="cta-bar-fill" style={{ width: `${barWidth}%` }} />
          </div>
          <div className="cta-bar-footer">
            <span>£300.00</span>
            <span>{pct}% · £2,000.00</span>
          </div>
          <button className="cta-btn">View Discounts</button>
        </div>
        <div className="cta-card cta-rewards">
          {showRewardsImg && <img className="cta-card-bg-img" src="/card-bg-rewards.png" alt="" />}
          <p className="cta-title">Rewards</p>
          <p className="cta-label">Reward Points</p>
          <p className="cta-value">4,750 pts</p>
          <p className="cta-sub">worth approx. £47.50</p>
          <button className="cta-btn">Redeem Rewards</button>
        </div>
      </div>

      <h2 className="section-heading">Savings for You</h2>
      <div className="deal-list">
        {SAVINGS_FOR_YOU.map((deal) => (
          <div key={deal.id} className="deal-card">
            <div className="deal-img-wrap">
              <img className="deal-img" src={deal.image} alt={deal.merchant} />
              <div className="content-card-img-overlay" />
              <div className="deal-merchant" style={{ background: deal.merchantBg }}>
                <img src={deal.logo} alt={deal.merchant} className="deal-merchant-logo" />
              </div>
              <span className="deal-normal-badge">Normally {deal.normalRate}</span>
            </div>
            <div className="deal-body">
              <p className="deal-save">Save {deal.saveRate}</p>
              <p className="deal-desc">{deal.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2 className="section-heading" style={{ margin: 0 }}>Saved Retailers</h2>
        <button className="section-view-all">View all</button>
      </div>
      <div className="saved-retailers">
        {SAVED_RETAILERS.map((r) => (
          <div key={r.id} className="saved-retailer-item" style={{ background: r.bg }}>
            <img src={r.logo} alt={r.name} className="saved-retailer-logo" />
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2 className="section-heading" style={{ margin: 0 }}>Spotlight</h2>
        <button className="section-view-all">View all</button>
      </div>
      <div className="spotlight-carousel">
        {SPOTLIGHT.map((item) => (
          <div key={item.id} className="spotlight-card">
            <div className="spotlight-img-wrap">
              <img className="spotlight-img" src={item.image} alt={item.title} />
              <div className="content-card-img-overlay" />
              <div className="spotlight-logo-badge" style={{ background: item.logoBg }}>
                <img src={item.logo} alt={item.title} className="spotlight-logo" />
              </div>
            </div>
            <div className="spotlight-body">
              <p className="spotlight-title">{item.title}</p>
              <p className="spotlight-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-heading">Summer Deals</h2>
      <div className="summer-deals-carousel" style={{ marginBottom: 96 }}>
        {SUMMER_DEALS.map((deal) => (
          <div key={deal.id} className="summer-deal-card">
            <div className="deal-img-wrap summer-deal-img-wrap">
              <img className="deal-img" src={deal.image} alt={deal.saveRate} />
              <div className="content-card-img-overlay" />
              <div className="deal-merchant" style={{ background: deal.logoBg }}>
                <img src={deal.logo} alt="" className="deal-merchant-logo" />
              </div>
              {deal.tag && <span className="deal-top-tag">{deal.tag}</span>}
              <span className="deal-normal-badge">Normally {deal.normalRate}</span>
            </div>
            <div className="deal-body">
              <p className="deal-save">{deal.saveRate}</p>
              <p className="deal-desc">{deal.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
