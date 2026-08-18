import express from 'express';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import * as taskController from '../controllers/task.controller';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .post(validate(createTaskSchema), taskController.createTask)
  .get(taskController.getTasks);

router.route('/:id')
  .get(taskController.getTaskById)
  .patch(validate(updateTaskSchema), taskController.updateTask)
  .delete(taskController.deleteTask);

export default router;
