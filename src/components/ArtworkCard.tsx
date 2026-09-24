import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Artwork } from '../data/artworks'
import { formatDate } from '../data/artworks'
import { getArtist } from '../data/artists'

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

export function HeartButton({ artwork, big }: { artwork: Artwork; big?: boolean }) {
  const [liked, toggle] = useLiked(artwork.id)
  const [pop, setPop] = useState(false)
  const count = artwork.likes + (liked ? 1 : 0)

  return (
    <button
      type="button"
      className={`heart-btn ${liked ? 'liked' : ''} ${pop ? 'pop' : ''} ${big ? 'big' : ''}`}
      aria-pressed={liked}
      aria-label={liked ? `Remover curtida de ${artwork.title}` : `Curtir ${artwork.title}`}
      title="❤️ Toda arte merece um coração!"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle()
        setPop(true)
        setTimeout(() => setPop(false), 350)
      }}
    >
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
            <HeartButton artwork={artwork} />
          </div>
        </div>
      </Link>
    </article>
  )
}
