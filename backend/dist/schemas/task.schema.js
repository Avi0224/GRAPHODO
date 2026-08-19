"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').trim(),
    description: zod_1.z.string().trim().optional(),
    priority: zod_1.z.enum(['Low', 'Medium', 'High', 'Urgent']).default('Medium'),
    status: zod_1.z.enum(['Pending', 'Completed', 'Archived']).default('Pending'),
    category: zod_1.z.string().trim().optional(),
    tags: zod_1.z.array(zod_1.z.string().trim()).optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    startTime: zod_1.z.string().optional(),
    endTime: zod_1.z.string().optional(),
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').trim().optional(),
    description: zod_1.z.string().trim().optional(),
    priority: zod_1.z.enum(['Low', 'Medium', 'High', 'Urgent']).optional(),
    status: zod_1.z.enum(['Pending', 'Completed', 'Archived']).optional(),
    category: zod_1.z.string().trim().optional(),
    tags: zod_1.z.array(zod_1.z.string().trim()).optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    startTime: zod_1.z.string().optional(),
    endTime: zod_1.z.string().optional(),
});
