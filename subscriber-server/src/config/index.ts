import * as joi from '@hapi/joi';
import * as dotenv from 'dotenv';

dotenv.config();

export const validEnvironments = ['test', 'development', 'production'] as const;

// validating environment variables
const envVarsSchema = joi
  .object({
    PORT: joi.number().default('9000'),
    NODE_ENV: joi
      .string()
      .valid(...validEnvironments)
      .required(),
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
};
