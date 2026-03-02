import { useState } from 'react'
import './Page.css'

const ITEMS = ['React', 'Vite', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Node.js', 'GraphQL']

export default function Search() {
  const [query, setQuery] = useState('')

  const results = query
    ? ITEMS.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div className="page">
      <input
        className="search-input"
        type="text"
        placeholder="Search anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
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
