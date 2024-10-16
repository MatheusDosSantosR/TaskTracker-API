import "reflect-metadata";
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Todo } from '../entity/Todo.js';
import { User } from '../entity/User.js';
import { Category } from '../entity/Category.js';
import { Comment } from '../entity/Comment.js';
import { Subtask } from '../entity/Subtask.js';

dotenv.config();

// Resolvendo __dirname no contexto de ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("klogi", path.join(__dirname, '../migrations/*.ts'))
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: ["query", "error", "schema", "warn", "info", "log"],
    logger: "file",
    entities: [User, Category, Todo, Comment, Subtask],
    migrations: [path.join(__dirname, '../migrations/*.ts')],
    subscribers: []
});
