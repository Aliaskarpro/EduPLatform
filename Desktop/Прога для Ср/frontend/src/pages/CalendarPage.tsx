import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Plus } from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const [view, setView] = useState<'month'|'week'|'day'>('month');
  
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Calendar</h1>
          <p className="text-slate-400 mt-1">Manage your schedule</p>
        </div>
        <Button><Plus size={18} className="mr-2" /> Add Event</Button>
      </div>

      <Card className="flex-1 flex flex-col min-h-[600px]">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700/50 pb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <CalIcon className="mr-2" /> September 2026
            </h2>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm"><ChevronLeft size={18}/></Button>
              <Button variant="ghost" size="sm">Today</Button>
              <Button variant="ghost" size="sm"><ChevronRight size={18}/></Button>
            </div>
          </div>
          <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
            {(['month','week','day'] as const).map(v => (
              <button 
                key={v} 
                onClick={() => setView(v)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${view === v ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 flex flex-col">
          <div className="grid grid-cols-7 border-b border-slate-700/50">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <div key={d} className="p-3 text-center text-sm font-medium text-slate-400 border-r border-slate-700/50 last:border-0">{d}</div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-7 grid-rows-5">
            {Array.from({length: 35}).map((_, i) => {
              const date = i - 1; // start from prev month logic mock
              const isCurrent = date > 0 && date <= 30;
              const isToday = date === 24;
              return (
                <div key={i} className={`p-2 border-r border-b border-slate-700/50 min-h-[100px] ${!isCurrent ? 'bg-slate-800/30' : ''}`}>
                  <span className={`inline-flex items-center justify-center w-6 h-6 text-sm ${isToday ? 'bg-indigo-600 text-white rounded-full' : (isCurrent ? 'text-slate-300' : 'text-slate-600')}`}>
                    {date > 0 ? (date > 30 ? date - 30 : date) : 31 + date}
                  </span>
                  {date === 24 && (
                    <div className="mt-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs p-1 rounded">
                      10:00 AM React Patterns
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
