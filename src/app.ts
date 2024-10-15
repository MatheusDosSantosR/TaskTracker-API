import 'reflect-metadata'; // Necessário para o TypeORM
import express from 'express';
import { AppDataSource } from './config/data-source.js';
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import { authMiddleware } from './middlewares/authMiddleware.js';
import todoRoutes from './routes/todoRoutes.js'
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'https://meudominio.com'], // Adicione suas origens permitidas
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

app.use(cors(corsOptions));
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
app.use('/api/profile',authMiddleware, profileRoutes)
app.use('/api/todos', authMiddleware, todoRoutes)

export default app;
