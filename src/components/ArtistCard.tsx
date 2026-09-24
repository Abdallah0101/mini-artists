import { Link } from 'react-router-dom'
import type { Artist } from '../data/artists'
import { artworksByArtist } from '../data/artworks'
import { DoodleStar, DoodlePencil, DoodlePalette, DoodleFlower, DoodleSparkle } from './Doodles'

export default function ArtistCard({ artist }: { artist: Artist }) {
  const total = artworksByArtist(artist.id).length
  return (
    <Link
      to={`/artistas/${artist.id}`}
      className="artist-card"
      style={{ background: artist.colorSoft }}
      aria-label={`Ver perfil de ${artist.name}, ${artist.age} anos`}
    >
      <span className="artist-card-decor d1" aria-hidden="true">
        {artist.id === 'malik' ? <DoodlePencil size={30} /> : <DoodleFlower size={32} />}
      </span>
      <span className="artist-card-decor d2" aria-hidden="true">
        <DoodleStar size={24} tip="⭐ Brilhe, pequeno artista!" />
      </span>
      <span className="artist-card-decor d3" aria-hidden="true">
        {artist.id === 'malik' ? <DoodlePalette size={28} /> : <DoodleSparkle size={24} color="#FF8FB0" />}
      </span>

      <span className="artist-card-avatar" style={{ borderColor: artist.color }}>
        <img src={artist.avatar} alt={`Foto de ${artist.name}`} loading="lazy" />
      </span>
      <span className="artist-card-name" style={{ color: artist.color }}>
        {artist.name}
      </span>
      <span className="artist-card-age">
        {artist.age} anos 🎨
      </span>
      <span className="artist-card-tagline">{artist.tagline}</span>
      <span className="artist-card-count">
        {total} {total === 1 ? 'obra' : 'obras'} →
      </span>
    </Link>
  )
}
