import { Link } from 'react-router-dom'
import './MovieCard.css'

export default function MovieCard({ item }) {
  const typePath = item.contentType === 'serie' ? 'serie' : 'filme'
  const tagline = item.tagline || (item.contentType === 'serie' ? 'Séries Online HD' : 'Filmes Online HD')

  return (
    <Link to={`/${typePath}/${item.slug}`} className="card">
      <div className="card__poster-wrap">
        <img
          src={item.poster}
          alt={item.title}
          className="card__poster"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://placehold.co/300x450/141414/888?text=HD'
          }}
        />
        <span className="card__hd">HD</span>
      </div>
      <div className="card__info">
        <h3 className="card__title">{item.title}</h3>
        <p className="card__tagline">{tagline}</p>
        <p className="card__meta">
          <span className="card__rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {item.rating.toFixed(1)}
          </span>
          <span className="card__year">{item.year}</span>
        </p>
      </div>
    </Link>
  )
}
