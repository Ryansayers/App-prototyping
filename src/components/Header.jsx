import { useState } from 'react'
import './Header.css'

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
)

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 7h18l-3-5H6z" />
    <path d="M3 7l1.5 11a2 2 0 002 1.5h11a2 2 0 002-1.5L21 7" />
    <path d="M9 11v4M15 11v4" />
  </svg>
)

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
)

export default function Header({ title, isHome, darkMode, onToggleDark }) {
  const [hasNotif, setHasNotif] = useState(true)

  return (
    <header className={`app-header ${isHome ? 'app-header--home' : ''}`}>
      {isHome ? (
        <div className="header-logo">
          <img src="/boom.svg" alt="Boom" className="header-logo-img" />
        </div>
      ) : (
        <h2 className="header-title">{title}</h2>
      )}
      <div className="header-actions">
        <button className="icon-btn" onClick={onToggleDark} aria-label="Toggle dark mode">
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
        <button className="icon-btn" aria-label="Checkout">
          <CartIcon />
        </button>
        <button className="icon-btn" onClick={() => setHasNotif(false)} aria-label="Notifications">
          <BellIcon />
          {hasNotif && <span className="notif-dot" />}
        </button>
      </div>
    </header>
  )
}
