import { useState, useEffect } from 'react'
import './Page.css'
import './MvpProfile.css'

const CHALLENGES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&q=80&auto=format&fit=crop',
    title: 'The Great Outdoors',
    dates: 'Jun 15–Jul 15',
    participants: '12,894',
    avatars: ['/av-1.jpg', '/av-2.jpg', '/av-3.jpg'],
    status: null,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=200&q=80&auto=format&fit=crop',
    title: '10,000 Steps a Day',
    dates: 'Jul 1–Jul 31',
    participants: '8,441',
    avatars: ['/av-4.jpg', '/av-5.jpg', '/av-3.jpg'],
    status: 'calculating',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&q=80&auto=format&fit=crop',
    title: 'Summer Fitness Sprint',
    dates: 'Jul 10–Aug 10',
    participants: '3,210',
    avatars: ['/av-2.jpg', '/av-6.jpg', '/av-1.jpg'],
    status: 'upcoming',
  },
]

const EVENTS = [
  {
    id: 1,
    accent: '#7c3aed',
    dates: 'Nov 1 – Nov 30',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    title: 'Wellness Survey',
    description: 'Tell us about your wellbeing this month and help shape future programs.',
    rsvp: false,
  },
  {
    id: 2,
    accent: '#f97316',
    dates: 'Dec 1 – Dec 24',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    title: 'Scavenger Hunt',
    description: 'Complete challenges around the city to earn points and win prizes.',
    rsvp: true,
  },
]

const FRIENDS = [
  { id: 1, avatar: 'https://i.pravatar.cc/48?img=12', name: 'jessica_a', location: 'New York, NY', points: 8992 },
  { id: 2, avatar: 'https://i.pravatar.cc/48?img=32', name: 'mark_run', location: 'Austin, TX', points: 7450 },
  { id: 3, avatar: 'https://i.pravatar.cc/48?img=47', name: 'sara.fit', location: 'London, UK', points: 6810 },
  { id: 4, avatar: 'https://i.pravatar.cc/48?img=65', name: 'tomk92', location: 'Chicago, IL', points: 5230 },
]

const StepsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 4c0 1.1-.9 2-2 2S9 5.1 9 4s.9-2 2-2 2 .9 2 2z" fill="currentColor" stroke="none" />
    <path d="M7 20l2-6 3 3 2-4 3 7" />
    <path d="M5 12c0-2.2 1.8-4 4-4h1l3 4H5z" fill="currentColor" stroke="none" />
  </svg>
)

