export default {
  HOST: '127.0.0.1',
  PORT: 5432,
  USER: 'postgres',
  PASSWORD: 'postgres',
  DB: 'chat-db',
  dialect: 'postgres',
  pool: {
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    useUTC: false,
  },
  timezone: '+01:00',
};
