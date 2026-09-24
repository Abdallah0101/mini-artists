import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArtwork, formatDate } from '../data/artworks'
import { getArtist } from '../data/artists'
import { HeartButton } from '../components/ArtworkCard'
import { useCopyLink, siteUrl } from '../components/ShareSection'
import { DoodleSparkle, DoodleStar } from '../components/Doodles'

export default function ArtworkPage() {
  const { slug } = useParams()
  const artwork = slug ? getArtwork(slug) : undefined
  const artist = artwork ? getArtist(artwork.artistId) : undefined
  const { copied, copy } = useCopyLink()

  useEffect(() => {
    if (artwork && artist) {
      document.title = `${artwork.emoji} ${artwork.title} — Arte de ${artist.name} | MARMALILYTAS`
    }
  }, [artwork, artist])

  if (!artwork || !artist) {
    return (
      <div className="container not-found">
        <h1 className="page-title">🖼️ Obra não encontrada</h1>
        <p>Essa obra deve estar voando por alguma galáxia de cores... 🚀</p>
        <Link to="/galeria" className="btn btn-purple">← Voltar para a galeria</Link>
      </div>
    )
  }

  const shareArtwork = () => copy(`${siteUrl()}arte/${artwork.slug}`)

  return (
    <div className="artwork-page">
      <div className="container">
        <nav className="artwork-nav" aria-label="Navegação da obra">
          <Link to="/galeria" className="btn btn-ghost">← Voltar para a galeria</Link>
          <button type="button" className="btn btn-ghost" onClick={shareArtwork} aria-live="polite">
            {copied ? 'Link copiado! ✨' : '🔗 Compartilhar esta obra'}
          </button>
        </nav>

        <div className="artwork-layout">
          {/* moldura da obra — espaço de sobra para apreciar o desenho */}
          <figure className="artwork-frame">
            <DoodleSparkle size={30} className="frame-sparkle tl twinkle-soft" />
            <DoodleStar size={26} className="frame-sparkle br twinkle-soft" />
            <img
              src={artwork.image}
              alt={`Desenho "${artwork.title}" feito por ${artist.name}, ${artist.age} anos`}
            />
          </figure>

          <div className="artwork-info">
            <p className="artwork-kicker" style={{ color: artist.color }}>
              {artist.emoji} Uma criação de {artist.name}
            </p>
            <h1 className="artwork-title">
              {artwork.title} <span aria-hidden="true">{artwork.emoji}</span>
            </h1>

            <blockquote className="artwork-desc">“{artwork.description}”</blockquote>

            <Link
              to={`/artistas/${artist.id}`}
              className="artwork-artist-chip"
              style={{ background: artist.colorSoft, borderColor: artist.color }}
            >
              <img src={artist.avatar} alt="" aria-hidden="true" />
              <span>
                <strong style={{ color: artist.color }}>{artist.name}</strong>
                <small>{artist.age} anos</small>
              </span>
            </Link>

            <p className="artwork-date">
              📅 Criado em <time dateTime={artwork.createdAt}>{formatDate(artwork.createdAt)}</time>
            </p>

            <div className="artwork-actions">
              <HeartButton artwork={artwork} big />
              <span className="artwork-actions-note">Deixe um coração para o artista! 💜</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
