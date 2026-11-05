import React, { useState } from 'react';
import { BirthdayWebsiteContent } from '../types';
import { motion } from 'motion/react';
import { Trophy, Crown, Heart, Shield, Headphones, Camera, Lock, Sparkles, Gem } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EditableText } from './EditableText';

interface AwardsSectionProps {
  awardsContent: BirthdayWebsiteContent['awards'];
  onUpdateAwards: (updated: BirthdayWebsiteContent['awards']) => void;
  isEditMode: boolean;
  onEnterEditMode?: () => void;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({
  awardsContent,
  onUpdateAwards,
  isEditMode,
  onEnterEditMode,
}) => {
  const [claimedSpecial, setClaimedSpecial] = useState(false);

  const handleClaimSpecialAward = () => {
    setClaimedSpecial(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#EC4899', '#8B5CF6', '#38BDF8', '#FEF08A'],
    });
  };

  const handleAwardItemChange = (
    id: number,
    field: 'title' | 'description',
    newVal: string
  ) => {
    const updatedList = awardsContent.list.map((a) =>
      a.id === id ? { ...a, [field]: newVal } : a
    );
    onUpdateAwards({ ...awardsContent, list: updatedList });
  };

  const handleSpecialAwardChange = (
    field: 'title' | 'description' | 'badge' | 'claimButtonText' | 'claimedButtonText' | 'certifiedNotice',
    newVal: string
  ) => {
    onUpdateAwards({
      ...awardsContent,
      specialAward: {
        ...awardsContent.specialAward,
        [field]: newVal,
      },
    });
  };

