import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('5000'),
  MONGODB_URI: z.string().url().default('mongodb://127.0.0.1:27017/graphodo'),
  JWT_ACCESS_SECRET: z.string().min(32).default('supersecret_accesstoken_mustbe_32chars'),
  JWT_REFRESH_SECRET: z.string().min(32).default('supersecret_refreshtoken_mustbe_32chars'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  CLIENT_URL: z.string().url().default('http://localhost:5173'),
  CORS_ORIGINS: z.string().default('http://localhost:5173,http://localhost:3000'),
  ENCRYPTION_KEY: z.string().length(64).default('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
