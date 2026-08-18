import React, { useMemo } from 'react';
import { useAnalyticsData } from '../features/analytics/api';
import { Loader2 } from 'lucide-react';

const Analytics: React.FC = () => {
  const { data, isLoading } = useAnalyticsData();

  // Generate random heatmap squares once
  const heatmapSquares = useMemo(() => {
    const colors = [
      'bg-surface-container-highest',
      'bg-secondary-fixed',
      'bg-secondary-fixed-dim',
      'bg-secondary-container',
      'bg-secondary'
    ];
    
    return Array.from({ length: 182 }).map((_, i) => {
      const colorClass = colors[Math.floor(Math.random() * colors.length)];
      return (
        <div 
          key={i}
          className={`heatmap-square w-full rounded-[2px] transition-all hover:ring-2 hover:ring-primary/40 cursor-pointer ${colorClass}`}
        />
      );
    });
  }, []);

  if (isLoading || !data) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const highestDay = [...data.weeklyProductivity].sort((a, b) => b.completed - a.completed)[0];

  return (
    <div className="h-full">
      {/* Content Canvas */}
      <div className="p-lg max-w-[1600px] mx-auto space-y-lg pb-32">
        {/* Header Section */}
        <div className="flex justify-between items-end pb-md">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Analytics Flagship</h2>
            <p className="text-on-surface-variant font-body-md">Real-time performance and habit velocity tracking.</p>
          </div>
          <div className="flex gap-sm">
            <button className="px-md py-sm rounded-lg border border-outline-variant bg-surface text-on-surface hover:bg-surface-container transition-colors flex items-center gap-sm active:scale-[0.98]">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              Last 7 Days
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-lg">
          {/* Main Trend: Area Graph (8 Cols) */}
          <div className="col-span-12 xl:col-span-8 bg-surface border border-outline-variant rounded-xl p-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-xl">
              <h3 className="font-headline-md text-headline-md">Productivity Trend</h3>
              <div className="flex gap-md text-label-sm font-label-sm">
                <span className="flex items-center gap-xs"><span className="w-2 h-2 rounded-full bg-secondary-container"></span> Completed</span>
                <span className="flex items-center gap-xs"><span className="w-2 h-2 rounded-full bg-outline-variant"></span> Target</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 relative">
              {/* Simulated Area Graph SVG */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="gradient-blue" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2170e4" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#2170e4" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0,180 Q100,140 200,160 T400,100 T600,120 T800,40 L800,200 L0,200 Z" fill="url(#gradient-blue)"></path>
                <path d="M0,180 Q100,140 200,160 T400,100 T600,120 T800,40" fill="none" stroke="#2170e4" strokeWidth="3"></path>
              </svg>
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-t border-outline"></div>
                <div className="border-t border-outline"></div>
                <div className="border-t border-outline"></div>
                <div className="border-t border-outline"></div>
              </div>
            </div>
            <div className="mt-md flex justify-between text-label-sm text-on-surface-variant font-mono">
              {data.weeklyProductivity.map((day, i) => (
                <span key={i}>{day.name}</span>
              ))}
            </div>
          </div>

          {/* Stats Summary (4 Cols) */}
          <div className="col-span-12 md:col-span-6 xl:col-span-4 space-y-lg">
            <div className="bg-surface border border-outline-variant rounded-xl p-lg flex flex-col justify-between h-[calc(50%-12px)]">
              <div className="flex justify-between items-start">
                <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Most Productive Day</span>
                <span className="material-symbols-outlined text-secondary">trending_up</span>
              </div>
              <div>
                <p className="font-headline-lg text-headline-lg text-on-surface">{highestDay.name}</p>
                <p className="text-body-md text-on-surface-variant">{highestDay.completed} items completed</p>
              </div>
            </div>
            <div className="bg-on-tertiary-fixed border border-outline-variant rounded-xl p-lg flex flex-col justify-between h-[calc(50%-12px)] text-white">
              <div className="flex justify-between items-start">
                <span className="text-label-sm font-label-sm text-surface-container-highest uppercase tracking-wider">Velocity Growth</span>
                <span className="material-symbols-outlined text-tertiary-fixed-dim">speed</span>
              </div>
              <div>
                <p className="font-headline-lg text-headline-lg">+{data.stats.weeklyVelocity}%</p>
                <p className="text-body-md text-surface-container-highest opacity-80">Compared to last week</p>
              </div>
            </div>
          </div>

          {/* Weekly Bar Graph (4 Cols) */}
          <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-surface border border-outline-variant rounded-xl p-lg flex flex-col">
            <h3 className="font-headline-md text-headline-md mb-lg">Weekly Completion</h3>
            <div className="flex-1 flex items-end justify-between gap-sm pt-xl h-[240px]">
              {data.weeklyProductivity.map((day, idx) => {
                // Calculate height percentage relative to highest day, minimum 10% for visibility
                const maxVal = Math.max(1, highestDay.completed);
                const heightPct = Math.max(10, (day.completed / maxVal) * 100);
                
                return (
                  <div key={idx} className="w-full flex flex-col items-center gap-sm group h-full relative justify-end">
                    <div className="w-full bg-secondary-container/10 rounded-t-lg group-hover:bg-secondary-container/20 transition-all relative flex flex-col justify-end" style={{ height: '100%' }}>
                      <div className="w-full bg-secondary-container rounded-t-lg transition-all" style={{ height: `${heightPct}%` }}></div>
                    </div>
                    <span className="text-label-sm font-label-sm text-on-surface-variant absolute -bottom-6">{day.name.charAt(0)}</span>
                  </div>
                );
              })}
            </div>
            <div className="h-6" /> {/* Spacer for labels */}
          </div>

          {/* Heatmap (8 Cols) */}
          <div className="col-span-12 xl:col-span-8 bg-surface border border-outline-variant rounded-xl p-lg">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md">Consistency Heatmap</h3>
              <div className="flex items-center gap-sm text-label-sm text-on-surface-variant">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-surface-container-highest"></div>
                  <div className="w-3 h-3 rounded-sm bg-secondary-fixed"></div>
                  <div className="w-3 h-3 rounded-sm bg-secondary-fixed-dim"></div>
                  <div className="w-3 h-3 rounded-sm bg-secondary-container"></div>
                  <div className="w-3 h-3 rounded-sm bg-secondary"></div>
                </div>
                <span>More</span>
              </div>
            </div>
            {/* Simplified Heatmap Grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-sm custom-scrollbar" style={{ gridTemplateColumns: 'repeat(26, minmax(12px, 1fr))' }}>
              {heatmapSquares}
            </div>
          </div>

          {/* Comparison: Pie Chart (4 Cols) */}
          <div className="col-span-12 xl:col-span-4 bg-surface border border-outline-variant rounded-xl p-lg flex flex-col">
            <h3 className="font-headline-md text-headline-md mb-xl">Task Success Rate</h3>
            <div className="relative flex-1 flex items-center justify-center min-h-[240px]">
              {/* CSS Conic Gradient Pie Chart */}
              <div 
                className="w-48 h-48 rounded-full shadow-inner border-[12px] border-surface transition-all" 
                style={{ background: `conic-gradient(#2170e4 0% ${data.stats.completionRate}%, #e2e2e2 ${data.stats.completionRate}% 100%)` }}
              >
                <div className="w-full h-full rounded-full bg-surface/40 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-headline-md font-bold text-on-surface">{data.stats.completionRate}%</p>
                    <p className="text-label-sm uppercase font-label-sm text-on-surface-variant">Completed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-sm mt-md">
              <div className="flex justify-between items-center p-sm rounded-lg hover:bg-surface-container transition-colors">
                <span className="flex items-center gap-md font-body-md"><span className="w-3 h-3 rounded-full bg-primary"></span> Completed Tasks</span>
                <span className="font-mono font-semibold text-on-surface-variant">{data.stats.tasksCompleted}</span>
              </div>
            </div>
          </div>

          {/* Insights / Latest Metrics (8 Cols) */}
          <div className="col-span-12 xl:col-span-8 bg-surface border border-outline-variant rounded-xl p-lg">
            <h3 className="font-headline-md text-headline-md mb-lg">Technical Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-label-sm font-label-sm text-on-surface-variant uppercase border-b border-outline-variant">
                  <tr>
                    <th className="py-md px-sm">Metric Entity</th>
                    <th className="py-md px-sm text-right">Raw Value</th>
                    <th className="py-md px-sm text-right">Efficiency</th>
                  </tr>
                </thead>
                <tbody className="text-body-md divide-y divide-outline-variant/30">
                  <tr className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-md px-sm flex items-center gap-sm">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      Focus Score
                    </td>
                    <td className="py-md px-sm text-right font-mono">{data.stats.focusScore}</td>
                    <td className="py-md px-sm text-right">
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden inline-block max-w-[100px]">
                        <div className="bg-secondary-container h-full" style={{ width: `${data.stats.focusScore}%`}}></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-md px-sm flex items-center gap-sm">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Completion Rate
                    </td>
                    <td className="py-md px-sm text-right font-mono">{data.stats.completionRate}%</td>
                    <td className="py-md px-sm text-right">
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden inline-block max-w-[100px]">
                        <div className="bg-primary h-full" style={{ width: `${data.stats.completionRate}%`}}></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
