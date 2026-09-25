import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Artwork } from '../data/artworks'
import { formatDate } from '../data/artworks'
import { getArtist } from '../data/artists'
import { WhatsAppIcon, whatsappShareUrl } from './WhatsAppButton'
import { siteUrl } from './ShareSection'

/** Coração com curtida local (localStorage). Pronto para virar "favoritos" com backend. */
export function useLiked(artworkId: string): [boolean, () => void] {
  const key = `marmalilytas:like:${artworkId}`
  const [liked, setLiked] = useState<boolean>(() => {
    try {
      return localStorage.getItem(key) === '1'
    } catch {
      return false
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, liked ? '1' : '0')
    } catch {
      /* armazenamento indisponível — tudo bem, o coração é decorativo */
    }
  }, [key, liked])
  return [liked, () => setLiked((v) => !v)]
}

const BURST = [
  { x: -26, y: -34, c: '#FF4F87', e: '❤' },
  { x: 0, y: -44, c: '#FFD45A', e: '✦' },
  { x: 26, y: -34, c: '#9B6BEA', e: '⭐' },
  { x: -16, y: -50, c: '#55B8F7', e: '✦' },
  { x: 16, y: -50, c: '#FF9D42', e: '❤' },
  { x: 34, y: -20, c: '#71D6A2', e: '✦' },
]

export function HeartButton({ artwork, big }: { artwork: Artwork; big?: boolean }) {
  const [liked, toggle] = useLiked(artwork.id)
  const [burst, setBurst] = useState(0)
  const count = artwork.likes + (liked ? 1 : 0)

  return (
    <button
      type="button"
      className={`heart-btn ${liked ? 'liked' : ''} ${big ? 'big' : ''}`}
      aria-pressed={liked}
      aria-label={liked ? `Remover curtida de ${artwork.title}` : `Curtir ${artwork.title}`}
      title="❤️ Toda arte merece um coração!"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle()
        setBurst(Date.now())
        setTimeout(() => setBurst(0), 900)
      }}
    >
      {burst > 0 && (
        <span className="heart-burst" aria-hidden="true" key={burst}>
          {BURST.map((p, i) => (
            <i
              key={i}
              style={{ color: p.c, '--bx': `${p.x}px`, '--by': `${p.y}px` } as React.CSSProperties}
            >
              {p.e}
            </i>
          ))}
        </span>
      )}
      <svg viewBox="0 0 24 24" width={big ? 26 : 20} height={big ? 26 : 20} aria-hidden="true">
        <path
          d="M12 21 Q3 14.5 3 8.8 Q3 4.5 7 4.5 Q9.8 4.5 12 7.6 Q14.2 4.5 17 4.5 Q21 4.5 21 8.8 Q21 14.5 12 21 Z"
          fill={liked ? '#FF4F87' : 'none'}
          stroke={liked ? '#FF4F87' : '#B9A9D9'}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span>{count}</span>
    </button>
  )
}

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const artist = getArtist(artwork.artistId)
  return (
    <article className="art-card">
      <Link
        to={`/arte/${artwork.slug}`}
        className="art-card-link"
        aria-label={`Ver a obra ${artwork.title}, de ${artist?.name}`}
      >
        <div className="art-card-image">
          <img
            src={artwork.image}
            alt={`Desenho "${artwork.title}" feito por ${artist?.name}`}
            loading="lazy"
          />
        </div>
        <div className="art-card-body">
          <h3 className="art-card-title">
            {artwork.title} <span aria-hidden="true">{artwork.emoji}</span>
          </h3>
          {artist && (
            <span
              className="art-card-artist"
              style={{ background: artist.colorSoft, color: artist.color }}
            >
              <span className="dot" style={{ background: artist.color }} aria-hidden="true" />
              {artist.name}
            </span>
          )}
          <span className="art-card-artist art-card-cat">{artwork.category}</span>
          <p className="art-card-desc">{artwork.description}</p>
          <div className="art-card-footer">
            <time dateTime={artwork.createdAt}>{formatDate(artwork.createdAt)}</time>
            <span className="art-card-buttons">
              <HeartButton artwork={artwork} />
              {artist && (
                <button
                  type="button"
                  className="whats-mini"
                  title="Enviar esta arte no WhatsApp 💚"
                  aria-label={`Enviar ${artwork.title} no WhatsApp`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const url = `${siteUrl()}arte/${artwork.slug}`
                    const msg = `🎨 Olha esse desenho! "${artwork.title}" — arte de ${artist.name}, ${artist.age} anos, na galeria MARMALILYTAS 💜 ${url}`
                    window.open(whatsappShareUrl(msg), '_blank', 'noopener')
                  }}
                >
                  <WhatsAppIcon size={16} />
                </button>
              )}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
