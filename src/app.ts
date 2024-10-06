import 'reflect-metadata'; // Necessário para o TypeORM
import express from 'express';
import { AppDataSource } from './config/data-source';
//import todoRoutes from './routes/todoRoutes.js';
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'

const app = express();

app.use(express.json());

// Inicializa a conexão com o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados MySql.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

//app.use('/api/todos', todoRoutes);
app.use('/api/public/users', userRoutes)
app.use('/api/login', authRoutes)

export default app;
