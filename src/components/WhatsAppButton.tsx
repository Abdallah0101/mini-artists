/** Botão de compartilhamento no WhatsApp — a família adora mandar arte por lá! */

export function whatsappShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 7.6c-.4 0-1 .5-1 1.6 0 2 1.6 4.3 3.6 5.8 1.5 1.1 2.6 1.5 3.3 1.4.8 0 1.5-.7 1.6-1.3.1-.5-.1-.8-.5-1l-1.6-.8c-.4-.2-.7-.1-1 .2l-.5.6c-.2.2-.5.3-.8.1-1-.5-2.3-1.7-2.8-2.7-.1-.3-.1-.6.1-.8l.6-.6c.2-.3.3-.6.1-1l-.8-1.6c-.2-.4-.5-.7-.9-.7z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function WhatsAppButton({
  text,
  label = 'WhatsApp',
  small,
  className,
}: {
  text: string
  label?: string
  small?: boolean
  className?: string
}) {
  return (
    <a
      href={whatsappShareUrl(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-whats ${small ? 'btn-small' : ''} ${className ?? ''}`}
      aria-label={`Compartilhar no WhatsApp: ${label}`}
      onClick={(e) => e.stopPropagation()}
    >
      <WhatsAppIcon size={small ? 16 : 20} /> {label}
    </a>
  )
}
