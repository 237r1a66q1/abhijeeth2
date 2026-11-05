import React from 'react';
import { Sparkles, Edit3, Eye, Save } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthdayWebsiteContent } from '../types';
import { EditableText } from './EditableText';

interface HeaderProps {
  headerContent: BirthdayWebsiteContent['header'];
  onUpdateHeader: (updated: BirthdayWebsiteContent['header']) => void;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  onSave: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  headerContent,
  onUpdateHeader,
  isEditMode,
  setIsEditMode,
  onSave,
  onNavigate,
}) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.1 },
      colors: ['#FBCFE8', '#BAE6FD', '#E9D5FF', '#FEF08A'],
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-pink-100 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('welcome')}
            className="text-xl hover:scale-110 transition-transform cursor-pointer"
            title="Go to Top"
          >
            💌
          </button>
          <EditableText
            value={headerContent.brandText}
            onChange={(val) => onUpdateHeader({ ...headerContent, brandText: val })}
            isEditMode={isEditMode}
            onEnterEditMode={() => setIsEditMode(true)}
            className="font-['Caveat',cursive] text-2xl text-pink-600 font-bold whitespace-nowrap"
          />
        </div>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('memories')}
            className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <EditableText
              value={headerContent.navMemories}
              onChange={(val) => onUpdateHeader({ ...headerContent, navMemories: val })}
              isEditMode={isEditMode}
              onEnterEditMode={() => setIsEditMode(true)}
              showIcon={false}
            />
          </button>
          <button
            onClick={() => onNavigate('story')}
            className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <EditableText
              value={headerContent.navStory}
              onChange={(val) => onUpdateHeader({ ...headerContent, navStory: val })}
              isEditMode={isEditMode}
              onEnterEditMode={() => setIsEditMode(true)}
              showIcon={false}
            />
          </button>
          <button
            onClick={() => onNavigate('awards')}
            className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <EditableText
              value={headerContent.navAwards}
              onChange={(val) => onUpdateHeader({ ...headerContent, navAwards: val })}
              isEditMode={isEditMode}
              onEnterEditMode={() => setIsEditMode(true)}
              showIcon={false}
            />
          </button>
          <button
            onClick={() => onNavigate('song')}
            className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <EditableText
              value={headerContent.navSong}
              onChange={(val) => onUpdateHeader({ ...headerContent, navSong: val })}
              isEditMode={isEditMode}
              onEnterEditMode={() => setIsEditMode(true)}
              showIcon={false}
            />
          </button>
          <button
            onClick={() => onNavigate('letter')}
            className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <EditableText
              value={headerContent.navLetter}
              onChange={(val) => onUpdateHeader({ ...headerContent, navLetter: val })}
              isEditMode={isEditMode}
              onEnterEditMode={() => setIsEditMode(true)}
              showIcon={false}
            />
          </button>
          <button
            onClick={() => onNavigate('gift')}
            className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <EditableText
              value={headerContent.navGift}
              onChange={(val) => onUpdateHeader({ ...headerContent, navGift: val })}
              isEditMode={isEditMode}
              onEnterEditMode={() => setIsEditMode(true)}
              showIcon={false}
            />
          </button>
          <button
            onClick={() => onNavigate('cake')}
            className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <EditableText
              value={headerContent.navCake}
              onChange={(val) => onUpdateHeader({ ...headerContent, navCake: val })}
              isEditMode={isEditMode}
              onEnterEditMode={() => setIsEditMode(true)}
              showIcon={false}
            />
          </button>
        </nav>

        {/* Zone 3: Primary Action & Mode Switch */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Edit/Preview Toggle */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap shrink-0 ${
              isEditMode
                ? 'bg-pink-600 text-white hover:bg-pink-700'
                : 'bg-pink-100 text-pink-700 hover:bg-pink-200 border border-pink-200'
            }`}
            title={
              isEditMode
                ? 'Preview mode ki switch avvu'
                : 'Live edit mode on cheyyi'
            }
          >
            {isEditMode ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Preview 👁️</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>{headerContent.editModeButtonText}</span>
              </>
            )}
          </button>

          {/* Save Button */}
          <button
            onClick={onSave}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            title="Save changes to browser"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save 💾</span>
          </button>

          <button
            onClick={triggerConfetti}
            className="p-1.5 text-pink-500 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors cursor-pointer"
            title="Confetti Challu 🎉"
            aria-label="Sparkle celebration"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
