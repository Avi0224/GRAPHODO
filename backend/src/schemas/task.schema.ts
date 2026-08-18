import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').trim(),
  description: z.string().trim().optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).default('Medium'),
  status: z.enum(['Pending', 'Completed', 'Archived']).default('Pending'),
  category: z.string().trim().optional(),
  tags: z.array(z.string().trim()).optional(),
  dueDate: z.coerce.date().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').trim().optional(),
  description: z.string().trim().optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).optional(),
  status: z.enum(['Pending', 'Completed', 'Archived']).optional(),
  category: z.string().trim().optional(),
  tags: z.array(z.string().trim()).optional(),
  dueDate: z.coerce.date().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
