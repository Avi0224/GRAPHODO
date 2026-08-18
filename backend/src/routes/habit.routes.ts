import { Router } from 'express';
import { createHabit, getHabits, getHabitById, updateHabit, deleteHabit, toggleHabitDate } from '../controllers/habit.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createHabitSchema, updateHabitSchema, toggleHabitSchema } from '../schemas/habit.schema';

const router = Router();

router.use(protect);

router.route('/')
  .post(validate(createHabitSchema), createHabit)
  .get(getHabits);

router.route('/:id')
  .get(getHabitById)
  .patch(validate(updateHabitSchema), updateHabit)
  .delete(deleteHabit);

router.route('/:id/toggle')
  .post(validate(toggleHabitSchema), toggleHabitDate);

export default router;
