import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Cadastro.css'

function Cadastro() {

  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  function cadastrar(event) {

    event.preventDefault()

    if (!nome || !email || !senha || !confirmarSenha) {
      setMensagem('Preencha todos os campos.')
      return
    }

    if (senha !== confirmarSenha) {
      setMensagem('As senhas não coincidem.')
      return
    }

    const usuariosSalvos = JSON.parse(
      localStorage.getItem('usuariosTradeFlow')
    ) || []

    const emailJaExiste = usuariosSalvos.some(
      (usuario) =>
        usuario.email.toLowerCase() === email.toLowerCase()
    )

    if (emailJaExiste) {
      setMensagem('Este e-mail já está cadastrado.')
      return
    }

    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      senha
    }

    const novosUsuarios = [
      ...usuariosSalvos,
      novoUsuario
    ]

    localStorage.setItem(
      'usuariosTradeFlow',
      JSON.stringify(novosUsuarios)
    )

    setMensagem('Cadastro realizado com sucesso!')

    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>
          Trade<span>Flow</span>
        </h1>

        <p className="register-subtitle">
          Crie sua conta
        </p>

        <form onSubmit={cadastrar}>

          <label>
            Nome
          </label>

          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />

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
            placeholder="Crie uma senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />

          <label>
            Confirmar senha
          </label>

          <input
            type="password"
            placeholder="Digite a senha novamente"
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
          />

          {mensagem && (
            <p className="register-message">
              {mensagem}
            </p>
          )}

          <button type="submit">
            Criar conta
          </button>

        </form>

        <p className="login-link">
          Já possui uma conta?{' '}

          <Link to="/login">
            Entrar
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

export default Cadastro