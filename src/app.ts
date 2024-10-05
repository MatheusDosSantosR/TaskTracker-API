import express from 'express';
import 'reflect-metadata'; // Necessário para o TypeORM
import { AppDataSource } from './config/ormconfig';
import todoRoutes from './routes/todoRoutes.js';

const app = express();

app.use(express.json());

// Inicializa a conexão com o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados Postgres.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

app.use('/api/todos', todoRoutes);

export default app;
