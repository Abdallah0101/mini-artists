import { useMemo, useState } from 'react'
import { artworks } from '../data/artworks'
import { artists } from '../data/artists'
import ArtworkCard from './ArtworkCard'
import { DoodleFlower, DoodleSquiggle } from './Doodles'

type SortKey = 'recentes' | 'antigos' | 'nome' | 'artista'

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'recentes', label: 'Mais recentes' },
  { value: 'antigos', label: 'Mais antigos' },
  { value: 'nome', label: 'Nome A–Z' },
  { value: 'artista', label: 'Artista' },
]

interface Props {
  /** quando definido (página do artista), trava o filtro nesse artista */
  fixedArtistId?: string
  /** mostra título da seção e filtros (falso na página do artista) */
  showHeader?: boolean
}

export default function GallerySection({ fixedArtistId, showHeader = true }: Props) {
  const [filter, setFilter] = useState<string>(fixedArtistId ?? 'todos')
  const [sort, setSort] = useState<SortKey>('recentes')

  const visible = useMemo(() => {
    const activeFilter = fixedArtistId ?? filter
    const list = artworks.filter((a) => activeFilter === 'todos' || a.artistId === activeFilter)
    const byArtist = (id: string) => artists.findIndex((a) => a.id === id)
    switch (sort) {
      case 'recentes':
        return [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      case 'antigos':
        return [...list].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      case 'nome':
        return [...list].sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
      case 'artista':
        return [...list].sort(
          (a, b) => byArtist(a.artistId) - byArtist(b.artistId) || b.createdAt.localeCompare(a.createdAt),
        )
    }
  }, [filter, sort, fixedArtistId])

  return (
    <section className="gallery-section container" id="galeria" aria-label="Galeria de desenhos">
      {showHeader && (
        <h2 className="section-title">
          <DoodleFlower size={38} />
          Galeria de Desenhos
          <DoodleSquiggle size={70} color="#FF9D42" />
        </h2>
      )}

      <div className="gallery-toolbar">
        {!fixedArtistId && (
          <div className="gallery-filters" role="group" aria-label="Filtrar por artista">
            <button
              type="button"
              className={`filter-pill ${filter === 'todos' ? 'active' : ''}`}
              onClick={() => setFilter('todos')}
              aria-pressed={filter === 'todos'}
            >
              ✨ Todos
            </button>
            {artists.map((a) => (
              <button
                key={a.id}
                type="button"
                className={`filter-pill ${filter === a.id ? 'active' : ''}`}
                style={
                  filter === a.id
                    ? { background: a.color, borderColor: a.color }
                    : { color: a.color, borderColor: a.color }
                }
                onClick={() => setFilter(a.id)}
                aria-pressed={filter === a.id}
              >
                {a.emoji} {a.name}
              </button>
            ))}
          </div>
        )}

        <label className="gallery-sort">
          <span className="sr-only">Ordenar desenhos</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="gallery-empty">
          🎨 Ainda não há desenhos por aqui... novas obras estão a caminho!
        </p>
      ) : (
        <div className="gallery-grid">
          {visible.map((a) => (
            <ArtworkCard key={a.id} artwork={a} />
          ))}
        </div>
      )}
    </section>
  )
}
