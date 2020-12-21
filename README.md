# MERN Tasks

> Sistema gerenciador de tarefas construído com MERN stack (MongoDB, Express, React, NodeJS).

A aplicaçao contém autenticação de usuário, DotEnv para gerenciar variáveis de ambiente e Code Linting para VS Code com Prettier, utilizando Airbnb JavaScript Style e ESLint.

## Pré-requisitos

Ter um serviço [MongoDB](https://www.mongodb.com/) configurado e pronto para receber os dados. Os esquemas dos modelos estão no diretório api/models.

## Instalação

```
git clone https://github.com/felipesvianna/mern-tasks
npm install
```

## Utilização

### API (Backend)

1. Definir instância do MongoDB e prepará-la para receber dados.
2. Definir as security keys para o JWT e para a sessão.
3. Criar um arquivo _.env.development.local._ na raiz do projeto
4. Colocar a URI do MongoDB e definir as variáveis no arquivo .env.development.local.
5. Colocar o arquivo .env.development.local no _.gitignore_.

Há dois ambientes: De desenvolvimento e produção.

- Rodar servidor no ambiente de desenvolvimento ("NODE_ENV=dev nodemon app.js" definido em package.json)

```bash
npm run dev
```

- Rodar servidor no ambiente de produção

```bash
npm start
```

### Frontend

_\*A porta padrão foi alterada para 8080 ao invés de 3000 no package.json._

```
npm start
```

## Deployment

Este projeto utiliza [DotEnv](https://www.npmjs.com/package/dotenv) para gerenciar as variáveis de ambiente.
As variáveis de ambiente são definidas nos arquivos _.env_, _.env.development.local_.
O arquivo _.env.model_ serve como modelo.

Ao colocar no ambiente de produção, replicar o arquivo _.env.development.local_ com o nome _.env_ e redefinir as variáveis necessárias.

- Rodar servidor no ambiente de produção

```bash
npm start
```

## Pacotes NodeJS utilizados na API

- bcryptjs
- body-parser
- cors
- dotenv
- express
- express-session
- express-validator
- connect-mongodb-session
- helmet
- jsonwebtoken
- mongodb
- mongoose
- nodemon

## Pacotes NodeJS utilizados no FrontEnd

- axios
- dotenv
- prop-types
- react
- react-dom
- react-router-dom

## Padrões de Desenvolvimento

## Padronização de código

- [Airbnb JavaScript Style](https://github.com/airbnb/javascript)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [ESLint](https://eslint.org/docs/rules/)

### Pacotes de Linting

- eslint
- prettier
- eslint-plugin-prettier
- eslint-config-prettier
- eslint-plugin-node
- eslint-config-node
- eslint-config-airbnb

## Autores

- Frontend e API: **Felipe Vianna** - [Github](https://github.com/felipesvianna)
- Design e Código CSS: **Juan Pablo De la torre Valdez** - [Github](https://gist.github.com/juanpablogdl)
