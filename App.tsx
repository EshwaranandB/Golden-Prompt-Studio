
import React, { useState, useEffect } from 'react';
import { Sparkles, History, Settings, Trash2, Cpu, ExternalLink } from 'lucide-react';
import Navbar from './components/Navbar';
import PromptGenerator from './components/PromptGenerator';
import PromptDisplay from './components/PromptDisplay';
import HistorySidebar from './components/HistorySidebar';
import { GoldenPrompt, AppStatus } from './types';
import { generateGoldenPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [history, setHistory] = useState<GoldenPrompt[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<GoldenPrompt | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load history from local storage
  useEffect(() => {
    const saved = localStorage.getItem('prompt_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to local storage
  useEffect(() => {
    localStorage.setItem('prompt_history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async (input: string) => {
    if (!input.trim()) return;
    
    setStatus(AppStatus.LOADING);
    setError(null);
    
    try {
      const result = await generateGoldenPrompt(input);
      setCurrentPrompt(result);
      setHistory(prev => [result, ...prev].slice(0, 50));
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setStatus(AppStatus.ERROR);
      setError(err.message || "An unexpected error occurred while generating the prompt.");
    }
  };

  const handleSelectHistory = (prompt: GoldenPrompt) => {
    setCurrentPrompt(prompt);
    setIsSidebarOpen(false);
    setStatus(AppStatus.SUCCESS);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('prompt_history');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col overflow-hidden">
      <Navbar 
        onToggleHistory={() => setIsSidebarOpen(!isSidebarOpen)} 
        historyCount={history.length}
      />
      
      <main className="flex-1 flex flex-col md:flex-row relative">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 lg:p-12 space-y-8 overflow-y-auto w-full">
          <div className="w-full max-w-4xl space-y-12">
            
            {/* Title Section */}
            <div className="text-center space-y-4 pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium">
                <Sparkles size={14} />
                <span>Golden Prompt Architect v1.0</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-100 to-amber-200">
                Engineer the Perfect Prompt
              </h1>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Transform simple ideas into world-class instructions. Using advanced LLM-native expansion to ensure consistent, high-quality results across Claude, Gemini, and GPT.
              </p>
            </div>

            {/* Input Section */}
            <PromptGenerator 
              onGenerate={handleGenerate} 
              isLoading={status === AppStatus.LOADING} 
            />

            {/* Status / Error Messages */}
            {status === AppStatus.ERROR && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </div>
            )}

            {/* Result Section */}
            <div id="result-anchor">
              {status === AppStatus.SUCCESS && currentPrompt && (
                <PromptDisplay prompt={currentPrompt} />
              )}
            </div>
          </div>
        </div>

        {/* History Sidebar - Responsive Overlay */}
        <HistorySidebar 
          isOpen={isSidebarOpen}
          history={history}
          onSelect={handleSelectHistory}
          onClose={() => setIsSidebarOpen(false)}
          onClear={clearHistory}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4 text-center text-slate-500 text-xs flex justify-between items-center px-8 shrink-0">
        <div className="flex items-center gap-2">
          <Cpu size={14} />
          <span>Powered by Gemini 3 Pro</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-amber-500 transition-colors flex items-center gap-1">
            API Docs <ExternalLink size={10} />
          </a>
          <span>© 2024 Golden Prompt Inc.</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
