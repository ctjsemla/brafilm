import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './SideMenu.css'

export default function SideMenu({ open, onClose }) {
  const { openLogin, openRegister } = useAuth()

  return (
    <>
      <div className={`side-menu__backdrop ${open ? 'is-open' : ''}`} onClick={onClose} aria-hidden />
      <aside className={`side-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="side-menu__head">
          <h3>Menu</h3>
          <button type="button" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>
        <nav className="side-menu__nav">
          <NavLink to="/" end onClick={onClose}>
            INÍCIO
          </NavLink>
          <NavLink to="/filmes" onClick={onClose}>
            FILMES
          </NavLink>
          <NavLink to="/series" onClick={onClose}>
            SÉRIES
          </NavLink>
          <NavLink to="/descobrir" onClick={onClose}>
            DESCOBRIR
          </NavLink>
        </nav>
        <div className="side-menu__actions">
          <button type="button" onClick={() => { openLogin(); onClose() }}>
            Minha Conta
          </button>
          <button type="button" className="side-menu__reg" onClick={() => { openRegister(); onClose() }}>
            REGISTRAR
          </button>
        </div>
      </aside>
    </>
  )
}
