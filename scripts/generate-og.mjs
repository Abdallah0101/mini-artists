/**
 * Gera public/og-image.png (1200x630) — imagem de compartilhamento do site.
 * Uso: node scripts/generate-og.mjs
 */
import sharp from 'sharp'

const W = 1200
const H = 630

const stars = Array.from({ length: 60 }, (_, i) => {
  const x = (i * 197 + 53) % W
  const y = (i * 131 + 29) % H
  const r = 1.5 + ((i * 7) % 4)
  const color = i % 5 === 0 ? '#FFD45A' : i % 7 === 0 ? '#FF8FB0' : '#FFFFFF'
  const opacity = 0.35 + ((i * 13) % 60) / 100
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}"/>`
}).join('')

const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#100B35"/>
      <stop offset="0.5" stop-color="#25105B"/>
      <stop offset="1" stop-color="#4B237C"/>
    </linearGradient>
    <linearGradient id="word" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FFD45A"/>
      <stop offset="0.5" stop-color="#FF5C8A"/>
      <stop offset="1" stop-color="#9B6BEA"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  ${stars}
  <path d="M1010 120 a90 90 0 1 1 -64 -150 a72 72 0 1 0 64 150z" fill="#FFE9A8" opacity="0.95"/>
  <g fill="none" stroke-linecap="round" stroke-width="14" opacity="0.9">
    <path d="M80 560 a120 120 0 0 1 240 0" stroke="#FF5C8A"/>
    <path d="M98 560 a102 102 0 0 1 204 0" stroke="#FF9D42"/>
    <path d="M116 560 a84 84 0 0 1 168 0" stroke="#FFD45A"/>
    <path d="M134 560 a66 66 0 0 1 132 0" stroke="#71D6A2"/>
    <path d="M152 560 a48 48 0 0 1 96 0" stroke="#55B8F7"/>
  </g>
  <text x="600" y="255" text-anchor="middle" font-family="Comic Sans MS, sans-serif"
    font-size="100" font-weight="700" fill="#FFFFFF">Mini <tspan fill="url(#word)">Artists</tspan></text>
  <text x="600" y="330" text-anchor="middle" font-family="Comic Sans MS, sans-serif"
    font-size="40" font-weight="700" fill="#D9CFF2">Galeria de Arte de Malik &amp; Mnaryam</text>
  <text x="600" y="392" text-anchor="middle" font-family="Comic Sans MS, sans-serif"
    font-size="30" font-weight="600" fill="#9B6BEA">Arte feita com imaginação, amor e muitas cores</text>
</svg>`

async function circleAvatar(path, size, ring) {
  const img = await sharp(path)
    .resize(size, size, { fit: 'cover', position: 'attention' })
    .png()
    .toBuffer()
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  )
  const clipped = await sharp(img)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer()
  const ringSvg = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 7}" fill="none" stroke="${ring}" stroke-width="14"/></svg>`,
  )
  return sharp(clipped).composite([{ input: ringSvg }]).png().toBuffer()
}

const [malik, mnaryam] = await Promise.all([
  circleAvatar('public/avatars/malik.jpg', 190, '#55B8F7'),
  circleAvatar('public/avatars/mnaryam.jpg', 190, '#FF5C8A'),
])

await sharp(Buffer.from(bg))
  .composite([
    { input: malik, left: 60, top: 215 },
    { input: mnaryam, left: 950, top: 215 },
  ])
  .png()
  .toFile('public/og-image.png')

console.log('✔ public/og-image.png gerado')
