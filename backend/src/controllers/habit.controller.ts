import { Request, Response, NextFunction } from 'express';
import { Habit } from '../models/Habit';
import { CreateHabitInput, UpdateHabitInput } from '../schemas/habit.schema';

export const createHabit = async (req: Request<{}, {}, CreateHabitInput>, res: Response, next: NextFunction) => {
  try {
    const habit = await Habit.create({
      ...req.body,
      user: req.user?._id,
    });
    res.status(201).json({ status: 'success', data: habit });
  } catch (error) {
    next(error);
  }
};

export const getHabits = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const habits = await Habit.find({ user: req.user?._id }).sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', data: habits });
  } catch (error) {
    next(error);
  }
};

export const getHabitById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user?._id });
    if (!habit) {
      return res.status(404).json({ status: 'error', message: 'Habit not found' });
    }
    res.status(200).json({ status: 'success', data: habit });
  } catch (error) {
    next(error);
  }
};

export const updateHabit = async (req: Request<{ id: string }, {}, UpdateHabitInput>, res: Response, next: NextFunction) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.user?._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!habit) {
      return res.status(404).json({ status: 'error', message: 'Habit not found' });
    }
    res.status(200).json({ status: 'success', data: habit });
  } catch (error) {
    next(error);
  }
};

export const deleteHabit = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user?._id });
    if (!habit) {
      return res.status(404).json({ status: 'error', message: 'Habit not found' });
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};

export const toggleHabitDate = async (req: Request<{ id: string }, {}, { date: string }>, res: Response, next: NextFunction) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user?._id });
    if (!habit) {
      return res.status(404).json({ status: 'error', message: 'Habit not found' });
    }

    const { date } = req.body; // YYYY-MM-DD
    const dateIndex = habit.completedDates.indexOf(date);
    
    if (dateIndex > -1) {
      // It was completed, unmark it
      habit.completedDates.splice(dateIndex, 1);
    } else {
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
  } catch (error) {
    next(error);
  }
};
