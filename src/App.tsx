import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import ArtistPage from './pages/ArtistPage'
import ArtworkPage from './pages/ArtworkPage'

/** Rola para o topo a cada navegação, ou para a âncora (#artistas, #sobre, #contato) */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // espera a página renderizar antes de rolar até a âncora
      requestAnimationFrame(() => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        window.scrollTo({ top: 0 })
      })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollManager />
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/artistas/:artistId" element={<ArtistPage />} />
          <Route path="/arte/:slug" element={<ArtworkPage />} />
          <Route
            path="*"
            element={
              <div className="container not-found">
                <h1 className="page-title">🌙 Página não encontrada</h1>
                <p>Essa página sumiu atrás de uma nuvem colorida... ☁️</p>
                <a href={import.meta.env.BASE_URL} className="btn btn-pink">
                  🏠 Voltar para o início
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
