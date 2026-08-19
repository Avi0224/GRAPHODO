"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyticsData = void 0;
const Task_1 = require("../models/Task");
const getAnalyticsData = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const now = new Date();
        const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
        // Get tasks from last 7 days
        const recentTasks = await Task_1.Task.find({
            user: userId,
            createdAt: { $gte: sevenDaysAgo }
        });
        const completedTasks = recentTasks.filter(t => t.status === 'Completed');
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weeklyProductivity = [
            { name: 'Mon', completed: 0, added: 0 },
            { name: 'Tue', completed: 0, added: 0 },
            { name: 'Wed', completed: 0, added: 0 },
            { name: 'Thu', completed: 0, added: 0 },
            { name: 'Fri', completed: 0, added: 0 },
            { name: 'Sat', completed: 0, added: 0 },
            { name: 'Sun', completed: 0, added: 0 },
        ];
        recentTasks.forEach(task => {
            const dayName = days[task.createdAt.getDay()];
            const dayData = weeklyProductivity.find(d => d.name === dayName);
            if (dayData) {
                dayData.added++;
                if (task.status === 'Completed') {
                    dayData.completed++;
                }
            }
        });
        const stats = {
            focusScore: 84, // Mocked for MVP
            completionRate: recentTasks.length ? Math.round((completedTasks.length / recentTasks.length) * 100) : 0,
            weeklyVelocity: 14, // positive 14% mock
            tasksCompleted: completedTasks.length
        };
        res.status(200).json({
            status: 'success',
            data: {
                weeklyProductivity,
                stats
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAnalyticsData = getAnalyticsData;
