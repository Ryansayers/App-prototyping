import { useState } from 'react'
import './Page.css'
import './Feed.css'
import content from '../content.json'
import { loadScheme } from '../seeds.js'

const { news: NEWS, recognition: RECOGNITION } = loadScheme(content).feed

const TAG_GRADIENTS = {
  'Your Team':       'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'Company':         'linear-gradient(135deg, #0ea5e9, #6366f1)',
  'Engineering':     'linear-gradient(135deg, #10b981, #0ea5e9)',
  'People & Culture':'linear-gradient(135deg, #f59e0b, #ec4899)',
}


const VALUE_COLOURS = {
  Innovation:       { bg: '#ede9fe', text: '#7c3aed' },
  Collaboration:    { bg: '#dbeafe', text: '#1d4ed8' },
  'Customer Focus': { bg: '#dcfce7', text: '#15803d' },
  Excellence:       { bg: '#fef9c3', text: '#a16207' },
  Teamwork:         { bg: '#fee2e2', text: '#b91c1c' },
}

const BookmarkIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
)

const ThumbUpIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
  </svg>
)

const CommentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
)

function CardActions({ initialLikes = 0, commentCount = 0, saved, onSave }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)

  function toggleLike() {
    setLiked(prev => {
      setLikes(c => prev ? c - 1 : c + 1)
      return !prev
    })
  }

  return (
    <div className="card-actions">
      <div className="card-actions-left">
        <button
          className={`action-btn ${liked ? 'action-btn--active' : ''}`}
          onClick={toggleLike}
        >
          <ThumbUpIcon filled={liked} />
          {likes > 0 && <span className="action-count">{likes}</span>}
        </button>
        <button className="action-btn">
          <CommentIcon />
          {commentCount > 0 && <span className="action-count">{commentCount}</span>}
        </button>
      </div>
      <button className={`save-btn ${saved ? 'save-btn--saved' : ''}`} onClick={onSave}>
        <BookmarkIcon filled={saved} />
      </button>
    </div>
  )
}

function NewsCard({ item, saved, onSave }) {
  const gradient = TAG_GRADIENTS[item.tag] || 'linear-gradient(135deg, #cbd5e1, #94a3b8)'
  return (
    <div className="nc">
      <div className="nc-img-wrap" style={{ background: gradient }}>
        {item.image && <img className="nc-bg-img" src={item.image} alt="" />}
        <div className="nc-img-overlay" style={{ background: gradient }} />
        <span className="nc-tag">{item.tag}</span>
        {item.relevant && <span className="nc-badge">For you</span>}
      </div>
      <div className="nc-body">
        {item.author && (
          <div className="nc-author">
            <div className="nc-author-avatar" style={{ background: item.authorColour }}>{item.authorInitials}</div>
            <span className="nc-author-name">{item.author}</span>
          </div>
        )}
        <p className="nc-title">{item.title}</p>
        <p className="nc-desc">{item.body}</p>
        <div className="card-footer">
          <span className="nc-time">{item.time}</span>
        </div>
      </div>
      <CardActions initialLikes={item.likes} commentCount={item.comments} saved={saved} onSave={() => onSave(item.id)} />
    </div>
  )
}

