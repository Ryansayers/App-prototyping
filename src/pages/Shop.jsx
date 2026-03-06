import './Page.css'

const SAVING = { current: 300, target: 2000, color: '#22c55e' }

const SAVED_RETAILERS = [
  { id: 1, name: 'ASDA',    logo: '/logo-asda.svg',    bg: '#ffffff' },
  { id: 2, name: 'TUI',     logo: '/logo-tui.svg',     bg: '#ffffff' },
  { id: 3, name: 'Samsung', logo: '/logo-samsung.svg', bg: '#ffffff' },
  { id: 4, name: 'Tesco',   logo: '/logo-tesco.png',   bg: '#ffffff' },
  { id: 5, name: 'ASOS',    logo: '/logo-asos.svg',    bg: '#ffffff' },
]

const SPOTLIGHT = [
  {
    id: 1,
    image: '/spotlight-tui.jpg',
    logo: '/logo-tui.svg',
    logoBg: '#ffffff',
    title: 'Travel Planning',
    desc: 'Explore travel deals for every kind of explorer',
  },
  {
    id: 2,
    image: '/spotlight-disney.jpg',
    logo: '/logo-samsung.svg',
    logoBg: '#ffffff',
    title: 'Disney Dining',
    desc: '20% off dining experiences',
  },
  {
    id: 3,
    image: '/spotlight-currys.jpg',
    logo: '/logo-asos.svg',
    logoBg: '#2d2d2d',
    title: 'Currys',
    desc: '20% off online at tech',
  },
  {
    id: 4,
    image: '/spotlight-shopping.jpg',
    logo: '/logo-asda.svg',
    logoBg: '#ffffff',
    title: 'Asda Savings',
    desc: '20% off online at Asda',
  },
]

const SUMMER_DEALS = [
  {
    id: 1,
    image: '/spotlight-tui.jpg',
    logo: '/logo-tui.svg',
    logoBg: '#ffffff',
    normalRate: '5%',
    tag: null,
    saveRate: 'Earn 5% Cashback',
    desc: 'on hotel only booking',
  },
  {
    id: 2,
    image: '/spotlight-currys.jpg',
    logo: '/logo-samsung.svg',
    logoBg: '#ffffff',
    normalRate: '5%',
    tag: null,
    saveRate: 'Save 20%',
    desc: 'on home appliances, plus get an additional 15%',
  },
  {
    id: 3,
    image: '/spotlight-shopping.jpg',
    logo: '/logo-asos.svg',
    logoBg: '#ffffff',
    normalRate: '5%',
    tag: 'Discounts',
    saveRate: 'Save 7% with an eGift Card',
    desc: 'on full priced purchases delivered to your home',
  },
]

const SAVINGS_FOR_YOU = [
  {
    id: 1,
    image: '/deal-tesco.jpg',
    merchant: 'Tesco',
    merchantBg: '#ffffff',
    logo: '/logo-tesco.png',
    normalRate: '4%',
    saveRate: '5%',
    desc: 'on all purchases in-store and online',
  },
  {
    id: 2,
    image: '/deal-asda.jpg',
    merchant: 'ASDA',
    merchantBg: '#ffffff',
    logo: '/logo-asda.svg',
    normalRate: '3%',
    saveRate: '7%',
    desc: 'on groceries and George clothing in-store and online',
  },
]

export default function Shop() {
  const pct = Math.min(Math.round((SAVING.current / SAVING.target) * 100), 100)
  return (
    <div className="page">
      <div className="cta-carousel">
        <div className="cta-card cta-discounts">
          <p className="cta-title">Discounts</p>
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
      <div className="summer-deals-carousel">
        {SUMMER_DEALS.map((deal) => (
          <div key={deal.id} className="summer-deal-card">
            <div className="deal-img-wrap summer-deal-img-wrap">
              <img className="deal-img" src={deal.image} alt={deal.saveRate} />
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
