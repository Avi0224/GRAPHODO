"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const Task_1 = require("../models/Task");
// @desc    Create a new task
// @route   POST /api/v1/tasks
// @access  Private
const createTask = async (req, res, next) => {
    try {
        const task = await Task_1.Task.create({
            ...req.body,
            user: req.user?._id,
        });
        res.status(201).json({ status: 'success', data: task });
    }
    catch (error) {
        next(error);
    }
};
exports.createTask = createTask;
// @desc    Get all tasks for a user
// @route   GET /api/v1/tasks
// @access  Private
const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task_1.Task.find({ user: req.user?._id }).sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: tasks });
    }
    catch (error) {
        next(error);
    }
};
exports.getTasks = getTasks;
// @desc    Get a single task by ID
// @route   GET /api/v1/tasks/:id
// @access  Private
const getTaskById = async (req, res, next) => {
    try {
        const task = await Task_1.Task.findOne({ _id: req.params.id, user: req.user?._id });
        if (!task) {
            return res.status(404).json({ status: 'error', message: 'Task not found' });
        }
        res.status(200).json({ status: 'success', data: task });
    }
    catch (error) {
        next(error);
    }
};
exports.getTaskById = getTaskById;
// @desc    Update a task
// @route   PATCH /api/v1/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
    try {
        const task = await Task_1.Task.findOneAndUpdate({ _id: req.params.id, user: req.user?._id }, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).json({ status: 'error', message: 'Task not found' });
        }
        res.status(200).json({ status: 'success', data: task });
    }
    catch (error) {
        next(error);
    }
};
exports.updateTask = updateTask;
// @desc    Delete a task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task_1.Task.findOneAndDelete({ _id: req.params.id, user: req.user?._id });
        if (!task) {
            return res.status(404).json({ status: 'error', message: 'Task not found' });
        }
        res.status(204).json({ status: 'success', data: null });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTask = deleteTask;
