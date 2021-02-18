const dotenv = require('dotenv');

dotenv.config();

let config = {};

if (process.env.NODE_ENV === 'production') {
  config.url = process.env.DATABASE_URL
} else {
  config.host = process.env.PGHOST,
  config.port = Number.parseInt(process.env.PGPORT, 2),
  config.username = process.env.PGUSER,
  config.password = process.env.PGPASSWORD,
  config.database = `${process.env.PGDATABASE}${
    process.env.NODE_ENV == 'test' ? '_test' : ''
  }`
}

module.exports = {
  type: 'postgres',
  ...config,
  entities: ['dist/database/models/*.model.js'],
  logging: process.env.DATABASE_LOGGING,
  synchronize: false,
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
