
import React from 'react';
import { X, Trash2, Clock, ChevronRight, MessageSquare } from 'lucide-react';
import { GoldenPrompt } from '../types';

interface HistorySidebarProps {
  isOpen: boolean;
  history: GoldenPrompt[];
  onSelect: (prompt: GoldenPrompt) => void;
  onClose: () => void;
  onClear: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, history, onSelect, onClose, onClear }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className={`
        fixed md:relative top-0 right-0 h-full w-full max-w-[320px] bg-slate-900 border-l border-slate-800 z-50 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:hidden'}
      `}>
        <div className="p-4 h-16 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-200">
            <Clock size={18} className="text-amber-500" />
            <span className="font-bold">Recent Projects</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-md md:hidden">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center opacity-40">
              <MessageSquare size={40} className="mb-4" />
              <p className="text-sm">No prompts generated yet.</p>
            </div>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="w-full text-left p-3 rounded-lg hover:bg-slate-800 group transition-all"
              >
                <div className="text-xs text-amber-500/70 font-mono mb-1 flex justify-between">
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-slate-200 font-medium text-sm line-clamp-1 mb-1">
                  {item.role}
                </div>
                <div className="text-slate-500 text-xs line-clamp-2 italic">
                  "{item.originalInput}"
                </div>
              </button>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={onClear}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-500/70 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all"
            >
              <Trash2 size={14} />
              CLEAR ARCHIVE
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default HistorySidebar;
