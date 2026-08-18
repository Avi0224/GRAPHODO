import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';

export interface WeeklyProductivity {
  name: string;
  completed: number;
  added: number;
}

export interface AnalyticsStats {
  focusScore: number;
  completionRate: number;
  weeklyVelocity: number;
  tasksCompleted: number;
}

export interface AnalyticsData {
  weeklyProductivity: WeeklyProductivity[];
  stats: AnalyticsStats;
}

export const useAnalyticsData = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const { data } = await api.get('/analytics');
      return data.data as AnalyticsData;
    },
  });
};
