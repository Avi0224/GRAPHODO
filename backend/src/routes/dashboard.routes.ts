import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect);

router.route('/')
  .get(getDashboardData);

export default router;
