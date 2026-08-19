"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleHabitSchema = exports.updateHabitSchema = exports.createHabitSchema = void 0;
const zod_1 = require("zod");
exports.createHabitSchema = zod_1.z.object({
    title: zod_1.z.string({ message: 'Title is required' }).min(1),
    description: zod_1.z.string().optional(),
    category: zod_1.z.string().trim().optional(),
    frequency: zod_1.z.enum(['Daily']).optional(),
});
exports.updateHabitSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
    category: zod_1.z.string().trim().optional(),
    frequency: zod_1.z.enum(['Daily']).optional(),
});
exports.toggleHabitSchema = zod_1.z.object({
    date: zod_1.z.string({ message: 'Date is required (YYYY-MM-DD)' }),
});
