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
    id: 'mlk-004',
    slug: 'a-nave-espacial',
    artistId: 'malik',
    title: 'A Nave Espacial',
    emoji: '🚀',
    description: 'Minha nave vai para o planeta das estrelas coloridas!',
    category: 'Espaço 🚀',
    image: img('malik', 'a-nave-espacial.svg'),
    createdAt: '2026-09-20',
    likes: 12,
  },
  {
    id: 'mrm-004',
    slug: 'fundo-do-mar-magico',
    artistId: 'maryam',
    title: 'Fundo do Mar Mágico',
    emoji: '🐢',
    description: 'As tartarugas estão nadando entre os corais e peixinhos brilhantes.',
    category: 'Fundo do Mar 🐢',
    image: img('maryam', 'fundo-do-mar-magico.svg'),
    createdAt: '2026-09-18',
    likes: 18,
  },
  {
    id: 'mlk-003',
    slug: 'o-dragao-azul',
    artistId: 'malik',
    title: 'O Dragão Azul',
    emoji: '🐉',
    description: 'Um dragão azul voando sobre uma montanha cheia de estrelas.',
    category: 'Fantasia 🐉',
    image: img('malik', 'o-dragao-azul.svg'),
    createdAt: '2026-09-14',
    likes: 15,
  },
  {
    id: 'mrm-003',
    slug: 'por-do-sol-dos-sonhos',
    artistId: 'maryam',
    title: 'Pôr do Sol dos Sonhos',
    emoji: '🌅',
    description: 'O céu fica laranja, rosa e roxo no final do dia. Muito lindo!',
    category: 'Paisagem 🌅',
    image: img('maryam', 'por-do-sol-dos-sonhos.svg'),
    createdAt: '2026-09-10',
    likes: 15,
  },
  {
    id: 'mlk-002',
    slug: 'castelo-encantado',
    artistId: 'malik',
    title: 'Castelo Encantado',
    emoji: '🏰',
    description: 'Meu castelo tem um arco-íris e um dragão que é meu amigo!',
    category: 'Fantasia 🐉',
    image: img('malik', 'castelo-encantado.svg'),
    createdAt: '2026-09-08',
    likes: 9,
  },
  {
    id: 'mrm-002',
    slug: 'a-gata-lunar',
    artistId: 'maryam',
    title: 'A Gata Lunar',
    emoji: '🐱',
    description: 'Ela mora na lua e só desce quando tem estrela cadente.',
    category: 'Animais 🐱',
    image: img('maryam', 'a-gata-lunar.svg'),
    createdAt: '2026-09-02',
    likes: 21,
  },
  {
    id: 'mlk-001',
    slug: 'dinossauro-astronauta',
    artistId: 'malik',
    title: 'Dinossauro Astronauta',
    emoji: '🦕',
    description: 'Ele foi visitar a lua e virou amigo dos alienígenas.',
    category: 'Dinossauros 🦕',
    image: img('malik', 'dinossauro-astronauta.svg'),
    createdAt: '2026-08-30',
    likes: 11,
  },
  {
    id: 'mrm-001',
    slug: 'jardim-de-estrelas',
    artistId: 'maryam',
    title: 'Jardim de Estrelas',
    emoji: '🌸',
    description: 'Um jardim onde as flores brilham de noite como estrelinhas.',
    category: 'Natureza 🌸',
    image: img('maryam', 'jardim-de-estrelas.svg'),
    createdAt: '2026-08-25',
    likes: 14,
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
