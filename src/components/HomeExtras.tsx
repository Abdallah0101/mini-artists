import { Link } from 'react-router-dom'
import { artworks } from '../data/artworks'
import { artists } from '../data/artists'
import { getArtist } from '../data/artists'
import { DoodleStar, DoodleSparkle } from './Doodles'

/** Faixa de contadores: números mágicos da galeria */
export function StatsStrip() {
  const totalLikes = artworks.reduce((s, a) => s + a.likes, 0)
  const categories = new Set(artworks.map((a) => a.category)).size
  const stats = [
    { emoji: '🖼️', value: artworks.length, label: 'obras de arte' },
    { emoji: '👨‍🎨', value: artists.length, label: 'artistas' },
    { emoji: '❤️', value: totalLikes, label: 'corações' },
    { emoji: '🗂️', value: categories, label: 'mundos de assunto' },
  ]
  return (
    <div className="stats-strip" role="list" aria-label="Números da galeria">
      {stats.map((s) => (
        <div className="stat-item" role="listitem" key={s.label}>
          <span className="stat-emoji" aria-hidden="true">{s.emoji}</span>
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

/** Obra em destaque: a mais amada da galeria */
export function FeaturedArtwork() {
  const featured = [...artworks].sort((a, b) => b.likes - a.likes)[0]
  if (!featured) return null
  const artist = getArtist(featured.artistId)

  return (
    <section className="featured-section container" aria-label="Obra em destaque">
      <div className="featured-card">
        <DoodleStar size={34} className="featured-star twinkle-soft" />
        <DoodleSparkle size={26} className="featured-sparkle twinkle-soft" />
        <div className="featured-image">
          <img
            src={featured.image}
            alt={`Desenho "${featured.title}" feito por ${artist?.name}`}
            loading="lazy"
          />
        </div>
        <div className="featured-info">
          <span className="featured-badge">⭐ Obra mais amada da galeria</span>
          <h2 className="featured-title">
            {featured.title} {featured.emoji}
          </h2>
          <p className="featured-desc">“{featured.description}”</p>
          {artist && (
            <span
              className="art-card-artist"
              style={{ background: artist.colorSoft, color: artist.color }}
            >
              <span className="dot" style={{ background: artist.color }} aria-hidden="true" />
              {artist.name}, {artist.age} anos
            </span>
          )}
          <div className="featured-actions">
            <Link to={`/arte/${featured.slug}`} className="btn btn-pink">
              🖼️ Ver essa obra
            </Link>
            <span className="featured-likes" title="Corações recebidos">
              ❤️ {featured.likes}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
