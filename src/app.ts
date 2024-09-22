import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import todoRoutes from './routes/todoRoutes';
import sequelize from './config/database';

const app = express();

app.use(express.json());

// Testar conexão com o banco de dados
sequelize.authenticate()
  .then((dd) => {
    console.log('Conectado ao banco de dados MySQL.', dd);
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

// Sincronizar modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar modelos:', err);
  });

app.use('/api/todos', todoRoutes);

export default app;
