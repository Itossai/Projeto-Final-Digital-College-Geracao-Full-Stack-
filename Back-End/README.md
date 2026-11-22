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
Defina também `JWT_SECRET` no `.env` com um segredo aleatório forte para validar tokens JWT.

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

## Organização das rotas de usuário

- `src/routes/user.js` conecta caminhos e middlewares aos controllers.
- `src/controllers/user.controller.js` valida a entrada HTTP e define as respostas.
- `src/services/user.service.js` executa as operações do usuário no banco.

## Rotas iniciais

- `GET /api/health`: retorna `{ "status": "ok" }` para verificar se a API está disponível.
- `POST /v1/user`: cadastra um usuário com `firstname`, `surname`, `email`, `password` e `confirmPassword`; responde `201` em caso de sucesso e `400` para dados inválidos.
- `GET /v1/user/:id`: retorna `id`, `firstname`, `surname` e `email` do usuário; responde `404` quando ele não existe.
- `PUT /v1/user/:id`: atualiza `firstname`, `surname` e `email`; exige `Authorization: Bearer <JWT>` assinado com `JWT_SECRET`, algoritmo HS256 e claim `sub` igual ao ID da rota. Retorna `204` sem corpo, `400` para dados inválidos, `401` para token inválido/ausente ou usuário diferente e `404` quando o usuário não existe.
- `DELETE /v1/user/:id`: exclui o usuário autenticado indicado pela rota; exige `Authorization: Bearer <JWT>` e retorna `204` sem corpo, `401` para token inválido/ausente ou usuário diferente e `404` quando o usuário não existe.
- `POST /v1/category`: cadastra categoria com `name`, `slug` e, opcionalmente, `use_in_menu`; exige `Content-Type: application/json` e `Authorization: Bearer <JWT>` válido. Retorna `201` com a categoria criada, `400` para dados inválidos ou `401` para token ausente/inválido.
- `PUT /v1/category/:id`: atualiza `name`, `slug` e `use_in_menu`; exige `Content-Type: application/json` e `Authorization: Bearer <JWT>` válido. Retorna `204` sem corpo, `400` para dados inválidos, `401` para token ausente/inválido ou `404` quando a categoria não existe.
- `DELETE /v1/category/:id`: exclui a categoria indicada; exige `Authorization: Bearer <JWT>` válido. Retorna `204` sem corpo, `401` para token ausente/inválido ou `404` quando a categoria não existe.
- `GET /v1/category/:id`: retorna `id`, `name`, `slug` e `use_in_menu` da categoria; responde `404` quando ela não existe.
- `GET /v1/category/search`: lista categorias com paginação opcional por `limit` (padrão `12`, `-1` para todas) e `page` (padrão `1`), seleção opcional de `fields` (`id`, `name`, `slug`, `use_in_menu`) e filtro opcional `use_in_menu=true|false`. Retorna `200` com `data`, `total`, `limit` e `page`, ou `400` para parâmetros inválidos.
- Rotas não encontradas retornam status `404` com uma mensagem JSON.

O backend valida JWTs, mas ainda não possui uma rota de login para emiti-los.
