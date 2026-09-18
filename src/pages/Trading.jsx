import { useState } from 'react'
import './Trading.css'

import PlatformNav from '../components/PlatformNav'
import { useTrade } from '../context/TradeContext'

function Trading() {

  const {
    saldo,
    setSaldo,
    carteira,
    setCarteira,
    setOrdens,
    setExtrato,
    historicoAtivos,
    setHistoricoAtivos
  } = useTrade()

  const [ativo, setAtivo] = useState('PETR4')
  const [quantidade, setQuantidade] = useState('')
  const [mensagem, setMensagem] = useState('')


  // =========================
  // ATIVOS DISPONÍVEIS
  // =========================

  const ativos = {

    PETR4: {
      nome: 'PETR4',
      preco: 38.42,
      variacao: '+1,25%'
    },

    VALE3: {
      nome: 'VALE3',
      preco: 62.18,
      variacao: '+0,84%'
    },

    ITUB4: {
      nome: 'ITUB4',
      preco: 36.75,
      variacao: '+0,52%'
    },

    BBAS3: {
      nome: 'BBAS3',
      preco: 28.90,
      variacao: '-0,31%'
    }

  }


  const ativoSelecionado = ativos[ativo]


  // =========================
  // SELECIONAR ATIVO
  // =========================

  function selecionarAtivo(novoAtivo) {

    // Se clicar no mesmo ativo,
    // não adiciona novamente no histórico.

    if (novoAtivo === ativo) {
      return
    }

    setAtivo(novoAtivo)

    // Adiciona o ativo no final da pilha.
    // O último item representa o topo da pilha.

    setHistoricoAtivos(
      (historicoAtual) => [
        ...historicoAtual,
        novoAtivo
      ]
    )

    setMensagem('')
  }


  // =========================
  // VOLTAR NA ANÁLISE
  // =========================

  function voltarAnalise() {

    // Não permite remover
    // o primeiro ativo do histórico.

    if (historicoAtivos.length <= 1) {
      return
    }

    // Remove o último elemento.
    // Isso representa o POP da pilha LIFO.

    const novoHistorico =
      historicoAtivos.slice(0, -1)

    // O último elemento que restou
    // passa a ser o ativo atual.

    const ativoAnterior =
      novoHistorico[
        novoHistorico.length - 1
      ]

    setHistoricoAtivos(novoHistorico)

    setAtivo(ativoAnterior)

    setMensagem('')
  }


  // =========================
  // BUSCAR ATIVO
  // =========================

  function buscarAtivo(event) {

    event.preventDefault()

    const codigo =
      event.target.codigo.value
        .toUpperCase()
        .trim()


    if (ativos[codigo]) {

      selecionarAtivo(codigo)

    } else {

      setMensagem(
        'Ativo não encontrado.'
      )

    }
  }


  // =========================
  // REALIZAR ORDEM
  // =========================

  function realizarOrdem(tipo) {

    if (
      !quantidade ||
      Number(quantidade) <= 0
    ) {

      setMensagem(
        'Digite uma quantidade válida.'
      )

      return
    }


    const quantidadeNumerica =
      Number(quantidade)


    const total =
      quantidadeNumerica *
      ativoSelecionado.preco


    // =========================
    // COMPRA
    // =========================

    if (tipo === 'Compra') {

      if (total > saldo) {

        setMensagem(
          'Saldo insuficiente para realizar essa compra.'
        )

        return
      }


      const novoSaldo =
        saldo - total


      // Atualiza o saldo

      setSaldo(novoSaldo)


      // Atualiza a carteira

      setCarteira(
        (carteiraAtual) => {

          const quantidadeAtual =
            carteiraAtual[ativo] || 0


          return {

            ...carteiraAtual,

            [ativo]:
              quantidadeAtual +
              quantidadeNumerica

          }

        }
      )


      // Registra no extrato

      setExtrato(
        (extratoAtual) => [

          ...extratoAtual,

          {

            id: Date.now(),

            tipo: 'Compra',

            descricao:
              `${ativoSelecionado.nome} — ${quantidadeNumerica} unidade(s)`,

            valor: -total,

            saldo: novoSaldo,

            data:
              new Date().toISOString()

          }

        ]
      )


      setMensagem(
        `Compra realizada: ${quantidadeNumerica} unidade(s) de ${ativoSelecionado.nome} por R$ ${total
          .toFixed(2)
          .replace('.', ',')}.`
      )

    }


    // =========================
    // VENDA
    // =========================

    if (tipo === 'Venda') {

      const quantidadeAtual =
        carteira[ativo] || 0


      if (
        quantidadeNumerica >
        quantidadeAtual
      ) {

        setMensagem(
          'Você não possui essa quantidade de ativos para vender.'
        )

        return
      }


      const novoSaldo =
        saldo + total


      // Atualiza o saldo

      setSaldo(novoSaldo)


      // Atualiza a carteira

      setCarteira(
        (carteiraAtual) => {

          const novaQuantidade =
            quantidadeAtual -
            quantidadeNumerica


          const novaCarteira = {
            ...carteiraAtual
          }


          if (novaQuantidade === 0) {

            delete novaCarteira[ativo]

          } else {

            novaCarteira[ativo] =
              novaQuantidade

          }


          return novaCarteira

        }
      )


      // Registra no extrato

      setExtrato(
        (extratoAtual) => [

          ...extratoAtual,

          {

            id: Date.now(),

            tipo: 'Venda',

            descricao:
              `${ativoSelecionado.nome} — ${quantidadeNumerica} unidade(s)`,

            valor: total,

            saldo: novoSaldo,

            data:
              new Date().toISOString()

          }

        ]
      )


      setMensagem(
        `Venda realizada: ${quantidadeNumerica} unidade(s) de ${ativoSelecionado.nome} por R$ ${total
          .toFixed(2)
          .replace('.', ',')}.`
      )

    }


    // =========================
    // REGISTRA A ORDEM
    // =========================

    const novaOrdem = {

      id: Date.now(),

      ativo:
        ativoSelecionado.nome,

      tipo:
        tipo,

      quantidade:
        quantidadeNumerica,

      total:
        total,

      data:
        new Date().toISOString()

    }


    setOrdens(
      (ordensAtuais) => [

        ...ordensAtuais,

        novaOrdem

      ]
    )


    setQuantidade('')

  }


  return (

    <div className="trading">


      {/* =========================
          CABEÇALHO
      ========================= */}

      <header className="trading-header">

        <div className="trading-brand">

          <h1>
            Trade<span>Flow</span>
          </h1>

        </div>


        <PlatformNav />

      </header>


      <main className="trading-content">


        {/* =========================
            MERCADOS DISPONÍVEIS
        ========================= */}

        <section className="available-markets">

          <div className="section-title">

            <h2>
              Mercados disponíveis
            </h2>

            <p>
              Confira alguns dos principais ativos disponíveis para negociação.
            </p>

          </div>


          <div className="market-list">

            {Object.values(ativos).map(
              (item) => (

                <button

                  key={item.nome}

                  className={`market-item ${
                    ativo === item.nome
                      ? 'selected'
                      : ''
                  }`}

                  onClick={() =>
                    selecionarAtivo(item.nome)
                  }

                >

                  <div className="market-item-info">

                    <strong>
                      {item.nome}
                    </strong>


                    <span>

                      {item.nome === 'PETR4' &&
                        'Petrobras'}

                      {item.nome === 'VALE3' &&
                        'Vale'}

                      {item.nome === 'ITUB4' &&
                        'Itaú Unibanco'}

                      {item.nome === 'BBAS3' &&
                        'Banco do Brasil'}

                    </span>

                  </div>


                  <div className="market-item-value">

                    <strong>

                      R$ {item.preco
                        .toFixed(2)
                        .replace('.', ',')}

                    </strong>


                    <span>
                      {item.variacao}
                    </span>

                  </div>

                </button>

              )
            )}

          </div>

        </section>


        {/* =========================
            SALDO
        ========================= */}

        <section className="balance">

          <span>
            Saldo disponível
          </span>


          <strong>

            R$ {saldo
              .toFixed(2)
              .replace('.', ',')}

          </strong>

        </section>


        {/* =========================
            BUSCAR ATIVO
        ========================= */}

        <section className="asset-search">

          <h2>
            Buscar ativo
          </h2>


          <form onSubmit={buscarAtivo}>

            <input

              name="codigo"

              type="text"

              placeholder="Digite o código do ativo"

            />


            <button type="submit">

              Buscar

            </button>

          </form>

        </section>


        {/* =========================
            HISTÓRICO DE ANÁLISE
        ========================= */}

        <section className="analysis-history">

          <div>

            <span>
              HISTÓRICO DE ANÁLISE
            </span>


            <p>
              {historicoAtivos.join(' → ')}
            </p>

          </div>


          <button

            onClick={voltarAnalise}

            disabled={
              historicoAtivos.length <= 1
            }

          >

            ← Voltar análise

          </button>

        </section>


        {/* =========================
            INFORMAÇÕES DO ATIVO
        ========================= */}

        <section className="asset-info">

          <div>

            <span>
              Ativo
            </span>


            <strong>
              {ativoSelecionado.nome}
            </strong>

          </div>


          <div>

            <span>
              Preço
            </span>


            <strong>

              R$ {ativoSelecionado.preco
                .toFixed(2)
                .replace('.', ',')}

            </strong>

          </div>


          <div>

            <span>
              Variação
            </span>


            <strong>
              {ativoSelecionado.variacao}
            </strong>

          </div>

        </section>


        {/* =========================
            ENVIAR ORDEM
        ========================= */}

        <section className="order">

          <h2>
            Enviar ordem
          </h2>


          <label>
            Quantidade
          </label>


          <input

            type="number"

            min="1"

            value={quantidade}

            onChange={(event) =>
              setQuantidade(
                event.target.value
              )
            }

            placeholder="Ex: 10"

          />


          <div className="order-buttons">

            <button

              className="buy-button"

              onClick={() =>
                realizarOrdem('Compra')
              }

            >

              Comprar

            </button>


            <button

              className="sell-button"

              onClick={() =>
                realizarOrdem('Venda')
              }

            >

              Vender

            </button>

          </div>


          {mensagem && (

            <p className="order-message">

              {mensagem}

            </p>

          )}

        </section>


      </main>

    </div>

  )
}

export default Trading