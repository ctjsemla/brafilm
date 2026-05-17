import MovieCard from '../components/MovieCard'
import Footer from '../components/Footer'
import './CatalogPage.css'

export default function CatalogPage({ title, subtitle, items }) {
  return (
    <div className="catalog">
      <div className="catalog__hero">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="catalog__grid">
        {items.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
      <Footer />
    </div>
  )
}
