import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Pin, Search, Plus, Trash2 } from 'lucide-react';
import { MOCK_NOTES } from '../utils/mockData';

export const NotesPage: React.FC = () => {
  const [activeNote, setActiveNote] = useState(MOCK_NOTES[0]);
  
  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-80 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Notes</h1>
          <Button size="sm"><Plus size={16} /></Button>
        </div>
        <Input placeholder="Search notes..." icon={<Search size={16} />} />
        
        <div className="flex-1 overflow-y-auto space-y-2 hide-scrollbar">
          {MOCK_NOTES.map(n => (
            <Card key={n.id} className={`cursor-pointer transition-colors ${activeNote.id === n.id ? 'border-indigo-500 bg-slate-800' : 'hover:border-slate-500'}`} onClick={() => setActiveNote(n)}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-white truncate pr-2">{n.title}</h4>
                  {n.isPinned && <Pin size={14} className="text-indigo-400 shrink-0" />}
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{n.content}</p>
                <div className="mt-3 flex gap-2">
                  {n.tags.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">#{t}</span>)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="flex-1 flex flex-col hidden md:flex">
        {activeNote ? (
          <>
            <CardHeader className="border-b border-slate-700/50 flex flex-row items-center justify-between">
              <input 
                type="text" 
                value={activeNote.title} 
                className="bg-transparent text-xl font-bold text-white focus:outline-none w-full"
                onChange={() => {}}
              />
              <div className="flex gap-2">
                <Button variant="ghost" size="sm"><Pin size={18} className={activeNote.isPinned ? "text-indigo-400" : "text-slate-400"} /></Button>
                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300"><Trash2 size={18} /></Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <textarea 
                className="w-full h-full bg-transparent text-slate-300 p-6 focus:outline-none resize-none"
                value={activeNote.content}
                onChange={() => {}}
                placeholder="Start typing..."
              />
            </CardContent>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500">Select a note or create a new one</div>
        )}
      </Card>
    </div>
  );
};