function RecognitionCard({ item, saved, onSave }) {
  const colours = VALUE_COLOURS[item.value] || { bg: '#f3f4f6', text: '#374151' }
  return (
    <div className={`rc ${item.isYou ? 'rc--you' : ''}`}>
      {item.image && (
        <div className="rc-img-wrap">
          <img className="rc-img" src={item.image} alt="" />
          <div className="content-card-img-overlay" />
        </div>
      )}
      <div className="rc-content">
        <div className="rc-header">
          <div className="rc-avatars">
            <div className="rc-avatar rc-avatar--from" style={{ background: item.fromColour }}>{item.fromInitials}</div>
            <div className="rc-avatar rc-avatar--to" style={{ background: item.toColour }}>{item.toInitials}</div>
          </div>
          <div className="rc-meta">
            <p className="rc-from"><strong>{item.from}</strong> <span className="rc-role">· {item.fromRole}</span></p>
            <p className="rc-to">recognised <strong>{item.isYou ? 'you' : item.to}</strong></p>
          </div>
        </div>
        <span className="rc-value" style={{ background: colours.bg, color: colours.text }}>{item.value}</span>
        <p className="rc-message">"{item.message}"</p>
        {item.isYou && <div className="rc-you-banner"><span>You were recognised</span></div>}
        <div className="card-footer">
          <span className="rc-time">{item.time}</span>
        </div>
      </div>
      <CardActions initialLikes={item.likes} commentCount={item.comments} saved={saved} onSave={() => onSave(item.id)} />
    </div>
  )
}

function parseMinutes(t) {
  const m = t.match(/(\d+)(m|h|d)/)
  if (!m) return 0
  const n = Number(m[1])
  if (m[2] === 'm') return n
  if (m[2] === 'h') return n * 60
  return n * 1440
}

const ALL_ITEMS = [...NEWS, ...RECOGNITION].sort(
  (a, b) => parseMinutes(a.time) - parseMinutes(b.time)
)

function FeedItem({ item, saved, onSave }) {
  return item.type === 'news'
    ? <NewsCard item={item} saved={saved} onSave={onSave} />
    : <RecognitionCard item={item} saved={saved} onSave={onSave} />
}

export default function Feed() {
  const [tab, setTab] = useState('all')
  const [savedIds, setSavedIds] = useState(new Set())
  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const savedItems = ALL_ITEMS.filter((item) => savedIds.has(item.id))

  const YOUR_TEAM_ITEMS = ALL_ITEMS.filter(
    item => (item.type === 'news' && item.tag === 'Your Team') || (item.type === 'recognition' && item.isYou)
  )

  const TAB_LABELS = { all: 'All', team: 'Your Team', news: 'News', recognition: 'Recognition', saved: 'Saved' }

  const TAB_ICONS = {
    all: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    team: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    news: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /><path d="M8 9h8M8 13h5" />
      </svg>
    ),
    recognition: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    saved: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
    ),
  }

  return (
    <div className="page feed-page">
      <div className="feed-tabs">
        {['all', 'team', 'news', 'recognition', 'saved'].map((t) => (
          <button
            key={t}
            className={`feed-tab ${tab === t ? 'feed-tab--active' : ''}`}
            onClick={() => setTab(t)}
          >
            <span className="feed-tab-icon">{TAB_ICONS[t]}</span>
            {TAB_LABELS[t]}
            {t === 'saved' && savedIds.size > 0 && (
              <span className="feed-tab-count">{savedIds.size}</span>
            )}
          </button>
        ))}
      </div>

      <div className="feed-list">
        {tab === 'all' && ALL_ITEMS.map((item) => (
          <FeedItem key={item.id} item={item} saved={savedIds.has(item.id)} onSave={toggleSave} />
        ))}
        {tab === 'team' && YOUR_TEAM_ITEMS.map((item) => (
          <FeedItem key={item.id} item={item} saved={savedIds.has(item.id)} onSave={toggleSave} />
        ))}
        {tab === 'news' && NEWS.map((item) => (
          <NewsCard key={item.id} item={item} saved={savedIds.has(item.id)} onSave={toggleSave} />
        ))}
        {tab === 'recognition' && RECOGNITION.map((item) => (
          <RecognitionCard key={item.id} item={item} saved={savedIds.has(item.id)} onSave={toggleSave} />
        ))}
        {tab === 'saved' && (
          savedItems.length === 0
            ? <div className="saved-empty"><p>No saved items yet.</p><p>Tap the bookmark on any post to save it.</p></div>
            : savedItems.map((item) => (
                <FeedItem key={item.id} item={item} saved onSave={toggleSave} />
              ))
        )}
      </div>
    </div>
  )
}
