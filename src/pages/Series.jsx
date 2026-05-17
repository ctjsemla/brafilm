import CatalogPage from './CatalogPage'
import { allSeries } from '../data/movies'

export default function Series() {
  return (
    <CatalogPage
      title="Séries Online Grátis em HD"
      subtitle="As melhores séries em alta qualidade. Assista temporadas completas dubladas e legendadas."
      items={allSeries}
    />
  )
}
