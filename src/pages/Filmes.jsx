import CatalogPage from './CatalogPage'
import { allFilmes } from '../data/movies'

export default function Filmes() {
  return (
    <CatalogPage
      title="Filmes Online Grátis em HD"
      subtitle="A maior coleção de Filmes Online em HD. Assista os últimos lançamentos do cinema em 4K, dublados e legendados."
      items={allFilmes}
    />
  )
}
