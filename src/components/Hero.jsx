import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { featured } from '../data/movies'
import './Hero.css'

export default function Hero() {
  const { requireAuth } = useAuth()
  const navigate = useNavigate()

  const watchNow = () => {
    if (requireAuth('register')) {
      navigate(`/serie/${featured.slug}`)
    }
  }

  const addList = () => {
    requireAuth('register')
  }

  return (
    <section className="hero">
      <div
        className="hero__bg"
        style={{ backgroundImage: `url(${featured.backdrop})` }}
        role="img"
        aria-label={featured.title}
      />
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__brand">{featured.subtitle}</p>
        {featured.logoImage ? (
          <img src={featured.logoImage} alt={featured.title} className="hero__logo-img" />
        ) : (
          <h1 className="hero__title">
            <span className="hero__title-main">{featured.logoText}</span>
            <span className="hero__title-suffix">{featured.logoSuffix}</span>
          </h1>
        )}

        <div className="hero__meta">
          <span className="hero__rating-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {featured.rating.toFixed(1)}
          </span>
          <span className="hero__dot">•</span>
          <span>{featured.year}</span>
          <span className="hero__dot">•</span>
          <span>{featured.type}</span>
        </div>

        <p className="hero__desc">{featured.description}</p>

        <div className="hero__actions">
          <button type="button" className="btn-watch" onClick={watchNow}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            ASSISTIR AGORA
          </button>
          <button type="button" className="btn-list" onClick={addList}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            MINHA LISTA
          </button>
        </div>
      </div>
    </section>
  )
}
