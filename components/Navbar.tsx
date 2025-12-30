
import React from 'react';
import { History, LayoutGrid, Zap } from 'lucide-react';

interface NavbarProps {
  onToggleHistory: () => void;
  historyCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleHistory, historyCount }) => {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-6 h-16 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Zap className="text-white fill-current" size={20} />
        </div>
        <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          GoldenPrompt
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleHistory}
          className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
          title="History"
        >
          <History size={22} />
          {historyCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-slate-950">
              {historyCount > 9 ? '9+' : historyCount}
            </span>
          )}
        </button>
        
        <button className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-all">
          <LayoutGrid size={16} />
          <span>Templates</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
