import React, { useRef } from 'react';
import { BirthdayWebsiteContent, MemoryPhoto } from '../types';
import { Camera, Upload, Trash2, Plus, Smile, Coffee, Heart, Music } from 'lucide-react';
import { motion } from 'motion/react';
import { EditableText } from './EditableText';

interface GallerySectionProps {
  galleryContent: BirthdayWebsiteContent['gallery'];
  onUpdateGallery: (updated: BirthdayWebsiteContent['gallery']) => void;
  isEditMode: boolean;
  onEnterEditMode?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  galleryContent,
  onUpdateGallery,
  isEditMode,
  onEnterEditMode,
}) => {
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleImageUpload = (id: string, file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const updatedPhotos = galleryContent.photos.map((p) =>
        p.id === id ? { ...p, url: dataUrl } : p
      );
      onUpdateGallery({ ...galleryContent, photos: updatedPhotos });
    };
    reader.readAsDataURL(file);
  };

  const handleCaptionChange = (id: string, newCaption: string) => {
    const updatedPhotos = galleryContent.photos.map((p) =>
      p.id === id ? { ...p, caption: newCaption } : p
    );
    onUpdateGallery({ ...galleryContent, photos: updatedPhotos });
  };

  const handleDateChange = (id: string, newDate: string) => {
    const updatedPhotos = galleryContent.photos.map((p) =>
      p.id === id ? { ...p, date: newDate } : p
    );
    onUpdateGallery({ ...galleryContent, photos: updatedPhotos });
  };

  const handleStickerChange = (id: string, newSticker: string) => {
    const updatedPhotos = galleryContent.photos.map((p) =>
      p.id === id ? { ...p, sticker: newSticker } : p
    );
    onUpdateGallery({ ...galleryContent, photos: updatedPhotos });
  };

  const handleAddNewPhoto = () => {
    const newId = `photo-${Date.now()}`;
    const newPhoto: MemoryPhoto = {
      id: newId,
      url: '',
      caption: 'Inko pagal memory ra! 😂',
      rotation: Math.random() * 6 - 3,
      tapeColor: (['pink', 'blue', 'lavender', 'cream'] as const)[
        Math.floor(Math.random() * 4)
      ],
      sticker: '✨',
      date: 'Special Moment',
    };
    onUpdateGallery({ ...galleryContent, photos: [...galleryContent.photos, newPhoto] });
  };

  const handleDeletePhoto = (id: string) => {
    onUpdateGallery({
      ...galleryContent,
      photos: galleryContent.photos.filter((p) => p.id !== id),
    });
  };

  // Aesthetic doodle placeholders matching scrapbook theme
  const renderArtPlaceholder = (idx: number) => {
    const icons = [
      <Coffee key="coffee" className="w-12 h-12 text-amber-500" />,
      <Smile key="smile" className="w-12 h-12 text-pink-500" />,
      <Music key="music" className="w-12 h-12 text-purple-500" />,
      <Heart key="heart" className="w-12 h-12 text-rose-500" />,
    ];
    const bgs = ['bg-amber-50', 'bg-pink-50', 'bg-purple-50', 'bg-rose-50'];

    const doodle = galleryContent.doodles[idx % galleryContent.doodles.length] || {
      title: 'Bestie Memory',
      tag: 'Special moment',
    };

    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-4 text-center ${
          bgs[idx % bgs.length]
        } border-2 border-dashed border-slate-300 rounded-lg group-hover:border-pink-400 transition-colors`}
      >
        <div className="mb-2 p-3 bg-white rounded-full shadow-xs">
          {icons[idx % icons.length]}
        </div>
        <EditableText
          as="p"
          value={doodle.title}
          onChange={(val) => {
            const updatedDoodles = [...galleryContent.doodles];
            updatedDoodles[idx % galleryContent.doodles.length] = {
              ...doodle,
              title: val,
            };
            onUpdateGallery({ ...galleryContent, doodles: updatedDoodles });
          }}
          isEditMode={isEditMode}
          onEnterEditMode={onEnterEditMode}
          className="font-['Patrick_Hand',cursive] text-lg text-slate-700 font-bold"
        />
        <EditableText
          as="p"
          value={doodle.tag}
          onChange={(val) => {
            const updatedDoodles = [...galleryContent.doodles];
            updatedDoodles[idx % galleryContent.doodles.length] = {
              ...doodle,
              tag: val,
            };
            onUpdateGallery({ ...galleryContent, doodles: updatedDoodles });
          }}
          isEditMode={isEditMode}
          onEnterEditMode={onEnterEditMode}
          className="text-[11px] text-slate-500 mb-3"
        />
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-white text-pink-600 rounded-full text-xs font-semibold shadow-xs border border-pink-200 group-hover:bg-pink-600 group-hover:text-white transition-colors">
          <Upload className="w-3 h-3" />
          <span>Upload Cheyyi</span>
        </span>
      </div>
    );
  };

  return (
    <section id="memories" className="py-16 px-4 max-w-6xl mx-auto relative">
      {/* Scrapbook Section Header */}
      <div className="text-center mb-12 space-y-2 relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold mb-2">
          <Camera className="w-3.5 h-3.5" />
          <EditableText
            value={galleryContent.badge}
            onChange={(val) => onUpdateGallery({ ...galleryContent, badge: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
          />
        </div>
        <div>
          <EditableText
            as="h2"
            value={galleryContent.heading}
            onChange={(val) => onUpdateGallery({ ...galleryContent, heading: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
            className="text-3xl sm:text-5xl font-bold font-['Caveat',cursive] text-slate-800"
          />
        </div>
        <div>
          <EditableText
            as="p"
            value={galleryContent.subtitle}
            onChange={(val) => onUpdateGallery({ ...galleryContent, subtitle: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
            className="font-['Patrick_Hand',cursive] text-lg sm:text-xl text-slate-600"
          />
        </div>
        {(galleryContent.uploadHint || isEditMode) && (
          <div>
            <EditableText
              as="p"
              value={galleryContent.uploadHint}
              onChange={(val) => onUpdateGallery({ ...galleryContent, uploadHint: val })}
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
              placeholder="Upload hint rayi..."
              className="text-xs text-slate-600 max-w-md mx-auto"
            />
          </div>
        )}
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 pt-4">
        {galleryContent.photos.map((photo, index) => {
          const tapeClass =
            photo.tapeColor === 'pink'
              ? 'washi-tape-pink'
              : photo.tapeColor === 'blue'
              ? 'washi-tape-blue'
              : photo.tapeColor === 'lavender'
              ? 'washi-tape-lavender'
              : 'washi-tape-cream';

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ transform: `rotate(${photo.rotation}deg)` }}
              className="relative polaroid-card p-4 pb-6 rounded-sm bg-white border border-slate-100 group cursor-pointer"
            >
              {/* Washi Tape on Top Center */}
              <div
                className={`washi-tape ${tapeClass} -top-3.5 left-1/2 -translate-x-1/2 w-24`}
              />

              {/* Corner Sticker */}
              <div className="absolute top-2 right-2 text-xl z-10 select-none drop-shadow-xs">
                <EditableText
                  value={photo.sticker || '🌸'}
                  onChange={(val) => handleStickerChange(photo.id, val)}
                  isEditMode={isEditMode}
                  onEnterEditMode={onEnterEditMode}
                  showIcon={false}
                />
              </div>

              {/* Photo Frame Container with dashed border and rounded corners */}
              <div
                onClick={() => fileInputRefs.current[photo.id]?.click()}
                className="w-full aspect-[4/4.5] bg-slate-50 border-2 border-dashed border-pink-200/90 rounded-xl overflow-hidden relative shadow-inner mb-3 flex items-center justify-center cursor-pointer group-hover:border-pink-400 transition-colors"
              >
                {photo.url ? (
                  <>
                    <img
                      src={encodeURI(photo.url)}
                      alt={photo.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-xs rounded-lg">
                      <Upload className="w-4 h-4" />
                      <span>Photo Marchu 📸</span>
                    </div>
                  </>
                ) : (
                  renderArtPlaceholder(index)
                )}
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                ref={(el) => {
                  fileInputRefs.current[photo.id] = el;
                }}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(photo.id, file);
                }}
              />

              {/* Caption (Handwritten Polaroid Style - Editable directly in place!) */}
              <div className="px-1 text-center space-y-1">
                <div className="font-['Caveat',cursive] text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                  <span>"</span>
                  <EditableText
                    value={photo.caption}
                    onChange={(val) => handleCaptionChange(photo.id, val)}
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                    placeholder="Caption rayi..."
                    className="font-['Caveat',cursive] text-xl sm:text-2xl font-bold text-slate-800"
                  />
                  <span>"</span>
                </div>

                {(photo.date || isEditMode) && (
                  <div className="text-[11px] text-slate-500 font-mono">
                    <EditableText
                      value={photo.date || ''}
                      onChange={(val) => handleDateChange(photo.id, val)}
                      isEditMode={isEditMode}
                      onEnterEditMode={onEnterEditMode}
                      placeholder="Date..."
                      className="text-[11px] text-slate-500 font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons on Hover */}
              <div className="absolute -bottom-3 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRefs.current[photo.id]?.click();
                  }}
                  className="p-1.5 bg-white text-slate-700 hover:text-pink-600 rounded-full shadow-md border border-slate-200 hover:scale-110 transition-all cursor-pointer"
                  title="Upload / Change Photo"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
                {galleryContent.photos.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePhoto(photo.id);
                    }}
                    className="p-1.5 bg-white text-slate-400 hover:text-rose-600 rounded-full shadow-md border border-slate-200 hover:scale-110 transition-all cursor-pointer"
                    title="Delete Memory"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add New Polaroid Button */}
      {(galleryContent.addMemoryButtonText || isEditMode) && (
        <div className="mt-10 text-center">
          <button
            onClick={handleAddNewPhoto}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-pink-50 text-pink-600 border-2 border-dashed border-pink-300 hover:border-pink-500 rounded-full text-sm font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <EditableText
              value={galleryContent.addMemoryButtonText || 'Inko Memory Add Cheyyi 📸'}
              onChange={(val) =>
                onUpdateGallery({ ...galleryContent, addMemoryButtonText: val })
              }
              isEditMode={isEditMode}
              onEnterEditMode={onEnterEditMode}
            />
          </button>
        </div>
      )}
    </section>
  );
};
