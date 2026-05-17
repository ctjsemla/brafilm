import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Header.css'

export default function Header({ onMenuOpen }) {
  const { user, openRegister, openLogin, logout } = useAuth()
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/descobrir?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
    }
  }

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="logo">
          <span className="logo__bra">bra</span>
          <span className="logo__film">film</span>
        </NavLink>

        <nav className="nav nav--desktop" aria-label="Principal">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}>
            INÍCIO
          </NavLink>
          <NavLink to="/filmes" className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}>
            FILMES
          </NavLink>
          <NavLink to="/series" className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}>
            SÉRIES
          </NavLink>
          <NavLink to="/descobrir" className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}>
            DESCOBRIR
          </NavLink>
        </nav>

        <form className={`search search--desktop ${searchOpen ? 'search--open' : ''}`} onSubmit={handleSearch}>
          <input
            type="search"
            className="search__input"
            placeholder="O que vamos assistir hoje?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar"
          />
          <button type="submit" className="search__btn" aria-label="Pesquisar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </form>

        <div className="header__actions">
          <button
            type="button"
            className="header__search-mobile"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Pesquisar"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {user ? (
            <>
              <span className="header__user">Olá, {user.name}</span>
              <button type="button" className="header__account header__account--desktop" onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <button type="button" className="header__account header__account--desktop" onClick={openLogin}>
                Minha Conta
              </button>
              <button type="button" className="btn-register" onClick={openRegister}>
                REGISTRAR
              </button>
            </>
          )}
        </div>
      </div>

      {searchOpen && (
        <form className="search search--mobile-bar" onSubmit={handleSearch}>
          <input
            type="search"
            autoFocus
            placeholder="O que vamos assistir hoje?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      )}
    </header>
  )
}
