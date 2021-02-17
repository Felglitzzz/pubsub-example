const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number.parseInt(process.env.PGPORT, 2),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: `${process.env.PGDATABASE}${
    process.env.NODE_ENV == 'test' ? '_test' : ''
  }`,
  entities: ['dist/database/models/*.model.js'],
  logging: process.env.DATABASE_LOGGING,
  synchronize: false,
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
