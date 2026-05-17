import { NavLink } from 'react-router-dom'
import './MobileNav.css'

export default function MobileNav({ onMenuOpen }) {
  const itemClass = ({ isActive }) => `mobile-nav__item${isActive ? ' mobile-nav__item--active' : ''}`

  return (
    <nav className="mobile-nav" aria-label="Navegação móvel">
      <NavLink to="/" end className={itemClass}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />
        </svg>
        <span>Home</span>
      </NavLink>

      <NavLink to="/filmes" className={itemClass}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 8h20M7 4v4M17 4v4" />
        </svg>
        <span>Filmes</span>
      </NavLink>

      <NavLink to="/" className="mobile-nav__logo" aria-label="Brafilm">
        <span>bra</span>
        <span>film</span>
      </NavLink>

      <NavLink to="/series" className={itemClass}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M8 21h8" />
        </svg>
        <span>Séries</span>
      </NavLink>

      <button type="button" className="mobile-nav__item" onClick={onMenuOpen}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
        <span>Menu</span>
      </button>
    </nav>
  )
}
