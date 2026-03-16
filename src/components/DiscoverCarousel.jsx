import { useRef, useState, useEffect } from 'react'

export default function DiscoverCarousel({ items, title }) {
  const ref = useRef(null)
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => setOverflows(el.scrollWidth > el.clientWidth)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [items])

  function scroll(dir) {
    const el = ref.current
    if (!el) return
    const card = el.querySelector('.discover-card')
    const step = card ? card.offsetWidth + 12 : 240
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className="discover-section">
      <div className="discover-header">
        {title && <h2 className="section-heading">{title}</h2>}
        {overflows && (
          <div className="discover-arrows">
            <button className="discover-arrow" onClick={() => scroll(-1)} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="discover-arrow" onClick={() => scroll(1)} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="discover-wrap">
        <div className="discover-carousel" ref={ref}>
          {items.map((item) => (
            <div key={item.id} className="discover-card">
              <div className="discover-img-wrap">
                <img
                  className="discover-img"
                  src={item.image}
                  alt={item.title}
                  style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                />
                <div className="content-card-img-overlay" />
              </div>
              <div className="discover-body">
                <p className="discover-title">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
