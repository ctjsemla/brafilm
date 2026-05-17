import { useRef } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from './MovieCard'
import './MovieRow.css'

export default function MovieRow({ title, items, seeAllLink, seeAllLabel = 'VER TODOS' }) {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.75), behavior: 'smooth' })
  }

  return (
    <section className="row">
      <div className="row__header">
        <h2 className="row__title">
          <span className="row__bar" />
          {title}
        </h2>
        {seeAllLink && (
          <Link to={seeAllLink} className="row__see-all">
            {seeAllLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
        )}
      </div>

      <div className="row__viewport">
        <button
          type="button"
          className="row__arrow row__arrow--left"
          onClick={() => scroll(-1)}
          aria-label="Anterior"
        >
          ‹
        </button>
        <div className="row__scroll" ref={scrollRef}>
          {items.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
        <button
          type="button"
          className="row__arrow row__arrow--right"
          onClick={() => scroll(1)}
          aria-label="Próximo"
        >
          ›
        </button>
      </div>
    </section>
  )
}
