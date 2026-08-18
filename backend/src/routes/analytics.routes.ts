import { Router } from 'express';
import { getAnalyticsData } from '../controllers/analytics.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', getAnalyticsData);

export default router;
