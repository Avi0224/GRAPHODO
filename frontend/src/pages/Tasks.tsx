import React, { useEffect, useState } from 'react';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '../features/tasks/api';
import { Loader2 } from 'lucide-react';

const TasksPage: React.FC = () => {
  const { data: tasks, isLoading } = useTasks();
  const { mutate: createTask } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'n' || e.key === 'N') {
        const quickAdd = document.getElementById('quick-add-input');
        if (quickAdd && document.activeElement !== quickAdd && document.activeElement?.tagName !== 'INPUT') {
          e.preventDefault();
          quickAdd.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return;
    createTask({ 
      title: newTaskTitle, 
      dueDate: new Date().toISOString(),
      priority: 'Medium',
      category: 'Work'
    });
    setNewTaskTitle('');
  };

  const handleKeyDownCreate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreateTask();
    }
  };

  const handleRowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input')) return;
    const rows = document.querySelectorAll('.task-row');
    rows.forEach(r => r.classList.remove('bg-surface-container-high', 'border-l-4', 'border-primary'));
    e.currentTarget.classList.add('bg-surface-container-high', 'border-l-4', 'border-primary');
  };

  if (isLoading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const activeTasks = tasks?.filter(t => t.status !== 'Archived') || [];
  const criticalTasks = activeTasks.filter(t => t.priority === 'High' || t.priority === 'Urgent');
  const workTasks = activeTasks.filter(t => (t.priority !== 'High' && t.priority !== 'Urgent') && t.category !== 'Personal');
  const personalTasks = activeTasks.filter(t => (t.priority !== 'High' && t.priority !== 'Urgent') && t.category === 'Personal');

  return (
    <div className="relative h-full">
      {/* Background Atmospheric Effect */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-30">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] -right-[5%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[100px]" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header Content */}
      <div className="flex justify-between items-end mb-xl">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Active Tasks</h2>
          <div className="flex items-center gap-md">
            <span className="text-body-md text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">event</span>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
            <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-[10px] font-bold rounded uppercase tracking-wider">Focus Mode Off</span>
          </div>
        </div>
        <div className="flex items-center gap-sm">
          <button onClick={() => document.getElementById('quick-add-input')?.focus()} className="bg-primary text-white flex items-center gap-sm px-md py-2 rounded-lg font-semibold hover:brightness-110 transition-all active:scale-[0.98]">
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-lg h-full content-start pb-32">
        <div className="col-span-12 xl:col-span-9 space-y-md">
          
          {/* Critical Path */}
          <section>
            <div className="flex items-center gap-sm mb-sm px-md">
              <span className="material-symbols-outlined text-error text-[18px]">priority_high</span>
              <h3 className="text-label-sm font-bold uppercase tracking-widest text-on-surface-variant">Critical Path</h3>
              <span className="ml-auto text-label-sm text-outline">{criticalTasks.length} Tasks</span>
            </div>
            <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
              {criticalTasks.length === 0 && <div className="p-md text-on-surface-variant text-sm text-center">No critical tasks.</div>}
              {criticalTasks.map(task => (
                <div key={task._id} onClick={handleRowClick} className={`task-row flex items-center gap-md px-md py-lg border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors cursor-pointer group border-l-4 border-transparent ${task.status === 'Completed' ? 'opacity-60' : ''}`}>
                  <label className="flex items-center justify-center w-6 h-6 border-2 border-outline-variant rounded-full group-hover:border-primary transition-colors cursor-pointer relative overflow-hidden">
                    <input type="checkbox" checked={task.status === 'Completed'} onChange={(e) => updateTask({ id: task._id, status: e.target.checked ? 'Completed' : 'Pending' })} className="absolute opacity-0 w-full h-full cursor-pointer" />
                    {task.status === 'Completed' && <span className="material-symbols-outlined text-[16px] text-primary">check</span>}
                  </label>
                  <div className="flex-1">
                    <div className="flex items-center gap-sm">
                      <h4 className={`text-body-lg font-semibold text-on-surface ${task.status === 'Completed' ? 'line-through' : ''}`}>{task.title}</h4>
                      <span className="px-2 py-0.5 bg-error/10 text-error text-[10px] font-bold rounded uppercase">{task.priority}</span>
                    </div>
                    {task.dueDate && (
                      <div className="flex items-center gap-md mt-1 text-on-surface-variant text-body-md">
                        <span className="flex items-center gap-1 text-error"><span className="material-symbols-outlined text-[14px]">calendar_today</span> {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="task-actions opacity-0 flex items-center gap-sm transition-opacity group-hover:opacity-100">
                    <button onClick={() => deleteTask(task._id)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-highest text-error"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Work / General Tasks */}
          <section className="mt-xl">
            <div className="flex items-center gap-sm mb-sm px-md">
              <span className="material-symbols-outlined text-secondary text-[18px]">work</span>
              <h3 className="text-label-sm font-bold uppercase tracking-widest text-on-surface-variant">General Work</h3>
              <span className="ml-auto text-label-sm text-outline">{workTasks.length} Tasks</span>
            </div>
            <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
              {workTasks.length === 0 && <div className="p-md text-on-surface-variant text-sm text-center">No work tasks.</div>}
              {workTasks.map(task => (
                <div key={task._id} onClick={handleRowClick} className={`task-row flex items-center gap-md px-md py-lg border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors cursor-pointer group border-l-4 border-transparent ${task.status === 'Completed' ? 'opacity-60' : ''}`}>
                  <label className="flex items-center justify-center w-6 h-6 border-2 border-outline-variant rounded-full group-hover:border-primary transition-colors cursor-pointer relative overflow-hidden">
                    <input type="checkbox" checked={task.status === 'Completed'} onChange={(e) => updateTask({ id: task._id, status: e.target.checked ? 'Completed' : 'Pending' })} className="absolute opacity-0 w-full h-full cursor-pointer" />
                    {task.status === 'Completed' && <span className="material-symbols-outlined text-[16px] text-primary">check</span>}
                  </label>
                  <div className="flex-1">
                    <div className="flex items-center gap-sm">
                      <h4 className={`text-body-lg font-semibold text-on-surface ${task.status === 'Completed' ? 'line-through' : ''}`}>{task.title}</h4>
                      <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded uppercase">{task.category || 'Work'}</span>
                    </div>
                  </div>
                  <div className="task-actions opacity-0 flex items-center gap-sm transition-opacity group-hover:opacity-100">
                    <button onClick={() => deleteTask(task._id)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-highest text-error"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Personal Tasks */}
          <section className="mt-xl">
            <div className="flex items-center gap-sm mb-sm px-md">
              <span className="material-symbols-outlined text-tertiary text-[18px]">person</span>
              <h3 className="text-label-sm font-bold uppercase tracking-widest text-on-surface-variant">Personal Maintenance</h3>
              <span className="ml-auto text-label-sm text-outline">{personalTasks.length} Tasks</span>
            </div>
            <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
              {personalTasks.length === 0 && <div className="p-md text-on-surface-variant text-sm text-center">No personal tasks.</div>}
              {personalTasks.map(task => (
                <div key={task._id} onClick={handleRowClick} className={`task-row flex items-center gap-md px-md py-lg border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors cursor-pointer group border-l-4 border-transparent ${task.status === 'Completed' ? 'opacity-60' : ''}`}>
                  <label className="flex items-center justify-center w-6 h-6 border-2 border-outline-variant rounded-full group-hover:border-primary transition-colors cursor-pointer relative overflow-hidden">
                    <input type="checkbox" checked={task.status === 'Completed'} onChange={(e) => updateTask({ id: task._id, status: e.target.checked ? 'Completed' : 'Pending' })} className="absolute opacity-0 w-full h-full cursor-pointer" />
                    {task.status === 'Completed' && <span className="material-symbols-outlined text-[16px] text-primary">check</span>}
                  </label>
                  <div className="flex-1">
                    <div className="flex items-center gap-sm">
                      <h4 className={`text-body-lg font-semibold text-on-surface ${task.status === 'Completed' ? 'line-through' : ''}`}>{task.title}</h4>
                      <span className="px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded uppercase">Personal</span>
                    </div>
                  </div>
                  <div className="task-actions opacity-0 flex items-center gap-sm transition-opacity group-hover:opacity-100">
                    <button onClick={() => deleteTask(task._id)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-highest text-error"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Side Widgets Area */}
        <div className="col-span-12 xl:col-span-3 space-y-lg">
          <div className="bg-surface-container-low border border-dashed border-outline-variant rounded-2xl p-md">
            <div className="flex items-center gap-sm mb-sm">
              <span className="material-symbols-outlined text-[18px] text-outline">keyboard</span>
              <span className="text-label-sm font-bold text-outline">Shortcuts</span>
            </div>
            <div className="space-y-sm">
              <div className="flex justify-between text-[11px]">
                <span className="text-on-surface-variant">New Task</span>
                <span className="font-mono bg-surface-container-highest px-1 rounded">N</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Task Input (Quick Add) */}
      <div className="fixed bottom-lg left-1/2 -translate-x-1/2 w-full max-w-2xl px-md z-50 ml-32">
        <div className="bg-surface/90 backdrop-blur-xl border border-outline-variant shadow-2xl rounded-2xl p-sm flex items-center gap-sm group focus-within:border-primary transition-all">
          <span className="material-symbols-outlined text-outline ml-md group-focus-within:text-primary">bolt</span>
          <input 
            id="quick-add-input" 
            className="flex-1 bg-transparent border-none focus:ring-0 text-body-lg py-3 placeholder:text-outline-variant outline-none" 
            placeholder="I want to..." 
            type="text" 
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyDownCreate}
          />
          <div className="flex items-center gap-sm pr-sm">
            <button onClick={handleCreateTask} className="bg-primary text-white px-md py-1.5 rounded-lg font-bold text-body-md flex items-center gap-xs active:scale-[0.98]">
              Add <span className="text-[10px] opacity-70">↵</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
