import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { findBySlug } from '../data/movies'
import { useAuth } from '../context/AuthContext'
import VideoPlayer from '../components/VideoPlayer'
import './ContentPage.css'

export default function ContentPage() {
  const { slug } = useParams()
  const { isLoggedIn, requireAuth, openRegister, openLogin } = useAuth()
  const content = findBySlug(slug)

  useEffect(() => {
    if (!isLoggedIn) {
      requireAuth('register')
    }
  }, [isLoggedIn, requireAuth])

  if (!content) {
    return (
      <div className="content-page content-page--empty">
        <h1>Conteúdo não encontrado</h1>
        <Link to="/">Voltar ao início</Link>
      </div>
    )
  }

  const tagline = content.tagline || 'Filmes Online HD'
  const typeLabel = content.contentType === 'serie' ? 'Série' : 'Filme'

  if (!isLoggedIn) {
    return (
      <div className="content-page content-page--locked">
        <div
          className="content-page__backdrop"
          style={{ backgroundImage: `url(${content.backdrop || content.poster})` }}
        />
        <div className="content-page__lock">
          <img src={content.poster} alt="" className="content-page__poster-sm" />
          <h1>{content.title}</h1>
          <p className="content-page__lock-msg">
            Para assistir <strong>{content.title}</strong>, crie uma conta gratuita na Brafilm.
          </p>
          <button type="button" className="btn-watch" onClick={openRegister}>
            REGISTRAR AGORA
          </button>
          <p className="content-page__lock-hint">
            Já tem conta?{' '}
            <button type="button" className="link-btn" onClick={openLogin}>
              Entrar
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="content-page content-page--watch">
      <div className="content-page__player-wrap">
        <VideoPlayer
          slug={content.slug}
          title={content.title}
          poster={content.poster}
          autoPlay
        />
      </div>

      <div className="content-page__watch-inner">
        <div className="content-page__watch-head">
          <img src={content.poster} alt="" className="content-page__poster-thumb" />
          <div className="content-page__watch-meta">
            <span className="content-page__type">{typeLabel}</span>
            <h1>{content.title}</h1>
            <p className="content-page__tagline">{tagline}</p>
            <div className="content-page__meta">
              <span className="content-page__rating">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {content.rating?.toFixed(1)}
              </span>
              <span>{content.year}</span>
              <span className="content-page__live">HD</span>
            </div>
          </div>
        </div>

        {content.description && <p className="content-page__desc">{content.description}</p>}

        <div className="content-page__cta content-page__cta--active">
          <button type="button" className="btn-list">
            + MINHA LISTA
          </button>
          <Link to={content.contentType === 'serie' ? '/series' : '/filmes'} className="content-page__more">
            Ver mais {content.contentType === 'serie' ? 'séries' : 'filmes'}
          </Link>
        </div>

        <Link to="/" className="content-page__back">
          ← Voltar ao início
        </Link>
      </div>
    </div>
  )
}
