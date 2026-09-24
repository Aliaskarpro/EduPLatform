import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SkeletonCard } from '../components/ui/Skeleton';
import { useAuthStore } from '../store/authStore';
import { BookOpen, CheckCircle, XCircle, Calendar, Play } from 'lucide-react';
import { MOCK_STATS, MOCK_SCHEDULE, MOCK_NOTES } from '../utils/mockData';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    setTimeout(() => setLoading(false), 800);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>;
  }

  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = time.toLocaleTimeString('en-US');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Good day, {user?.firstName || 'Student'}!</h1>
        <p className="text-slate-400 mt-1">{dateStr} • {timeStr}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="pt-6 flex items-center gap-4"><div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400"><BookOpen size={24}/></div><div><p className="text-sm font-medium text-slate-400">Total Lessons</p><h4 className="text-2xl font-bold text-white">{MOCK_STATS.totalLessons}</h4></div></CardContent></Card>
        <Card><CardContent className="pt-6 flex items-center gap-4"><div className="p-3 bg-green-500/20 rounded-lg text-green-400"><CheckCircle size={24}/></div><div><p className="text-sm font-medium text-slate-400">Completed</p><h4 className="text-2xl font-bold text-white">{MOCK_STATS.completedLessons}</h4></div></CardContent></Card>
        <Card><CardContent className="pt-6 flex items-center gap-4"><div className="p-3 bg-red-500/20 rounded-lg text-red-400"><XCircle size={24}/></div><div><p className="text-sm font-medium text-slate-400">Missed</p><h4 className="text-2xl font-bold text-white">{MOCK_STATS.missedLessons}</h4></div></CardContent></Card>
        <Card><CardContent className="pt-6 flex items-center gap-4"><div className="p-3 bg-blue-500/20 rounded-lg text-blue-400"><Calendar size={24}/></div><div><p className="text-sm font-medium text-slate-400">Planned</p><h4 className="text-2xl font-bold text-white">{MOCK_STATS.plannedLessons}</h4></div></CardContent></Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Today's Schedule</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {MOCK_SCHEDULE.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-700/50">
                <div>
                  <h4 className="font-medium text-white">{s.title}</h4>
                  <p className="text-sm text-slate-400">{new Date(s.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • {s.teacherName}</p>
                </div>
                <Badge variant={s.status as any}>{s.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Level Progress</CardTitle></CardHeader>
          <CardContent>
            <div className="flex justify-between items-end mb-2">
              <Badge variant="info">Intermediate</Badge>
              <span className="text-sm text-slate-400">2400 XP</span>
            </div>
            <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[60%]"></div>
            </div>
            <p className="mt-3 text-sm text-slate-400">Keep going! 4 more lessons to next level.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent Notes</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {MOCK_NOTES.map(n => (
            <div key={n.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-700/50">
              <h4 className="font-medium text-white mb-2">{n.title}</h4>
              <p className="text-sm text-slate-400 line-clamp-2">{n.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
