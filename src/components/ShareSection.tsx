import { useState } from 'react'
import { DoodleSparkle, DoodleHeart, DoodleStar } from './Doodles'

export function useCopyLink() {
  const [copied, setCopied] = useState(false)

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // fallback para navegadores sem clipboard API
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return { copied, copy }
}

export function siteUrl(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${import.meta.env.BASE_URL}`
  }
  return 'https://abdallah0101.github.io/mini-artists/'
}

export default function ShareSection() {
  const { copied, copy } = useCopyLink()
  const url = siteUrl().replace(/\/$/, '')

  return (
    <section className="share-section" aria-label="Compartilhe a galeria">
      <div className="container share-box">
        <DoodleSparkle size={34} className="share-decor sd1 twinkle-soft" />
        <DoodleHeart size={30} className="share-decor sd2 float-med" />
        <DoodleStar size={28} className="share-decor sd3 twinkle-soft" />

        <div className="share-text">
          <h2 className="share-title">✈️ Compartilhe a arte!</h2>
          <p>Envie o link da nossa galeria para amigos e familiares!</p>
        </div>

        <div className="share-link-box">
          <span className="share-url" title={url}>
            {url.replace(/^https?:\/\//, '')}
          </span>
          <button type="button" className="btn btn-copy" onClick={() => copy(url)} aria-live="polite">
            {copied ? 'Link copiado! ✨' : '📋 Copiar link'}
          </button>
        </div>

        <p className="share-note">
          💜 Cada visita e carinho incentiva os pequenos artistas a criar mais e mais!
        </p>
      </div>
    </section>
  )
}
