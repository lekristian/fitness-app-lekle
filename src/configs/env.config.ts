import { EnvConfig, envSchema } from "../db/schemas/env.schema";
import dotenv from "dotenv";
import { ZodError } from "zod";

dotenv.config();

export const validateEnv = () => {
  try {
    const envVars: EnvConfig = envSchema.parse(process.env);
    return {
      jwtConfig: {
        accessSecret: envVars.JWT_SECRET,
        refreshAccessSecret: envVars.JWT_REFRESH,
        serviceSecret: envVars.SERVICE_JWT_SECRET,
      },
      db: {
        host: envVars.DB_HOST,
        port: Number(envVars.DB_PORT),
        user: envVars.DB_USERNAME,
        name: envVars.DB_NAME,
        password: envVars.DB_PASSWORD,
      },
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("❌ Environment validation failed:", error.issues);
      process.exit(1);
    } else {
      console.error("❌ Error parsing environment variables:", error);
      process.exit(1);
    }
  }
};

export const config = validateEnv();
