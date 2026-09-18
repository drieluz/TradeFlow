# TradeFlow

## Sobre o projeto

O TradeFlow é um projeto acadêmico de uma plataforma de Home Broker desenvolvida para simular operações de compra e venda de ativos financeiros.

A aplicação permite que o usuário crie uma conta, faça login e utilize uma plataforma para acompanhar sua carteira, realizar operações e consultar suas movimentações.

## Funcionalidades

### Área pública

- Página inicial da plataforma
- Apresentação do TradeFlow
- Seção de mercado
- Apresentação de ativos
- Informações sobre a plataforma
- Acesso à área de login e cadastro

### Cadastro e login

- Cadastro de novos usuários
- Validação dos campos obrigatórios
- Confirmação de senha
- Verificação de e-mail já cadastrado
- Login com e-mail e senha
- Identificação do usuário logado
- Proteção das páginas internas da plataforma
- Encerramento da sessão pelo botão "Sair"

### Plataforma

Após realizar o login, o usuário possui acesso às seguintes áreas:

- Início
- Dashboard
- Negociação
- Carteira
- Ordens
- Extrato

### Negociação de ativos

A área de negociação permite:

- Visualizar ativos disponíveis
- Consultar preço e variação dos ativos
- Buscar ativos pelo código
- Informar a quantidade desejada
- Realizar compras
- Realizar vendas
- Validar saldo disponível para compras
- Validar quantidade disponível na carteira para vendas

Os ativos utilizados atualmente na simulação são:

- PETR4
- VALE3
- ITUB4
- BBAS3

### Carteira

A carteira apresenta os ativos adquiridos pelo usuário e suas respectivas quantidades.

Os dados são separados por usuário, evitando que uma conta tenha acesso aos dados de outra.

### Ordens

A plataforma registra as ordens de compra e venda realizadas pelo usuário.

### Extrato

O extrato apresenta as movimentações financeiras realizadas na conta, incluindo:

- Depósitos
- Saques
- Compras
- Vendas
- Valor da movimentação
- Saldo após a movimentação
- Data e horário

### Controle de saldo

O usuário inicia sua conta com saldo de R$ 0,00 e pode:

- Adicionar dinheiro
- Sacar dinheiro
- Utilizar o saldo disponível para realizar compras

### Histórico de análise

A área de negociação possui um histórico dos ativos analisados.

O histórico utiliza o conceito de **Pilha (LIFO — Last In, First Out)**, permitindo retornar ao ativo analisado anteriormente.

Exemplo:

`PETR4 → VALE3 → ITUB4`

Ao voltar:

`PETR4 → VALE3`

E novamente:

`PETR4`

## Tecnologias utilizadas

- React
- JavaScript
- JSX
- Vite
- React Router
- CSS
- LocalStorage

## Estrutura do projeto

```text
src/
├── components/
│   ├── PlatformNav.jsx
│   ├── PlatformNav.css
│   └── ProtectedRoute.jsx
│
├── context/
│   └── TradeContext.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Home.css
│   ├── Login.jsx
│   ├── Login.css
│   ├── Cadastro.jsx
│   ├── Cadastro.css
│   ├── Inicio.jsx
│   ├── Inicio.css
│   ├── Dashboard.jsx
│   ├── Dashboard.css
│   ├── Trading.jsx
│   ├── Trading.css
│   ├── Carteira.jsx
│   ├── Carteira.css
│   ├── Ordens.jsx
│   ├── Ordens.css
│   ├── Extrato.jsx
│   └── Extrato.css
│
├── App.jsx
├── App.css
└── index.css