import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { newRelease, NEW_RELEASE_STORAGE_KEY } from '../data/newRelease'
import './NewReleasePopup.css'

export default function NewReleasePopup() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { authModal, requireAuth } = useAuth()

  useEffect(() => {
    if (localStorage.getItem(NEW_RELEASE_STORAGE_KEY)) return

    const timer = window.setTimeout(() => {
      if (!localStorage.getItem(NEW_RELEASE_STORAGE_KEY)) {
        setOpen(true)
      }
    }, 1200)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (authModal) setOpen(false)
  }, [authModal])

  const dismiss = () => {
    localStorage.setItem(NEW_RELEASE_STORAGE_KEY, '1')
    setOpen(false)
  }

  const watchNow = () => {
    if (requireAuth('register')) {
      dismiss()
      navigate(`/filme/${newRelease.slug}`)
    }
  }

  if (!open) return null

  return (
    <div className="new-release-overlay" onClick={dismiss} role="presentation">
      <div
        className="new-release"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-release-title"
      >
        <button type="button" className="new-release__close" onClick={dismiss} aria-label="Fechar">
          ✕
        </button>

        <div className="new-release__visual" style={{ backgroundImage: `url(${newRelease.backdrop})` }}>
          <div className="new-release__visual-overlay" />
          <span className="new-release__badge">Novo no catálogo</span>
          <img src={newRelease.poster} alt="" className="new-release__poster" />
        </div>

        <div className="new-release__body">
          <p className="new-release__eyebrow">
            <span className="new-release__bar" aria-hidden />
            Acabamos de adicionar
          </p>
          <h2 id="new-release-title" className="new-release__title">
            {newRelease.title}
          </h2>
          <p className="new-release__meta">
            <span className="new-release__rating">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {newRelease.rating.toFixed(1)}
            </span>
            <span>{newRelease.year}</span>
            <span className="new-release__hd">HD</span>
          </p>
          <p className="new-release__desc">{newRelease.description}</p>
          <div className="new-release__actions">
            <button type="button" className="new-release__cta" onClick={watchNow}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
              Assistir agora
            </button>
            <button type="button" className="new-release__later" onClick={dismiss}>
              Ver depois
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
