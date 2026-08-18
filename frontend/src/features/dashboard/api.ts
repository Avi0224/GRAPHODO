import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { ITask } from '../tasks/types';
import type { Habit } from '../habits/api';

export interface DashboardData {
  performanceFlow: {
    growthPercentage: number;
  };
  productivityScore: number;
  todaysTasks: ITask[];
  habits: Habit[];
  agenda: ITask[];
}

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard');
      return data.data as DashboardData;
    },
  });
};
