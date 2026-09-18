import './Carteira.css'
import { Link } from 'react-router-dom'
import { useTrade } from '../context/TradeContext'
import PlatformNav from '../components/PlatformNav'

function Carteira() {

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

  const ativosNaCarteira = Object.entries(carteira)

  const valorInvestido = ativosNaCarteira.reduce(
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
    <div className="portfolio-page">

      {/* CABEÇALHO */}

      <header className="portfolio-header">

        <div className="portfolio-brand">

          <h1>
            Trade<span>Flow</span>
          </h1>

        </div>

        <PlatformNav />

      </header>

      <main className="portfolio-content">

        {/* INTRODUÇÃO */}

        <section className="portfolio-intro">

          <span>CARTEIRA</span>

          <h2>
            Meus investimentos
          </h2>

          <p>
            Acompanhe seus ativos, quantidades e valores investidos.
          </p>

        </section>

        {/* RESUMO */}

        <section className="portfolio-summary">

          <div className="summary-card">

            <span>
              Saldo disponível
            </span>

            <strong>
              R$ {saldo.toFixed(2).replace('.', ',')}
            </strong>

          </div>

          <div className="summary-card">

            <span>
              Valor investido
            </span>

            <strong>
              R$ {valorInvestido
                .toFixed(2)
                .replace('.', ',')}
            </strong>

          </div>

          <div className="summary-card">

            <span>
              Patrimônio total
            </span>

            <strong>
              R$ {patrimonioTotal
                .toFixed(2)
                .replace('.', ',')}
            </strong>

          </div>

        </section>

        {/* ATIVOS */}

        <section className="portfolio-section">

          <div className="portfolio-section-title">

            <h2>
              Meus ativos
            </h2>

            <p>
              Ativos atualmente presentes na sua carteira.
            </p>

          </div>

          {ativosNaCarteira.length === 0 ? (

            <div className="empty-portfolio-page">

              <h3>
                Sua carteira está vazia
              </h3>

              <p>
                Você ainda não possui nenhum ativo.
              </p>

              <Link
                to="/trading"
                className="start-trading-button"
              >
                Começar a negociar
              </Link>

            </div>

          ) : (

            <div className="portfolio-table">

              <div className="portfolio-table-header">

                <span>
                  Ativo
                </span>

                <span>
                  Empresa
                </span>

                <span>
                  Quantidade
                </span>

                <span>
                  Preço atual
                </span>

                <span>
                  Variação
                </span>

                <span>
                  Valor total
                </span>

              </div>

              {ativosNaCarteira.map(
                ([codigo, quantidade]) => {

                  const ativo = ativos[codigo]

                  if (!ativo) {
                    return null
                  }

                  const valorTotal =
                    quantidade * ativo.preco

                  return (
                    <div
                      className="portfolio-table-row"
                      key={codigo}
                    >

                      <strong>
                        {codigo}
                      </strong>

                      <span>
                        {ativo.empresa}
                      </span>

                      <span>
                        {quantidade}
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

                      <strong>
                        R$ {valorTotal
                          .toFixed(2)
                          .replace('.', ',')}
                      </strong>

                    </div>
                  )
                }
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  )
}

export default Carteira