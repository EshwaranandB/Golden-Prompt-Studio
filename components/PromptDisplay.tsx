
import React, { useState } from 'react';
import { Copy, Check, Download, Share2, ClipboardList } from 'lucide-react';
import { GoldenPrompt } from '../types';

interface PromptDisplayProps {
  prompt: GoldenPrompt;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const fullPromptText = `Role: ${prompt.role}

Objective: ${prompt.objective}

Context: ${prompt.context}

Constraints:
${prompt.constraints.map(c => `- ${c}`).join('\n')}

Step-by-Step Instructions:
${prompt.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n')}

Output Format: ${prompt.outputFormat}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ClipboardList className="text-amber-500" size={24} />
          <span>Golden Output</span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-all"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Prompt'}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* Header/Info */}
        <div className="p-6 bg-slate-800/30 border-b border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Adopted Persona</span>
              <h3 className="text-2xl font-bold text-white">{prompt.role}</h3>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8 font-sans">
          {/* Section: Objective */}
          <section className="space-y-3">
            <h4 className="text-slate-400 font-bold uppercase text-[11px] tracking-widest border-l-2 border-amber-500 pl-3">Objective</h4>
            <p className="text-slate-200 leading-relaxed text-lg">{prompt.objective}</p>
          </section>

          {/* Section: Context */}
          <section className="space-y-3">
            <h4 className="text-slate-400 font-bold uppercase text-[11px] tracking-widest border-l-2 border-amber-500 pl-3">Context</h4>
            <div className="bg-slate-950/50 p-4 rounded-xl text-slate-300 leading-relaxed border border-slate-800">
              {prompt.context}
            </div>
          </section>

          {/* Grid Layout for Constraints and Instructions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="space-y-4">
              <h4 className="text-slate-400 font-bold uppercase text-[11px] tracking-widest border-l-2 border-red-500/50 pl-3">Constraints</h4>
              <ul className="space-y-2">
                {prompt.constraints.map((c, i) => (
                  <li key={i} className="flex gap-3 text-slate-300 text-sm leading-relaxed group">
                    <span className="text-red-500/50 mt-1">•</span>
                    <span className="group-hover:text-slate-100 transition-colors">{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h4 className="text-slate-400 font-bold uppercase text-[11px] tracking-widest border-l-2 border-blue-500/50 pl-3">Step-by-Step Workflow</h4>
              <div className="space-y-3">
                {prompt.instructions.map((inst, i) => (
                  <div key={i} className="flex gap-3 text-slate-300 text-sm leading-relaxed bg-slate-800/20 p-3 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-all">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-[10px] font-bold flex items-center justify-center text-slate-400">
                      {i + 1}
                    </span>
                    <span>{inst}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Section: Output Format */}
          <section className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-slate-400 font-bold uppercase text-[11px] tracking-widest border-l-2 border-green-500/50 pl-3">Desired Output Structure</h4>
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-sm text-green-400/90 leading-relaxed">
              {prompt.outputFormat}
            </div>
          </section>
        </div>
      </div>

      {/* Raw Prompt Preview (Collapsible or just standard) */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Ready-to-Paste Raw Output</span>
          <button onClick={copyToClipboard} className="text-slate-400 hover:text-white transition-colors">
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
        </div>
        <pre className="text-[11px] md:text-xs text-slate-500 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-40">
          {fullPromptText}
        </pre>
      </div>
    </div>
  );
};

export default PromptDisplay;
