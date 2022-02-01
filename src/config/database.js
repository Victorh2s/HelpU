require('dotenv').config();

module.exports = {
  /* SQLite */
  dialect: 'mysql',
  storage: './db.mysql',

  /* MySQL / MariaDB */
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,

  timezone: 'America/Sao_Paulo',
  dialectOptions: {
    timezone: 'local',
  },

  /* ALL */
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
