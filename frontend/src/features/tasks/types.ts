export interface ISubtask {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface ITask {
  _id: string;
  user: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Pending' | 'Completed' | 'Archived';
  category?: string;
  tags?: string[];
  dueDate?: string;
  startTime?: string;
  endTime?: string;
  subtasks: ISubtask[];
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskPayload = Omit<ITask, '_id' | 'user' | 'subtasks' | 'createdAt' | 'updatedAt' | 'priority' | 'status'> & {
  priority?: ITask['priority'];
  status?: ITask['status'];
  subtasks?: Array<{ title: string; completed: boolean }>;
};

export type UpdateTaskPayload = Partial<CreateTaskPayload>;
