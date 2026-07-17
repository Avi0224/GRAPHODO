import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(cors({
  origin: env.CORS_ORIGINS.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// NoSQL injection prevention
app.use(mongoSanitize());

// Global rate limit
const globalLimiter = rateLimit({ 
  windowMs: 60_000, 
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false 
});
app.use('/api', globalLimiter);

// Routes
app.use('/api/auth', authRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Graphodo API is running' });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

export default app;
