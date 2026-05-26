import { useEffect, useRef, useState } from 'react'
import { getStream } from '../data/streams'
import './VideoPlayer.css'

export default function VideoPlayer({ slug, title, poster, autoPlay = true }) {
  const stream = getStream(slug)
  const videoRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setStarted(false)
    setError(false)
  }, [slug])

  useEffect(() => {
    if (!autoPlay || stream.type !== 'mp4' || !videoRef.current) return
    const v = videoRef.current
    v.play().then(() => setStarted(true)).catch(() => {})
  }, [autoPlay, stream.type, slug])

  const startMp4 = () => {
    const v = videoRef.current
    if (!v) return
    v.play()
      .then(() => setStarted(true))
      .catch(() => setError(true))
  }

  if (stream.type === 'youtube' || stream.type === 'iframe') {
    const src = autoPlay ? stream.src : stream.src.replace('autoplay=1', 'autoplay=0')
    return (
      <div className="video-player">
        <div className="video-player__frame">
          <iframe
            src={src}
            title={title}
            className="video-player__iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        {stream.label === 'trailer' && (
          <p className="video-player__hint">Trailer oficial · reprodução automática</p>
        )}
      </div>
    )
  }

  return (
    <div className="video-player">
      <div className="video-player__frame video-player__frame--native">
        <video
          ref={videoRef}
          className="video-player__video"
          poster={poster}
          controls
          playsInline
          preload="metadata"
          onPlay={() => setStarted(true)}
          onError={() => setError(true)}
        >
          <source src={stream.src} type="video/mp4" />
        </video>
        {!started && !error && (
          <button type="button" className="video-player__play" onClick={startMp4} aria-label="Reproduzir">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
        {error && <p className="video-player__error">Não foi possível carregar o vídeo.</p>}
      </div>
      {stream.label === 'demo' && (
        <p className="video-player__hint">Demonstração · configure stream licenciado em streams.js</p>
      )}
    </div>
  )
}
