import React, { useState } from 'react';
import { BirthdayWebsiteContent } from '../types';
import { motion } from 'motion/react';
import { Cake, Flame, PartyPopper, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EditableText } from './EditableText';

interface BirthdayCakeSectionProps {
  cakeContent: BirthdayWebsiteContent['cake'];
  onUpdateCake: (updated: BirthdayWebsiteContent['cake']) => void;
  isEditMode: boolean;
  onEnterEditMode?: () => void;
}

export const BirthdayCakeSection: React.FC<BirthdayCakeSectionProps> = ({
  cakeContent,
  onUpdateCake,
  isEditMode,
  onEnterEditMode,
}) => {
  const [candlesLit, setCandlesLit] = useState(true);

  const handleBlowCandles = () => {
    setCandlesLit(false);

    // Multi-stage confetti celebration
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#60A5FA', '#C084FC', '#FBBF24', '#34D399'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.5 },
      });
    }, 400);
  };

  const handleRelightCandles = () => {
    setCandlesLit(true);
  };

  const blastExtraConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#F472B6', '#38BDF8', '#E879F9'],
    });
  };

  return (
    <section id="cake" className="py-20 px-4 max-w-5xl mx-auto relative text-center">
      {/* Decorative Washi Tapes */}
      <div className="washi-tape washi-tape-pink -top-3 left-1/4 w-32 -rotate-3" />
      <div className="washi-tape washi-tape-blue -top-2 right-1/4 w-32 rotate-2" />

      {/* Floating Birthday Balloons in Background */}
      <div className="absolute top-10 left-6 sm:left-12 text-4xl animate-bounce duration-1000 select-none pointer-events-none">
        🎈
      </div>
      <div className="absolute top-16 right-6 sm:right-16 text-5xl animate-bounce duration-700 select-none pointer-events-none">
        🎉
      </div>
      <div className="absolute bottom-20 left-10 text-4xl animate-pulse select-none pointer-events-none">
        💖
      </div>
      <div className="absolute bottom-24 right-10 text-4xl animate-pulse select-none pointer-events-none">
        ⭐
      </div>

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        {/* Main Text & Subtitle */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Cake className="w-4 h-4" />
            <EditableText
              value={cakeContent.badge}
              onChange={(val) => onUpdateCake({ ...cakeContent, badge: val })}
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <EditableText
              as="h2"
              value={cakeContent.mainText}
              onChange={(val) => onUpdateCake({ ...cakeContent, mainText: val })}
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
              className="text-4xl sm:text-6xl font-bold font-['Caveat',cursive] text-pink-600 tracking-tight"
            />
          </motion.div>

          <div className="text-xl sm:text-2xl font-['Patrick_Hand',cursive] text-slate-700 max-w-lg mx-auto">
            <span>"</span>
            <EditableText
              value={cakeContent.subtitle}
              onChange={(val) => onUpdateCake({ ...cakeContent, subtitle: val })}
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
              multiline
              className="font-['Patrick_Hand',cursive] text-xl sm:text-2xl text-slate-700"
            />
            <span>"</span>
          </div>
        </div>

        {/* Cute Animated Birthday Cake */}
        <div className="py-6 flex flex-col items-center">
          <div className="relative w-72 sm:w-80 h-64 flex flex-col items-center justify-end">
            {/* Candles Row */}
            <div className="flex items-center gap-6 mb-1 z-20">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center relative">
                  {/* Candle Flame */}
                  {candlesLit ? (
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 0.95, 1.1],
                        rotate: [-2, 3, -3, 2],
                      }}
                      transition={{ repeat: Infinity, duration: 0.8 + i * 0.2 }}
                      className="w-4 h-6 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 shadow-[0_0_12px_rgba(251,191,36,0.9)] cursor-pointer"
                      onClick={handleBlowCandles}
                      title="Candle meedha blow cheyyadaniki tap cheyyi!"
                    />
                  ) : (
                    /* Smoke swirl when blown out */
                    <motion.div
                      initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -20, scale: 1.5 }}
                      transition={{ duration: 1.2 }}
                      className="text-xs text-slate-400 font-mono"
                    >
                      💨
                    </motion.div>
                  )}

                  {/* Candle Wick */}
                  <div className="w-0.5 h-2 bg-slate-700" />

                  {/* Candle Stick */}
                  <div
                    className={`w-3.5 h-10 rounded-t-xs shadow-xs ${
                      i === 0
                        ? 'bg-gradient-to-b from-pink-300 to-rose-400'
                        : i === 1
                        ? 'bg-gradient-to-b from-sky-300 to-blue-400'
                        : 'bg-gradient-to-b from-purple-300 to-indigo-400'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Cake Top Tier */}
            <div className="w-44 h-16 rounded-t-2xl bg-gradient-to-b from-pink-200 to-pink-300 relative shadow-md border-b-4 border-pink-400 flex items-center justify-center">
              {/* White Cream Frosting drips */}
              <div className="absolute -top-1 inset-x-0 h-4 bg-white rounded-full flex justify-around px-2 shadow-xs">
                <span className="w-4 h-3 bg-white rounded-b-full" />
                <span className="w-5 h-4 bg-white rounded-b-full" />
                <span className="w-4 h-3 bg-white rounded-b-full" />
                <span className="w-5 h-4 bg-white rounded-b-full" />
              </div>
              <span className="font-['Caveat',cursive] text-white text-lg font-bold drop-shadow-xs">
                Happy Birthday!
              </span>
            </div>

            {/* Cake Bottom Tier */}
            <div className="w-64 h-22 rounded-t-2xl bg-gradient-to-b from-amber-100 via-rose-100 to-pink-200 relative shadow-lg border-b-6 border-pink-300 flex items-center justify-center overflow-hidden">
              {/* Decorative frosting flowers */}
              <div className="absolute top-1 inset-x-0 flex justify-around px-4">
                <span className="text-xs">🍓</span>
                <span className="text-xs">🌸</span>
                <span className="text-xs">🍓</span>
                <span className="text-xs">🌸</span>
                <span className="text-xs">🍓</span>
              </div>
              <div className="text-center mt-3">
                <span className="text-xs font-bold text-pink-700 font-mono tracking-wider">
                  ★ FOREVER BEST FRIEND ★
                </span>
              </div>
            </div>

            {/* Cake Stand / Plate */}
            <div className="w-76 h-4 rounded-full bg-slate-200 border border-slate-300 shadow-md" />
          </div>
        </div>

        {/* Wish State & Action Buttons */}
        <div className="flex flex-col items-center gap-4">
          {candlesLit ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBlowCandles}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 text-white font-bold rounded-full shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer text-base sm:text-lg"
            >
              <Flame className="w-5 h-5 fill-yellow-200" />
              <EditableText
                value={cakeContent.blowButtonText}
                onChange={(val) =>
                  onUpdateCake({ ...cakeContent, blowButtonText: val })
                }
                isEditMode={isEditMode}
                onEnterEditMode={onEnterEditMode}
                className="text-white font-bold"
              />
            </motion.button>
          ) : (
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl max-w-md mx-auto"
              >
                <div className="text-3xl mb-1">🎉 🥳 ✨</div>
                <div className="font-['Caveat',cursive] text-2xl font-bold text-emerald-800">
                  <EditableText
                    value={cakeContent.wishMadeTitle}
                    onChange={(val) =>
                      onUpdateCake({ ...cakeContent, wishMadeTitle: val })
                    }
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                  />
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  <EditableText
                    value={cakeContent.wishMadeSubtext}
                    onChange={(val) =>
                      onUpdateCake({ ...cakeContent, wishMadeSubtext: val })
                    }
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                    multiline
                  />
                </div>
              </motion.div>

              <button
                onClick={handleRelightCandles}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-pink-600 underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <EditableText
                  value={cakeContent.relightButtonText}
                  onChange={(val) =>
                    onUpdateCake({ ...cakeContent, relightButtonText: val })
                  }
                  isEditMode={isEditMode}
                  onEnterEditMode={onEnterEditMode}
                />
              </button>
            </div>
          )}

          {/* Confetti blast button */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={blastExtraConfetti}
              className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-full text-xs font-bold transition-colors cursor-pointer border border-pink-200 shadow-xs"
            >
              <PartyPopper className="w-4 h-4 text-pink-600" />
              <EditableText
                value={cakeContent.confettiButtonText}
                onChange={(val) =>
                  onUpdateCake({ ...cakeContent, confettiButtonText: val })
                }
                isEditMode={isEditMode}
                onEnterEditMode={onEnterEditMode}
              />
            </button>
          </div>
        </div>

        {/* Emotional Bestie Footer Sign-off */}
        <div className="pt-12 border-t border-dashed border-pink-200">
          <div className="font-['Caveat',cursive] text-2xl sm:text-3xl text-pink-600 font-bold">
            <span>"</span>
            <EditableText
              value={cakeContent.footerQuote}
              onChange={(val) =>
                onUpdateCake({ ...cakeContent, footerQuote: val })
              }
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
              multiline
              className="font-['Caveat',cursive] text-2xl sm:text-3xl text-pink-600 font-bold"
            />
            <span>"</span>
          </div>
          <div className="text-xs font-mono text-slate-600 block mt-2">
            <EditableText
              value={cakeContent.footerSubtext}
              onChange={(val) =>
                onUpdateCake({ ...cakeContent, footerSubtext: val })
              }
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
