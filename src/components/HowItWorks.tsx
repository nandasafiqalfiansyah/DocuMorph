import React from 'react';
import { Upload, SlidersHorizontal, DownloadCloud } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface HowItWorksProps {
  currentLang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].howItWorks;

  const steps = [
    {
      num: '01',
      icon: Upload,
      title: t.step1Title,
      desc: t.step1Desc,
    },
    {
      num: '02',
      icon: SlidersHorizontal,
      title: t.step2Title,
      desc: t.step2Desc,
    },
    {
      num: '03',
      icon: DownloadCloud,
      title: t.step3Title,
      desc: t.step3Desc,
    },
  ];

  return (
    <section id="how-it-works-section" className="py-20 border-t border-slate-800/60 bg-[#0c0f17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
            {t.kicker}
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-7 rounded-2xl bg-slate-900/40 border border-slate-800/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-rose-500/80">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-rose-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
