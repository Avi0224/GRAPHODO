"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().default('5000').transform(Number),
    MONGODB_URI: zod_1.z.string().url().default('mongodb://127.0.0.1:27017/graphodo'),
    JWT_ACCESS_SECRET: zod_1.z.string().min(32).default('supersecret_accesstoken_mustbe_32chars'),
    JWT_REFRESH_SECRET: zod_1.z.string().min(32).default('supersecret_refreshtoken_mustbe_32chars'),
    JWT_ACCESS_EXPIRES_IN: zod_1.z.string().default('15m'),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().default('7d'),
    CLIENT_URL: zod_1.z.string().url().default('http://localhost:5173'),
    CORS_ORIGINS: zod_1.z.string().default('http://localhost:5173,http://localhost:3000'),
    ENCRYPTION_KEY: zod_1.z.string().length(64).default('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    process.exit(1);
}
exports.env = parsed.data;
