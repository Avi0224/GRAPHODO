import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { TaskItem } from './TaskItem';
import type { ITask } from '../types';

interface TaskListProps {
  tasks: ITask[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </AnimatePresence>
    </div>
  );
};
