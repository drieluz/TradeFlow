import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Login.css'

function Login() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  function entrar(event) {

    event.preventDefault()

    if (!email || !senha) {
      setMensagem('Preencha todos os campos.')
      return
    }

    const usuariosSalvos = JSON.parse(
      localStorage.getItem('usuariosTradeFlow')
    ) || []

    if (usuariosSalvos.length === 0) {
      setMensagem(
        'Nenhuma conta cadastrada. Cadastre-se primeiro.'
      )
      return
    }

    const usuarioEncontrado = usuariosSalvos.find(
      (usuario) =>
        usuario.email.toLowerCase() === email.toLowerCase() &&
        usuario.senha === senha
    )

    if (!usuarioEncontrado) {
      setMensagem('E-mail ou senha incorretos.')
      return
    }

    localStorage.setItem(
      'usuarioLogado',
      JSON.stringify({
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email
      })
    )

    window.location.href = '/inicio'
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>
          Trade<span>Flow</span>
        </h1>

        <p className="login-subtitle">
          Entre na sua conta
        </p>

        <form onSubmit={entrar}>

          <label>
            E-mail
          </label>

          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>
            Senha
          </label>

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />

          {mensagem && (
            <p className="login-message">
              {mensagem}
            </p>
          )}

          <button type="submit">
            Entrar
          </button>

        </form>

        <p className="register-link">
          Ainda não tem uma conta?{' '}

          <Link to="/cadastro">
            Cadastre-se
          </Link>
        </p>

        <Link
          to="/"
          className="back-home"
        >
          Voltar para o início
        </Link>

      </div>

    </div>
  )
}

export default Login