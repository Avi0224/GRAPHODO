"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleHabitDate = exports.deleteHabit = exports.updateHabit = exports.getHabitById = exports.getHabits = exports.createHabit = void 0;
const Habit_1 = require("../models/Habit");
const createHabit = async (req, res, next) => {
    try {
        const habit = await Habit_1.Habit.create({
            ...req.body,
            user: req.user?._id,
        });
        res.status(201).json({ status: 'success', data: habit });
    }
    catch (error) {
        next(error);
    }
};
exports.createHabit = createHabit;
const getHabits = async (req, res, next) => {
    try {
        const habits = await Habit_1.Habit.find({ user: req.user?._id }).sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: habits });
    }
    catch (error) {
        next(error);
    }
};
exports.getHabits = getHabits;
const getHabitById = async (req, res, next) => {
    try {
        const habit = await Habit_1.Habit.findOne({ _id: req.params.id, user: req.user?._id });
        if (!habit) {
            return res.status(404).json({ status: 'error', message: 'Habit not found' });
        }
        res.status(200).json({ status: 'success', data: habit });
    }
    catch (error) {
        next(error);
    }
};
exports.getHabitById = getHabitById;
const updateHabit = async (req, res, next) => {
    try {
        const habit = await Habit_1.Habit.findOneAndUpdate({ _id: req.params.id, user: req.user?._id }, req.body, { new: true, runValidators: true });
        if (!habit) {
            return res.status(404).json({ status: 'error', message: 'Habit not found' });
        }
        res.status(200).json({ status: 'success', data: habit });
    }
    catch (error) {
        next(error);
    }
};
exports.updateHabit = updateHabit;
const deleteHabit = async (req, res, next) => {
    try {
        const habit = await Habit_1.Habit.findOneAndDelete({ _id: req.params.id, user: req.user?._id });
        if (!habit) {
            return res.status(404).json({ status: 'error', message: 'Habit not found' });
        }
        res.status(204).json({ status: 'success', data: null });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteHabit = deleteHabit;
const toggleHabitDate = async (req, res, next) => {
    try {
        const habit = await Habit_1.Habit.findOne({ _id: req.params.id, user: req.user?._id });
        if (!habit) {
            return res.status(404).json({ status: 'error', message: 'Habit not found' });
        }
        const { date } = req.body; // YYYY-MM-DD
        const dateIndex = habit.completedDates.indexOf(date);
        if (dateIndex > -1) {
            // It was completed, unmark it
            habit.completedDates.splice(dateIndex, 1);
        }
        else {
            // Mark as completed
            habit.completedDates.push(date);
        }
        // Simplistic streak calculation for MVP: 
        habit.currentStreak = habit.completedDates.length;
        if (habit.currentStreak > habit.longestStreak) {
            habit.longestStreak = habit.currentStreak;
        }
        await habit.save();
        res.status(200).json({ status: 'success', data: habit });
    }
    catch (error) {
        next(error);
    }
};
exports.toggleHabitDate = toggleHabitDate;
