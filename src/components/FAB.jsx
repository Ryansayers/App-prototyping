import { useState, useEffect, useRef } from 'react'
import './FAB.css'

// Persists across Feed page navigations for the session
let feedTickerPlayed = false

const HeartIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const PenIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

function FeedFAB() {
  const [open, setOpen]               = useState(false)
  const [tickerIdx, setTickerIdx]     = useState(0)
  const [tickerVisible, setTickerVisible] = useState(true)
  const [tickerDone, setTickerDone]   = useState(feedTickerPlayed)
  const [toast, setToast]             = useState(null)

  // Play once: heart (2.4s) → pen (2.4s) → collapse to +
  useEffect(() => {
    if (feedTickerPlayed || open) return
    const t1 = setTimeout(() => {
      setTickerVisible(false)
      setTimeout(() => { setTickerIdx(1); setTickerVisible(true) }, 220)
    }, 2400)
    const t2 = setTimeout(() => {
      setTickerVisible(false)
      setTimeout(() => {
        feedTickerPlayed = true
        setTickerDone(true)
      }, 220)
    }, 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [open])

  const handleAction = (id) => {
    setOpen(false)
    const msg = id === 'recognise' ? '✦ Recognition sent' : 'Post drafted'
    setToast(msg)
    setTimeout(() => setToast(null), 2400)
  }

  const showTicker = !open && !tickerDone

  return (
    <>
      {/* Scrim */}
      <div
        className="feed-fab-scrim"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}
        onClick={() => setOpen(false)}
      />

      <div className="feed-fab-area">
        {/* Tray */}
        <div className="feed-fab-tray" style={{ pointerEvents: open ? 'all' : 'none' }}>
          {/* Post — secondary, sits furthest from thumb */}
          <div
            className="feed-fab-tray-item"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.84)',
              transitionDelay: open ? '55ms' : '0ms',
            }}
          >
            <button className="feed-fab-pill feed-fab-pill--secondary" onClick={() => handleAction('post')}>
              <PenIcon size={15} />
              Post update
            </button>
          </div>

          {/* Recognise — primary, closest to FAB */}
          <div
            className="feed-fab-tray-item"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.84)',
              transitionDelay: open ? '0ms' : '35ms',
            }}
          >
            <button className="feed-fab-pill feed-fab-pill--primary" onClick={() => handleAction('recognise')}>
              <HeartIcon size={18} />
              Recognise someone
            </button>
          </div>
        </div>

        {/* Main FAB */}
        <button
          className={`feed-fab-main${!open && !tickerDone && tickerIdx === 0 ? ' feed-fab-main--accent' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close actions' : 'Open actions'}
        >
          {/* Idle icon ticker */}
          <span
            className="feed-fab-ticker"
            style={{
              opacity: showTicker && tickerVisible ? 1 : 0,
              transform: tickerVisible ? 'scale(1)' : 'scale(0.5)',
            }}
          >
            {tickerIdx === 0 ? <HeartIcon size={22} /> : <PenIcon size={19} />}
          </span>

          {/* Plus / Close */}
          <span className="feed-fab-toggle" style={{ opacity: showTicker ? 0 : 1 }}>
            {open
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            }
          </span>
        </button>
      </div>

      {toast && <div className="feed-fab-toast">{toast}</div>}
    </>
  )
}

export default function FAB({ activePage, onClick }) {
  if (activePage === 'search' || activePage === 'profile') return null
  if (activePage === 'feed') return <FeedFAB />

  const isHome = activePage === 'home'
  const isShop = activePage === 'shop'
  const className = `fab ${isHome ? 'fab-ai' : ''} ${isShop ? 'fab-wallet' : ''}`
  const ariaLabel = isHome ? 'Ask AI' : isShop ? 'Wallet' : 'Add'

  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel}>
      <span className="fab-icon">
        {isHome ? (
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" />
          </svg>
        ) : isShop ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" fill="currentColor" stroke="none" />
            <circle cx="16" cy="14" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        )}
      </span>
      <span className="fab-label">{isHome ? 'Ask AI' : 'Wallet'}</span>
    </button>
  )
}
