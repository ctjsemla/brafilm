import { Link } from 'react-router-dom'
import './RankList.css'

export default function RankList({ items }) {
  return (
    <aside className="rank-list">
      <h3 className="rank-list__title">
        <span className="rank-list__icon">🔥</span>
        Em Destaque
      </h3>
      <ol className="rank-list__items">
        {items.map((item) => {
          const typePath = item.contentType === 'serie' ? 'serie' : 'filme'
          return (
            <li key={item.id}>
              <Link to={`/${typePath}/${item.slug}`} className="rank-card">
                <span className="rank-card__idx">{item.rank}</span>
                <img src={item.poster} alt="" className="rank-card__poster" loading="lazy" />
                <div className="rank-card__info">
                  <span className="rank-card__name">{item.title}</span>
                  <span className="rank-card__tag">{item.tagline}</span>
                  <span className="rank-card__meta">
                    <span className="rank-card__rate">★ {item.rating.toFixed(1)}</span>
                    <span>{item.year}</span>
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
