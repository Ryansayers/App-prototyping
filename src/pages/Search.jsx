import { useState } from 'react'
import './Page.css'

const FILTERS = [
  {
    key: 'news',
    label: 'News',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /><path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    key: 'retailers',
    label: 'Retailers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 7h18l-3-5H6z" /><path d="M3 7l1.5 11a2 2 0 002 1.5h11a2 2 0 002-1.5L21 7" />
        <path d="M9 11v4M15 11v4" />
      </svg>
    ),
  },
  {
    key: 'deals',
    label: 'Deals',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  {
    key: 'recognitions',
    label: 'Recognitions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" /><path d="M8.56 2.75c.56 1.31 1 2.93.73 4.38a4.73 4.73 0 01-2.37 3.17" /><path d="M12 22v-6M9 22h6" />
      </svg>
    ),
  },
  {
    key: 'help',
    label: 'Help & Resources',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
      </svg>
    ),
  },
]

const ITEMS = {
  news:         ['Design System v2.0 launched', 'Q1 All-Hands recap', 'New CI/CD pipeline rollout', 'Office expansion — Austin TX', 'Updated hybrid work policy'],
  retailers:    ['Nike', 'Apple', 'Amazon', 'Marks & Spencer', 'Boots', 'Tesco', 'ASOS', 'Currys'],
  deals:        ['Tesco — Save 5% in-store', 'ASOS — 20% off online', 'Boots — 3 for 2 on health', 'Samsung — 10% off tech', 'TUI — £50 off holidays'],
  recognitions: ['Sarah recognised for Innovation', 'Tom recognised for Teamwork', 'Priya recognised for Customer Focus', 'James recognised for Excellence', 'Mia recognised for Collaboration'],
  help:         ['How to redeem points', 'Setting up your profile', 'Wellbeing programme guide', 'Contact HR', 'IT support', 'FAQs'],
}

const RECENT_SEARCHES = ['Nike trainers', 'Q1 All-Hands', 'Redeem points', 'Hybrid work policy']

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
)

export default function Search() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState(null)
  const [recents, setRecents] = useState(RECENT_SEARCHES)

  const pool = activeFilter ? ITEMS[activeFilter] : Object.values(ITEMS).flat()
  const results = query
    ? pool.filter(item => item.toLowerCase().includes(query.toLowerCase()))
    : []

  function removeRecent(term) {
    setRecents(prev => prev.filter(r => r !== term))
  }

  return (
    <div className="page">
      <input
        className="search-input"
        type="text"
        placeholder="Search content and retailers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="search-filters">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`search-filter ${activeFilter === f.key ? 'search-filter--active' : ''}`}
            onClick={() => setActiveFilter(prev => prev === f.key ? null : f.key)}
          >
            <span className="search-filter-icon">{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>

      {!query && recents.length > 0 && (
        <div className="recent-searches">
          <div className="recent-searches-header">
            <span className="recent-searches-title">Recent</span>
            <button className="recent-clear-all" onClick={() => setRecents([])}>Clear all</button>
          </div>
          <ul className="result-list">
            {recents.map(term => (
              <li key={term} className="result-item recent-item">
                <span className="recent-icon"><ClockIcon /></span>
                <span className="recent-term">{term}</span>
                <button className="recent-remove" onClick={() => removeRecent(term)} aria-label="Remove">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {query && (
        <ul className="result-list">
          {results.length ? (
            results.map((item) => (
              <li key={item} className="result-item">{item}</li>
            ))
          ) : (
            <li className="result-item empty">No results for "{query}"</li>
          )}
        </ul>
      )}
    </div>
  )
}
