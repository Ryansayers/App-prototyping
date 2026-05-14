import { useState, useRef } from 'react'
import './Page.css'
import './MvpProfile.css'

const HABITS = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 4v6h-6M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
    iconBg: '#f97316',
    title: 'Go without sugar',
    subtitle: 'Challenge ended 29 Oct',
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    iconBg: '#3b82f6',
    title: 'Drink 2L of water',
    subtitle: 'Challenge ends 10 Nov',
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
    iconBg: '#8b5cf6',
    title: '10 min meditation',
    subtitle: 'Challenge ends 15 Nov',
  },
]

const CHALLENGES = [
  {
    id: 1,
    icon: '💧',
    title: 'Drink 2L (64 fl oz.) of water',
    dates: '20 Oct  -  10 Nov',
    participants: '1 participant',
    creator: 'User Name',
    avatar: 'https://i.pravatar.cc/48?img=12',
  },
  {
    id: 2,
    icon: '☕',
    title: 'Limit caffeine intake to one serving per day',
    dates: '30 Oct  -  10 Nov',
    participants: '1 participant',
    creator: 'User Name',
    avatar: 'https://i.pravatar.cc/48?img=12',
  },
  {
    id: 3,
    icon: '😴',
    title: 'Get 8 hours of sleep',
    dates: '20 Oct  -  10 Nov',
    participants: '1 participant',
    creator: 'User Name',
    avatar: 'https://i.pravatar.cc/48?img=12',
  },
]

function ActivityCard() {
  return (
    <div className="you-activity-card">
      <div className="you-activity-header">
        <button className="you-date-btn">
          19 Oct
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <button className="you-connect-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="3" />
            <path d="M9 18h6" />
            <circle cx="12" cy="7" r="2" />
          </svg>
          Connect device
        </button>
      </div>
      <div className="you-activity-stats">
        <div className="you-stat">
          <span className="you-stat-value">0</span>
          <span className="you-stat-label">Steps</span>
        </div>
        <div className="you-stat">
          <span className="you-stat-value">0</span>
          <span className="you-stat-label">Km</span>
        </div>
        <div className="you-stat">
          <span className="you-stat-value">0</span>
          <span className="you-stat-label">Min</span>
        </div>
      </div>
      <div className="you-activity-footer">
        <button className="you-add-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" />
          </svg>
          Add activity
        </button>
      </div>
    </div>
  )
}

function HabitsCarousel() {
  const scrollRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  function onScroll() {
    const el = scrollRef.current
    if (!el) return
    setActiveIdx(Math.round(el.scrollLeft / el.offsetWidth))
  }

  return (
    <div className="you-habits-section">
      <h2 className="you-page-heading">Log a daily habit</h2>
      <div className="you-habits-carousel" ref={scrollRef} onScroll={onScroll}>
        {HABITS.map((h) => (
          <div key={h.id} className="you-habit-card">
            <span className="you-habit-icon" style={{ background: h.iconBg }}>{h.icon}</span>
            <div className="you-habit-body">
              <p className="you-habit-title">{h.title}</p>
              <p className="you-habit-sub">{h.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="you-dots">
        {HABITS.map((_, i) => (
          <span key={i} className={`you-dot${i === activeIdx ? ' you-dot--active' : ''}`} />
        ))}
      </div>
    </div>
  )
}

function ExploreCard() {
  return (
    <div className="you-explore-card">
      <span className="you-explore-icon">🧘</span>
      <div className="you-explore-body">
        <p className="you-explore-title">Explore Employee Wellbeing</p>
        <p className="you-explore-desc">Find recipes, acivities and wellbeing content</p>
      </div>
    </div>
  )
}

function ChallengeList() {
  return (
    <div className="you-challenges-section">
      <div className="you-challenges-header">
        <h2 className="you-page-heading" style={{ margin: 0 }}>Challenges</h2>
        <button className="you-create-btn">Create challenge</button>
      </div>
      <div className="you-challenge-list">
        {CHALLENGES.map((c) => (
          <div key={c.id} className="you-challenge-card">
            <div className="you-challenge-top">
              <span className="you-challenge-icon">{c.icon}</span>
              <div className="you-challenge-info">
                <p className="you-challenge-title">{c.title}</p>
                <p className="you-challenge-meta">{c.dates} · {c.participants}</p>
              </div>
            </div>
            <div className="you-challenge-creator">
              <img className="you-challenge-avatar" src={c.avatar} alt="" />
              <span className="you-challenge-creator-text">Created by <strong>{c.creator}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MvpProfile() {
  return (
    <div className="page you-page">
      <h1 className="you-page-heading" style={{ marginTop: 8 }}>Activity</h1>
      <ActivityCard />
      <HabitsCarousel />
      <ExploreCard />
      <ChallengeList />
    </div>
  )
}
