import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { MOCK_STATS } from '../utils/mockData';
import { CheckCircle, Clock, Calendar as CalIcon, Activity } from 'lucide-react';

export const StatisticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Statistics</h1>
        <p className="text-slate-400 mt-1">Track your learning progress</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="pt-6 flex items-center gap-4"><div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400"><Activity size={24}/></div><div><p className="text-sm font-medium text-slate-400">Completion Rate</p><h4 className="text-2xl font-bold text-white">{MOCK_STATS.completionRate}%</h4></div></CardContent></Card>
        <Card><CardContent className="pt-6 flex items-center gap-4"><div className="p-3 bg-green-500/20 rounded-lg text-green-400"><CheckCircle size={24}/></div><div><p className="text-sm font-medium text-slate-400">Completed</p><h4 className="text-2xl font-bold text-white">{MOCK_STATS.completedLessons}</h4></div></CardContent></Card>
        <Card><CardContent className="pt-6 flex items-center gap-4"><div className="p-3 bg-blue-500/20 rounded-lg text-blue-400"><CalIcon size={24}/></div><div><p className="text-sm font-medium text-slate-400">Planned</p><h4 className="text-2xl font-bold text-white">{MOCK_STATS.plannedLessons}</h4></div></CardContent></Card>
        <Card><CardContent className="pt-6 flex items-center gap-4"><div className="p-3 bg-purple-500/20 rounded-lg text-purple-400"><Clock size={24}/></div><div><p className="text-sm font-medium text-slate-400">Study Time</p><h4 className="text-2xl font-bold text-white">24h</h4></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Weekly Progress (Mocked Chart Area)</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64 flex items-end gap-2 mt-4">
            {MOCK_STATS.weeklyData.map(d => {
              const max = Math.max(...MOCK_STATS.weeklyData.map(x => x.completed + x.missed + x.planned || 1));
              const h = ((d.completed + d.planned) / max) * 100;
              return (
                <div key={d.week} className="flex-1 flex flex-col items-center justify-end gap-2 group">
                  <div className="w-full bg-slate-700/50 rounded-t-sm relative flex flex-col justify-end overflow-hidden" style={{height: '100%'}}>
                    <div style={{height: `${h}%`}} className="w-full bg-indigo-500 rounded-t-sm transition-all group-hover:bg-indigo-400" />
                  </div>
                  <span className="text-xs text-slate-400">{d.week}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
