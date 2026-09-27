import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  currentBrand: string;
  currentLang: Language;
  onScrollToTools: () => void;
  onSelectToolById: (id: string) => void;
  onOpenBrandModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentBrand,
  currentLang,
  onScrollToTools,
  onSelectToolById,
  onOpenBrandModal,
}) => {
  const t = TRANSLATIONS[currentLang].footer;

  return (
    <footer className="border-t border-slate-800 bg-[#090c14] text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white font-bold text-base mb-3">
              <BrandLogo size={28} />
              <span>{currentBrand}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              {t.desc}
            </p>
            <div className="mt-4 flex items-center gap-2 text-slate-400 text-[11px]">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.clientSideNotice}</span>
            </div>
          </div>

          {/* Col 2: Edit & Kelola PDF */}
          <div>
            <div className="text-slate-200 font-semibold mb-3">{t.colEditTitle}</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectToolById('edit-pdf')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Edit PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectToolById('sign-pdf')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Sign PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectToolById('watermark-pdf')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Watermark PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectToolById('rotate-pdf')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Rotate PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectToolById('organize-pdf')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Organize PDF
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Gabung & Kompres */}
          <div>
            <div className="text-slate-200 font-semibold mb-3">{t.colOrganizeTitle}</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectToolById('merge-pdf')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Merge PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectToolById('split-pdf')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Split PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectToolById('compress-pdf')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Compress PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectToolById('pdf-to-word')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  PDF to Word
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectToolById('pdf-to-excel')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  PDF to Excel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Konversi Format Lain */}
          <div>
            <div className="text-slate-200 font-semibold mb-3">{t.colConvertTitle}</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectToolById('pdf-to-jpg')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  PDF to JPG
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectToolById('jpg-to-pdf')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  JPG to PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectToolById('word-to-pdf')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Word to PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectToolById('excel-to-pdf')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Excel to PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectToolById('html-to-pdf')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  HTML to PDF
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom hairline row */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            {t.copyright(currentBrand, new Date().getFullYear())}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
            <button
              onClick={onOpenBrandModal}
              className="text-rose-400 hover:text-rose-300 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{t.brandIdeaLink}</span>
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={onScrollToTools}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              {t.catalogLink}
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>{t.freeAccess}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
