import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import AuthModal from './components/AuthModal'
import NewReleasePopup from './components/NewReleasePopup'
import TelegramFab from './components/TelegramFab'
import MobileNav from './components/MobileNav'
import SideMenu from './components/SideMenu'
import Home from './pages/Home'
import Filmes from './pages/Filmes'
import Series from './pages/Series'
import Descobrir from './pages/Descobrir'
import ContentPage from './pages/ContentPage'
import './App.css'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmes" element={<Filmes />} />
          <Route path="/series" element={<Series />} />
          <Route path="/descobrir" element={<Descobrir />} />
          <Route path="/:type/:slug" element={<ContentPage />} />
        </Routes>
      </main>
      <NewReleasePopup />
      <AuthModal />
      <TelegramFab />
      <MobileNav onMenuOpen={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
