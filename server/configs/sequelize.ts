import { Sequelize, Dialect } from 'sequelize';
import dbConfig from './db.config';

const sequelizeConnection = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect as Dialect,
    logging: false,
    pool: {
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

export default sequelizeConnection;
