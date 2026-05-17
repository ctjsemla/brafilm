import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import CatalogPage from './CatalogPage'
import { lancamentos, seriesEmAlta, emDestaque } from '../data/movies'

const all = [...lancamentos, ...seriesEmAlta, ...emDestaque]

export default function Descobrir() {
  const [params] = useSearchParams()
  const q = params.get('q')?.toLowerCase() ?? ''

  const items = useMemo(() => {
    if (!q) return all
    return all.filter((item) => item.title.toLowerCase().includes(q))
  }, [q])

  return (
    <CatalogPage
      title={q ? `Resultados para "${params.get('q')}"` : 'Descobrir'}
      subtitle="Explore nosso catálogo de filmes e séries em destaque."
      items={items}
    />
  )
}
