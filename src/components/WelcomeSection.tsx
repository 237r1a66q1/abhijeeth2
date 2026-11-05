import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { BirthdayWebsiteContent } from '../types';
import { EditableText } from './EditableText';

interface WelcomeSectionProps {
  welcomeContent: BirthdayWebsiteContent['welcome'];
  onUpdateWelcome: (updated: BirthdayWebsiteContent['welcome']) => void;
  onOpen: () => void;
  isEditMode: boolean;
  onEnterEditMode?: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  welcomeContent,
  onUpdateWelcome,
  onOpen,
  isEditMode,
  onEnterEditMode,
}) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FBCFE8', '#BAE6FD', '#E9D5FF', '#FEF08A'],
    });
  };

  return (
    <section id="welcome" className="min-h-[88vh] flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Decorative Scrapbook Elements */}
      <div className="washi-tape washi-tape-pink -top-2 left-1/4 w-32 -rotate-3" />
      <div className="washi-tape washi-tape-blue -top-1 right-1/4 w-28 rotate-2" />

      <div className="max-w-3xl w-full mx-auto text-center space-y-6">
        {/* Headings */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold tracking-wide border border-pink-200 shadow-xs mb-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <EditableText
              value={welcomeContent.badge}
              onChange={(val) => onUpdateWelcome({ ...welcomeContent, badge: val })}
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <EditableText
              as="h1"
              value={welcomeContent.heading}
              onChange={(val) => onUpdateWelcome({ ...welcomeContent, heading: val })}
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
              className="text-4xl sm:text-6xl font-bold font-['Caveat',cursive] text-pink-600 tracking-tight"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <EditableText
              as="p"
              value={welcomeContent.subheading}
              onChange={(val) => onUpdateWelcome({ ...welcomeContent, subheading: val })}
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
              className="text-xl sm:text-2xl font-['Patrick_Hand',cursive] text-slate-700"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto italic font-medium"
          >
            <span>"</span>
            <EditableText
              value={welcomeContent.note}
              onChange={(val) => onUpdateWelcome({ ...welcomeContent, note: val })}
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
              multiline
            />
            <span>"</span>
          </motion.div>
        </div>

        {/* Animated Cute Envelope */}
        <div className="relative py-4 flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.02, rotate: isEnvelopeOpen ? 0 : -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={!isEnvelopeOpen ? handleOpenEnvelope : undefined}
            className={`w-72 sm:w-88 h-48 sm:h-52 rounded-2xl relative cursor-pointer select-none transition-all duration-500 shadow-lg ${
              isEnvelopeOpen
                ? 'bg-gradient-to-br from-pink-50 to-amber-50 border-2 border-pink-200'
                : 'bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100 border-2 border-pink-300'
            }`}
          >
            {/* Scrapbook stamps and tape on envelope */}
            <div className="absolute top-2 right-3 w-14 h-14 bg-white border-2 border-dashed border-pink-400 rounded-sm p-1 shadow-xs rotate-6 flex flex-col items-center justify-center">
              <span className="text-xs">📮</span>
              <EditableText
                value={welcomeContent.envelopeStamp}
                onChange={(val) => onUpdateWelcome({ ...welcomeContent, envelopeStamp: val })}
                isEditMode={isEditMode}
                onEnterEditMode={onEnterEditMode}
                className="text-[9px] font-bold text-pink-600 font-mono text-center"
              />
            </div>
            <div className="washi-tape washi-tape-lavender -top-2 left-6 w-20 -rotate-6" />

            {!isEnvelopeOpen ? (
              /* Closed Envelope View */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-rose-500/90 text-white flex items-center justify-center shadow-md animate-pulse">
                  <Heart className="w-8 h-8 fill-white" />
                </div>
                <div className="text-center">
                  <EditableText
                    as="span"
                    value={welcomeContent.envelopeHint}
                    onChange={(val) => onUpdateWelcome({ ...welcomeContent, envelopeHint: val })}
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                    className="text-sm font-['Patrick_Hand',cursive] text-slate-700 block"
                  />
                </div>
              </div>
            ) : (
              /* Opened Envelope with popping note */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-full flex flex-col items-center justify-center p-6 space-y-2 text-center"
              >
                <div className="text-3xl animate-bounce">🎉</div>
                <EditableText
                  as="h3"
                  value={welcomeContent.envelopeOpenTitle}
                  onChange={(val) => onUpdateWelcome({ ...welcomeContent, envelopeOpenTitle: val })}
                  isEditMode={isEditMode}
                  onEnterEditMode={onEnterEditMode}
                  className="font-['Caveat',cursive] text-2xl font-bold text-pink-600"
                />
                <EditableText
                  as="p"
                  value={welcomeContent.envelopeOpenMessage}
                  onChange={(val) => onUpdateWelcome({ ...welcomeContent, envelopeOpenMessage: val })}
                  isEditMode={isEditMode}
                  onEnterEditMode={onEnterEditMode}
                  multiline
                  className="text-xs sm:text-sm text-slate-600 font-medium"
                />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Open Button */}
        <div className="pt-2 flex flex-col items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!isEnvelopeOpen) {
                handleOpenEnvelope();
              }
              onOpen();
            }}
            className="px-8 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-bold shadow-md hover:shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all flex items-center gap-2.5 cursor-pointer text-base sm:text-lg group"
          >
            <EditableText
              value={welcomeContent.buttonText}
              onChange={(val) => onUpdateWelcome({ ...welcomeContent, buttonText: val })}
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
              className="text-white"
            />
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </motion.button>
          
          <EditableText
            as="span"
            value={welcomeContent.bottomTagline}
            onChange={(val) => onUpdateWelcome({ ...welcomeContent, bottomTagline: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
            className="text-xs text-slate-600 font-medium"
          />
        </div>
      </div>
    </section>
  );
};
