import React, { useState, useMemo } from 'react';
import { getLocalizedTools } from './data/tools';
import { ToolDef, ToolCategory, Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ToolGrid } from './components/ToolGrid';
import { ActiveToolWorkspace } from './components/ActiveToolWorkspace';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BrandModal } from './components/BrandModal';

export default function App() {
  const [currentBrand, setCurrentBrand] = useState('DocuMorph');
  // Default language is English ('en') as requested:
  // "add trasnalste bahasa inggris dan default bahasa nya buat bahasa inggris"
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolDef | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');

  // Localized tools collection for currently active language
  const tools = useMemo(() => getLocalizedTools(currentLang), [currentLang]);

  // Keep activeTool synchronized if the user switches language while in workspace
  const currentActiveTool = useMemo(() => {
    if (!activeTool) return null;
    return tools.find((t) => t.id === activeTool.id) || activeTool;
  }, [activeTool, tools]);

  // Filter tools based on category and search query
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchCat =
        selectedCategory === 'all' || tool.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.shortDesc.toLowerCase().includes(q) ||
        tool.fullDesc.toLowerCase().includes(q) ||
        tool.id.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [tools, selectedCategory, searchQuery]);

  const scrollToSection = (id: string) => {
    if (activeTool) {
      setActiveTool(null);
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectToolById = (id: string) => {
    const found = tools.find((t) => t.id === id);
    if (found) {
      setActiveTool(found);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectTool = (tool: ToolDef) => {
    setActiveTool(tool);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setActiveTool(null);
  };

  return (
    <div className="min-h-screen bg-[#0c0f17] text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-200">
      <Navbar
        currentBrand={currentBrand}
        currentLang={currentLang}
        onChangeLang={setCurrentLang}
        onOpenBrandModal={() => setIsBrandModalOpen(true)}
        onScrollToTools={() => scrollToSection('tools-section')}
        onScrollToFeatures={() => scrollToSection('features-section')}
        onScrollToHowItWorks={() => scrollToSection('how-it-works-section')}
        onScrollToFaq={() => scrollToSection('faq-section')}
        onSelectToolById={handleSelectToolById}
      />

      <main className="flex-1">
        {currentActiveTool ? (
          <div className="pt-6 pb-20">
            <ActiveToolWorkspace
              tool={currentActiveTool}
              currentLang={currentLang}
              onBack={handleBackToCatalog}
            />
          </div>
        ) : (
          <>
            <Hero
              currentLang={currentLang}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectPopularTool={handleSelectToolById}
            />

            <ToolGrid
              currentLang={currentLang}
              tools={filteredTools}
              onSelectTool={handleSelectTool}
              onResetFilter={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            />

            <Features currentLang={currentLang} />
            <HowItWorks currentLang={currentLang} />
            <FAQ currentLang={currentLang} />
          </>
        )}
      </main>

      <Footer
        currentBrand={currentBrand}
        currentLang={currentLang}
        onOpenBrandModal={() => setIsBrandModalOpen(true)}
        onScrollToTools={() => scrollToSection('tools-section')}
        onSelectToolById={handleSelectToolById}
      />

      <BrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        currentBrand={currentBrand}
        currentLang={currentLang}
        onSelectBrand={(newName) => {
          setCurrentBrand(newName);
        }}
      />
    </div>
  );
}
