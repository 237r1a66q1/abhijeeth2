import React, { useState } from 'react';
import { Save, Check, RotateCcw, Eye, Edit3, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveEditorToolbarProps {
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  onSave: () => void;
  onReset: () => void;
  lastSavedTime?: string;
}

export const LiveEditorToolbar: React.FC<LiveEditorToolbarProps> = ({
  isEditMode,
  setIsEditMode,
  onSave,
  onReset,
  lastSavedTime,
}) => {
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSaveClick = () => {
    onSave();
    setShowSavedToast(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.9 },
      colors: ['#F472B6', '#38BDF8', '#34D399', '#FBBF24'],
    });
    setTimeout(() => {
      setShowSavedToast(false);
    }, 3000);
  };

  return (
    <>
      {/* Toast Notification when saved */}
      {showSavedToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md border border-pink-400/40 animate-bounce duration-500">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div className="text-left text-xs">
            <span className="font-bold text-emerald-300 block">Changes Saved Successfully! 💾</span>
            <span className="text-slate-300">Browser refresh chesina mee edits safe ga untayi!</span>
          </div>
        </div>
      )}

      {/* Floating Bottom Live Editor Control Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-[95vw] sm:max-w-lg w-full px-2 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-full p-2 px-3 sm:px-4 shadow-xl border-2 border-pink-200 flex items-center justify-between gap-2 text-xs">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-full shrink-0">
            <button
              onClick={() => setIsEditMode(true)}
              className={`px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isEditMode
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Live Edit Mode: Click any text directly to edit"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Mode ✏️</span>
            </button>
            <button
              onClick={() => setIsEditMode(false)}
              className={`px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                !isEditMode
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Preview Mode: See how the gift looks to your friend"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview 👁️</span>
            </button>
          </div>

          {/* Quick Info or Status */}
          <div className="hidden sm:flex items-center text-[11px] text-slate-500 truncate font-medium">
            {isEditMode ? (
              <span className="text-pink-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-spin" />
                <span>Click any text to edit directly</span>
              </span>
            ) : (
              <span>Gift Preview Active</span>
            )}
          </div>

          {/* Action Buttons: Save & Reset */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleSaveClick}
              className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
              title="Save all changes to browser storage"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes 💾</span>
            </button>

            <button
              onClick={onReset}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
              title="Reset all text to default Telugu-English wishes"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
