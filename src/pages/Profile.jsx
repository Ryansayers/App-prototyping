import './Page.css'

const WELLBEING_ACTIVITY = {
  category: 'Workouts',
  type: 'Video',
  title: 'Shoulder release',
  duration: '20 min',
  gradient: 'linear-gradient(135deg, #7c9eb5 0%, #b0c9d8 50%, #d4a57a 100%)',
}

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
    challenge: 'Save $2,000 by June',
    current: 1340,
    target: 2000,
    unit: '$',
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

      <h2 className="section-heading">Continue Wellbeing</h2>
      <div className="wb-continue-card">
        <div className="wb-thumb" style={{ background: WELLBEING_ACTIVITY.gradient }} />
        <div className="wb-content">
          <div className="wb-content-top">
            <span className="wb-category">{WELLBEING_ACTIVITY.category}</span>
            <span className="wb-type-badge">{WELLBEING_ACTIVITY.type}</span>
          </div>
          <p className="wb-title">{WELLBEING_ACTIVITY.title}</p>
          <span className="wb-duration">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
            </svg>
            {WELLBEING_ACTIVITY.duration}
          </span>
        </div>
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
                  {goal.unit === '$' ? `$${goal.current.toLocaleString()}` : `${goal.current.toLocaleString()} ${goal.unit}`}
                </span>
                <span className="goal-target">
                  {goal.unit === '$' ? `$${goal.target.toLocaleString()}` : `${goal.target.toLocaleString()} ${goal.unit}`}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card-list" style={{ marginTop: 24 }}>
        {['Edit Profile', 'Notifications', 'Privacy', 'Help & Support', 'Log Out'].map((item) => (
          <div key={item} className="card menu-item">{item}</div>
        ))}
      </div>
    </div>
  )
}
