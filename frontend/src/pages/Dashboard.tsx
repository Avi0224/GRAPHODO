import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-on-background">Dashboard</h1>
        <p className="mt-2 text-on-surface">Welcome back, {user?.name}!</p>
      </header>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards for future content */}
        <div className="rounded-xl bg-surface p-6 shadow-sm border border-border">
          <h3 className="text-sm font-medium text-on-surface">Total Tasks</h3>
          <p className="mt-2 text-3xl font-bold text-primary">0</p>
        </div>
        <div className="rounded-xl bg-surface p-6 shadow-sm border border-border">
          <h3 className="text-sm font-medium text-on-surface">Completed</h3>
          <p className="mt-2 text-3xl font-bold text-secondary">0</p>
        </div>
        <div className="rounded-xl bg-surface p-6 shadow-sm border border-border">
          <h3 className="text-sm font-medium text-on-surface">Overdue</h3>
          <p className="mt-2 text-3xl font-bold text-error">0</p>
        </div>
      </div>
      
      <div className="rounded-xl bg-surface p-8 shadow-sm border border-border flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-on-background">No tasks yet</h3>
        <p className="mt-1 text-on-surface max-w-sm">Get started by creating a new task to manage your productivity.</p>
        <button className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          Create Task
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
