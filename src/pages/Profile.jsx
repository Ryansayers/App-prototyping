import './Page.css'

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

function ProgressBar({ current, target, color }) {
  const pct = Math.min(Math.round((current / target) * 100), 100)
  return (
    <div className="goal-bar-track">
      <div className="goal-bar-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

export default function Profile() {
  return (
    <div className="page">
      <div className="avatar">RS</div>
      <p className="avatar-name">Ryan Sayers</p>
      <p className="page-subtitle">ryan@example.com</p>

      <div className="section-header">
        <h2 className="section-heading" style={{ margin: 0 }}>Continue Wellbeing</h2>
        <button className="section-view-all">View all</button>
      </div>
      <div className="wb-carousel">
        {WELLBEING_ACTIVITIES.map((act) => (
          <div key={act.id} className="wb-continue-card">
            <div className="wb-thumb">
              <img className="wb-thumb-img" src={act.image} alt={act.title} />
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

      <h2 className="section-heading">Goals &amp; Challenges</h2>
      <div className="goal-list">
        {GOALS.map((goal) => {
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
              <ProgressBar current={goal.current} target={goal.target} color={goal.color} />
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

<div className="card-list" style={{ marginTop: 12 }}>
        {['Integrations', 'Edit Profile', 'Notifications', 'Privacy', 'Help & Support', 'Log Out'].map((item) => (
          <div key={item} className="card menu-item">{item}</div>
        ))}
      </div>
    </div>
  )
}
