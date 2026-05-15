import './FAB.css'

export default function FAB({ activePage, onClick }) {
  if (activePage === 'search' || activePage === 'profile') return null

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
