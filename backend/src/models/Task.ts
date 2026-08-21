import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface ISubtask extends Document {
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface ITask extends Document {
  user: IUser['_id'];
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Pending' | 'Completed' | 'Archived';
  category?: string;
  tags?: string[];
  dueDate?: Date;
  startTime?: string;
  endTime?: string;
  subtasks: ISubtask[];
  createdAt: Date;
  updatedAt: Date;
}

const SubtaskSchema: Schema<ISubtask> = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const TaskSchema: Schema<ITask> = new Schema(
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
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Archived'],
      default: 'Pending',
    },
    category: {
      type: String,
      trim: true,
      default: 'Work',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    dueDate: {
      type: Date,
    },
    startTime: {
      type: String,
      trim: true,
    },
    endTime: {
      type: String,
      trim: true,
    },
    subtasks: [SubtaskSchema],
  },
  {
    timestamps: true,
  }
);

// Performance Indexes
TaskSchema.index({ user: 1, status: 1 });
TaskSchema.index({ user: 1, dueDate: 1 });

export const Task = mongoose.model<ITask>('Task', TaskSchema);
