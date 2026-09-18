import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Inicio.css'

import { useTrade } from '../context/TradeContext'
import PlatformNav from '../components/PlatformNav'

function Inicio() {

  const {
    saldo,
    setSaldo,
    carteira,
    setExtrato
  } = useTrade()

  const [tipoMovimentacao, setTipoMovimentacao] = useState(null)
  const [metodoPagamento, setMetodoPagamento] = useState(null)
  const [valor, setValor] = useState('')
  const [mensagem, setMensagem] = useState('')

 const usuarioSalvo = JSON.parse(
  localStorage.getItem('usuarioLogado')
)

const nomeUsuario = usuarioSalvo
  ? usuarioSalvo.nome
  : 'investidor'

  const quantidadeAtivos = Object.keys(carteira).length

  function abrirMovimentacao(tipo) {

    setTipoMovimentacao(tipo)
    setMetodoPagamento(null)
    setValor('')
    setMensagem('')

  }

  function selecionarMetodo(metodo) {

    setMetodoPagamento(metodo)
    setMensagem('')

  }

  function cancelarMovimentacao() {

    setTipoMovimentacao(null)
    setMetodoPagamento(null)
    setValor('')
    setMensagem('')

  }

  function realizarMovimentacao(event) {

    event.preventDefault()

    const valorNumerico = Number(
      valor.replace(',', '.')
    )

    if (!metodoPagamento) {

      setMensagem(
        'Selecione uma forma de pagamento.'
      )

      return
    }

    if (!valor || valorNumerico <= 0) {

      setMensagem(
        'Digite um valor válido.'
      )

      return
    }

    // =========================
    // DEPÓSITO
    // =========================

    if (tipoMovimentacao === 'adicionar') {

      const novoSaldo =
        saldo + valorNumerico

      setSaldo(novoSaldo)

      setExtrato((extratoAtual) => [
        ...extratoAtual,

        {
          id: Date.now(),
          tipo: 'Depósito',
          descricao:
            `Depósito via ${metodoPagamento}`,
          valor: valorNumerico,
          saldo: novoSaldo,
          data: new Date().toISOString()
        }

      ])

      setMensagem(
        `Depósito de R$ ${valorNumerico
          .toFixed(2)
          .replace('.', ',')} via ${metodoPagamento} realizado.`
      )

      setValor('')

      return
    }

    // =========================
    // SAQUE
    // =========================

    if (tipoMovimentacao === 'sacar') {

      if (valorNumerico > saldo) {

        setMensagem(
          'Você não possui saldo suficiente para realizar esse saque.'
        )

        return
      }

      const novoSaldo =
        saldo - valorNumerico

      setSaldo(novoSaldo)

      setExtrato((extratoAtual) => [
        ...extratoAtual,

        {
          id: Date.now(),
          tipo: 'Saque',
          descricao:
            `Saque via ${metodoPagamento}`,
          valor: -valorNumerico,
          saldo: novoSaldo,
          data: new Date().toISOString()
        }

      ])

      setMensagem(
        `Saque de R$ ${valorNumerico
          .toFixed(2)
          .replace('.', ',')} via ${metodoPagamento} realizado.`
      )

      setValor('')

      return
    }

  }

  return (

    <div className="platform-home">

      {/* =========================
          CABEÇALHO
      ========================= */}

      <header className="platform-header">

        <div className="platform-brand">

          <h1>
            Trade<span>Flow</span>
          </h1>

        </div>

        <PlatformNav />

      </header>

      <main className="platform-content">

        {/* =========================
            BOAS-VINDAS
        ========================= */}

        <section className="welcome-section">

          <div className="welcome-content">

            <span className="welcome-label">
              HOME BROKER
            </span>

            <h2>
              Olá, {nomeUsuario}!
            </h2>

            <p>
              Acompanhe seus investimentos,
              consulte seus ativos e realize
              suas operações em um só lugar.
            </p>

          </div>

        </section>

        {/* =========================
            RESUMO
        ========================= */}

        <section className="platform-summary">

          <div className="platform-card">

            <span>
              Saldo disponível
            </span>

            <strong>
              R$ {saldo
                .toFixed(2)
                .replace('.', ',')}
            </strong>

            <small>
              Disponível para operações
            </small>

            <div className="balance-actions">

              <button
                onClick={() =>
                  abrirMovimentacao('adicionar')
                }
              >
                Adicionar dinheiro
              </button>

              <button
                onClick={() =>
                  abrirMovimentacao('sacar')
                }
              >
                Sacar dinheiro
              </button>

            </div>

          </div>

          <div className="platform-card">

            <span>
              Ativos na carteira
            </span>

            <strong>
              {quantidadeAtivos}
            </strong>

            <small>
              Ativos em sua carteira
            </small>

          </div>

          <div className="platform-card">

            <span>
              Status da conta
            </span>

            <strong className="status">
              Ativa
            </strong>

            <small>
              Conta TradeFlow
            </small>

          </div>

        </section>

        {/* =========================
            MOVIMENTAÇÃO
        ========================= */}

        {tipoMovimentacao && (

          <section className="money-section">

            <div className="money-content">

              <span>

                {tipoMovimentacao === 'adicionar'
                  ? 'ADICIONAR DINHEIRO'
                  : 'SACAR DINHEIRO'}

              </span>

              <h2>

                {tipoMovimentacao === 'adicionar'
                  ? 'Adicionar dinheiro'
                  : 'Sacar dinheiro'}

              </h2>

              <p>

                {tipoMovimentacao === 'adicionar'
                  ? 'Escolha a forma de pagamento e informe o valor.'
                  : 'Escolha a forma de recebimento e informe o valor.'}

              </p>

              {/* =========================
                  MÉTODO DE PAGAMENTO
              ========================= */}

              <div className="payment-method">

                <label>
                  {tipoMovimentacao === 'adicionar'
                    ? 'Forma de pagamento'
                    : 'Forma de recebimento'}
                </label>

                <div className="payment-options">

                  {tipoMovimentacao === 'adicionar' && (

                    <button
                      type="button"
                      className={
                        metodoPagamento === 'PIX'
                          ? 'payment-option selected'
                          : 'payment-option'
                      }
                      onClick={() =>
                        selecionarMetodo('PIX')
                      }
                    >
                      <strong>
                        PIX
                      </strong>

                      <span>
                        Depósito instantâneo
                      </span>

                    </button>

                  )}

                  {tipoMovimentacao === 'adicionar' && (

                    <button
                      type="button"
                      className={
                        metodoPagamento === 'Cartão'
                          ? 'payment-option selected'
                          : 'payment-option'
                      }
                      onClick={() =>
                        selecionarMetodo('Cartão')
                      }
                    >
                      <strong>
                        Cartão
                      </strong>

                      <span>
                        Crédito ou débito
                      </span>

                    </button>

                  )}

                  {tipoMovimentacao === 'sacar' && (

                    <button
                      type="button"
                      className="payment-option selected"
                      onClick={() =>
                        selecionarMetodo('PIX')
                      }
                    >
                      <strong>
                        PIX
                      </strong>

                      <span>
                        Receba na sua conta
                      </span>

                    </button>

                  )}

                </div>

              </div>

              {/* =========================
                  VALOR
              ========================= */}

              <form
                className="money-form"
                onSubmit={realizarMovimentacao}
              >

                <div>

                  <label>
                    Valor
                  </label>

                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="R$ 0,00"
                    value={valor}
                    onChange={(event) =>
                      setValor(event.target.value)
                    }
                  />

                </div>

                <div className="money-buttons">

                  <button
                    type="submit"
                    className="confirm-money-button"
                  >
                    Confirmar
                  </button>

                  <button
                    type="button"
                    className="cancel-money-button"
                    onClick={cancelarMovimentacao}
                  >
                    Cancelar
                  </button>

                </div>

              </form>

              {mensagem && (

                <p className="money-message">
                  {mensagem}
                </p>

              )}

            </div>

          </section>

        )}

        {/* =========================
            AÇÕES
        ========================= */}

        <section className="platform-actions">

          <div className="section-title">

            <span>
              PLATAFORMA
            </span>

            <h2>
              O que você deseja fazer?
            </h2>

          </div>

          <div className="action-cards">

            <Link
              to="/trading"
              className="action-card"
            >

              <div className="action-icon">
                ↗
              </div>

              <strong>
                Negociar
              </strong>

              <span>
                Compre ou venda ativos
                diretamente pela plataforma.
              </span>

              <div className="action-arrow">
                →
              </div>

            </Link>

            <Link
              to="/carteira"
              className="action-card"
            >

              <div className="action-icon">
                ◫
              </div>

              <strong>
                Minha carteira
              </strong>

              <span>
                Consulte seus ativos,
                quantidades e patrimônio.
              </span>

              <div className="action-arrow">
                →
              </div>

            </Link>

            <Link
              to="/ordens"
              className="action-card"
            >

              <div className="action-icon">
                ⇄
              </div>

              <strong>
                Minhas ordens
              </strong>

              <span>
                Acompanhe suas compras
                e vendas realizadas.
              </span>

              <div className="action-arrow">
                →
              </div>

            </Link>

          </div>

        </section>

      </main>

    </div>

  )
}

export default Inicio