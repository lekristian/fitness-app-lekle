import { z } from "zod";

export const envSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string().optional().default(""),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_REFRESH: z.string().min(32, "JWT_REFRESH must be at least 32 characters"),
  SERVICE_JWT_SECRET: z.string().min(32, "SERVICE_JWT_SECRET must be at least 32 characters"),
});

export type EnvConfig = z.infer<typeof envSchema>;
