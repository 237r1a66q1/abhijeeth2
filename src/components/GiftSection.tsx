import React, { useState } from 'react';
import { BirthdayWebsiteContent } from '../types';
import { motion } from 'motion/react';
import { Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EditableText } from './EditableText';

interface GiftSectionProps {
  giftContent: BirthdayWebsiteContent['gift'];
  onUpdateGift: (updated: BirthdayWebsiteContent['gift']) => void;
  isEditMode: boolean;
  onEnterEditMode?: () => void;
}

export const GiftSection: React.FC<GiftSectionProps> = ({
  giftContent,
  onUpdateGift,
  isEditMode,
  onEnterEditMode,
}) => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [redeemedCoupons, setRedeemedCoupons] = useState<{ [key: string]: boolean }>({});

  const handleOpenGiftBox = () => {
    setIsBoxOpen(true);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#38BDF8', '#C084FC', '#FBBF24'],
    });
  };

  const toggleCoupon = (id: string) => {
    setRedeemedCoupons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#F472B6', '#34D399'],
    });
  };

  const handleCouponChange = (
    id: string,
    field: 'title' | 'desc' | 'emoji',
    newVal: string
  ) => {
    const updatedCoupons = giftContent.coupons.map((c) =>
      c.id === id ? { ...c, [field]: newVal } : c
    );
    onUpdateGift({ ...giftContent, coupons: updatedCoupons });
  };

  return (
    <section id="gift" className="py-16 px-4 max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-2">
          <Gift className="w-3.5 h-3.5" />
          <EditableText
            value={giftContent.badge}
            onChange={(val) => onUpdateGift({ ...giftContent, badge: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
          />
        </div>
        <div>
          <EditableText
            as="h2"
            value={giftContent.heading}
            onChange={(val) => onUpdateGift({ ...giftContent, heading: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
            className="text-3xl sm:text-5xl font-bold font-['Caveat',cursive] text-slate-800"
          />
        </div>
        <div>
          <EditableText
            as="p"
            value={giftContent.subtitle}
            onChange={(val) => onUpdateGift({ ...giftContent, subtitle: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
            className="font-['Patrick_Hand',cursive] text-lg sm:text-xl text-slate-600"
          />
        </div>
      </div>

      {/* Gift Box Container */}
      <div className="flex flex-col items-center">
        {!isBoxOpen ? (
          /* Closed Animated Gift Box */
          <motion.div
            whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenGiftBox}
            className="w-64 h-64 sm:w-72 sm:h-72 cursor-pointer relative select-none flex items-center justify-center"
          >
            {/* Box Body */}
            <div className="w-56 h-56 rounded-3xl bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400 shadow-2xl relative flex items-center justify-center border-4 border-white">
              {/* Vertical Ribbon */}
              <div className="absolute inset-x-0 h-full flex justify-center">
                <div className="w-12 h-full bg-gradient-to-b from-sky-300 to-sky-400 shadow-sm" />
              </div>

              {/* Horizontal Ribbon */}
              <div className="absolute inset-y-0 w-full flex items-center">
                <div className="w-full h-12 bg-gradient-to-r from-sky-300 to-sky-400 shadow-sm" />
              </div>

              {/* Big Fluffy Ribbon Bow on Top */}
              <div className="absolute -top-7 w-20 h-16 flex items-center justify-center z-20">
                <div className="w-10 h-10 rounded-full bg-sky-400 border-2 border-white shadow-md transform -rotate-20" />
                <div className="w-10 h-10 rounded-full bg-sky-400 border-2 border-white shadow-md transform rotate-20 -ml-4" />
                <div className="absolute w-6 h-6 rounded-full bg-amber-300 border-2 border-white shadow-inner" />
              </div>

              {/* Center Sparkle text */}
              <div className="relative z-10 text-center px-4">
                <div className="p-3 bg-white/90 rounded-2xl shadow-md border border-pink-200">
                  <span className="text-xs uppercase font-bold text-pink-700 font-mono block">
                    Tap to Open
                  </span>
                  <EditableText
                    value={giftContent.boxTapPrompt}
                    onChange={(val) =>
                      onUpdateGift({ ...giftContent, boxTapPrompt: val })
                    }
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                    className="font-['Patrick_Hand',cursive] text-lg text-slate-800 font-bold"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Opened Gift Box with Pop Reveal */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-pink-200 relative overflow-hidden"
          >
            {/* Scrapbook accents */}
            <div className="washi-tape washi-tape-pink -top-2 left-8 w-28 -rotate-2" />
            <div className="washi-tape washi-tape-blue -top-2 right-8 w-28 rotate-2" />

            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-3xl animate-bounce">
                🎉
              </div>

              {/* Reveal Main Message */}
              <div className="space-y-3">
                <div>
                  <EditableText
                    as="h3"
                    value={giftContent.revealTitle}
                    onChange={(val) =>
                      onUpdateGift({ ...giftContent, revealTitle: val })
                    }
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                    className="text-3xl sm:text-5xl font-bold font-['Caveat',cursive] text-pink-600"
                  />
                </div>
                <div className="font-['Patrick_Hand',cursive] text-xl sm:text-2xl text-slate-700 max-w-xl mx-auto leading-relaxed">
                  <span>"</span>
                  <EditableText
                    value={giftContent.revealText}
                    onChange={(val) =>
                      onUpdateGift({ ...giftContent, revealText: val })
                    }
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                    multiline
                    className="font-['Patrick_Hand',cursive] text-xl sm:text-2xl text-slate-700 leading-relaxed"
                  />
                  <span>"</span>
                </div>
              </div>

              {/* Bonus Friendship Coupons Section */}
              <div className="pt-6 border-t border-dashed border-pink-200">
                <span className="text-xs uppercase font-mono font-bold text-slate-500 tracking-wider block mb-4">
                  <EditableText
                    value={giftContent.couponsHeading}
                    onChange={(val) =>
                      onUpdateGift({ ...giftContent, couponsHeading: val })
                    }
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                  />
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {giftContent.coupons.map((coupon) => {
                    const isClaimed = redeemedCoupons[coupon.id];
                    return (
                      <div
                        key={coupon.id}
                        onClick={() => toggleCoupon(coupon.id)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex items-start gap-3 select-none ${
                          isClaimed
                            ? 'bg-emerald-50 border-emerald-300 text-slate-700'
                            : 'bg-pink-50/70 hover:bg-pink-100/80 border-dashed border-pink-300 text-slate-800'
                        }`}
                      >
                        <span className="text-2xl shrink-0 mt-0.5">
                          <EditableText
                            value={coupon.emoji}
                            onChange={(val) => handleCouponChange(coupon.id, 'emoji', val)}
                            isEditMode={isEditMode}
                            onEnterEditMode={onEnterEditMode}
                            showIcon={false}
                          />
                        </span>
                        <div className="flex-1">
                          <div className="font-['Caveat',cursive] text-xl font-bold text-slate-800">
                            <EditableText
                              value={coupon.title}
                              onChange={(val) =>
                                handleCouponChange(coupon.id, 'title', val)
                              }
                              isEditMode={isEditMode}
                              onEnterEditMode={onEnterEditMode}
                              className="font-['Caveat',cursive] text-xl font-bold text-slate-800"
                            />
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5">
                            <EditableText
                              value={coupon.desc}
                              onChange={(val) =>
                                handleCouponChange(coupon.id, 'desc', val)
                              }
                              isEditMode={isEditMode}
                              onEnterEditMode={onEnterEditMode}
                              multiline
                              className="text-xs text-slate-600"
                            />
                          </div>
                          <span
                            className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isClaimed
                                ? 'bg-emerald-200 text-emerald-800'
                                : 'bg-white text-pink-700 border border-pink-200'
                            }`}
                          >
                            {isClaimed ? '✓ Claimed (Treat Pending)' : 'Tap to Redeem'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Close / Re-pack button */}
              <div className="pt-4">
                <button
                  onClick={() => setIsBoxOpen(false)}
                  className="text-xs text-slate-600 hover:text-pink-600 underline cursor-pointer"
                >
                  <EditableText
                    value={giftContent.repackButtonText}
                    onChange={(val) =>
                      onUpdateGift({ ...giftContent, repackButtonText: val })
                    }
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
