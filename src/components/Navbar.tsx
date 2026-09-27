import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Shield,
  Search,
  ArrowUpRight,
  SlidersHorizontal,
  Globe,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { getLocalizedTools, TOOL_BADGES } from '../data/tools';
import { Language, ToolDef } from '../types';
import { ToolIcon } from './ToolIcon';
import { TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  currentBrand: string;
  currentLang: Language;
  onChangeLang: (lang: Language) => void;
  onOpenBrandModal: () => void;
  onScrollToTools: () => void;
  onScrollToFeatures: () => void;
  onScrollToHowItWorks: () => void;
  onScrollToFaq: () => void;
  onSelectToolById: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentBrand,
  currentLang,
  onChangeLang,
  onOpenBrandModal,
  onScrollToTools,
  onScrollToFeatures,
  onScrollToHowItWorks,
  onScrollToFaq,
  onSelectToolById,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');
  const [dropdownFilter, setDropdownFilter] = useState<'all' | 'edit' | 'organize' | 'from-pdf' | 'to-pdf'>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState('');
  const [mobileActiveCategory, setMobileActiveCategory] = useState<'all' | 'edit' | 'organize' | 'from-pdf' | 'to-pdf'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<any>(null);

  const t = TRANSLATIONS[currentLang].nav;
  const allTools = useMemo(() => getLocalizedTools(currentLang), [currentLang]);

  // Group definitions
  const editAndSignTools = useMemo(
    () => allTools.filter((tool) => ['edit-pdf', 'sign-pdf', 'watermark-pdf', 'crop-pdf'].includes(tool.id)),
    [allTools]
  );

  const organizeTools = useMemo(
    () => allTools.filter((tool) => ['merge-pdf', 'split-pdf', 'rotate-pdf', 'organize-pdf', 'remove-pages', 'extract-pages'].includes(tool.id)),
    [allTools]
  );

  const convertFromPdfTools = useMemo(
    () => allTools.filter((tool) => ['pdf-to-word', 'pdf-to-excel', 'pdf-to-powerpoint', 'pdf-to-jpg', 'compress-pdf'].includes(tool.id)),
    [allTools]
  );

  const convertToPdfTools = useMemo(
    () => allTools.filter((tool) => ['jpg-to-pdf', 'word-to-pdf', 'powerpoint-to-pdf', 'excel-to-pdf', 'html-to-pdf'].includes(tool.id)),
    [allTools]
  );

  // Filtered tools for the dropdown search
  const filteredDropdownTools = useMemo(() => {
    const q = dropdownSearch.toLowerCase().trim();
    return allTools.filter((tool) => {
      const matchText = !q || tool.title.toLowerCase().includes(q) || tool.shortDesc.toLowerCase().includes(q) || tool.id.includes(q);
      if (!matchText) return false;

      if (dropdownFilter === 'all') return true;
      if (dropdownFilter === 'edit') return ['edit-pdf', 'sign-pdf', 'watermark-pdf', 'crop-pdf'].includes(tool.id);
      if (dropdownFilter === 'organize') return ['merge-pdf', 'split-pdf', 'rotate-pdf', 'organize-pdf', 'remove-pages', 'extract-pages'].includes(tool.id);
      if (dropdownFilter === 'from-pdf') return ['pdf-to-word', 'pdf-to-excel', 'pdf-to-powerpoint', 'pdf-to-jpg', 'compress-pdf'].includes(tool.id);
      if (dropdownFilter === 'to-pdf') return ['jpg-to-pdf', 'word-to-pdf', 'powerpoint-to-pdf', 'excel-to-pdf', 'html-to-pdf'].includes(tool.id);
      return true;
    });
  }, [allTools, dropdownSearch, dropdownFilter]);

  // Close dropdown on click outside or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 250);
  };

  const handleToolClick = (toolId: string) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    onSelectToolById(toolId);
  };

  // Filter for mobile
  const filteredMobileTools = useMemo(() => {
    const q = mobileSearch.toLowerCase().trim();
    return allTools.filter((tool) => {
      const matchText = !q || tool.title.toLowerCase().includes(q) || tool.shortDesc.toLowerCase().includes(q);
      if (!matchText) return false;

      if (mobileActiveCategory === 'all') return true;
      if (mobileActiveCategory === 'edit') return ['edit-pdf', 'sign-pdf', 'watermark-pdf', 'crop-pdf'].includes(tool.id);
      if (mobileActiveCategory === 'organize') return ['merge-pdf', 'split-pdf', 'rotate-pdf', 'organize-pdf', 'remove-pages', 'extract-pages'].includes(tool.id);
      if (mobileActiveCategory === 'from-pdf') return ['pdf-to-word', 'pdf-to-excel', 'pdf-to-powerpoint', 'pdf-to-jpg', 'compress-pdf'].includes(tool.id);
      if (mobileActiveCategory === 'to-pdf') return ['jpg-to-pdf', 'word-to-pdf', 'powerpoint-to-pdf', 'excel-to-pdf', 'html-to-pdf'].includes(tool.id);
      return true;
    });
  }, [allTools, mobileSearch, mobileActiveCategory]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0c0f17]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Single text element wordmark with Brand Logo */}
        <div className="flex items-center min-w-0 shrink">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onScrollToTools();
            }}
            className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2 group hover:text-rose-400 transition-colors min-w-0"
            title={`${currentBrand} - All-in-One PDF Tools`}
          >
            <BrandLogo size={30} className="shrink-0" />
            <span className="font-extrabold tracking-tight truncate max-w-[110px] xs:max-w-[150px] sm:max-w-none text-white group-hover:text-rose-300 transition-colors">
              {currentBrand}
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links with Mega-Dropdown */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-300">
          {/* Complete Feature Mega Dropdown Trigger */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl transition-all cursor-pointer ${
                isDropdownOpen
                  ? 'text-white bg-slate-800/90 shadow-inner'
                  : 'hover:text-white hover:bg-slate-850/60'
              }`}
            >
              <span className="font-semibold">{t.featuresDropdown}</span>
              <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {t.toolsBadge}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180 text-rose-400' : ''
                }`}
              />
            </button>

            {/* Comprehensive Mega-Dropdown Panel */}
            {isDropdownOpen && (
              <div
                className="fixed left-1/2 -translate-x-1/2 top-16 pt-3 w-[min(96vw,1040px)] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="bg-[#0f1423]/98 border border-slate-750 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/95 backdrop-blur-2xl max-h-[82vh] overflow-y-auto">
                  {/* Top Bar inside Dropdown: Header, Search, & Category Pills */}
                  <div className="pb-4 mb-4 border-b border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider">
                          {t.catalogTitle}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {t.catalogSubtitle}
                        </div>
                      </div>
                    </div>

                    {/* Quick Search inside Dropdown */}
                    <div className="relative min-w-[240px] max-w-sm">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={dropdownSearch}
                        onChange={(e) => setDropdownSearch(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="w-full pl-8 pr-7 py-1.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 transition-colors"
                      />
                      {dropdownSearch && (
                        <button
                          onClick={() => setDropdownSearch('')}
                          className="absolute right-2 top-2 text-[10px] text-slate-400 hover:text-white"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Filter Strip */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-4 pb-2 text-xs">
                    <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1">
                      <SlidersHorizontal className="w-3 h-3 text-slate-400" />
                      {t.filterLabel}
                    </span>
                    {[
                      { id: 'all', label: t.filterAll },
                      { id: 'edit', label: t.filterEdit },
                      { id: 'organize', label: t.filterOrganize },
                      { id: 'from-pdf', label: t.filterFromPdf },
                      { id: 'to-pdf', label: t.filterToPdf },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setDropdownFilter(f.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          dropdownFilter === f.id
                            ? 'bg-rose-600 text-white font-semibold shadow-sm'
                            : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Multi-Column Feature Catalog */}
                  {filteredDropdownTools.length === 0 ? (
                    <div className="p-8 text-center bg-slate-950/40 rounded-2xl border border-slate-800 my-2">
                      <p className="text-xs text-slate-400">{t.noToolsMatch} "{dropdownSearch}".</p>
                      <button
                        onClick={() => {
                          setDropdownSearch('');
                          setDropdownFilter('all');
                        }}
                        className="mt-2 text-xs text-rose-400 hover:underline cursor-pointer"
                      >
                        {t.showAllTools}
                      </button>
                    </div>
                  ) : dropdownSearch ? (
                    // Flat search results grid
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
                      {filteredDropdownTools.map((tool) => {
                        const badge = TOOL_BADGES[tool.id]?.[currentLang];
                        return (
                          <button
                            key={tool.id}
                            onClick={() => handleToolClick(tool.id)}
                            className="w-full text-left p-2.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all group flex items-start gap-2.5 cursor-pointer shadow-sm"
                          >
                            <div
                              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-105"
                              style={{ backgroundColor: `${tool.accentColor}20` }}
                            >
                              <ToolIcon name={tool.icon} className="w-4 h-4" color={tool.accentColor} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold text-slate-100 group-hover:text-white truncate">
                                  {tool.title}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-400 truncate mt-0.5 leading-tight">
                                {tool.shortDesc}
                              </div>
                              {badge && (
                                <span className={`inline-block mt-1 text-[9px] font-medium px-1.5 py-0.2 rounded ${badge.bg} ${badge.text}`}>
                                  {badge.label}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    // Default Categorized 4-Column Layout
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Col 1: Edit & Tanda Tangan */}
                      {(dropdownFilter === 'all' || dropdownFilter === 'edit') && (
                        <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800/80">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-pink-400 mb-2.5 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                              <span>{t.colEdit}</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">4 {t.toolsCount}</span>
                          </div>
                          <div className="space-y-1">
                            {editAndSignTools.map((tool) => {
                              const badge = TOOL_BADGES[tool.id]?.[currentLang];
                              return (
                                <button
                                  key={tool.id}
                                  onClick={() => handleToolClick(tool.id)}
                                  className="w-full text-left p-2 rounded-xl hover:bg-slate-800/80 transition-colors group flex items-start gap-2.5 cursor-pointer"
                                >
                                  <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ backgroundColor: `${tool.accentColor}20` }}
                                  >
                                    <ToolIcon name={tool.icon} className="w-3.5 h-3.5" color={tool.accentColor} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                                        {tool.title}
                                      </span>
                                      {badge && (
                                        <span className={`text-[9px] px-1 rounded ${badge.bg} ${badge.text} shrink-0`}>
                                          {badge.label}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                                      {tool.shortDesc}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Col 2: Organisasi & Tata Letak */}
                      {(dropdownFilter === 'all' || dropdownFilter === 'organize') && (
                        <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800/80">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-2.5 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                              <span>{t.colOrganize}</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">6 {t.toolsCount}</span>
                          </div>
                          <div className="space-y-1">
                            {organizeTools.map((tool) => {
                              const badge = TOOL_BADGES[tool.id]?.[currentLang];
                              return (
                                <button
                                  key={tool.id}
                                  onClick={() => handleToolClick(tool.id)}
                                  className="w-full text-left p-2 rounded-xl hover:bg-slate-800/80 transition-colors group flex items-start gap-2.5 cursor-pointer"
                                >
                                  <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ backgroundColor: `${tool.accentColor}20` }}
                                  >
                                    <ToolIcon name={tool.icon} className="w-3.5 h-3.5" color={tool.accentColor} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                                        {tool.title}
                                      </span>
                                      {badge && (
                                        <span className={`text-[9px] px-1 rounded ${badge.bg} ${badge.text} shrink-0`}>
                                          {badge.label}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                                      {tool.shortDesc}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Col 3: Konversi Dari PDF */}
                      {(dropdownFilter === 'all' || dropdownFilter === 'from-pdf') && (
                        <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800/80">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                              <span>{t.colFromPdf}</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">5 {t.toolsCount}</span>
                          </div>
                          <div className="space-y-1">
                            {convertFromPdfTools.map((tool) => {
                              const badge = TOOL_BADGES[tool.id]?.[currentLang];
                              return (
                                <button
                                  key={tool.id}
                                  onClick={() => handleToolClick(tool.id)}
                                  className="w-full text-left p-2 rounded-xl hover:bg-slate-800/80 transition-colors group flex items-start gap-2.5 cursor-pointer"
                                >
                                  <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ backgroundColor: `${tool.accentColor}20` }}
                                  >
                                    <ToolIcon name={tool.icon} className="w-3.5 h-3.5" color={tool.accentColor} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                                        {tool.title}
                                      </span>
                                      {badge && (
                                        <span className={`text-[9px] px-1 rounded ${badge.bg} ${badge.text} shrink-0`}>
                                          {badge.label}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                                      {tool.shortDesc}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Col 4: Konversi Ke PDF */}
                      {(dropdownFilter === 'all' || dropdownFilter === 'to-pdf') && (
                        <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800/80">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                              <span>{t.colToPdf}</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">5 {t.toolsCount}</span>
                          </div>
                          <div className="space-y-1">
                            {convertToPdfTools.map((tool) => {
                              const badge = TOOL_BADGES[tool.id]?.[currentLang];
                              return (
                                <button
                                  key={tool.id}
                                  onClick={() => handleToolClick(tool.id)}
                                  className="w-full text-left p-2 rounded-xl hover:bg-slate-800/80 transition-colors group flex items-start gap-2.5 cursor-pointer"
                                >
                                  <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ backgroundColor: `${tool.accentColor}20` }}
                                  >
                                    <ToolIcon name={tool.icon} className="w-3.5 h-3.5" color={tool.accentColor} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                                        {tool.title}
                                      </span>
                                      {badge && (
                                        <span className={`text-[9px] px-1 rounded ${badge.bg} ${badge.text} shrink-0`}>
                                          {badge.label}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                                      {tool.shortDesc}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Dropdown Footer Guarantee */}
                  <div className="mt-4 pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{t.privacyNotice}</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onScrollToTools();
                      }}
                      className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{t.viewCatalogPage}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onScrollToFeatures}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            {t.advantages}
          </button>
          <button
            onClick={onScrollToHowItWorks}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            {t.howItWorks}
          </button>
          <button
            onClick={onScrollToFaq}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            {t.faq}
          </button>
        </nav>

        {/* Zone 3: Actions + Language Toggle + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher Pill */}
          <div className="flex items-center bg-slate-900 border border-slate-750 rounded-xl p-0.5 text-xs font-semibold">
            <button
              onClick={() => onChangeLang('en')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs ${
                currentLang === 'en'
                  ? 'bg-rose-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English (Default)"
            >
              <span>EN</span>
            </button>
            <button
              onClick={() => onChangeLang('id')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs ${
                currentLang === 'id'
                  ? 'bg-rose-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Bahasa Indonesia"
            >
              <span>ID</span>
            </button>
          </div>

          <button
            onClick={onOpenBrandModal}
            className="px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Brand Name & Logo Ideas"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="hidden sm:inline">{t.brandIdea}</span>
            <span className="sm:hidden text-[11px]">{t.brandIdeaShort}</span>
          </button>

          <button
            onClick={onScrollToTools}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-950/40 flex items-center gap-1.5 whitespace-nowrap active:scale-95 cursor-pointer"
          >
            <span>{t.getStarted}</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Backdrop Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 top-16 bg-black/75 backdrop-blur-sm z-30 animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed inset-x-0 top-16 bg-[#0c0f17] border-b border-slate-800 max-h-[88vh] overflow-y-auto p-4 z-40 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            {/* Quick Search inside Mobile Menu */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-750 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500 placeholder-slate-400"
              />
              {mobileSearch && (
                <button
                  onClick={() => setMobileSearch('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills on Mobile */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
              {[
                { id: 'all', label: currentLang === 'en' ? 'All' : 'Semua' },
                { id: 'edit', label: currentLang === 'en' ? 'Edit & Sign' : 'Edit & TTD' },
                { id: 'organize', label: currentLang === 'en' ? 'Layout' : 'Organisasi' },
                { id: 'from-pdf', label: currentLang === 'en' ? 'From PDF' : 'Dari PDF' },
                { id: 'to-pdf', label: currentLang === 'en' ? 'To PDF' : 'Ke PDF' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setMobileActiveCategory(c.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    mobileActiveCategory === c.id
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Quick Tools Grid in Mobile */}
            <div className="mb-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>{t.mobileSelectTool} ({filteredMobileTools.length})</span>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onScrollToTools();
                  }}
                  className="text-rose-400 hover:underline text-xs cursor-pointer"
                >
                  {t.viewCatalogPage}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {filteredMobileTools.map((tool) => {
                  const badge = TOOL_BADGES[tool.id]?.[currentLang];
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleToolClick(tool.id)}
                      className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-left flex items-center gap-2.5 hover:border-slate-700 transition-colors cursor-pointer"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${tool.accentColor}20` }}
                      >
                        <ToolIcon name={tool.icon} className="w-4 h-4" color={tool.accentColor} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-semibold text-slate-200 truncate">{tool.title}</span>
                          {badge && (
                            <span className={`text-[9px] px-1 rounded ${badge.bg} ${badge.text} shrink-0`}>
                              {badge.label}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{tool.shortDesc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Section Links */}
            <div className="pt-3 border-t border-slate-800 space-y-1 text-xs font-semibold text-slate-300">
              {/* Mobile Language Picker */}
              <div className="py-2 px-3 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-2 text-slate-400">
                  <Globe className="w-4 h-4 text-rose-400" />
                  <span>Language / Bahasa:</span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onChangeLang('en')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      currentLang === 'en' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => onChangeLang('id')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      currentLang === 'id' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    Indonesia
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onScrollToFeatures();
                }}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
              >
                {t.advantages}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onScrollToHowItWorks();
                }}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
              >
                {t.howItWorks}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onScrollToFaq();
                }}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
              >
                {t.faq}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBrandModal();
                }}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-rose-400 font-semibold transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{t.brandIdea}</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
