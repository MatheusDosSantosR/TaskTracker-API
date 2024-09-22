import { Sequelize } from 'sequelize';

console.log('Configurações de conexão:', {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD ? '****' : null,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  });
  
const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: 'mysql',
        logging: false,
    }
);

export default sequelize;
