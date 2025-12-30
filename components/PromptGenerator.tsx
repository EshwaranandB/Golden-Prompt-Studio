
import React, { useState, useRef, useEffect } from 'react';
import { Wand2, Loader2, ArrowRight } from 'lucide-react';

interface PromptGeneratorProps {
  onGenerate: (input: string) => void;
  isLoading: boolean;
}

const PromptGenerator: React.FC<PromptGeneratorProps> = ({ onGenerate, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onGenerate(input);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 rounded-2xl blur-xl transition-all group-focus-within:opacity-100 opacity-50"></div>
      
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden focus-within:border-amber-500/50 transition-colors">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What objective would you like me to engineer for you today? (e.g. 'Write a strategic plan for a SaaS startup')"
          className="w-full bg-transparent text-slate-100 p-6 pr-24 outline-none resize-none min-h-[120px] max-h-[400px] text-lg placeholder:text-slate-600 transition-all"
          disabled={isLoading}
        />
        
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <span className="hidden md:block text-[10px] text-slate-500 font-mono">
            CTRL + ENTER
          </span>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all shadow-lg
              ${isLoading || !input.trim() 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 shadow-amber-500/20'}
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Designing...</span>
              </>
            ) : (
              <>
                <Wand2 size={18} />
                <span>Architect</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {["Email Marketing", "Python Refactoring", "Legal Analysis", "Creative Story"].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setInput(tag)}
            className="px-3 py-1 rounded-full border border-slate-800 text-slate-500 text-xs hover:border-slate-700 hover:text-slate-300 transition-all bg-slate-900/50"
          >
            {tag}
          </button>
        ))}
      </div>
    </form>
  );
};

export default PromptGenerator;
