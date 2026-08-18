import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IHabit extends Document {
  user: IUser['_id'];
  title: string;
  description?: string;
  category?: string;
  frequency: 'Daily'; // Only daily for MVP
  currentStreak: number;
  longestStreak: number;
  completedDates: string[]; // store as YYYY-MM-DD
  createdAt: Date;
  updatedAt: Date;
}

const HabitSchema: Schema<IHabit> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: 'Personal',
    },
    frequency: {
      type: String,
      enum: ['Daily'],
      default: 'Daily',
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    completedDates: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Habit = mongoose.model<IHabit>('Habit', HabitSchema);
