import 'reflect-metadata'; // Necessário para o TypeORM
import express from 'express';
import { AppDataSource } from './config/data-source';
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import { authMiddleware } from 'middlewares/authMiddleware';

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

// Esta rota só pode ser acessada por usuários autenticados
app.get('/api/protected', authMiddleware, (req, res) => {
    return res.status(200).json({ message: 'Você acessou uma rota protegida!', user: req.user });
});

export default app;
