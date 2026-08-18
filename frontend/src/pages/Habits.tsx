import React, { useState } from 'react';
import { useHabits, useCreateHabit, useToggleHabitDate } from '../features/habits/api';
import { Loader2 } from 'lucide-react';

const Habits: React.FC = () => {
  const { data: habits, isLoading } = useHabits();
  const { mutate: createHabit } = useCreateHabit();
  const { mutate: toggleHabitDate } = useToggleHabitDate();

  const [toastVisible, setToastVisible] = useState(false);
  const [animatedHabit, setAnimatedHabit] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const handleToggleHabit = (id: string, isCompletedToday: boolean) => {
    toggleHabitDate({ id, date: today });
    if (!isCompletedToday) {
      setAnimatedHabit(id);
      setToastVisible(true);
      setTimeout(() => setAnimatedHabit(null), 400);
      setTimeout(() => setToastVisible(false), 3000);
    }
  };

  const handleCreateHabit = () => {
    const title = window.prompt("Enter habit title:");
    if (title && title.trim()) {
      createHabit({
        title: title.trim(),
        frequency: 'Daily',
        category: 'Personal'
      });
    }
  };

  if (isLoading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const activeHabits = habits || [];
  const completedTodayCount = activeHabits.filter(h => h.completedDates.includes(today)).length;
  const progress = activeHabits.length === 0 ? 0 : (completedTodayCount / activeHabits.length) * 100;
  
  // Consistency rate calculation (mocked somewhat based on total completions vs total possible for last 30 days)
  const totalCompletions = activeHabits.reduce((acc, h) => acc + h.completedDates.length, 0);
  const possibleCompletions = activeHabits.length * 30; // approx 30 days
  const consistencyRate = possibleCompletions ? Math.min(Math.round((totalCompletions / possibleCompletions) * 100), 100) : 0;
  
  const bestStreak = activeHabits.length > 0 ? Math.max(...activeHabits.map(h => h.longestStreak)) : 0;

  return (
    <div className="relative h-full">
      {/* Dashboard Canvas */}
      <div className="space-y-lg pb-32">
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Habit Evolution</h2>
            <p className="text-body-lg text-on-surface-variant">Consistency is the bridge between goals and accomplishment.</p>
          </div>
          <div className="flex gap-sm">
            <button className="px-md py-2 bg-surface-container-high rounded-lg text-body-md font-semibold hover:bg-surface-container-highest transition-all flex items-center gap-2 btn-active">
              <span className="material-symbols-outlined">filter_list</span> Filters
            </button>
            <button onClick={handleCreateHabit} className="px-md py-2 bg-primary text-on-primary rounded-lg text-body-md font-semibold hover:opacity-90 transition-all flex items-center gap-2 btn-active">
              <span className="material-symbols-outlined">add</span> Create Habit
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-lg">
          {/* Summary Card: Consistency Rate */}
          <div className="col-span-12 lg:col-span-4 glass-card rounded-xl p-lg flex flex-col justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Consistency Rate</h3>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Current Month</p>
            </div>
            <div className="py-xl flex flex-col items-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-surface-container-highest" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-primary-container transition-all duration-1000" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * consistencyRate / 100)} strokeWidth="8"></circle>
                </svg>
                <span className="absolute text-headline-lg font-black text-on-surface">{consistencyRate}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-sm">
              <div className="p-sm bg-surface-container-low rounded-lg">
                <p className="text-label-sm text-on-surface-variant">Best Streak</p>
                <p className="text-body-lg font-bold">{bestStreak} Days</p>
              </div>
              <div className="p-sm bg-surface-container-low rounded-lg">
                <p className="text-label-sm text-on-surface-variant">Completed</p>
                <p className="text-body-lg font-bold">{totalCompletions}</p>
              </div>
            </div>
          </div>

          {/* Habits List Section */}
          <div className="col-span-12 lg:col-span-8 space-y-md">
            <div className="flex items-center justify-between px-xs">
              <h3 className="font-headline-md text-headline-md text-on-surface">Daily Check-in</h3>
              <div className="text-body-md text-on-surface-variant">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
            </div>

            {activeHabits.length === 0 && (
              <div className="p-xl text-center glass-card rounded-xl text-on-surface-variant">
                You haven't created any habits yet. Click "Create Habit" to get started!
              </div>
            )}

            {activeHabits.map((habit, index) => {
              const isCompletedToday = habit.completedDates.includes(today);
              const colors = ['blue', 'orange', 'purple', 'green'];
              const color = colors[index % colors.length];
              
              // Map icons based on titles or defaults
              let icon = 'local_fire_department';
              if (habit.title.toLowerCase().includes('hydrate') || habit.title.toLowerCase().includes('water')) icon = 'water_drop';
              if (habit.title.toLowerCase().includes('read') || habit.title.toLowerCase().includes('book')) icon = 'auto_stories';
              if (habit.title.toLowerCase().includes('meditat') || habit.title.toLowerCase().includes('mind')) icon = 'self_improvement';

              return (
                <div
                  key={habit._id}
                  className={`group rounded-xl p-md flex items-center justify-between transition-all hover:shadow-md cursor-pointer border-l-4 ${
                    isCompletedToday ? `bg-primary-container/10 border-l-${color}-400` : `glass-card border-l-transparent`
                  } ${animatedHabit === habit._id ? 'habit-success-pop' : ''}`}
                  onClick={() => handleToggleHabit(habit._id, isCompletedToday)}
                >
                  <div className="flex items-center gap-md">
                    <div className={`w-12 h-12 rounded-xl bg-${color}-50 flex items-center justify-center text-${color}-500`}>
                      <span className="material-symbols-outlined fill-icon">{icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-on-surface leading-tight">{habit.title}</h4>
                      <p className="text-body-md text-on-surface-variant">{habit.description || 'Daily Habit'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-xl">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-tertiary-container animate-fire fill-icon">local_fire_department</span>
                      <span className="font-bold text-headline-md">{habit.currentStreak}</span>
                    </div>
                    <button
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCompletedToday ? 'bg-primary-container' : 'border-2 border-outline-variant group-hover:border-primary-container'
                      }`}
                      onClick={(e) => { e.stopPropagation(); handleToggleHabit(habit._id, isCompletedToday); }}
                    >
                      <span className={`material-symbols-outlined select-none ${isCompletedToday ? 'text-on-primary-container' : 'text-transparent'}`}>check</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Monthly Heatmap / Progress Area */}
          <div className="col-span-12 glass-card rounded-xl p-lg mt-md">
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Weekly Progress Distribution</h3>
              <div className="flex gap-2">
                <button className="px-sm py-1 rounded bg-surface-container-highest text-label-sm font-bold">Week</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-md">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, idx) => {
                const currentDay = new Date().getDay();
                // map Sunday=0 to 6, Mon=1 to 0
                const mappedDay = currentDay === 0 ? 6 : currentDay - 1;
                const isToday = mappedDay === idx;
                
                // Mock visual bars depending on today
                let height = '0%';
                if (idx < mappedDay) height = '70%'; // past days mock
                if (isToday) height = `${progress}%`;

                return (
                  <div key={day} className="space-y-sm text-center">
                    <div className={`h-48 w-full ${isToday ? 'bg-surface-container-high ring-2 ring-primary ring-offset-2 ring-offset-surface' : 'bg-surface-container'} rounded-lg relative overflow-hidden flex flex-col justify-end`}>
                      <div
                        className="w-full bg-primary-container rounded-t-sm transition-all duration-500"
                        style={{ height }}
                      ></div>
                    </div>
                    <span className={`text-label-sm font-bold ${isToday ? 'text-primary' : ''}`}>{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast Container */}
      <div
        className={`fixed bottom-lg right-lg transition-all duration-300 z-[100] ${
          toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
        }`}
      >
        <div className="bg-surface-container-lowest border-l-4 border-l-primary shadow-2xl rounded-lg p-md flex items-center gap-md">
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined">celebration</span>
          </div>
          <div>
            <p className="font-bold text-on-surface">Habit Completed!</p>
            <p className="text-body-md text-on-surface-variant">Keep up the momentum.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habits;
