import './Page.css'

const ANNIVERSARIES = [
  { id: 1, name: 'Olga Mihaleva',  initials: 'OM', colour: '#3b82f6', date: '5 Mar',  years: 1  },
  { id: 2, name: 'Marcus Lee',     initials: 'ML', colour: '#10b981', date: '8 Mar',  years: 3  },
  { id: 3, name: 'Priya Patel',    initials: 'PP', colour: '#f59e0b', date: '12 Mar', years: 5  },
  { id: 4, name: 'Anika Sharma',   initials: 'AS', colour: '#8b5cf6', date: '19 Mar', years: 2  },
  { id: 5, name: 'Tom Briggs',     initials: 'TB', colour: '#f97316', date: '24 Mar', years: 7  },
]

const CARDS = [
  { id: 1, title: 'Essentials', desc: 'Pay, Leave & Expenses' },
  { id: 2, title: 'People & Locations', desc: 'Discover our team hubs' },
  { id: 3, title: 'Learning Pathways at RG', desc: 'Hand-picked articles just for you.' },
]

const DISCOVER = [
  { id: 1, title: 'Speak Up',            image: '/discover-speak-up.png'   },
  { id: 2, title: 'Our Brand',           image: '/discover-our-brand.png'  },
  { id: 3, title: 'Internal Vacancies',  image: '/discover-vacancies.png'  },
  { id: 4, title: 'Our Strategy',        image: '/discover-strategy.png'   },
]

function RecognitionNudge() {
  return (
    <div className="rec-nudge">
      <div className="rec-nudge-award">Reward pot reminder</div>
      <div className="rec-nudge-pts">
        <span className="rec-nudge-pts-value">150</span>
        <span className="rec-nudge-pts-unit">PNT</span>
      </div>
      <p className="rec-nudge-desc">left to send in the next 28 days</p>
      <button className="cta-btn">Recognise someone</button>
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
      <img className="benefits-img" src="/benefits-hero.png" alt="Your Benefits" />
      <div className="benefits-body">
        <h3 className="benefits-title">Your Benefits</h3>
        <p className="benefits-text">Are you making the most of your benefits? You can learn more about all your benefits and access them here.</p>
        <button className="benefits-btn">Explore your benefits</button>
      </div>
    </div>
  )
}

function HeartCard() {
  return (
    <div className="benefits-card">
      <img className="benefits-img" src="/heart-hero.png" alt="H.E.A.R.T." />
      <div className="benefits-body">
        <h3 className="benefits-title">H.E.A.R.T.</h3>
        <p className="benefits-text">Our values — Honesty, Excellence, Accountability, Respect, and Teamwork — are at the heart of everything we do.</p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="page">
      <p className="page-subtitle" style={{ color: 'var(--color-text-secondary)' }}>Welcome back!</p>
      <RecognitionNudge />
      <BenefitsCTA />
      <HeartCard />
      <WorkAnniversaries />
      <h2 className="section-heading">Discover More</h2>
      <div className="discover-carousel">
        {DISCOVER.map((item) => (
          <div key={item.id} className="discover-card">
            <div className="discover-img-wrap">
              <img className="discover-img" src={item.image} alt={item.title} />
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
