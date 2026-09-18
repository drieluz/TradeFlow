import './Dashboard.css'
import PlatformNav from '../components/PlatformNav'
import { useTrade } from '../context/TradeContext'

function Dashboard() {

  const { saldo, carteira } = useTrade()

  const ativos = {
    PETR4: {
      nome: 'PETR4',
      empresa: 'Petrobras',
      preco: 38.42,
      variacao: '+1,25%'
    },

    VALE3: {
      nome: 'VALE3',
      empresa: 'Vale',
      preco: 62.18,
      variacao: '+0,84%'
    },

    ITUB4: {
      nome: 'ITUB4',
      empresa: 'Itaú Unibanco',
      preco: 36.75,
      variacao: '+0,52%'
    },

    BBAS3: {
      nome: 'BBAS3',
      empresa: 'Banco do Brasil',
      preco: 28.90,
      variacao: '-0,31%'
    }
  }

  const valorInvestido = Object.entries(carteira).reduce(
    (total, [codigo, quantidade]) => {

      const ativo = ativos[codigo]

      if (!ativo) {
        return total
      }

      return total + quantidade * ativo.preco
    },
    0
  )

  const patrimonioTotal = saldo + valorInvestido

  return (
    <div className="dashboard">

      {/* CABEÇALHO */}

      <header className="dashboard-header">

        <div className="dashboard-brand">
          <h1>
            Trade<span>Flow</span>
          </h1>
        </div>

        <PlatformNav />

      </header>

      <main className="dashboard-content">

        {/* TÍTULO */}

        <section className="dashboard-intro">

          <span>VISÃO GERAL</span>

          <h2>
            Sua carteira
          </h2>

          <p>
            Acompanhe seu saldo, patrimônio e os principais ativos do mercado.
          </p>

        </section>

        {/* RESUMO DA CONTA */}

        <section className="summary">

          <div className="summary-card">

            <span>Saldo disponível</span>

            <strong>
              R$ {saldo.toFixed(2).replace('.', ',')}
            </strong>

          </div>

          <div className="summary-card">

            <span>Patrimônio total</span>

            <strong>
              R$ {patrimonioTotal.toFixed(2).replace('.', ',')}
            </strong>

          </div>

          <div className="summary-card">

            <span>Valor investido</span>

            <strong>
              R$ {valorInvestido.toFixed(2).replace('.', ',')}
            </strong>

          </div>

        </section>

        {/* MERCADOS */}

        <section className="assets">

          <div className="assets-title">

            <div>
              <h2>Mercados disponíveis</h2>

              <p>
                Confira os principais ativos disponíveis para negociação.
              </p>
            </div>

          </div>

          <div className="assets-table">

            <div className="assets-header">

              <span>Ativo</span>
              <span>Empresa</span>
              <span>Preço</span>
              <span>Variação</span>

            </div>

            {Object.entries(ativos).map(
              ([codigo, ativo]) => (

                <div
                  className="asset-row"
                  key={codigo}
                >

                  <div className="asset-name">

                    <strong>
                      {codigo}
                    </strong>

                  </div>

                  <span>
                    {ativo.empresa}
                  </span>

                  <span>
                    R$ {ativo.preco
                      .toFixed(2)
                      .replace('.', ',')}
                  </span>

                  <span
                    className={
                      ativo.variacao.startsWith('-')
                        ? 'negative'
                        : 'positive'
                    }
                  >
                    {ativo.variacao}
                  </span>

                </div>

              )
            )}

          </div>

        </section>

      </main>

    </div>
  )
}

export default Dashboard