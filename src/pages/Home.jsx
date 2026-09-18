import { Link } from 'react-router-dom'
import './Home.css'

function Home() {

  return (
    <div
      className="home"
      id="inicio"
    >

      <header className="home-header">

        <div className="logo">
          Trade<span>Flow</span>
        </div>

        <nav>

          <a href="#inicio">
            Início
          </a>

          <a href="#mercado">
            Mercado
          </a>

          <a href="#ativos">
            Ativos
          </a>

          <a href="#sobre">
            Sobre
          </a>

        </nav>

        <Link
          to="/login"
          className="login-button"
        >
          Entrar
        </Link>

      </header>


      <main>

        {/* INÍCIO */}

        <section className="hero">

          <div className="hero-content">

            <h1>
              Invista de forma simples,
              rápida e segura.
            </h1>

            <p>
              Acompanhe o mercado, negocie ativos
              e acompanhe sua carteira em um só lugar.
            </p>

            <Link
              to="/login"
              className="start-button"
            >
              Acessar plataforma
            </Link>

          </div>

        </section>


        {/* INVESTIMENTOS */}

        <section
          className="investment-section"
          id="investimentos"
        >

          <div className="investment-content">

            <div className="investment-text">

              <span>
                INVESTIMENTOS
              </span>

              <h2>
                Começar a investir pode fazer diferença no futuro.
              </h2>



              <p>
                O tempo é um dos fatores importantes para quem deseja
                construir patrimônio por meio dos investimentos.
              </p>


            </div>

            <div className="investment-chart">

  <svg
    viewBox="0 0 700 330"
    className="investment-graph"
    preserveAspectRatio="none"
  >

    {/* Linhas horizontais */}

    <line x1="55" y1="50" x2="680" y2="50" />
    <line x1="55" y1="110" x2="680" y2="110" />
    <line x1="55" y1="170" x2="680" y2="170" />
    <line x1="55" y1="230" x2="680" y2="230" />
    <line x1="55" y1="290" x2="680" y2="290" />


    {/* Números */}

    <text x="5" y="54">200k</text>
    <text x="5" y="114">150k</text>
    <text x="5" y="174">100k</text>
    <text x="5" y="234">50k</text>
    <text x="20" y="294">0</text>


    {/* Área do gráfico */}

    <polygon
      points="
        55,270
        95,245
        135,258
        175,220
        215,230
        255,185
        295,198
        335,155
        375,175
        415,130
        455,145
        495,105
        535,120
        575,82
        615,95
        650,65
        680,45
        680,290
        55,290
      "
      fill="rgba(0, 230, 118, 0.06)"
    />


    {/* Linha principal */}

    <polyline
      points="
        55,270
        95,245
        135,258
        175,220
        215,230
        255,185
        295,198
        335,155
        375,175
        415,130
        455,145
        495,105
        535,120
        575,82
        615,95
        650,65
        680,45
      "
      fill="none"
      stroke="#00e676"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />


    {/* Pontos */}

    <circle cx="255" cy="185" r="4" />
    <circle cx="415" cy="130" r="4" />
    <circle cx="680" cy="45" r="5" />


    {/* Datas */}

    <text x="50" y="320">2017</text>
    <text x="205" y="320">2019</text>
    <text x="360" y="320">2021</text>
    <text x="515" y="320">2023</text>
    <text x="645" y="320">2025</text>

  </svg>

</div>

          </div>

        </section>


        {/* MERCADO */}

<section className="market-section" id="mercado">

  <h2>Mercado</h2>

  <p>
    Acompanhe alguns dos principais indicadores
    dos mercados financeiros.
  </p>

  <div className="market-cards">

    <div className="market-card">
      <span>IBOVESPA</span>
      <strong>185.500 pts</strong>
      <small>Bolsa brasileira</small>
    </div>

    <div className="market-card">
      <span>IFIX</span>
      <strong>3.900 pts</strong>
      <small>Fundos imobiliários</small>
    </div>

    <div className="market-card">
      <span>DÓLAR</span>
      <strong>R$ 5,14</strong>
      <small>USD / BRL</small>
    </div>

    <div className="market-card">
      <span>S&amp;P 500</span>
      <strong>6.600 pts</strong>
      <small>Mercado americano</small>
    </div>

  </div>

</section>

       {/* ATIVOS */}

<section className="home-section" id="ativos">

  <h2>Ativos disponíveis</h2>

  <p>
    Confira alguns dos principais ativos disponíveis
    no mercado brasileiro.
  </p>

  <div className="home-assets">

    <div>
      <strong>PETR4</strong>
      <span>Petrobras</span>
    </div>

    <div>
      <strong>VALE3</strong>
      <span>Vale</span>
    </div>

    <div>
      <strong>ITUB4</strong>
      <span>Itaú Unibanco</span>
    </div>

    <div>
      <strong>BBAS3</strong>
      <span>Banco do Brasil</span>
    </div>

  </div>

</section>

        {/* SOBRE */}

        <section
          className="home-section"
          id="sobre"
        >

          <h2>
            Sobre o TradeFlow
          </h2>

          <p>
            O TradeFlow é uma plataforma de negociação
            desenvolvida para proporcionar uma experiência
            simples e intuitiva para acompanhar ativos,
            realizar operações e gerenciar uma carteira
            de investimentos.
          </p>

        </section>

      </main>

    </div>
  )
}

export default Home