import './Page.css'
import './MvpProfile.css'

const SmileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 13s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={2.5} />
    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={2.5} />
  </svg>
)

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 21h8M12 17v4" />
    <path d="M7 4H4a2 2 0 000 4c0 2.5 2 4.5 4 5" />
    <path d="M17 4h3a2 2 0 010 4c0 2.5-2 4.5-4 5" />
    <path d="M7 4h10v7a5 5 0 01-10 0V4z" />
  </svg>
)

const NOTIFICATIONS = [
  {
    id: 1,
    icon: <SmileIcon />,
    iconBg: '#e8f8ee',
    iconColor: '#22a84a',
    title: 'Explore all the new updates!',
    body: 'Check out the upgrades today, you…',
    badge: null,
    chevron: 'down',
  },
  {
    id: 2,
    icon: <TrophyIcon />,
    iconBg: '#e8f8ee',
    iconColor: '#22a84a',
    title: 'You have 3 challenge invites!',
    body: null,
    badge: 6,
    chevron: 'right',
  },
]

export default function Notifications() {
  return (
    <div className="page">
      <h2 className="section-heading" style={{ marginTop: 8 }}>Notifications</h2>
      <div className="mvp-notif-list">
        {NOTIFICATIONS.map((n) => (
          <button key={n.id} className="mvp-notif-item">
            <div className="mvp-notif-icon-wrap" style={{ background: n.iconBg, color: n.iconColor }}>
              <span className="mvp-notif-icon">{n.icon}</span>
              {n.badge && <span className="mvp-notif-badge">{n.badge}</span>}
            </div>
            <div className="mvp-notif-body">
              <p className="mvp-notif-title">{n.title}</p>
              {n.body && <p className="mvp-notif-sub">{n.body}</p>}
            </div>
            <span className="mvp-notif-chevron">
              {n.chevron === 'down'
                ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
                : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              }
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
