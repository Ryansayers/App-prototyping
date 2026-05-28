import { useState, useEffect, useRef } from 'react'
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
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M12 2.69 17.66 8.35a8 8 0 1 1-11.32 0Z" style={{ fill: 'var(--color-secondary-200)' }} />
        <path d="M12 2.69 17.66 8.35a8 8 0 1 1-11.32 0Z" style={{ stroke: 'var(--color-secondary-600)' }} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9.5 16.5a3 3 0 0 0 5 0" style={{ stroke: 'var(--color-secondary-600)' }} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Drink 2L (64 fl oz.) of water',
    dates: '20 Oct  -  10 Nov',
    participants: '1 participant',
    creator: 'User Name',
    avatar: 'https://i.pravatar.cc/48?img=12',
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" style={{ fill: 'var(--color-secondary-200)', stroke: 'var(--color-secondary-600)' }} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" style={{ stroke: 'var(--color-secondary-600)' }} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 1v3M10 1v3M14 1v3" style={{ stroke: 'var(--color-secondary-600)' }} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Limit caffeine intake to one serving per day',
    dates: '30 Oct  -  10 Nov',
    participants: '1 participant',
    creator: 'User Name',
    avatar: 'https://i.pravatar.cc/48?img=12',
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" style={{ fill: 'var(--color-secondary-200)', stroke: 'var(--color-secondary-600)' }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Get 8 hours of sleep',
    dates: '20 Oct  -  10 Nov',
    participants: '1 participant',
    creator: 'User Name',
    avatar: 'https://i.pravatar.cc/48?img=12',
  },
]

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

function ExploreWellbeingCTA() {
  return (
    <div className="cta-card cta-discounts" style={{ marginBottom: 28 }}>
      <p className="cta-title">Employee Wellbeing</p>
      <p className="cta-label">Your wellbeing hub</p>
      <p className="cta-sub">Recipes, workouts, mindfulness and more</p>
      <button className="cta-btn">Explore activities</button>
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

const STEPS_TODAY = 5000
const STEPS_TARGET = 10000
const STEPS_R = 54
const STEPS_CIRC = 2 * Math.PI * STEPS_R

function StepsRing() {
  const pct = Math.min((STEPS_TODAY / STEPS_TARGET) * 100, 100)
  const [progress, setProgress] = useState(0)
  useEffect(() => { const id = setTimeout(() => setProgress(pct), 100); return () => clearTimeout(id) }, [])
  const offset = STEPS_CIRC * (1 - progress / 100)
  return (
    <div className="act-ring-wrap">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <defs>
          <linearGradient id="steps-grad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="var(--color-success-500)" />
          </linearGradient>
        </defs>
        <circle cx="65" cy="65" r={STEPS_R} fill="none" stroke="var(--color-success-500)" strokeWidth="10" opacity="0.15" />
        <circle
          cx="65" cy="65" r={STEPS_R}
          fill="none"
          stroke="url(#steps-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={STEPS_CIRC}
          strokeDashoffset={offset}
          transform="rotate(-90 65 65)"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.25,1,0.5,1)' }}
        />
      </svg>
      <div className="act-ring-center">
        <span className="act-ring-count">{STEPS_TODAY.toLocaleString()}</span>
        <span className="act-ring-unit">steps</span>
      </div>
    </div>
  )
}

function ActivityTracker() {
  return (
    <div className="activity-card">
      <div className="activity-header">
        <p className="activity-title">Steps</p>
        <p className="activity-date">Wed, Oct 17</p>
      </div>
      <StepsRing />
      <p className="activity-target">Goal: {STEPS_TARGET.toLocaleString()} steps</p>
      <div className="activity-footer">
        <p className="activity-sync">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 4v6h-6M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
          </svg>
          Last synced about 20 min ago
        </p>
        <button className="activity-add">Add activity</button>
      </div>
    </div>
  )
}

export default function Profile() {
  return (
    <div className="page">
      <div className="avatar">RS</div>
      <p className="avatar-name">Ryan Sayers</p>
      <p className="page-subtitle">ryan@example.com</p>

      <ActivityTracker />

      <HabitsCarousel />
      <ExploreWellbeingCTA />
      <ChallengeList />
      <div style={{ height: 96 }} />
    </div>
  )
}
