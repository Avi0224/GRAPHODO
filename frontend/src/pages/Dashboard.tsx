import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDashboardData } from '../features/dashboard/api';
import { useUpdateTask } from '../features/tasks/api';
import { Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  useAuth();
  const circleRef = useRef<SVGCircleElement>(null);
  
  const { data, isLoading } = useDashboardData();
  const { mutate: updateTask } = useUpdateTask();

  useEffect(() => {
    if (data && circleRef.current) {
      // Calculate offset based on score (0 to 100). Circumference is ~100 (2*pi*16).
      // offset = 100 - score
      const score = data.productivityScore || 0;
      const offset = 100 - score;
      circleRef.current.style.strokeDashoffset = offset.toString();
    }
  }, [data]);

  const handleTaskCheck = (taskId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    updateTask({ id: taskId, status: checked ? 'Completed' : 'Pending' });
    
    if (checked) {
      const toastContainer = document.getElementById('toast-container');
      if (toastContainer) {
        const toast = document.createElement('div');
        toast.className = "bg-surface-container-lowest border border-outline-variant shadow-lg rounded-lg p-md flex items-center gap-md translate-y-10 opacity-0 transition-all duration-300 border-l-4 border-l-primary z-50";
        toast.innerHTML = `
            <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            <div>
                <p class="font-bold text-body-md text-on-surface">Task Updated</p>
                <p class="text-label-sm text-on-surface-variant">Progress synchronized successfully.</p>
            </div>
        `;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.remove('translate-y-10', 'opacity-0'), 10);
        setTimeout(() => {
            toast.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
      }
    }
  };

  if (isLoading || !data) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <>
      {/* Top Section: Welcome & Bento Stats */}
      <div className="grid grid-cols-12 gap-lg mb-lg">
        {/* Large Ambient Progress Graph Card */}
        <div className="col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute ambient-glow -top-20 -right-20 w-64 h-64"></div>
          <div className="relative z-10 flex justify-between items-start mb-xl">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold mb-xs">Performance Flow</h2>
              <p className="text-on-surface-variant">Your productivity output has {data.performanceFlow.growthPercentage >= 0 ? 'increased' : 'decreased'} by <span className="text-primary font-bold">{Math.abs(data.performanceFlow.growthPercentage)}%</span> this week.</p>
            </div>
            <div className="flex gap-sm">
              <span className="bg-primary-container/20 text-on-primary-container px-sm py-1 rounded-full text-label-sm font-semibold">Live Growth</span>
            </div>
          </div>
          <div className="h-48 w-full mt-md flex items-center justify-center text-outline-variant">
            {/* Real charts go to Analytics page */}
            [Graph Placeholder]
          </div>
        </div>

        {/* Productivity Score Card */}
        <div className="col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300">
          <h3 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-md">Productivity Score</h3>
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle className="stroke-surface-container stroke-[2.5]" cx="18" cy="18" fill="none" r="16"></circle>
              <circle ref={circleRef} className="progress-circle stroke-primary stroke-[2.5] transition-all duration-1000 ease-out" cx="18" cy="18" fill="none" r="16" strokeLinecap="round" strokeDasharray="100 100" strokeDashoffset="100"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-[42px] leading-none text-primary">{data.productivityScore}</span>
              <span className="text-label-sm text-on-surface-variant">/ 100</span>
            </div>
          </div>
          <div className="mt-md">
            <p className="font-semibold text-primary">Exceptional Focus</p>
            <p className="text-body-md text-on-surface-variant">Top 5% of all users today.</p>
          </div>
        </div>
      </div>

      {/* Middle Section: Tasks and Habits */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Today's Tasks List */}
        <div className="col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="font-headline-md text-headline-md font-bold">Today's Tasks</h3>
            <button className="text-primary font-semibold text-body-md hover:underline flex items-center gap-xs">
              View All <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
          <div className="space-y-sm">
            {data.todaysTasks.length === 0 && (
              <div className="text-center p-md text-on-surface-variant">No tasks for today. You're all caught up!</div>
            )}
            {data.todaysTasks.map(task => (
              <div key={task._id} className={`flex items-center p-md border border-outline-variant/40 rounded-lg hover:border-primary transition-colors group/task ${task.status === 'Completed' ? 'bg-surface-container-low/30 opacity-60' : ''}`}>
                <label className="relative flex items-center cursor-pointer">
                  <input type="checkbox" checked={task.status === 'Completed'} onChange={handleTaskCheck(task._id)} className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer" />
                </label>
                <div className="ml-md flex-1">
                  <h4 className={`font-semibold text-body-lg ${task.status === 'Completed' ? 'line-through' : ''}`}>{task.title}</h4>
                  <p className="text-label-sm text-on-surface-variant flex items-center gap-sm">
                    {task.dueDate && <><span className="material-symbols-outlined text-[14px]">schedule</span> {new Date(task.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</>}
                  </p>
                </div>
                <div className="flex items-center gap-md">
                  <span className={`px-sm py-1 rounded text-label-sm font-bold uppercase tracking-tighter ${task.priority === 'High' || task.priority === 'Urgent' ? 'bg-error/10 text-error' : task.priority === 'Medium' ? 'bg-secondary-container/20 text-secondary' : 'bg-outline-variant/20 text-outline'}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Bento Column: Habits & Calendar */}
        <div className="col-span-5 space-y-lg">
          {/* Habits Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg group hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md font-bold">Habits</h3>
              <span className="text-label-sm text-on-surface-variant">{data.habits.length} Active</span>
            </div>
            <div className="grid grid-cols-2 gap-sm">
              {data.habits.length === 0 && <p className="col-span-2 text-on-surface-variant text-sm">No habits tracking yet.</p>}
              {data.habits.slice(0, 4).map((habit, idx) => {
                const today = new Date().toISOString().split('T')[0];
                const isCompletedToday = habit.completedDates.includes(today);
                const colors = ['tertiary', 'primary', 'secondary', 'error'];
                const color = colors[idx % colors.length];

                return (
                  <div key={habit._id} className={`p-md bg-surface-container-low/50 rounded-lg flex flex-col gap-sm ${isCompletedToday ? 'border border-primary/20' : ''}`}>
                    <div className="flex justify-between">
                      <span className={`material-symbols-outlined text-${color} filled-icon`}>local_fire_department</span>
                      <span className={`text-label-sm font-bold text-${color}`}>{habit.currentStreak} Days</span>
                    </div>
                    <span className="font-semibold text-body-md truncate" title={habit.title}>{habit.title}</span>
                    <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden mt-xs">
                      <div className={`bg-${color} h-full rounded-full transition-all`} style={{ width: `${Math.min((habit.currentStreak / 30) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calendar Agenda Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg group hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-sm mb-lg">
              <span className="material-symbols-outlined text-on-surface-variant">calendar_today</span>
              <h3 className="font-headline-md text-headline-md font-bold">Today's Agenda</h3>
            </div>
            <div className="space-y-md border-l-2 border-outline-variant/30 pl-lg relative">
              {data.agenda.length === 0 && <p className="text-on-surface-variant text-sm">Nothing scheduled.</p>}
              {data.agenda.map(item => (
                <div key={item._id} className="relative">
                  <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-surface-container-lowest"></div>
                  <span className="text-label-sm text-on-surface-variant">{item.startTime} {item.endTime ? `- ${item.endTime}` : ''}</span>
                  <h4 className="font-semibold text-body-md truncate">{item.title}</h4>
                  <p className="text-label-sm text-on-surface-variant">{item.category || 'General'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="toast-container" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"></div>
    </>
  );
};

export default Dashboard;
