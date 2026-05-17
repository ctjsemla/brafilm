import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import RankList from '../components/RankList'
import Footer from '../components/Footer'
import { lancamentos, populares, seriesEmAlta, emDestaque } from '../data/movies'
import './Home.css'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="home-layout">
        <div className="home-main">
          <MovieRow title="Lançamentos" items={lancamentos} seeAllLink="/filmes" />
          <MovieRow title="Populares" items={populares} seeAllLink="/filmes" />
          <MovieRow title="Séries em Alta" items={seriesEmAlta} seeAllLink="/series" seeAllLabel="VER TODAS" />
          <section className="home-mobile-rank">
            <MovieRow title="Em Destaque" items={emDestaque.slice(0, 6)} seeAllLink="/descobrir" />
          </section>
        </div>
        <RankList items={emDestaque} />
      </div>
      <Footer />
    </>
  )
}
