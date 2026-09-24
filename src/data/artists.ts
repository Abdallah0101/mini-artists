/**
 * ARTISTAS DA GALERIA
 * -------------------
 * Para adicionar um novo artista (ex.: Ilyaas, Tasnim), basta:
 *   1. Adicionar o avatar em  public/avatars/<id>.jpg
 *   2. Adicionar um objeto neste array
 *   3. Criar a pasta  public/artworks/<id>/  para os desenhos dele(a)
 *
 * Os filtros da galeria, as páginas /artistas/<id> e todas as cores
 * são gerados automaticamente a partir desta lista.
 */

export interface Artist {
  /** identificador único usado nas URLs: /artistas/<id> */
  id: string
  name: string
  age: number
  /** caminho do avatar dentro de public/ (sem a base URL) */
  avatar: string
  /** cor principal do artista (badges, cards, destaques) */
  color: string
  /** versão bem suave da cor, usada como fundo de card */
  colorSoft: string
  /** emoji símbolo do artista */
  emoji: string
  /** frase curta que aparece no card */
  tagline: string
  /** descrição que aparece na página do artista */
  description: string
}

const base = import.meta.env.BASE_URL

export const artists: Artist[] = [
  {
    id: 'malik',
    name: 'Malik',
    age: 5,
    avatar: `${base}avatars/malik.jpg`,
    color: '#55B8F7',
    colorSoft: '#EAF6FF',
    emoji: '🚀',
    tagline: 'Pequeno explorador de mundos coloridos',
    description:
      'Malik adora desenhar e transformar sua imaginação em cores. Naves espaciais, dragões e dinossauros ganham vida no seu papel!',
  },
  {
    id: 'maryam',
    name: 'Maryam',
    age: 10,
    avatar: `${base}avatars/maryam.jpg`,
    color: '#FF5C8A',
    colorSoft: '#FFF0F5',
    emoji: '🌸',
    tagline: 'Sonhadora oficial da galáxia das cores',
    description:
      'Maryam desenha o mundo como ela gostaria que ele fosse: cheio de flores, pores do sol e magia. Cada traço dela conta uma história.',
  },
]

export function getArtist(id: string): Artist | undefined {
  return artists.find((a) => a.id === id)
}
