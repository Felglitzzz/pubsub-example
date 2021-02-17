import * as joi from '@hapi/joi';
import * as dotenv from 'dotenv';

dotenv.config();

export const validEnvironments = ['test', 'development', 'production'] as const;

// validating environment variables
const envVarsSchema = joi
  .object({
    PORT: joi.number().default('8000'),
    NODE_ENV: joi
      .string()
      .valid(...validEnvironments)
      .required(),
    // database config
    PGHOST: joi.string().required(),
    PGUSER: joi.string().required(),
    PGPASSWORD: joi.string().required(),
    PGDATABASE: joi.string().required(),
    PGPORT: joi.number().port().required().default(5432),
    DATABASE_LOGGING: joi
      .boolean()
      .truthy('TRUE')
      .truthy('true')
      .falsy('FALSE')
      .falsy('false')
      .default(false),
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error}`);
}

export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  db: {
    host: envVars.PGHOST,
    username: envVars.PGUSER,
    password: envVars.PGPASSWORD,
    name: `${envVars.PGDATABASE}${envVars.NODE_ENV === 'test' ? '_test' : ''}`,
    port: Number.parseInt(envVars.PGPORT, 2),
    logging: envVars.DATABASE_LOGGING,
  },
};
