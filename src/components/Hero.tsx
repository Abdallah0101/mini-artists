import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { artists } from '../data/artists'
import {
  DoodleStar,
  DoodleSparkle,
  DoodleMoon,
  DoodleHeart,
  DoodleRainbow,
  DoodlePencil,
  DoodleCrayon,
  DoodleSquiggle,
  DoodleCloud,
} from './Doodles'

/** Gera estrelas espalhadas de forma estável (sem piscar a cada render) */
function useStars(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 37.7 + 13) % 100,
        top: (i * 23.3 + 7) % 75,
        size: 2 + ((i * 7) % 4),
        delay: (i % 7) * 0.7,
        duration: 2.5 + (i % 5) * 0.8,
      })),
    [count],
  )
}

export default function Hero() {
  const stars = useStars(46)
  const [malik, maryam] = artists

  return (
    <section className="hero" aria-label="Boas-vindas à galeria">
      {/* céu estrelado */}
      <div className="hero-sky" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
        <span className="shooting-star" />
        <span className="shooting-star s2" />
      </div>

      {/* elementos decorativos flutuantes */}
      <div className="hero-decor">
        <DoodleMoon size={86} className="hero-moon float-slow" tip="Boa noite, artistas! 🌙" />
        <DoodleCloud size={110} className="hero-cloud c1 drift" color="#EAE2FB" tip="☁️ Sonhando alto..." />
        <DoodleCloud size={80} className="hero-cloud c2 drift-rev" color="#DDD3F5" />
        <DoodleRainbow size={90} className="hero-rainbow float-med" tip="🌈 Persiga seus arco-íris!" />
        <DoodleHeart size={30} className="hero-heart h1 float-med" tip="💜 Feito com amor" />
        <DoodleHeart size={22} className="hero-heart h2 float-slow" color="#9B6BEA" />
        <DoodlePencil size={46} className="hero-pencil float-med" tip="✏️ Toda grande arte começa com um pequeno traço." />
        <DoodleCrayon size={42} className="hero-crayon float-slow" tip="🖍️ Cor favorita: todas!" />
        <DoodleSparkle size={26} className="hero-sparkle s1 twinkle-soft" tip="✨ Continue imaginando!" />
        <DoodleSparkle size={20} className="hero-sparkle s2 twinkle-soft" color="#FF8FB0" tip="✨ Você é uma estrela!" />
        <DoodleStar size={30} className="hero-star-big twinkle-soft" tip="⭐ Brilhe, pequeno artista!" />
      </div>

      <div className="hero-content container">
        <div className="hero-text">
          <p className="hero-kicker">
            <DoodleSquiggle size={64} color="#FFD45A" /> Galeria de arte da família
          </p>
          <h1 className="hero-title">
            Arte feita com <span className="hl hl-pink">imaginação</span>,
            <br />
            amor e <span className="hl hl-rainbow">muitas cores</span>
          </h1>
          <p className="hero-subtitle">
            Bem-vindo à galeria de {malik.name} e {maryam.name}!
            <br />
            Aqui cada desenho conta uma história única saída direto do coração. 💜
          </p>
          <div className="hero-buttons">
            <Link to="/galeria" className="btn btn-pink">
              🎨 Ver Galeria
            </Link>
            <a href={`${import.meta.env.BASE_URL}#artistas`} className="btn btn-purple">
              👨‍🎨 Conheça os Artistas
            </a>
          </div>
        </div>

        {/* quadro dos artistas desenhando */}
        <div className="hero-artists">
          <figure className="hero-picture">
            <span className="hero-tape tl" aria-hidden="true" />
            <span className="hero-tape tr" aria-hidden="true" />
            <img
              src={`${import.meta.env.BASE_URL}images/hero.jpg`}
              alt={`Ilustração de ${malik.name} e ${maryam.name} desenhando juntos num ateliê cheio de estrelas`}
            />
            <figcaption>
              {malik.name} &amp; {maryam.name} criando magia ✨
            </figcaption>

            {/* mini-avatares reais pendurados no quadro */}
            <div className="hero-minis">
              {artists.map((a, i) => (
                <Link
                  to={`/artistas/${a.id}`}
                  key={a.id}
                  className={`hero-mini ${i === 0 ? 'm1' : 'm2'}`}
                  style={{ borderColor: a.color }}
                  aria-label={`Ver página de ${a.name}`}
                  title={`${a.emoji} Conheça ${a.name}!`}
                >
                  <img src={a.avatar} alt="" aria-hidden="true" />
                  <span className="hero-mini-chip" style={{ background: a.color }}>
                    {a.name}, {a.age}
                  </span>
                </Link>
              ))}
            </div>
          </figure>
          <DoodleSparkle size={30} className="picture-sparkle twinkle-soft" tip="✨ Obra-prima em andamento!" />
        </div>
      </div>

      {/* transição de nuvens para o "papel" */}
      <div className="hero-clouds" aria-hidden="true">
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none">
          <path
            d="M0,70 C60,40 100,65 160,55 C220,45 240,20 320,30 C400,40 420,70 520,60 C620,50 640,15 740,25 C840,35 860,65 960,58 C1060,51 1080,22 1180,30 C1280,38 1300,62 1380,55 C1410,52 1430,55 1440,58 L1440,110 L0,110 Z"
            fill="#FCFBFF"
          />
          <circle cx="180" cy="52" r="26" fill="#FCFBFF" />
          <circle cx="700" cy="28" r="30" fill="#FCFBFF" />
          <circle cx="1150" cy="34" r="24" fill="#FCFBFF" />
        </svg>
      </div>
    </section>
  )
}
