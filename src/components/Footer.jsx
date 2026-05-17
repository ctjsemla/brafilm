import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <section className="footer__destaque">
        <h3>
          <span className="footer__bar" />
          Em Destaque
        </h3>
        <p>
          Filmes Online - Assistir Filmes - Filmes Online Grátis - Filmes Completos Dublados.
          Filmes Online - Assistir Filmes Online - Filmes Online Grátis - Filmes Completos
          Dublados. O Brafilm é uma plataforma para assistir filmes e séries online em HD,
          com catálogo atualizado e experiência premium.
        </p>
      </section>
      <div className="footer__bottom">
        <p className="footer__logo">
          <span>bra</span>
          <span className="footer__film">film</span>
        </p>
        <p className="footer__copy">© {new Date().getFullYear()} Brafilm</p>
      </div>
    </footer>
  )
}
