import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { DoodlePalette, DoodleHeart } from './Doodles'

const links = [
  { to: '/', label: 'Início', emoji: '🏠', end: true },
  { to: '/galeria', label: 'Galeria', emoji: '🖼️', end: false },
  { to: '/#artistas', label: 'Artistas', emoji: '👧', end: false, hash: true },
  { to: '/#sobre', label: 'Sobre', emoji: '⭐', end: false, hash: true },
  { to: '/#contato', label: 'Contato', emoji: '✉️', end: false, hash: true },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Fecha o menu mobile ao navegar
  useEffect(() => setOpen(false), [location])

  return (
    <header className="navbar">
      <nav className="navbar-inner" aria-label="Navegação principal">
        <Link to="/" className="navbar-logo" aria-label="MARMALILYTAS — página inicial">
          <DoodlePalette size={40} />
          <span className="navbar-logo-text">
            <span className="navbar-brand">MARMA<em>LILYTAS</em></span>
            <small>Galeria dos pequenos grandes artistas</small>
          </span>
        </Link>

        <button
          className="navbar-toggle"
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <ul id="menu-principal" className={`navbar-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.label}>
              {l.hash ? (
                <a href={`${import.meta.env.BASE_URL}${l.to.slice(1)}`} className="navbar-link">
                  <span aria-hidden="true">{l.emoji}</span> {l.label}
                </a>
              ) : (
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                >
                  <span aria-hidden="true">{l.emoji}</span> {l.label}
                </NavLink>
              )}
            </li>
          ))}
          <li>
            <span className="navbar-support" title="Em breve: formas de apoiar os artistas! 💜">
              <DoodleHeart size={18} /> Apoie nossos artistas
            </span>
          </li>
        </ul>
      </nav>
    </header>
  )
}
