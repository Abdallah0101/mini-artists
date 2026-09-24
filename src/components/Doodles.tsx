/**
 * Doodles — elementos decorativos SVG com cara de desenho infantil.
 * Traços levemente irregulares, cantos arredondados, cores da paleta.
 * O atributo `tip` vira tooltip (title) — são os "detalhes escondidos" do site.
 */

interface DoodleProps {
  size?: number
  color?: string
  className?: string
  tip?: string
}

function Svg({
  size = 48,
  className,
  tip,
  viewBox = '0 0 64 64',
  children,
}: DoodleProps & { viewBox?: string; children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      className={className}
      aria-hidden={tip ? undefined : true}
      role={tip ? 'img' : undefined}
    >
      {tip && <title>{tip}</title>}
      {children}
    </svg>
  )
}

export const DoodleStar = (p: DoodleProps) => (
  <Svg {...p}>
    <path
      d="M32 8 L38.5 24 L55 25.5 L42.5 36 L46 52 L32 43.5 L18 52 L21.5 36 L9 25.5 L25.5 24 Z"
      fill={p.color ?? '#FFD45A'}
      stroke="#100B35"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </Svg>
)

export const DoodleSparkle = (p: DoodleProps) => (
  <Svg {...p}>
    <path
      d="M32 6 Q35 24 54 32 Q35 40 32 58 Q29 40 10 32 Q29 24 32 6 Z"
      fill={p.color ?? '#FFD45A'}
      stroke="#100B35"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </Svg>
)

export const DoodleCloud = (p: DoodleProps) => (
  <Svg {...p}>
    <path
      d="M14 44 Q6 44 6 36 Q6 28 15 27 Q17 15 30 15 Q42 15 45 25 Q56 25 57 35 Q58 44 48 44 Z"
      fill={p.color ?? '#FFFFFF'}
      stroke="#100B35"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </Svg>
)

export const DoodleHeart = (p: DoodleProps) => (
  <Svg {...p}>
    <path
      d="M32 54 Q8 38 8 24 Q8 12 19 12 Q27 12 32 21 Q37 12 45 12 Q56 12 56 24 Q56 38 32 54 Z"
      fill={p.color ?? '#FF5C8A'}
      stroke="#100B35"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </Svg>
)

export const DoodleRainbow = (p: DoodleProps) => (
  <Svg {...p} viewBox="0 0 80 48">
    <g fill="none" strokeLinecap="round" strokeWidth="7">
      <path d="M8 44 A32 32 0 0 1 72 44" stroke="#FF5C8A" />
      <path d="M16 44 A24 24 0 0 1 64 44" stroke="#FF9D42" />
      <path d="M24 44 A16 16 0 0 1 56 44" stroke="#FFD45A" />
      <path d="M32 44 A8 8 0 0 1 48 44" stroke="#71D6A2" />
    </g>
  </Svg>
)

export const DoodleMoon = (p: DoodleProps) => (
  <Svg {...p}>
    <path
      d="M44 8 A26 26 0 1 0 44 56 A21 21 0 1 1 44 8 Z"
      fill={p.color ?? '#FFE9A8'}
      stroke="#100B35"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </Svg>
)

export const DoodlePencil = (p: DoodleProps) => (
  <Svg {...p} viewBox="0 0 64 64">
    <g transform="rotate(35 32 32)">
      <rect x="26" y="10" width="12" height="34" rx="3" fill={p.color ?? '#FF9D42'} stroke="#100B35" strokeWidth="3" />
      <path d="M26 44 L32 58 L38 44 Z" fill="#FFE9C7" stroke="#100B35" strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 52 L32 58 L34 52 Z" fill="#100B35" />
      <rect x="26" y="6" width="12" height="7" rx="3" fill="#FF5C8A" stroke="#100B35" strokeWidth="3" />
    </g>
  </Svg>
)

export const DoodleCrayon = (p: DoodleProps) => (
  <Svg {...p} viewBox="0 0 64 64">
    <g transform="rotate(-30 32 32)">
      <path d="M26 18 L32 6 L38 18 Z" fill={p.color ?? '#55B8F7'} stroke="#100B35" strokeWidth="3" strokeLinejoin="round" />
      <rect x="26" y="18" width="12" height="34" fill={p.color ?? '#55B8F7'} stroke="#100B35" strokeWidth="3" />
      <rect x="26" y="26" width="12" height="6" fill="#100B35" opacity=".25" />
      <rect x="26" y="52" width="12" height="6" rx="2" fill="#fff" stroke="#100B35" strokeWidth="3" />
    </g>
  </Svg>
)

export const DoodlePalette = (p: DoodleProps) => (
  <Svg {...p}>
    <path
      d="M32 8 A24 24 0 1 0 32 56 Q36 56 36 52 Q36 49 33.5 48 Q32 47.5 32 45.5 Q32 42.5 36 42.5 L42 42.5 Q56 42.5 56 31 Q56 14 32 8 Z"
      fill="#FFF6E8"
      stroke="#100B35"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <circle cx="21" cy="24" r="4.5" fill="#FF5C8A" />
    <circle cx="33" cy="18" r="4.5" fill="#FFD45A" />
    <circle cx="44" cy="26" r="4.5" fill="#55B8F7" />
    <circle cx="20" cy="37" r="4.5" fill="#71D6A2" />
  </Svg>
)

export const DoodleBrush = (p: DoodleProps) => (
  <Svg {...p}>
    <g transform="rotate(30 32 32)">
      <rect x="28" y="6" width="8" height="24" rx="4" fill="#C98A4B" stroke="#100B35" strokeWidth="3" />
      <rect x="26" y="28" width="12" height="8" rx="2" fill="#FFD45A" stroke="#100B35" strokeWidth="3" />
      <path d="M27 36 Q25 50 32 58 Q39 50 37 36 Z" fill={p.color ?? '#6D3FD3'} stroke="#100B35" strokeWidth="3" strokeLinejoin="round" />
    </g>
  </Svg>
)

/** Rabisco / espiral de lápis */
export const DoodleSquiggle = (p: DoodleProps) => (
  <Svg {...p} viewBox="0 0 80 24">
    <path
      d="M4 14 Q14 2 24 12 T44 12 T64 12 Q72 12 76 8"
      fill="none"
      stroke={p.color ?? '#9B6BEA'}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
)

/** Florzinha simples */
export const DoodleFlower = (p: DoodleProps) => (
  <Svg {...p}>
    <g fill={p.color ?? '#FF8FB0'} stroke="#100B35" strokeWidth="2.5">
      <circle cx="32" cy="16" r="9" />
      <circle cx="48" cy="28" r="9" />
      <circle cx="42" cy="46" r="9" />
      <circle cx="22" cy="46" r="9" />
      <circle cx="16" cy="28" r="9" />
    </g>
    <circle cx="32" cy="32" r="8" fill="#FFD45A" stroke="#100B35" strokeWidth="2.5" />
  </Svg>
)
