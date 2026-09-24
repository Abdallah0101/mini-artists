import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArtist } from '../data/artists'
import GallerySection from '../components/GallerySection'
import { DoodleSquiggle, DoodleSparkle } from '../components/Doodles'

export default function ArtistPage() {
  const { artistId } = useParams()
  const artist = artistId ? getArtist(artistId) : undefined

  useEffect(() => {
    if (artist) document.title = `${artist.emoji} ${artist.name} — Mini Artists`
  }, [artist])

  if (!artist) {
    return (
      <div className="container not-found">
        <h1 className="page-title">🎨 Artista não encontrado</h1>
        <p>Esse artista ainda não faz parte da galeria... mas quem sabe em breve? 💫</p>
        <Link to="/" className="btn btn-purple">← Voltar para o início</Link>
      </div>
    )
  }

  return (
    <>
      <div className="page-hero artist-hero" style={{ background: artist.colorSoft }}>
        <DoodleSparkle size={30} className="artist-hero-sparkle twinkle-soft" color={artist.color} />
        <div className="container artist-hero-inner">
          <span className="artist-hero-avatar" style={{ borderColor: artist.color }}>
            <img src={artist.avatar} alt={`Foto de ${artist.name}`} />
          </span>
          <h1 className="page-title" style={{ color: artist.color }}>
            {artist.emoji} {artist.name}
          </h1>
          <span className="artist-hero-age">{artist.age} anos 🎨</span>
          <p className="page-subtitle">{artist.description}</p>
          <DoodleSquiggle size={90} color={artist.color} />
        </div>
      </div>

      <div className="container">
        <h2 className="section-title artist-works-title">
          Obras de {artist.name} {artist.emoji}
        </h2>
      </div>
      <GallerySection fixedArtistId={artist.id} showHeader={false} />

      <div className="container back-row">
        <Link to="/" className="btn btn-purple">← Voltar para o início</Link>
      </div>
    </>
  )
}
