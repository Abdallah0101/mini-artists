import { useEffect } from 'react'
import GallerySection from '../components/GallerySection'
import ShareSection from '../components/ShareSection'

export default function GalleryPage() {
  useEffect(() => {
    document.title = '🖼️ Galeria de Desenhos — Mini Artists'
  }, [])

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">🎨 Galeria de Desenhos</h1>
          <p className="page-subtitle">
            Cada desenho é uma pequena janela para a imaginação de uma criança.
          </p>
        </div>
      </div>
      <GallerySection showHeader={false} />
      <ShareSection />
    </>
  )
}
