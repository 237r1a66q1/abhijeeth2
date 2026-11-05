import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { FloatingDecorations } from './components/FloatingDecorations';
import { WelcomeSection } from './components/WelcomeSection';
import { GallerySection } from './components/GallerySection';
import { FriendshipSection } from './components/FriendshipSection';
import { AwardsSection } from './components/AwardsSection';
import { AudioSection } from './components/AudioSection';
import { LetterSection } from './components/LetterSection';
import { GiftSection } from './components/GiftSection';
import { BirthdayCakeSection } from './components/BirthdayCakeSection';
import { LiveEditorToolbar } from './components/LiveEditorToolbar';
import { EditableText } from './components/EditableText';

import { BIRTHDAY_CONTENT } from './birthdayContent';
import { BirthdayWebsiteContent } from './types';
import { RotateCcw, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'bestie_active_user_edits_v3';
const FINGERPRINT_KEY = 'bestie_content_file_fingerprint_v3';

export default function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState('welcome');
  const [showSavedNotice, setShowSavedNotice] = useState(false);

  // Compute a content fingerprint of the master content file
  const fileContentFingerprint = useMemo(
    () => JSON.stringify(BIRTHDAY_CONTENT),
    [BIRTHDAY_CONTENT]
  );

  // Initialize content:
  // If the content file BIRTHDAY_CONTENT has changed since last session, BIRTHDAY_CONTENT wins!
  const [content, setContent] = useState<BirthdayWebsiteContent>(() => {
    // Clear out any old legacy storage keys from previous builds
    const legacyKeys = [
      'bestie_master_birthday_content_live_v1',
      'bestie_master_birthday_content_v2',
      'bestie_welcome_texts',
      'bestie_photos',
      'bestie_story',
      'bestie_awards',
      'bestie_special_award',
      'bestie_song_message',
      'bestie_letter',
      'bestie_gift',
      'bestie_birthday',
    ];
    legacyKeys.forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {
        // ignore
      }
    });

    try {
      const storedFingerprint = localStorage.getItem(FINGERPRINT_KEY);
      // If the content file changed, ALWAYS use BIRTHDAY_CONTENT
      if (storedFingerprint !== fileContentFingerprint) {
        localStorage.setItem(FINGERPRINT_KEY, fileContentFingerprint);
        localStorage.removeItem(STORAGE_KEY);
        return BIRTHDAY_CONTENT;
      }

      // If the content file has not changed, check if the user had active live edits
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return {
          ...BIRTHDAY_CONTENT,
          ...JSON.parse(saved),
        };
      }
    } catch {
      // fallback
    }

    return BIRTHDAY_CONTENT;
  });

  // Whenever BIRTHDAY_CONTENT in src/birthdayContent.ts changes, immediately update preview!
  useEffect(() => {
    setContent(BIRTHDAY_CONTENT);
    try {
      localStorage.setItem(FINGERPRINT_KEY, JSON.stringify(BIRTHDAY_CONTENT));
    } catch {
      // ignore
    }
  }, [fileContentFingerprint]);

  // Explicit Save Changes button action
  const handleSaveAllChanges = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      localStorage.setItem(FINGERPRINT_KEY, fileContentFingerprint);
    } catch {
      // ignore
    }
    setShowSavedNotice(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F472B6', '#38BDF8', '#34D399', '#FBBF24'],
    });
    setTimeout(() => {
      setShowSavedNotice(false);
    }, 3000);
  };

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reset to original BIRTHDAY_CONTENT configuration
  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Are you sure? All custom text will be reset to the content from src/birthdayContent.ts.'
      )
    ) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setContent(BIRTHDAY_CONTENT);
      setIsEditMode(false);
    }
  };

  const handleEnterEditMode = () => {
    setIsEditMode(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-800 relative selection:bg-pink-200 selection:text-pink-900 pb-24">
      {/* Floating decorative elements & pastel glows */}
      <FloatingDecorations />

      {/* Top Scrapbook Header Navigation Bar */}
      <Header
        headerContent={content.header}
        onUpdateHeader={(updated) => setContent({ ...content, header: updated })}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onSave={handleSaveAllChanges}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Floating Toast Notice when saved from top bar */}
      {showSavedNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 stroke-[3]" />
          <span className="font-bold">Mee changes antha save aipoyayi! Refresh chesina untayi 💖</span>
        </div>
      )}

      {/* Live Visual Editing Sticky Banner */}
      {isEditMode && (
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white text-xs py-2 px-4 text-center font-medium sticky top-16 z-30 shadow-md flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>LIVE VISUAL EDITING ACTIVE:</span>
          </div>
          <span>
            Click or tap directly on ANY text, heading, quote, or award to edit it like a document!
          </span>
          <button
            onClick={handleSaveAllChanges}
            className="px-3 py-1 bg-white text-pink-600 hover:bg-pink-50 rounded-full font-bold text-xs transition-colors shadow-xs cursor-pointer"
          >
            Save All Changes 💾
          </button>
          <button
            onClick={() => setIsEditMode(false)}
            className="px-2.5 py-1 bg-pink-700/80 hover:bg-pink-800 text-white rounded-full font-bold text-[11px] transition-colors cursor-pointer"
          >
            Exit to Preview 👁️
          </button>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* SECTION 1: WELCOME PAGE */}
        <WelcomeSection
          welcomeContent={content.welcome}
          onUpdateWelcome={(updated) => setContent({ ...content, welcome: updated })}
          onOpen={() => scrollToSection('memories')}
          isEditMode={isEditMode}
          onEnterEditMode={handleEnterEditMode}
        />

        {/* SECTION 2: PHOTO GALLERY */}
        <GallerySection
          galleryContent={content.gallery}
          onUpdateGallery={(updated) => setContent({ ...content, gallery: updated })}
          isEditMode={isEditMode}
          onEnterEditMode={handleEnterEditMode}
        />

        {/* SECTION 3: OUR FRIENDSHIP */}
        <FriendshipSection
          friendshipContent={content.friendship}
          onUpdateFriendship={(updated) => setContent({ ...content, friendship: updated })}
          isEditMode={isEditMode}
          onEnterEditMode={handleEnterEditMode}
        />

        {/* SECTION 4: AWARDS CEREMONY */}
        <AwardsSection
          awardsContent={content.awards}
          onUpdateAwards={(updated) => setContent({ ...content, awards: updated })}
          isEditMode={isEditMode}
          onEnterEditMode={handleEnterEditMode}
        />

        {/* SECTION 5: SONG DEDICATION */}
        <AudioSection
          songContent={content.song}
          onUpdateSong={(updated) => setContent({ ...content, song: updated })}
          isEditMode={isEditMode}
          onEnterEditMode={handleEnterEditMode}
        />

        {/* SECTION 6: HEARTFELT LETTER */}
        <LetterSection
          letterContent={content.letter}
          onUpdateLetter={(updated) => setContent({ ...content, letter: updated })}
          isEditMode={isEditMode}
          onEnterEditMode={handleEnterEditMode}
        />

        {/* SECTION 7: SURPRISE GIFT */}
        <GiftSection
          giftContent={content.gift}
          onUpdateGift={(updated) => setContent({ ...content, gift: updated })}
          isEditMode={isEditMode}
          onEnterEditMode={handleEnterEditMode}
        />

        {/* SECTION 8: FINAL BIRTHDAY PAGE */}
        <BirthdayCakeSection
          cakeContent={content.cake}
          onUpdateCake={(updated) => setContent({ ...content, cake: updated })}
          isEditMode={isEditMode}
          onEnterEditMode={handleEnterEditMode}
        />
      </main>

      {/* Scrapbook Footer */}
      <footer className="relative z-10 border-t border-pink-100 bg-white/70 backdrop-blur-xs py-8 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="font-['Caveat',cursive] text-2xl text-slate-700 font-bold">
            <span>"</span>
            <EditableText
              value={content.footer.quote}
              onChange={(val) =>
                setContent({
                  ...content,
                  footer: { ...content.footer, quote: val },
                })
              }
              isEditMode={isEditMode}
              onEnterEditMode={handleEnterEditMode}
              className="font-['Caveat',cursive] text-2xl text-slate-700 font-bold"
            />
            <span>"</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-medium">
            <EditableText
              value={content.footer.themeTag}
              onChange={(val) =>
                setContent({
                  ...content,
                  footer: { ...content.footer, themeTag: val },
                })
              }
              isEditMode={isEditMode}
              onEnterEditMode={handleEnterEditMode}
            />
            <span>·</span>
            <EditableText
              value={content.footer.editionTag}
              onChange={(val) =>
                setContent({
                  ...content,
                  footer: { ...content.footer, editionTag: val },
                })
              }
              isEditMode={isEditMode}
              onEnterEditMode={handleEnterEditMode}
            />
            <span>·</span>
            <button
              onClick={handleResetDefaults}
              className="text-pink-600 hover:text-pink-800 underline inline-flex items-center gap-1 cursor-pointer"
              title="Reset all customized text back to src/birthdayContent.ts"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{content.footer.resetButtonText}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            💡 Content is loaded directly from <code className="bg-pink-50 text-pink-700 px-1.5 py-0.5 rounded border border-pink-200">src/birthdayContent.ts</code>
          </p>
        </div>
      </footer>

      {/* Floating Bottom Live Editor Controls */}
      <LiveEditorToolbar
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onSave={handleSaveAllChanges}
        onReset={handleResetDefaults}
      />
    </div>
  );
}
