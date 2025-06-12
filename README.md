# 📦 Catálogo de Peças de Veículos

Este é um projeto desenvolvido com **TypeScript** e **Node.js**, utilizando um banco de dados
**MySQL** para gerenciar um catálogo de peças automotivas. O sistema foi criado para facilitar a
organização, consulta e gerenciamento de informações de forma estruturada e eficiente.

## 🚀 Tecnologias Utilizadas

-   **TypeScript** – Tipagem estática para maior robustez do código.
-   **Node.js + Express** – Backend com API RESTful escalável.
-   **TypeORM** – ORM para abstração e integração com banco de dados relacional.
-   **MySQL** – Banco de dados relacional.
-   **Docker + Docker Compose** – Containerização da aplicação.
-   **Swagger** – Documentação interativa da API.
-   **Jest** – Testes automatizados com suporte a coverage.
-   **Redis** – Cache e controle de rate-limit.
-   **Winston** – Logger customizado com níveis e transporte configurável.
-   **MongoDb** - Armazenamento dos logs gerados.
-   **Multer** – Upload de arquivos (CSV, imagens, etc).
-   **Yup** – Validação de dados.
-   **Prettier + ESLint** – Padrões de formatação e lint.

## 📁 Estrutura do Projeto

A estrutura principal do projeto é:

```
src/
├── config/
├── http/
│   ├── error/              # Mapeamento e tratamento de erros personalizados
│   ├── main/               # Entrypoint (ex: main.ts, app.ts)
│   ├── middlewares/        # Middlewares HTTP globais
│   ├── routes/             # Definição e composição de rotas
├── modules/
├── shared/
│   ├── container/          # Injeção de dependências
│   │   ├── providers/      # Providers como Storage, Mail, Cache
│   ├── infra/
│   │   ├── typeorm/
│   │   │   ├── database/   # Configuração de conexão de banco de dados
│   │   │   ├── entities/   # Entidades globais
│   │   │   ├── migrations/ # Migrations versionadas
│   │   │   ├── seeds/      # Seeds iniciais
│   └── utils/
```

## ⚙️ Pré-requisitos

-   [Node.js](https://nodejs.org/)
-   [MySQL](https://www.mysql.com/)
-   [Docker e Docker Compose](https://www.docker.com/) (opcional, mas recomendado)

## 💻 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/wevertonicaro/auto-parts
cd auto-parts
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`.

### 4. Execute o projeto

#### Em modo desenvolvimento

```bash
npm run dev
```

#### Em modo produção

```bash
npm run build
npm start
```

#### Com Docker

```bash
docker-compose up --build
```

## 🧪 Testes

```bash
npm run test             # Executa todos os testes
npm run test-dev         # Testes em modo watch
npm run test:coverage    # Geração de relatório de cobertura
```

## 🛠️ Migrations e Seeds

```bash
npm run migration        # Cria uma nova migration
npm run migrate          # Executa as migrations
npm run revert           # Reverte a última migration
npm run seed             # Executa os seeds de dados
```

## 📚 Documentação da API

Após inicializar o projeto, acesse:

```
http://localhost:3000/docs
```

A documentação Swagger permite testar os endpoints da API diretamente no navegador.

## 🧰 Scripts úteis

-   `npm run formatter` – Executa Prettier para formatar o código.
-   `npm run check` – Verifica se há erros de formatação.
-   `npm run lint` – Corrige erros de lint com ESLint.

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

Desenvolvido por Weverton Ícaro 🚗
