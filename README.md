 
# TaskTracker API

**TaskTracker** é uma API para gerenciamento de tarefas (to-dos) desenvolvida com **TypeScript**, **Express**, **Node.js**, **TypeORM**, e **MySQL**. A API permite aos usuários criar, atualizar, listar, filtrar, e deletar tarefas, além de realizar autenticação, gerenciamento de usuários e redefinição de senha.

## Funcionalidades

- **Autenticação e Autorização**
  - Autenticação JWT para login e proteção de rotas.
  - Middleware para proteger rotas privadas com base no usuário autenticado.

- **Gerenciamento de Tarefas (To-dos)**
  - CRUD completo para tarefas.
  - Filtros dinâmicos por status de conclusão, data de vencimento, e outros.
  - Ordenação de tarefas por diferentes campos (`priority`, `updatedAt`, etc.).
  - Relacionamento com subtarefas e comentários.

- **Redefinição de Senha**
  - Geração de token temporário para redefinição de senha.
  - Envio de email de redefinição com Nodemailer.
  - Validação do token para permitir alteração de senha.

## Tecnologias

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **TypeScript**: Para tipagem estática e maior robustez.
- **TypeORM**: ORM utilizado para interagir com o banco de dados MySQL.
- **JWT (JSON Web Tokens)**: Para autenticação segura.
- **MySQL**: Banco de dados relacional para persistência dos dados.
- **Nodemailer**: Para envio de emails (como redefinição de senha).

## Pré-requisitos

- **Node.js** (v16 ou superior)
- **MySQL** (v8 ou superior)
- **npm** (v6 ou superior)
- **Servidor SMTP** para envio de emails (como Hostinger, Gmail, etc.).

## Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/MatheusDosSantosR/TaskTracker-API.git
   cd TaskTracker-API
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o banco de dados**

   Crie um banco de dados MySQL e configure as variáveis de ambiente no arquivo `.env`.

4. **Crie o arquivo `.env`**

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```bash
   # Configurações de banco de dados
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=tasktracker

   # JWT
   JWT_SECRET=sua_chave_secreta

   # Configurações de SMTP para envio de emails
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_USER=seu_email@dominio.com
   SMTP_PASSWORD=sua_senha

   # URL base para redefinição de senha
   BASE_URL=http://localhost:3000
   ```

5. **Execute as migrações**

   Para criar as tabelas no banco de dados, execute o seguinte comando:

   ```bash
   npm run typeorm migration:run
   ```

6. **Inicie o servidor**

   ```bash
   npm start
   ```

   O servidor estará rodando em `http://localhost:3000`.

## Endpoints

### Autenticação

- **POST** `/auth/login`: Realiza login e retorna um token JWT.
- **POST** `/auth/register`: Registra um novo usuário.

### Gerenciamento de Tarefas (To-dos)

- **GET** `/todos`: Lista todas as tarefas do usuário logado com filtros e ordenação.
  - Filtros: `isCompleted`, `dueDate`
  - Ordenação: `sortBy`, `sortDirection`
  - Exemplo: `/todos?isCompleted=true&sortBy=priority&sortDirection=DESC`
- **POST** `/todos`: Cria uma nova tarefa.
- **PUT** `/todos/:id`: Atualiza uma tarefa existente.
- **DELETE** `/todos/:id`: Remove uma tarefa.

### Subtarefas

- **POST** `/todos/:id/subtasks`: Adiciona uma subtarefa a uma tarefa.
- **PUT** `/subtasks/:id`: Atualiza uma subtarefa.
- **DELETE** `/subtasks/:id`: Remove uma subtarefa.

### Redefinição de Senha

- **POST** `/auth/forgot-password`: Envia um email para redefinição de senha.
- **POST** `/auth/reset-password/:token`: Redefine a senha do usuário com base no token enviado.

## Executando Testes

Execute os testes usando:

```bash
npm test
```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias e correções.

## Licença

Este projeto está licenciado sob a licença **MIT**.

---

### Contato

Para mais informações, entre em contato via:

- Email: matheus2050@gmail.com
- GitHub: [MatheusDosSantosR](https://github.com/MatheusDosSantosR)
