import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

const TradeContext = createContext()

function obterUsuarioLogado() {

  const usuario = JSON.parse(
    localStorage.getItem('usuarioLogado')
  )

  return usuario
}

function obterDadosUsuario(usuarioId) {

  const dadosSalvos = JSON.parse(
    localStorage.getItem('dadosTradeFlow')
  ) || {}

  return dadosSalvos[usuarioId] || {
    saldo: 0,
    carteira: {},
    ordens: [],
    extrato: [],
    historicoAtivos: ['PETR4']
  }
}

export function TradeProvider({ children }) {

  const usuarioLogado = obterUsuarioLogado()

  const usuarioId = usuarioLogado
    ? usuarioLogado.id
    : null

  const dadosIniciais = usuarioId
    ? obterDadosUsuario(usuarioId)
    : {
        saldo: 0,
        carteira: {},
        ordens: [],
        extrato: [],
        historicoAtivos: ['PETR4']
      }

  const [saldo, setSaldo] = useState(
    dadosIniciais.saldo
  )

  const [carteira, setCarteira] = useState(
    dadosIniciais.carteira
  )

  const [ordens, setOrdens] = useState(
    dadosIniciais.ordens
  )

  const [extrato, setExtrato] = useState(
    dadosIniciais.extrato
  )

  const [historicoAtivos, setHistoricoAtivos] =
    useState(dadosIniciais.historicoAtivos)


  // =========================
  // SALVAR DADOS DO USUÁRIO
  // =========================

  useEffect(() => {

    if (!usuarioId) {
      return
    }

    const dadosSalvos = JSON.parse(
      localStorage.getItem('dadosTradeFlow')
    ) || {}

    dadosSalvos[usuarioId] = {
      saldo,
      carteira,
      ordens,
      extrato,
      historicoAtivos
    }

    localStorage.setItem(
      'dadosTradeFlow',
      JSON.stringify(dadosSalvos)
    )

  }, [
    usuarioId,
    saldo,
    carteira,
    ordens,
    extrato,
    historicoAtivos
  ])


  return (
    <TradeContext.Provider
      value={{
        saldo,
        setSaldo,

        carteira,
        setCarteira,

        ordens,
        setOrdens,

        extrato,
        setExtrato,

        historicoAtivos,
        setHistoricoAtivos
      }}
    >
      {children}
    </TradeContext.Provider>
  )
}

export function useTrade() {
  return useContext(TradeContext)
}