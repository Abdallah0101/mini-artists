/**
 * Tira screenshots do site em desktop, tablet e celular.
 * Uso: node scripts/screenshots.mjs  (requer `vite preview` rodando na 4173)
 */
import { chromium } from 'playwright'

const BASE = 'http://localhost:4173'
const shots = [
  { name: 'desktop-home', url: '/', width: 1440, height: 900, full: true },
  { name: 'desktop-obra', url: '/arte/a-nave-espacial', width: 1440, height: 900, full: true },
  { name: 'desktop-artista', url: '/artistas/maryam', width: 1440, height: 900, full: true },
  { name: 'tablet-home', url: '/', width: 834, height: 1112, full: true },
  { name: 'tablet-obra', url: '/arte/fundo-do-mar-magico', width: 834, height: 1112, full: true },
  { name: 'mobile-home', url: '/', width: 390, height: 844, full: true },
  { name: 'mobile-galeria', url: '/galeria', width: 390, height: 844, full: true },
  { name: 'mobile-artista', url: '/artistas/malik', width: 390, height: 844, full: true },
]

const browser = await chromium.launch()
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.width, height: s.height } })
  await page.goto(BASE + s.url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  await page.screenshot({ path: `shots/${s.name}.png`, fullPage: s.full })
  console.log('✔', s.name)
  await page.close()
}
await browser.close()
