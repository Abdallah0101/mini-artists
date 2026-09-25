import { Link } from 'react-router-dom'
import { artists } from '../data/artists'
import { DoodlePalette, DoodleStar, DoodleHeart } from './Doodles'

export default function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <DoodlePalette size={36} />
              <span className="navbar-brand">MARMA<em>LILYTAS</em></span>
            </div>
            <p className="footer-tagline">
              Uma pequena galeria digital da imaginação das crianças.
              <br />
              Cada desenho é uma obra de arte. 🎨
            </p>
          </div>

          <nav aria-label="Mapa do site">
            <h3 className="footer-heading">Passeie pela galeria</h3>
            <ul className="footer-links">
              <li><Link to="/">🏠 Início</Link></li>
              <li><Link to="/galeria">🖼️ Galeria</Link></li>
              <li><a href={`${import.meta.env.BASE_URL}#artistas`}>👧 Artistas</a></li>
              <li><a href={`${import.meta.env.BASE_URL}#sobre`}>⭐ Sobre</a></li>
            </ul>
          </nav>

          <div>
            <h3 className="footer-heading">Nossos artistas</h3>
            <ul className="footer-links">
              {artists.map((a) => (
                <li key={a.id}>
                  <Link to={`/artistas/${a.id}`}>
                    {a.emoji} {a.name}, {a.age} anos
                  </Link>
                </li>
              ))}
              <li className="footer-soon">💫 Em breve: novos artistas!</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            Feito com <DoodleHeart size={14} color="#FF5C8A" /> para guardar a infância para sempre
          </span>
          <span className="footer-stars" aria-hidden="true">
            <DoodleStar size={16} /> {new Date().getFullYear()} · v2.0 💫 <DoodleStar size={16} />
          </span>
        </div>
      </div>
    </footer>
  )
}
