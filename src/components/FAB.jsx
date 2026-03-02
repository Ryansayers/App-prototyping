import './FAB.css'

export default function FAB({ activePage, onClick }) {
  const isSearch = activePage === 'search'

  return (
    <button className={`fab ${isSearch ? 'fab-ai' : ''}`} onClick={onClick} aria-label={isSearch ? 'Ask AI' : 'Add'}>
      <span className="fab-icon">
        {isSearch ? (
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        )}
      </span>
      <span className="fab-label">Ask AI</span>
    </button>
  )
}
