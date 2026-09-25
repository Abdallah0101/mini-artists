import { useEffect } from 'react'
import Hero from '../components/Hero'
import ArtistCard from '../components/ArtistCard'
import GallerySection from '../components/GallerySection'
import ShareSection from '../components/ShareSection'
import Reveal from '../components/Reveal'
import { StatsStrip, FeaturedArtwork } from '../components/HomeExtras'
import { artists } from '../data/artists'
import {
  DoodleStar,
  DoodleRainbow,
  DoodleCloud,
  DoodlePencil,
  DoodlePalette,
  DoodleSquiggle,
  DoodleSparkle,
} from '../components/Doodles'

export default function HomePage() {
  useEffect(() => {
    document.title = 'MARMALILYTAS — Galeria de Arte de Malik & Maryam'
  }, [])

  return (
    <>
      <Hero />

      <Reveal>
        <StatsStrip />
      </Reveal>

      <Reveal>
        <FeaturedArtwork />
      </Reveal>

      <Reveal>
        <section className="artists-section container" id="artistas" aria-label="Nossos artistas">
        <h2 className="section-title">
          <DoodleStar size={36} tip="⭐ Nossos pequenos grandes artistas" />
          Nossos Artistas
          <DoodleSparkle size={30} color="#FF8FB0" />
        </h2>
        <div className="artists-grid">
          {artists.map((a) => (
            <ArtistCard key={a.id} artist={a} />
          ))}
          <div className="artist-card artist-card-soon" aria-hidden="true">
            <span className="artist-card-soon-emoji">💫</span>
            <span className="artist-card-name">Em breve...</span>
            <span className="artist-card-tagline">Novos artistas vão brilhar por aqui!</span>
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal>
        <GallerySection />
      </Reveal>

      <Reveal>
        <section className="about-section" id="sobre" aria-label="Sobre a galeria">
        <div className="container about-box">
          <DoodleCloud size={70} className="about-decor ad1 drift" color="#fff" />
          <DoodleRainbow size={80} className="about-decor ad2 float-med" />
          <h2 className="section-title">
            <DoodleRainbow size={44} />
            Sobre a Galeria
          </h2>
          <p className="about-text">
            Este é um espaço especial onde nossos pequenos artistas podem guardar suas criações e
            compartilhar sua imaginação com o mundo.
          </p>
          <p className="about-text about-text-small">
            Aqui, cada rabisco vira memória e cada desenho é tratado como uma verdadeira obra de
            arte — porque é assim que a gente vê o mundo deles. 💜
          </p>
          <p className="about-news">
            <DoodlePencil size={26} /> Novos desenhos são adicionados sempre!{' '}
            <DoodlePalette size={26} />
          </p>
          <DoodleSquiggle size={90} color="#9B6BEA" className="about-squiggle" />
        </div>
        </section>
      </Reveal>

      <Reveal>
        <ShareSection />
      </Reveal>
    </>
  )
}
