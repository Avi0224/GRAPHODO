"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const Task_1 = require("../models/Task");
const Habit_1 = require("../models/Habit");
const getDashboardData = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        // Calculate start and end of today
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        // 1. Fetch Today's Tasks
        const todaysTasks = await Task_1.Task.find({
            user: userId,
            dueDate: { $gte: startOfToday, $lte: endOfToday },
        }).sort({ priority: -1, createdAt: 1 }).limit(5);
        // 2. Fetch Habits
        const habits = await Habit_1.Habit.find({ user: userId });
        // 3. Fetch Agenda (Tasks for today that have a startTime)
        const agenda = await Task_1.Task.find({
            user: userId,
            dueDate: { $gte: startOfToday, $lte: endOfToday },
            startTime: { $exists: true, $ne: '' }
        }).sort({ startTime: 1 });
        // 4. Mock Analytics data (for MVP)
        const productivityScore = 87; // Mock out of 100
        const growthPercentage = 12; // Mock percentage increase
        res.status(200).json({
            status: 'success',
            data: {
                performanceFlow: {
                    growthPercentage,
                },
                productivityScore,
                todaysTasks,
                habits,
                agenda,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getDashboardData = getDashboardData;