  const getAwardIcon = (name: string) => {
    switch (name) {
      case 'heart':
        return <Heart className="w-6 h-6 text-amber-600 fill-amber-200" />;
      case 'shield':
        return <Shield className="w-6 h-6 text-sky-600 fill-sky-200" />;
      case 'headphones':
        return <Headphones className="w-6 h-6 text-pink-600" />;
      case 'camera':
        return <Camera className="w-6 h-6 text-purple-600" />;
      case 'lock':
        return <Lock className="w-6 h-6 text-emerald-600" />;
      case 'gem':
        return <Gem className="w-6 h-6 text-violet-600" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-pink-600" />;
      case 'crown':
        return <Crown className="w-8 h-8 text-amber-500 fill-amber-300" />;
      default:
        return <Trophy className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="awards" className="py-16 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-12 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-2 shadow-xs">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <EditableText
            value={awardsContent.badge}
            onChange={(val) => onUpdateAwards({ ...awardsContent, badge: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
          />
        </div>
        <div>
          <EditableText
            as="h2"
            value={awardsContent.heading}
            onChange={(val) => onUpdateAwards({ ...awardsContent, heading: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
            className="text-3xl sm:text-5xl font-bold font-['Caveat',cursive] text-slate-800"
          />
        </div>
        <div>
          <EditableText
            as="p"
            value={awardsContent.subtitle}
            onChange={(val) => onUpdateAwards({ ...awardsContent, subtitle: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
            className="font-['Patrick_Hand',cursive] text-lg sm:text-xl text-slate-600"
          />
        </div>
      </div>

      {/* Grid of Core Awards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {awardsContent.list.map((award, index) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="relative bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between group overflow-hidden"
          >
            {/* Top decorative trophy ribbon */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
              <div className="bg-amber-400 text-amber-950 text-[9px] font-bold py-1 text-center transform rotate-45 translate-x-4 translate-y-2 w-24 shadow-xs font-mono">
                NO. 0{award.id}
              </div>
            </div>

            <div className="space-y-4">
              {/* Icon badge circle with pulsing shine */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${award.badgeColor} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}
              >
                {getAwardIcon(award.iconName)}
              </div>

              {/* Award Title */}
              <div>
                <EditableText
                  as="h3"
                  value={award.title}
                  onChange={(val) => handleAwardItemChange(award.id, 'title', val)}
                  isEditMode={isEditMode}
                  onEnterEditMode={onEnterEditMode}
                  className="font-['Caveat',cursive] text-2xl font-bold text-slate-800 group-hover:text-pink-600 transition-colors"
                />
              </div>

              {/* Award Description */}
              <div className="font-['Patrick_Hand',cursive] text-lg text-slate-600 leading-snug">
                <span>"</span>
                <EditableText
                  value={award.description}
                  onChange={(val) => handleAwardItemChange(award.id, 'description', val)}
                  isEditMode={isEditMode}
                  onEnterEditMode={onEnterEditMode}
                  multiline
                  className="font-['Patrick_Hand',cursive] text-lg text-slate-600 leading-snug"
                />
                <span>"</span>
              </div>
            </div>

            {/* Bottom mini medal stamp */}
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-600">
              <span className="font-mono">Verified by Bestie</span>
              <span className="text-amber-500 font-bold">100% Genuine ⭐</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FINAL SPECIAL AWARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-amber-100 via-rose-50 to-pink-100 border-2 border-amber-300 shadow-2xl overflow-hidden text-center max-w-3xl mx-auto"
      >
        {/* Scrapbook corner stickers & washi tapes */}
        <div className="washi-tape washi-tape-pink -top-3 left-10 w-32 -rotate-3" />
        <div className="washi-tape washi-tape-cream -top-3 right-10 w-32 rotate-2" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-white text-xs font-bold uppercase tracking-widest shadow-md">
            <Crown className="w-4 h-4" />
            <EditableText
              value={awardsContent.specialAward.badge}
              onChange={(val) => handleSpecialAwardChange('badge', val)}
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
            />
          </div>

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-300 to-yellow-100 border-4 border-white shadow-xl flex items-center justify-center animate-bounce">
            <Crown className="w-10 h-10 text-amber-600 fill-amber-300" />
          </div>

          <div>
            <EditableText
              as="h3"
              value={awardsContent.specialAward.title}
              onChange={(val) => handleSpecialAwardChange('title', val)}
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
              className="text-3xl sm:text-5xl font-bold font-['Caveat',cursive] text-rose-600 mb-3"
            />
            <div className="font-['Patrick_Hand',cursive] text-xl sm:text-2xl text-slate-700 max-w-xl mx-auto leading-relaxed">
              <span>"</span>
              <EditableText
                value={awardsContent.specialAward.description}
                onChange={(val) => handleSpecialAwardChange('description', val)}
                isEditMode={isEditMode}
                onEnterEditMode={onEnterEditMode}
                multiline
                className="font-['Patrick_Hand',cursive] text-xl sm:text-2xl text-slate-700 leading-relaxed"
              />
              <span>"</span>
            </div>
          </div>

          {/* Interactive Claim / Celebrate Button */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClaimSpecialAward}
              className={`px-8 py-3.5 rounded-full font-bold shadow-lg transition-all text-base sm:text-lg cursor-pointer ${
                claimedSpecial
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                  : 'bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white hover:brightness-110'
              }`}
            >
              {claimedSpecial ? (
                <EditableText
                  value={awardsContent.specialAward.claimedButtonText}
                  onChange={(val) => handleSpecialAwardChange('claimedButtonText', val)}
                  isEditMode={isEditMode}
                  onEnterEditMode={onEnterEditMode}
                />
              ) : (
                <EditableText
                  value={awardsContent.specialAward.claimButtonText}
                  onChange={(val) => handleSpecialAwardChange('claimButtonText', val)}
                  isEditMode={isEditMode}
                  onEnterEditMode={onEnterEditMode}
                />
              )}
            </motion.button>
          </div>

          {claimedSpecial && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-rose-600 font-bold font-mono"
            >
              <EditableText
                value={awardsContent.specialAward.certifiedNotice}
                onChange={(val) => handleSpecialAwardChange('certifiedNotice', val)}
                isEditMode={isEditMode}
                onEnterEditMode={onEnterEditMode}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