function UpcomingEvents() {
  return (
    <>
      <div className="section-header">
        <h2 className="section-heading" style={{ margin: 0 }}>Upcoming Events</h2>
        <button className="section-view-all">View all events</button>
      </div>
      <div className="event-list">
        {EVENTS.map((ev) => (
          <div key={ev.id} className="event-card" style={{ '--event-accent': ev.accent }}>
            <div className="event-body">
              <p className="event-dates">{ev.dates}</p>
              <div className="event-title-row">
                <span className="event-icon" style={{ color: ev.accent }}>{ev.icon}</span>
                <p className="event-title">{ev.title}</p>
              </div>
              <p className="event-desc">{ev.description}</p>
              {ev.rsvp && <button className="event-rsvp">RSVP &rsaquo;</button>}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function TopFriends() {
  return (
    <>
      <div className="section-header">
        <h2 className="section-heading" style={{ margin: 0 }}>Top Friends</h2>
        <button className="section-view-all">View leaderboard</button>
      </div>
      <div className="friends-list" style={{ marginBottom: 96 }}>
        {FRIENDS.map((f) => (
          <div key={f.id} className="friend-row">
            <img className="friend-avatar" src={f.avatar} alt={f.name} />
            <div className="friend-info">
              <p className="friend-name">{f.name}</p>
              <p className="friend-location">{f.location}</p>
            </div>
            <div className="friend-points">
              <span className="friend-coin"><StepsIcon /></span>
              <span className="friend-pts-val">{f.points.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function ChallengeList() {
  return (
    <>
    <h2 className="section-heading">Challenges</h2>
    <div className="mvp-challenge-list">
      {CHALLENGES.map((c) => (
        <div key={c.id} className="mvp-challenge-card">
          <img className="mvp-challenge-img" src={c.image} alt={c.title} />
          <div className="mvp-challenge-body">
            {c.status === 'calculating' && (
              <span className="mvp-challenge-badge mvp-challenge-badge--calculating">Calculating</span>
            )}
            {c.status === 'upcoming' && (
              <span className="mvp-challenge-badge mvp-challenge-badge--upcoming">Starts in 2 days</span>
            )}
            <p className="mvp-challenge-title">{c.title}</p>
            <p className="mvp-challenge-dates">{c.dates}</p>
            <div className="mvp-challenge-meta">
              <div className="mvp-challenge-avatars">
                {c.avatars.map((src, i) => (
                  <img key={i} className="mvp-challenge-avatar" src={src} alt="" />
                ))}
              </div>
              <span className="mvp-challenge-participants">{c.participants} participants</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}


const WELLBEING_ACTIVITIES = [
  {
    id: 1,
    category: 'Workouts',
    type: 'Video',
    title: 'A Bootcamp-Inspired Strength Workout to Tone Your Lower Body',
    duration: '35 min',
    image: '/wb-strength.jpg',
    completed: 22,
    avatars: ['/av-1.jpg', '/av-2.jpg', '/av-3.jpg'],
  },
  {
    id: 2,
    category: 'Workouts',
    type: 'Video',
    title: 'Full-Body Kettlebell Workout',
    duration: '30 min',
    image: '/wb-kettlebell.jpg',
    completed: 8,
    avatars: ['/av-4.jpg', '/av-5.jpg'],
  },
  {
    id: 3,
    category: 'Workouts',
    type: 'Video',
    title: '20 Minute Crunch Circuit to Tone Your Core',
    duration: '20 min',
    image: '/wb-crunch.jpg',
    completed: 3,
    avatars: ['/av-6.jpg', '/av-1.jpg'],
  },
  {
    id: 4,
    category: 'Wellbeing',
    type: 'Audio',
    title: 'Guided 15 Minute Walk',
    duration: '15 min',
    image: '/wb-walk.jpg',
    completed: 0,
    avatars: [],
  },
  {
    id: 5,
    category: 'Flexibility',
    type: 'Video',
    title: 'Stretch Session',
    duration: '25 min',
    image: '/wb-stretch.jpg',
    completed: 31,
    avatars: ['/av-2.jpg', '/av-4.jpg', '/av-6.jpg'],
  },
]

const GOALS = [
  {
    id: 1,
    icon: '👟',
    label: 'Monthly Step Goal',
    challenge: '250,000 steps this month',
    current: 168400,
    target: 250000,
    unit: 'steps',
    color: '#0ea5e9',
  },
  {
    id: 2,
    icon: '💰',
    label: 'Savings Goal',
    challenge: 'Save £2,000 by June',
    current: 300,
    target: 2000,
    unit: '£',
    color: '#22c55e',
  },
  {
    id: 3,
    icon: '🏃',
    label: 'Physical Activity',
    challenge: '10,000 steps per day',
    current: 7200,
    target: 10000,
    unit: 'steps',
    color: '#F72717',
  },
]

function ProgressBar({ current, target, delay = 50 }) {
  const pct = Math.min(Math.round((current / target) * 100), 100)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setWidth(pct), delay)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="goal-bar-track">
      <div className="goal-bar-fill" style={{ width: `${width}%` }} />
    </div>
  )
}

function ActivityTracker() {
  return (
    <div className="activity-card">
      <p className="activity-title">Steps</p>
      <p className="activity-date">Wed, Oct 17</p>
      <p className="activity-count">10,023</p>
      <p className="activity-sync">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 4v6h-6M1 20v-6h6" />
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
        </svg>
        Last synced about 20 min ago
      </p>
      <button className="activity-add">Add activity</button>
    </div>
  )
}

export default function MvpProfile() {
  return (
    <div className="page">
      <ActivityTracker />

      <div className="section-header">
        <h2 className="section-heading" style={{ margin: 0 }}>Continue Wellbeing</h2>
        <button className="section-view-all">View all activities</button>
      </div>
      <div className="wb-carousel">
        {WELLBEING_ACTIVITIES.map((act) => (
          <div key={act.id} className="wb-continue-card">
            <div className="wb-thumb">
              <img className="wb-thumb-img" src={act.image} alt={act.title} />
              <div className="content-card-img-overlay" />
              {act.completed > 0 && (
                <div className="wb-completed-badge">
                  <div className="wb-avatar-group">
                    {act.avatars.map((src, i) => (
                      <img key={i} className="wb-avatar-chip" src={src} alt="" />
                    ))}
                  </div>
                  <span>{act.completed} completed</span>
                </div>
              )}
            </div>
            <div className="wb-content">
              <div className="wb-content-top">
                <span className="wb-category">{act.category}</span>
                <span className="wb-type-badge">{act.type}</span>
              </div>
              <p className="wb-title">{act.title}</p>
              <span className="wb-duration">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                </svg>
                {act.duration}
              </span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-heading">Your goals</h2>
      <div className="goal-list">
        {GOALS.map((goal, i) => {
          const pct = Math.min(Math.round((goal.current / goal.target) * 100), 100)
          return (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
<div className="goal-meta">
                  <span className="goal-label">{goal.label}</span>
                  <span className="goal-challenge">{goal.challenge}</span>
                </div>
                <span className="goal-pct">{pct}%</span>
              </div>
              <ProgressBar current={goal.current} target={goal.target} delay={50 + i * 150} />
              <div className="goal-footer">
                <span className="goal-current">
                  {['$', '£'].includes(goal.unit) ? `${goal.unit}${goal.current.toLocaleString()}` : `${goal.current.toLocaleString()} ${goal.unit}`}
                </span>
                <span className="goal-target">
                  {['$', '£'].includes(goal.unit) ? `${goal.unit}${goal.target.toLocaleString()}` : `${goal.target.toLocaleString()} ${goal.unit}`}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <ChallengeList />
      <UpcomingEvents />
      <TopFriends />

    </div>
  )
}
