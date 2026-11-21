# Back-End

API desenvolvida com Node.js e Express.

## Pré-requisitos

- Node.js 20.19+ ou Node.js 22.12+
- npm

## Instalação

Dentro da pasta `Back-End`, instale as dependências:

```bash
npm install
```

## Configuração do MySQL

Crie o banco de dados no MySQL:

```sql
CREATE DATABASE digital_store;
```

Copie `.env.example` para `.env` e ajuste as credenciais do seu MySQL:

```powershell
Copy-Item .env.example .env
```

O usuário configurado precisa ter permissão para criar tabelas. Ao iniciar, a aplicação sincroniza os modelos e cria a tabela `users` caso ela ainda não exista.

## Executar em desenvolvimento

```bash
npm run dev
```

O servidor inicia em `http://localhost:3000` por padrão. Para alterar a porta, defina a variável de ambiente `PORT`.

## Executar

```bash
npm start
```

## Modelo de usuário

A tabela `users` é definida em `src/models/user.js` e contém `id`, `firstname`, `surname`, `email`, `password`, `created_at` e `updated_at`. Os campos de nome, e-mail e senha são obrigatórios. A senha é transformada em hash com bcrypt antes de ser salva.

## Testes

```bash
npm test
```

## Rotas iniciais

- `GET /api/health`: retorna `{ "status": "ok" }` para verificar se a API está disponível.
- Rotas não encontradas retornam status `404` com uma mensagem JSON.
