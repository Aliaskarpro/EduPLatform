import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Clock, BookOpen, FileText, BarChart2, User as UserIcon } from 'lucide-react';
import { cn } from '../utils/cn';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/calendar', icon: Calendar, label: 'Calendar' },
  { path: '/schedule', icon: Clock, label: 'Schedule' },
  { path: '/classes', icon: BookOpen, label: 'Classes' },
  { path: '/notes', icon: FileText, label: 'Notes' },
  { path: '/statistics', icon: BarChart2, label: 'Statistics' },
  { path: '/account', icon: UserIcon, label: 'Account' },
];

export const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-900">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-500">EduPlatform</h1>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors',
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900 px-4 py-2 flex justify-between items-center z-50">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center p-2 rounded-lg',
                isActive ? 'text-indigo-500' : 'text-slate-400'
              )}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
