import './Page.css'

const CARDS = [
  { id: 1, title: 'Getting Started', desc: 'Learn the basics and set up your workspace.' },
  { id: 2, title: 'Latest Updates', desc: 'See what\'s new in the latest release.' },
  { id: 3, title: 'Featured Content', desc: 'Hand-picked articles just for you.' },
]

export default function Home() {
  return (
    <div className="page">
      <p className="page-subtitle">Welcome back!</p>
      <div className="card-list">
        {CARDS.map((card) => (
          <div key={card.id} className="card">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
