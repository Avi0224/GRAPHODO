import { z } from 'zod';

export const createHabitSchema = z.object({
  title: z.string({ message: 'Title is required' }).min(1),
  description: z.string().optional(),
  category: z.string().trim().optional(),
  frequency: z.enum(['Daily']).optional(),
});

export const updateHabitSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  category: z.string().trim().optional(),
  frequency: z.enum(['Daily']).optional(),
});

export const toggleHabitSchema = z.object({
  date: z.string({ message: 'Date is required (YYYY-MM-DD)' }),
});

export type CreateHabitInput = z.infer<typeof createHabitSchema>;
export type UpdateHabitInput = z.infer<typeof updateHabitSchema>;
