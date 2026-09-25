import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { artworks, getArtwork, formatDate } from '../data/artworks'
import { getArtist } from '../data/artists'
import { HeartButton } from '../components/ArtworkCard'
import { useCopyLink, siteUrl } from '../components/ShareSection'
import WhatsAppButton from '../components/WhatsAppButton'
import { DoodleSparkle, DoodleStar } from '../components/Doodles'

export default function ArtworkPage() {
  const { slug } = useParams()
  const artwork = slug ? getArtwork(slug) : undefined
  const artist = artwork ? getArtist(artwork.artistId) : undefined
  const { copied, copy } = useCopyLink()

  // ordena como na galeria (mais recentes primeiro) para navegar entre obras
  const ordered = [...artworks].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const index = artwork ? ordered.findIndex((a) => a.slug === artwork.slug) : -1
  const prev = index >= 0 ? ordered[index + 1] : undefined // mais antiga
  const next = index > 0 ? ordered[index - 1] : undefined // mais recente

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

  const artworkUrl = `${siteUrl()}arte/${artwork.slug}`
  const whatsText = `🎨 Olha esse desenho! "${artwork.title}" — arte de ${artist.name}, ${artist.age} anos: “${artwork.description}” 💜 Veja na galeria MARMALILYTAS: ${artworkUrl}`

  return (
    <div className="artwork-page">
      <div className="container">
        <nav className="artwork-nav" aria-label="Navegação da obra">
          <Link to="/galeria" className="btn btn-ghost">← Voltar para a galeria</Link>
          <div className="artwork-nav-actions">
            <button type="button" className="btn btn-ghost" onClick={() => copy(artworkUrl)} aria-live="polite">
              {copied ? 'Link copiado! ✨' : '🔗 Copiar link'}
            </button>
            <WhatsAppButton text={whatsText} label="Enviar no WhatsApp" />
          </div>
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

            <span className="art-card-artist art-card-cat artwork-cat">{artwork.category}</span>

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
              <a
                className="btn btn-ghost btn-small"
                href={artwork.image}
                download={`${artwork.slug}`}
                title="Baixar o desenho para guardar ou imprimir 🖨️"
              >
                ⬇️ Baixar desenho
              </a>
            </div>
            <p className="artwork-actions-note">
              Deixe um coração, baixe ou mande no WhatsApp — o artista vai amar! 💜
            </p>
          </div>
        </div>

        {/* navegar entre as obras da galeria */}
        <nav className="art-nav" aria-label="Outras obras">
          {prev ? (
            <Link to={`/arte/${prev.slug}`} className="art-nav-link">
              <span className="art-nav-dir">← obra anterior</span>
              <span className="art-nav-title">{prev.emoji} {prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/arte/${next.slug}`} className="art-nav-link right">
              <span className="art-nav-dir">próxima obra →</span>
              <span className="art-nav-title">{next.emoji} {next.title}</span>
            </Link>
          ) : <span />}
        </nav>
      </div>
    </div>
  )
}
