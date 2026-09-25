/**
 * CATÁLOGO DE OBRAS
 * -----------------
 * Mantido pelo AI Agent do Telegram — ver AGENTEAI.md na raiz do projeto.
 */

export interface Artwork {
  id: string
  /** slug amigável para a URL: /arte/<slug> */
  slug: string
  artistId: string
  title: string
  emoji: string
  /** descrição com a voz da criança */
  description: string
  /** classificação da obra: assunto/técnica (ex.: "Espaço 🚀", "Aquarela 🎨") */
  category: string
  /** caminho da imagem dentro de public/ (sem a base URL) */
  image: string
  /** data de criação, formato ISO: AAAA-MM-DD */
  createdAt: string
  /** curtidas iniciais (o visitante pode somar +1 no coração) */
  likes: number
}

const base = import.meta.env.BASE_URL
const img = (artist: string, file: string) => `${base}artworks/${artist}/${file}`

export const artworks: Artwork[] = [
  {
    id: 'mlk-009',
    slug: 'godzilla-e-gorilla',
    artistId: 'malik',
    title: 'Godzilla e Gorilla',
    emoji: '🦖',
    description: 'O Godzilla e o gorila se encarando pra ver quem é mais forte, e o helicóptero vermelho assistindo tudo lá do alto!',
    category: 'Fantasia 🐉',
    image: img('malik', 'godzilla-e-gorilla.jpg'),
    createdAt: '2026-09-25',
    likes: 0,
  },
  {
    id: 'mlk-008',
    slug: 'mamute-e-mosasauro-no-fundo-do-mar',
    artistId: 'malik',
    title: 'Mamute e Mosassauro no Fundo do Mar',
    emoji: '🦣',
    description: 'No fundo do mar o mosassauro está comendo os peixes, o mamute foi passear de submarino e a ilha ali na verdade é um monstro!',
    category: 'Fundo do Mar 🐢',
    image: img('malik', 'mamute-e-mosasauro-no-fundo-do-mar.jpg'),
    createdAt: '2026-09-25',
    likes: 0,
  },
  {
    id: 'mlk-007',
    slug: 'a-luta-do-macaco-e-godzilla',
    artistId: 'malik',
    title: 'A Luta do Macaco e Godzilla',
    emoji: '🦍',
    description: 'Meu macaco gigante é mais forte que o Godzilla, olha o chute que ele deu pra salvar todo mundo!',
    category: 'Fantasia 🐉',
    image: img('malik', 'a-luta-do-macaco-e-godzilla.jpg'),
    createdAt: '2026-09-25',
    likes: 0,
  },
  {
    id: 'mlk-006',
    slug: 'o-tigre-extinto-e-o-monstro',
    artistId: 'malik',
    title: 'O Tigre Extinto e o Monstro',
    emoji: '🐯',
    description: 'Esse tigre extinto tem dentões de sabre e é tão bravo que até monstro foge de medo dele!',
    category: 'Dinossauros 🦕',
    image: img('malik', 'o-tigre-extinto-e-o-monstro.jpg'),
    createdAt: '2026-09-25',
    likes: 0,
  },
  {
    id: 'mrm-005',
    slug: 'garosa',
    artistId: 'maryam',
    title: 'Garosa',
    emoji: '🐱',
    description: 'Esse é o Garosa, meu gato rosa! Ele adora ficar no sol caçando borboletas e cercado de corações!',
    category: 'Animais 🐱',
    image: img('maryam', 'garosa.jpg'),
    createdAt: '2026-09-25',
    likes: 0,
  },
  {
    id: 'mlk-005',
    slug: 'mundo-dos-gatos',
    artistId: 'malik',
    title: 'Mundo dos Gatos',
    emoji: '😺',
    description: 'No meu mundo dos gatos tem muitos gatinhos fofinhos, corações, uma borboleta e abelhinhas voando!',
    category: 'Animais 🐱',
    image: img('malik', 'mundo-dos-gatos.jpg'),
    createdAt: '2026-09-25',
    likes: 0,
  },
]
export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug)
}

export function artworksByArtist(artistId: string): Artwork[] {
  return artworks
    .filter((a) => a.artistId === artistId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

/** Formata a data por extenso em pt-BR: "20 de setembro de 2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(y, m - 1, d))
}
