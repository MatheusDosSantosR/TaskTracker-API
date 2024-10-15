import "reflect-metadata"
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Todo } from '../entity/Todo.js'
import { User } from '../entity/User.js'

dotenv.config();

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
    migrations: [],
    subscribers: []
});
