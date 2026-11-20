# Front-End

Aplicacao front-end da Digital Store, desenvolvida com React, Vite e PrimeReact.

## Pre-requisitos

- Node.js 20.19+ ou Node.js 22.12+
- npm

## Instalacao

Na pasta do projeto front-end, instale as dependencias:

```bash
npm install
```

## Configuracao

Caso necessario, configure a chave do PrimeReact no arquivo `.env`:

```env
VITE_PRIME_LICENSE_KEY=sua_chave
```

## Executar em desenvolvimento

```bash
npm run dev
```

Acesse normalmente:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

Os arquivos de producao serao gerados na pasta `dist`.

## Pre-visualizar o build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Paginas

- `/`: pagina inicial
- `/products`: listagem de produtos
- `/product/:id`: pagina do produto
