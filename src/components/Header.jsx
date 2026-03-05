import { useState } from 'react'
import './Header.css'
import { LOGO_PRESETS, loadLogo } from '../seeds.js'

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

export default function Header({ title, isHome }) {
  const [hasNotif, setHasNotif] = useState(true)
  const logoSrc = LOGO_PRESETS[loadLogo()]?.src

  return (
    <header className={`app-header ${isHome ? 'app-header--home' : ''}`}>
      {isHome ? (
        <div className="header-logo">
          {logoSrc && <img src={logoSrc} alt="Brand logo" className="header-logo-img" />}
        </div>
      ) : (
        <h2 className="header-title">{title}</h2>
      )}
      <div className="header-actions">
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
