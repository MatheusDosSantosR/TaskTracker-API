import "reflect-metadata"
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // Necessário para ESM
import { Todo } from '../entity/Todo'
import { User } from '../entity/User'

dotenv.config();

// Resolvendo __dirname no contexto de ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("direct", path.join(__dirname, '../entities/*.ts'))

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    //port: Number(process.env.DB_PORT) || undefined,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: process.env.DB_LOGGING === 'true',
    entities: [Todo, User],
    migrations:[],
    subscribers: [],
    //entities: [path.join(__dirname, '../entities/*.ts')],  // Corrige o caminho para as entidades
    //migrations: [path.join(__dirname, '../migrations/*.ts')], // Corrige o caminho para as migrações
});
