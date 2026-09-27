import React from 'react';
import { ToolDef, Language } from '../types';
import { ToolCard } from './ToolCard';
import { AlertCircle } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

interface ToolGridProps {
  currentLang: Language;
  tools: ToolDef[];
  onSelectTool: (tool: ToolDef) => void;
  onResetFilter: () => void;
}

export const ToolGrid: React.FC<ToolGridProps> = ({ currentLang, tools, onSelectTool, onResetFilter }) => {
  const t = TRANSLATIONS[currentLang].catalog;

  return (
    <section id="tools-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            {t.sectionSubtitle}
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono tabular-nums">
          {t.showingCount(tools.length)}
        </div>
      </div>

      {tools.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
          <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white">{t.emptyTitle}</h3>
          <p className="mt-1 text-sm text-slate-400 max-w-md mx-auto">
            {t.emptyDesc}
          </p>
          <button
            onClick={onResetFilter}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
          >
            {t.resetFilter}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tools.map((tool, idx) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              index={idx}
              currentLang={currentLang}
              onSelect={onSelectTool}
            />
          ))}
        </div>
      )}
    </section>
  );
};
