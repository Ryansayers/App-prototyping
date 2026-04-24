import { useState, useRef } from 'react'

function Avatar({ person, size }) {
  return (
    <div className={`bday-av bday-av--${size}`} style={!person.image ? { background: person.colour } : {}}>
      {person.image ? <img src={person.image} alt={person.name} /> : person.initials}
    </div>
  )
}

export default function PeopleCarousel({ people, eyebrow = 'Birthday', ctaLabel = 'Recognise', seeMoreLabel }) {
  const [idx, setIdx] = useState(0)
  const touchStartX = useRef(null)

  if (!people?.length) return null

  const n = people.length
  const current    = people[idx]
  const prevPerson = people[(idx - 1 + n) % n]
  const nextPerson = people[(idx + 1) % n]

  function prev() { setIdx(i => (i - 1 + n) % n) }
  function next() { setIdx(i => (i + 1) % n) }

  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <div className="bday-card" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <p className="bday-eyebrow">{eyebrow}</p>
      <p className="bday-date">{current.sublabel}</p>
      {current.note && <p className="bday-note">{current.note}</p>}
      <p className="bday-name">{current.name}</p>

      <div className="bday-avatars">
        <button className="bday-av-tap bday-av-tap--prev" onClick={prev} aria-label="Previous">
          <Avatar person={prevPerson} size="side" />
        </button>
        <Avatar person={current} size="active" />
        <button className="bday-av-tap bday-av-tap--next" onClick={next} aria-label="Next">
          <Avatar person={nextPerson} size="side" />
        </button>
      </div>

      <div className="bday-dots">
        {people.map((_, i) => (
          <button
            key={i}
            className={`bday-dot ${i === idx ? 'bday-dot--active' : ''}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to ${people[i].name}`}
          />
        ))}
      </div>

      <button className="bday-recognise-btn">{ctaLabel}</button>
      {seeMoreLabel && <button className="anniv-link">{seeMoreLabel}</button>}
    </div>
  )
}
