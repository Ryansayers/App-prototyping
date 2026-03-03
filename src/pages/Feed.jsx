import { useState } from 'react'
import './Page.css'
import './Feed.css'

const TAG_GRADIENTS = {
  'Your Team':       'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'Company':         'linear-gradient(135deg, #0ea5e9, #6366f1)',
  'Engineering':     'linear-gradient(135deg, #10b981, #0ea5e9)',
  'People & Culture':'linear-gradient(135deg, #f59e0b, #ec4899)',
}


const NEWS = [
  {
    id: 'n1',
    type: 'news',
    tag: 'Your Team',
    title: 'Design System v2.0 launched',
    body: 'The new component library is live. All product teams are encouraged to migrate by end of Q2.',
    time: '2m ago',
    relevant: true,
  },
  {
    id: 'n2',
    type: 'news',
    tag: 'Company',
    title: 'Q1 All-Hands recap',
    body: 'CEO Sarah Chen shared our record-breaking Q1 results and the roadmap for the rest of the year.',
    time: '1h ago',
    relevant: true,
  },
  {
    id: 'n3',
    type: 'news',
    tag: 'Engineering',
    title: 'New CI/CD pipeline rollout',
    body: 'Build times are down 40% following last week\'s infrastructure upgrade across all repos.',
    time: '3h ago',
    relevant: true,
  },
  {
    id: 'n4',
    type: 'news',
    tag: 'Company',
    title: 'Office expansion — Austin TX',
    body: 'We\'re opening a new office in Austin this summer. Applications for relocation packages are now open.',
    time: '1d ago',
    relevant: false,
  },
  {
    id: 'n5',
    type: 'news',
    tag: 'People & Culture',
    title: 'Updated hybrid work policy',
    body: 'Starting May 1st, all teams move to a 3-2 office/remote split. See the updated guidelines in the handbook.',
    time: '2d ago',
    relevant: false,
  },
]

const RECOGNITION = [
  {
    id: 'r1',
    type: 'recognition',
    from: 'Sarah Chen',
    fromRole: 'CEO',
    fromInitials: 'SC',
    fromColour: '#0ea5e9',
    to: 'Ryan Sayers',
    toInitials: 'RS',
    toColour: '#F72717',
    value: 'Innovation',
    message: 'Ryan shipped the new mobile design system ahead of schedule — the whole company benefits from this work. Incredible effort!',
    time: '5m ago',
    isYou: true,
  },
  {
    id: 'r2',
    type: 'recognition',
    from: 'Marcus Lee',
    fromRole: 'Engineering Lead',
    fromInitials: 'ML',
    fromColour: '#10b981',
    to: 'Priya Patel',
    toInitials: 'PP',
    toColour: '#f59e0b',
    value: 'Collaboration',
    message: 'Priya jumped in to unblock three different teams this sprint without being asked. True team player.',
    time: '45m ago',
    isYou: false,
  },
  {
    id: 'r3',
    type: 'recognition',
    from: 'Jess Wu',
    fromRole: 'Product Manager',
    fromInitials: 'JW',
    fromColour: '#ec4899',
    to: 'Ryan Sayers',
    toInitials: 'RS',
    toColour: '#F72717',
    value: 'Customer Focus',
    message: 'The UX improvements Ryan made based on user feedback reduced drop-off by 22%. Outstanding work.',
    time: '2h ago',
    isYou: true,
  },
  {
    id: 'r4',
    type: 'recognition',
    from: 'Tom Briggs',
    fromRole: 'Head of Sales',
    fromInitials: 'TB',
    fromColour: '#f97316',
    to: 'Anika Sharma',
    toInitials: 'AS',
    toColour: '#8b5cf6',
    value: 'Excellence',
    message: 'Anika closed our biggest enterprise deal of the year. Flawless execution from first call to contract.',
    time: '5h ago',
    isYou: false,
  },
  {
    id: 'r5',
    type: 'recognition',
    from: 'Priya Patel',
    fromRole: 'Senior Engineer',
    fromInitials: 'PP',
    fromColour: '#f59e0b',
    to: 'Ryan Sayers',
    toInitials: 'RS',
    toColour: '#F72717',
    value: 'Teamwork',
    message: 'Ryan\'s thorough code reviews have made our whole codebase healthier. Always constructive and helpful.',
    time: '1d ago',
    isYou: true,
  },
]

const VALUE_COLOURS = {
  Innovation:       { bg: '#ede9fe', text: '#7c3aed' },
  Collaboration:    { bg: '#dbeafe', text: '#1d4ed8' },
  'Customer Focus': { bg: '#dcfce7', text: '#16a34a' },
  Excellence:       { bg: '#fef9c3', text: '#a16207' },
  Teamwork:         { bg: '#fee2e2', text: '#b91c1c' },
}

const BookmarkIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
)

function NewsCard({ item, saved, onSave }) {
  return (
    <div className="nc">
      <div className="nc-img-wrap" style={{ background: TAG_GRADIENTS[item.tag] || 'linear-gradient(135deg, #cbd5e1, #94a3b8)' }}>
        <span className="nc-tag">{item.tag}</span>
        {item.relevant && <span className="nc-badge">For you</span>}
      </div>
      <div className="nc-body">
        <p className="nc-title">{item.title}</p>
        <p className="nc-desc">{item.body}</p>
        <div className="card-footer">
          <span className="nc-time">{item.time}</span>
          <button className={`save-btn ${saved ? 'save-btn--saved' : ''}`} onClick={() => onSave(item.id)}>
            <BookmarkIcon filled={saved} />
          </button>
        </div>
      </div>
    </div>
  )
}

function RecognitionCard({ item, saved, onSave }) {
  const colours = VALUE_COLOURS[item.value] || { bg: '#f3f4f6', text: '#374151' }
  return (
    <div className={`rc ${item.isYou ? 'rc--you' : ''}`}>
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
        <button className={`save-btn ${saved ? 'save-btn--saved' : ''}`} onClick={() => onSave(item.id)}>
          <BookmarkIcon filled={saved} />
        </button>
      </div>
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
