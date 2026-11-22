# Projeto Final Digital College - Geração Full Stack

Projeto de uma loja virtual com aplicações Front-End e Back-End.

## Front-End

### Tecnologias

- React
- Vite
- React Router
- PrimeReact
- PrimeFlex
- PrimeIcons

### Pré-requisitos

- Node.js 20.19+ ou Node.js 22.12+
- npm

### Instalação

Na raiz do projeto, acesse o diretório do front-end:

```bash
cd Front-End
```

Instale as dependências:

```bash
npm install
```

### Configuração

O projeto utiliza uma chave da licença Prime React por meio da variável de ambiente:

```text
VITE_PRIME_LICENSE_KEY
```

Crie ou atualize o arquivo `Front-End/.env` com sua própria chave:

```env
VITE_PRIME_LICENSE_KEY=sua_chave
```

Em ambiente de desenvolvimento, o front-end também pode ser iniciado sem uma chave válida.

### Executar em desenvolvimento

Dentro do diretório `Front-End`, execute:

```bash
npm run dev
```

Após a inicialização, acesse o endereço informado pelo Vite, normalmente:

```text
http://localhost:5173
```

### Build de produção

Dentro do diretório `Front-End`, execute:

```bash
npm run build
```

Os arquivos otimizados serão gerados no diretório `Front-End/dist`.

Para visualizar o build localmente:

```bash
npm run preview
```

### Verificar o código

Dentro do diretório `Front-End`, execute:

```bash
npm run lint
```

### Páginas disponíveis

- `/`: página inicial
- `/products`: listagem e filtros de produtos
- `/product/:id`: detalhes de um produto

## Back-End

API desenvolvida com Node.js e Express. Consulte o [README do Back-End](./Back-End/README.md) para instruções detalhadas.

Para instalar e iniciar o servidor:

```bash
cd Back-End
npm install
npm run dev
```

Por padrão, a API inicia em `http://localhost:3000`. A rota inicial `GET /api/health` verifica a disponibilidade do servidor.