require('dotenv').config();

module.exports = {
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql'
  },
  port: process.env.APP_PORT,
  jwtSecret: process.env.JWT_SECRET
};
