import './Page.css'

const GOALS = [
  {
    id: 1,
    icon: '💰',
    label: 'Savings Goal',
    challenge: 'Save $2,000 by June',
    current: 1340,
    target: 2000,
    unit: '$',
    color: '#22c55e',
  },
  {
    id: 2,
    icon: '🏃',
    label: 'Physical Activity',
    challenge: '10,000 steps per day',
    current: 7200,
    target: 10000,
    unit: 'steps',
    color: '#F72717',
  },
  {
    id: 3,
    icon: '📈',
    label: 'Monthly Progress',
    challenge: 'Complete 20 tasks this month',
    current: 13,
    target: 20,
    unit: 'tasks',
    color: '#8b5cf6',
  },
]

function ProgressBar({ current, target, color }) {
  const pct = Math.min(Math.round((current / target) * 100), 100)
  return (
    <div className="goal-bar-track">
      <div className="goal-bar-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

export default function Profile() {
  return (
    <div className="page">
      <div className="avatar">RS</div>
      <p className="avatar-name">Ryan Sayers</p>
      <p className="page-subtitle">ryan@example.com</p>

      <h2 className="section-heading">Goals &amp; Challenges</h2>
      <div className="goal-list">
        {GOALS.map((goal) => {
          const pct = Math.min(Math.round((goal.current / goal.target) * 100), 100)
          return (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
                <span className="goal-icon">{goal.icon}</span>
                <div className="goal-meta">
                  <span className="goal-label">{goal.label}</span>
                  <span className="goal-challenge">{goal.challenge}</span>
                </div>
                <span className="goal-pct" style={{ color: goal.color }}>{pct}%</span>
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
