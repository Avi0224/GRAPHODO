import { Request, Response, NextFunction } from 'express';
import { Task, ITask } from '../models/Task';
import { CreateTaskInput, UpdateTaskInput } from '../schemas/task.schema';

// @desc    Create a new task
// @route   POST /api/v1/tasks
// @access  Private
export const createTask = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user?._id,
    });
    res.status(201).json({ status: 'success', data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks for a user
// @route   GET /api/v1/tasks
// @access  Private
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find({ user: req.user?._id }).sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', data: tasks });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single task by ID
// @route   GET /api/v1/tasks/:id
// @access  Private
export const getTaskById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user?._id });
    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }
    res.status(200).json({ status: 'success', data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PATCH /api/v1/tasks/:id
// @access  Private
export const updateTask = async (
  req: Request<{ id: string }, {}, UpdateTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user?._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }
    res.status(200).json({ status: 'success', data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user?._id });

    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
