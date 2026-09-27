import React from 'react';
import { ShieldCheck, UserX, Cpu, FileCheck2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface FeaturesProps {
  currentLang: Language;
}

export const Features: React.FC<FeaturesProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].features;

  const features = [
    {
      icon: ShieldCheck,
      title: t.item1Title,
      desc: t.item1Desc,
      color: '#10b981',
    },
    {
      icon: UserX,
      title: t.item2Title,
      desc: t.item2Desc,
      color: '#f43f5e',
    },
    {
      icon: Cpu,
      title: t.item3Title,
      desc: t.item3Desc,
      color: '#3b82f6',
    },
    {
      icon: FileCheck2,
      title: t.item4Title,
      desc: t.item4Desc,
      color: '#f59e0b',
    },
  ];

  return (
    <section id="features-section" className="py-20 border-t border-slate-800/60 bg-[#0e121e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
            {t.kicker}
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl" style={{ textWrap: 'balance' }}>
            {t.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: `${f.color}15`,
                    border: `1px solid ${f.color}30`,
                    color: f.color,
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
