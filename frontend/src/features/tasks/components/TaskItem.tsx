import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Calendar } from 'lucide-react';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Badge } from '../../../components/ui/Badge';
import { useUpdateTask, useDeleteTask } from '../api';
import type { ITask } from '../types';

const priorityVariant: Record<ITask['priority'], 'default' | 'secondary' | 'warning' | 'error'> = {
  Low: 'default',
  Medium: 'secondary',
  High: 'warning',
  Urgent: 'error',
};

interface TaskItemProps {
  task: ITask;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const isCompleted = task.status === 'Completed';

  const handleToggle = () => {
    updateTask.mutate({
      id: task._id,
      status: isCompleted ? 'Pending' : 'Completed',
    });
  };

  const handleDelete = () => {
    deleteTask.mutate(task._id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="group flex items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3 hover:border-outline-variant hover:-translate-y-0.5 transition-all"
    >
      <Checkbox
        checked={isCompleted}
        onChange={handleToggle}
        aria-label={`Mark "${task.title}" as ${isCompleted ? 'pending' : 'completed'}`}
      />

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate transition-all ${isCompleted ? 'line-through text-on-surface-variant/60' : 'text-on-surface'}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-on-surface-variant truncate mt-0.5">{task.description}</p>
        )}
      </div>

      {task.dueDate && (
        <div className="hidden sm:flex items-center gap-1 text-xs text-on-surface-variant">
          <Calendar size={14} />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}

      <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>

      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 rounded-lg p-2 text-on-surface-variant hover:bg-error/10 hover:text-error transition-all"
        aria-label={`Delete "${task.title}"`}
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
};
