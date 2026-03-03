import './BottomNav.css'

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
    iconFilled: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2.1L2 9.5V21a1 1 0 001 1h7v-7h4v7h7a1 1 0 001-1V9.5L12 2.1z" />
      </svg>
    ),
  },
  {
    id: 'feed',
    label: 'Feed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M4 6h16M4 10h16M4 14h10M4 18h7" strokeLinecap="round" />
      </svg>
    ),
    iconFilled: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <rect x="3" y="5" width="18" height="2.5" rx="1.25" />
        <rect x="3" y="9" width="18" height="2.5" rx="1.25" />
        <rect x="3" y="13" width="12" height="2.5" rx="1.25" />
        <rect x="3" y="17" width="8"  height="2.5" rx="1.25" />
      </svg>
    ),
  },
  {
    id: 'shop',
    label: 'Shop',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    iconFilled: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M21.7 5.6l-3-4A1 1 0 0018 1H6a1 1 0 00-.8.4l-3 4A1 1 0 002 6v14a2 2 0 002 2h16a2 2 0 002-2V6a1 1 0 00-.3-.4zM12 15a5 5 0 01-5-5h2a3 3 0 006 0h2a5 5 0 01-5 5z" />
      </svg>
    ),
  },
  {
    id: 'search',
    label: 'Search',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
    iconFilled: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M11 2a9 9 0 106.32 15.49l3.1 3.09a1 1 0 001.41-1.41l-3.09-3.1A9 9 0 0011 2zm0 2a7 7 0 110 14A7 7 0 0111 4z" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'You',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    iconFilled: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2a6 6 0 110 12A6 6 0 0112 2zm0 14c-5 0-9 2.69-9 6h18c0-3.31-4-6-9-6z" />
      </svg>
    ),
  },
]

export default function BottomNav({ active, onChange }) {
  const activeIndex = NAV_ITEMS.findIndex((item) => item.id === active)

  return (
    <nav className="bottom-nav">
{NAV_ITEMS.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onChange(item.id)}
          >
            <span className="nav-icon">{isActive ? item.iconFilled : item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
