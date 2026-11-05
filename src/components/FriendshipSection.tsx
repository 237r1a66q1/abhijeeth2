import React from 'react';
import { BirthdayWebsiteContent } from '../types';
import { motion } from 'motion/react';
import { Heart, Sparkles, MessageCircle, AlertCircle, Bookmark } from 'lucide-react';
import { EditableText } from './EditableText';

interface FriendshipSectionProps {
  friendshipContent: BirthdayWebsiteContent['friendship'];
  onUpdateFriendship: (updated: BirthdayWebsiteContent['friendship']) => void;
  isEditMode: boolean;
  onEnterEditMode?: () => void;
}

export const FriendshipSection: React.FC<FriendshipSectionProps> = ({
  friendshipContent,
  onUpdateFriendship,
  isEditMode,
  onEnterEditMode,
}) => {
  const handleNoteChange = (
    idx: number,
    field: 'quote' | 'label' | 'subtext',
    newVal: string
  ) => {
    const updatedNotes = [...friendshipContent.notes];
    updatedNotes[idx] = { ...updatedNotes[idx], [field]: newVal };
    onUpdateFriendship({ ...friendshipContent, notes: updatedNotes });
  };

  return (
    <section id="story" className="py-16 px-4 max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-12 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-2">
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
          <EditableText
            value={friendshipContent.badge}
            onChange={(val) =>
              onUpdateFriendship({ ...friendshipContent, badge: val })
            }
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
          />
        </div>
        <div>
          <EditableText
            as="h2"
            value={friendshipContent.heading}
            onChange={(val) =>
              onUpdateFriendship({ ...friendshipContent, heading: val })
            }
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
            className="text-3xl sm:text-5xl font-bold font-['Caveat',cursive] text-slate-800"
          />
        </div>
        <div>
          <EditableText
            as="p"
            value={friendshipContent.subtitle}
            onChange={(val) =>
              onUpdateFriendship({ ...friendshipContent, subtitle: val })
            }
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
            className="font-['Patrick_Hand',cursive] text-lg sm:text-xl text-slate-600"
          />
        </div>
      </div>

      {/* Aesthetic Scrapbook Journal Open Book */}
      <div className="relative bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-100 paper-pattern">
        {/* Washi Tapes on corners */}
        <div className="washi-tape washi-tape-pink -top-3 left-8 w-28 -rotate-2" />
        <div className="washi-tape washi-tape-lavender -top-3 right-8 w-32 rotate-3" />
        <div className="washi-tape washi-tape-blue -bottom-3 left-1/3 w-32 rotate-1" />

        {/* Top Journal Header info */}
        <div className="flex flex-wrap items-center justify-between pb-6 border-b border-dashed border-slate-300 text-xs text-slate-600 gap-2 font-mono">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-pink-400" />
            <EditableText
              value={friendshipContent.chapterTag}
              onChange={(val) =>
                onUpdateFriendship({ ...friendshipContent, chapterTag: val })
              }
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
              className="font-bold text-slate-700"
            />
          </div>
          <div className="flex items-center gap-2">
            <EditableText
              value={friendshipContent.statusText}
              onChange={(val) =>
                onUpdateFriendship({ ...friendshipContent, statusText: val })
              }
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
            />
            <span>·</span>
            <EditableText
              value={friendshipContent.moodText}
              onChange={(val) =>
                onUpdateFriendship({ ...friendshipContent, moodText: val })
              }
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
            />
          </div>
        </div>

        {/* Story Cards / Scrapbook Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {friendshipContent.notes.map((note, idx) => {
            const bgClass =
              note.color === 'amber'
                ? 'bg-amber-50/90 border-amber-200/80'
                : note.color === 'pink'
                ? 'bg-pink-50/90 border-pink-200/80'
                : 'bg-purple-50/90 border-purple-200/80';

            const tapeClass =
              note.color === 'amber'
                ? 'washi-tape-cream'
                : note.color === 'pink'
                ? 'washi-tape-pink'
                : 'washi-tape-lavender';

            const iconBadgeBg =
              note.color === 'amber'
                ? 'bg-amber-200/60'
                : note.color === 'pink'
                ? 'bg-pink-200/60'
                : 'bg-purple-200/60';

            const labelColor =
              note.color === 'amber'
                ? 'text-amber-800'
                : note.color === 'pink'
                ? 'text-pink-800'
                : 'text-purple-800';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative ${bgClass} rounded-2xl p-6 border shadow-xs flex flex-col justify-between hover:-translate-y-1 transition-transform`}
              >
                <div className={`washi-tape ${tapeClass} -top-2.5 left-6 w-20 -rotate-2`} />
                <div className="space-y-4">
                  <div
                    className={`w-10 h-10 rounded-full ${iconBadgeBg} flex items-center justify-center text-xl`}
                  >
                    {note.emoji}
                  </div>
                  <div>
                    <EditableText
                      value={note.label}
                      onChange={(val) => handleNoteChange(idx, 'label', val)}
                      isEditMode={isEditMode}
                      onEnterEditMode={onEnterEditMode}
                      className={`text-xs font-bold ${labelColor} uppercase tracking-wider block font-mono`}
                    />
                  </div>
                  <div className="font-['Caveat',cursive] text-2xl font-bold text-slate-800 leading-snug">
                    <span>"</span>
                    <EditableText
                      value={note.quote}
                      onChange={(val) => handleNoteChange(idx, 'quote', val)}
                      isEditMode={isEditMode}
                      onEnterEditMode={onEnterEditMode}
                      multiline
                      className="font-['Caveat',cursive] text-2xl font-bold text-slate-800"
                    />
                    <span>"</span>
                  </div>
                </div>
                <div className="pt-4 text-xs text-slate-600 font-medium border-t border-slate-200/50 mt-4 flex items-center gap-1.5">
                  {idx === 0 && <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                  {idx === 1 && <MessageCircle className="w-3.5 h-3.5 text-pink-600 shrink-0" />}
                  {idx === 2 && <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />}
                  <EditableText
                    value={note.subtext}
                    onChange={(val) => handleNoteChange(idx, 'subtext', val)}
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cute Scrapbook Footer stamp */}
        <div className="mt-8 pt-6 border-t border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="italic font-['Patrick_Hand',cursive] text-base text-slate-600">
            <span>"</span>
            <EditableText
              value={friendshipContent.footerQuote}
              onChange={(val) =>
                onUpdateFriendship({ ...friendshipContent, footerQuote: val })
              }
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
            />
            <span>"</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-bold">
              <EditableText
                value={friendshipContent.tierTag}
                onChange={(val) =>
                  onUpdateFriendship({ ...friendshipContent, tierTag: val })
                }
                isEditMode={isEditMode}
                onEnterEditMode={onEnterEditMode}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
