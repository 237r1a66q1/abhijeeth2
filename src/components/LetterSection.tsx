import React, { useState } from 'react';
import { BirthdayWebsiteContent } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EditableText } from './EditableText';

interface LetterSectionProps {
  letterContent: BirthdayWebsiteContent['letter'];
  onUpdateLetter: (updated: BirthdayWebsiteContent['letter']) => void;
  isEditMode: boolean;
  onEnterEditMode?: () => void;
}

export const LetterSection: React.FC<LetterSectionProps> = ({
  letterContent,
  onUpdateLetter,
  isEditMode,
  onEnterEditMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FBCFE8', '#F472B6', '#E9D5FF'],
      });
    }
    setIsOpen(!isOpen);
  };

  const handleParagraphChange = (index: number, val: string) => {
    const updatedParas = [...letterContent.paragraphs];
    updatedParas[index] = val;
    onUpdateLetter({ ...letterContent, paragraphs: updatedParas });
  };

  return (
    <section id="letter" className="py-16 px-4 max-w-4xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-2">
          <Mail className="w-3.5 h-3.5" />
          <EditableText
            value={letterContent.badge}
            onChange={(val) => onUpdateLetter({ ...letterContent, badge: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
          />
        </div>
        <div>
          <EditableText
            as="h2"
            value={letterContent.heading}
            onChange={(val) => onUpdateLetter({ ...letterContent, heading: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
            className="text-3xl sm:text-5xl font-bold font-['Caveat',cursive] text-slate-800"
          />
        </div>
        <div>
          <EditableText
            as="p"
            value={letterContent.subtitle}
            onChange={(val) => onUpdateLetter({ ...letterContent, subtitle: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
            className="font-['Patrick_Hand',cursive] text-lg sm:text-xl text-slate-600"
          />
        </div>
      </div>

      {/* Interactive Envelope & Letter Container */}
      <div className="flex flex-col items-center">
        {/* Clickable Envelope Wrapper */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          onClick={handleToggle}
          className="w-full max-w-2xl cursor-pointer select-none relative"
        >
          {/* Envelope Top Shell */}
          <div className="relative bg-gradient-to-b from-pink-200 to-rose-100 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-pink-300 overflow-hidden">
            <div className="washi-tape washi-tape-pink -top-2 left-8 w-28 -rotate-3" />
            <div className="washi-tape washi-tape-cream -top-2 right-8 w-28 rotate-2" />

            {/* Envelope Header bar */}
            <div className="flex items-center justify-between border-b border-pink-300/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">💌</span>
                <EditableText
                  value={letterContent.confidentialTag}
                  onChange={(val) =>
                    onUpdateLetter({ ...letterContent, confidentialTag: val })
                  }
                  isEditMode={isEditMode}
                  onEnterEditMode={onEnterEditMode}
                  className="font-['Patrick_Hand',cursive] text-lg text-slate-700 font-bold"
                />
              </div>
              <button
                type="button"
                className="text-xs px-3 py-1 rounded-full bg-white text-pink-600 font-bold shadow-xs hover:bg-pink-50 transition-colors"
              >
                {isOpen ? (
                  <EditableText
                    value={letterContent.closeButtonText}
                    onChange={(val) =>
                      onUpdateLetter({ ...letterContent, closeButtonText: val })
                    }
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                  />
                ) : (
                  <EditableText
                    value={letterContent.openButtonText}
                    onChange={(val) =>
                      onUpdateLetter({ ...letterContent, openButtonText: val })
                    }
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                  />
                )}
              </button>
            </div>

            {/* Sealed state preview */}
            {!isOpen ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg border-2 border-rose-300"
                >
                  <Heart className="w-8 h-8 fill-white" />
                </motion.div>
                <div className="space-y-1">
                  <div className="font-['Caveat',cursive] text-2xl font-bold text-slate-800">
                    <EditableText
                      value={letterContent.waxSealPrompt}
                      onChange={(val) =>
                        onUpdateLetter({ ...letterContent, waxSealPrompt: val })
                      }
                      isEditMode={isEditMode}
                      onEnterEditMode={onEnterEditMode}
                    />
                  </div>
                  <div>
                    <EditableText
                      as="p"
                      value={letterContent.waxSealSubtext}
                      onChange={(val) =>
                        onUpdateLetter({ ...letterContent, waxSealSubtext: val })
                      }
                      isEditMode={isEditMode}
                      onEnterEditMode={onEnterEditMode}
                      className="text-xs text-slate-600 font-medium"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {/* Letter Content Sliding out */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-10 shadow-inner border border-amber-200 paper-pattern space-y-6"
                >
                  {/* Decorative Letterhead Stamp */}
                  <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-300">
                    <div className="font-['Patrick_Hand',cursive] text-slate-700 text-lg font-bold">
                      <EditableText
                        value={letterContent.letterSalutation}
                        onChange={(val) =>
                          onUpdateLetter({
                            ...letterContent,
                            letterSalutation: val,
                          })
                        }
                        isEditMode={isEditMode}
                        onEnterEditMode={onEnterEditMode}
                        className="font-['Patrick_Hand',cursive] text-slate-700 text-lg font-bold"
                      />
                    </div>
                    <span className="text-xs font-mono bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full">
                      <EditableText
                        value={letterContent.letterheadTag}
                        onChange={(val) =>
                          onUpdateLetter({
                            ...letterContent,
                            letterheadTag: val,
                          })
                        }
                        isEditMode={isEditMode}
                        onEnterEditMode={onEnterEditMode}
                      />
                    </span>
                  </div>

                  {/* Letter Paragraphs (Directly live editable in place!) */}
                  <div className="space-y-4 text-slate-800 font-['Caveat',cursive] text-2xl sm:text-3xl leading-relaxed">
                    {letterContent.paragraphs.map((para, idx) => (
                      <div key={idx}>
                        <EditableText
                          as="p"
                          value={para}
                          onChange={(val) => handleParagraphChange(idx, val)}
                          isEditMode={isEditMode}
                          onEnterEditMode={onEnterEditMode}
                          multiline
                          className="font-['Caveat',cursive] text-2xl sm:text-3xl leading-relaxed"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Sign-off */}
                  <div className="pt-6 border-t border-dashed border-slate-200 flex flex-col items-end">
                    <div>
                      <EditableText
                        value={letterContent.signOff}
                        onChange={(val) =>
                          onUpdateLetter({ ...letterContent, signOff: val })
                        }
                        isEditMode={isEditMode}
                        onEnterEditMode={onEnterEditMode}
                        className="font-['Caveat',cursive] text-3xl font-bold text-pink-600 text-right"
                      />
                    </div>
                    <div>
                      <EditableText
                        value={letterContent.subSignOff}
                        onChange={(val) =>
                          onUpdateLetter({ ...letterContent, subSignOff: val })
                        }
                        isEditMode={isEditMode}
                        onEnterEditMode={onEnterEditMode}
                        className="text-xs font-mono text-slate-600 mt-1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
