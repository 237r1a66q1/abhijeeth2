import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Upload, Volume2, VolumeX, Disc3, Music2, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { melodySynth } from '../utils/audioSynth';
import { BirthdayWebsiteContent } from '../types';
import { EditableText } from './EditableText';

interface AudioSectionProps {
  songContent: BirthdayWebsiteContent['song'];
  onUpdateSong: (updated: BirthdayWebsiteContent['song']) => void;
  isEditMode: boolean;
  onEnterEditMode?: () => void;
}

export const AudioSection: React.FC<AudioSectionProps> = ({
  songContent,
  onUpdateSong,
  isEditMode,
  onEnterEditMode,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>(songContent.defaultTrackTitle);
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync track name with content file
  useEffect(() => {
    if (!audioSrc) {
      setFileName(songContent.defaultTrackTitle);
    }
  }, [songContent.defaultTrackTitle, audioSrc]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    melodySynth.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  // Audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 120);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioSrc]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (audioSrc && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // Use synthesized melodic player
      if (isSynthPlaying) {
        melodySynth.stop();
        setIsSynthPlaying(false);
        setIsPlaying(false);
      } else {
        melodySynth.start();
        setIsSynthPlaying(true);
        setIsPlaying(true);
      }
    }
  };

  // Upload MP3
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // If synth is playing, stop it
      if (isSynthPlaying) {
        melodySynth.stop();
        setIsSynthPlaying(false);
      }
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
      }

      const url = URL.createObjectURL(file);
      setAudioSrc(url);
      setFileName(file.name);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleResetToDefault = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (isSynthPlaying) {
      melodySynth.stop();
      setIsSynthPlaying(false);
    }
    setAudioSrc(null);
    setFileName(songContent.defaultTrackTitle);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = Number(e.target.value);
    setCurrentTime(seekTo);
    if (audioRef.current && audioSrc) {
      audioRef.current.currentTime = seekTo;
    }
  };

  return (
    <section id="song" className="py-16 px-4 max-w-4xl mx-auto relative">
      {/* Hidden audio element for uploaded file */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
        />
      )}

      {/* Section Header */}
      <div className="text-center mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-2">
          <Music2 className="w-3.5 h-3.5" />
          <EditableText
            value={songContent.badge}
            onChange={(val) => onUpdateSong({ ...songContent, badge: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
          />
        </div>
        <div>
          <EditableText
            as="h2"
            value={songContent.heading}
            onChange={(val) => onUpdateSong({ ...songContent, heading: val })}
            isEditMode={isEditMode}
            onEnterEditMode={onEnterEditMode}
            className="text-3xl sm:text-5xl font-bold font-['Caveat',cursive] text-slate-800"
          />
        </div>
      </div>

      {/* Retro Pastel Cassette / Player Card */}
      <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-sky-100 rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-purple-200">
        {/* Washi tape */}
        <div className="washi-tape washi-tape-lavender -top-3 left-10 w-28 -rotate-2" />
        <div className="washi-tape washi-tape-pink -top-3 right-10 w-28 rotate-3" />

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Animated Vinyl / Cassette Art */}
          <div className="relative shrink-0">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-slate-900 border-8 border-purple-200 shadow-2xl flex items-center justify-center relative overflow-hidden"
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-2 rounded-full border border-slate-700/60" />
              <div className="absolute inset-5 rounded-full border border-slate-700/60" />
              <div className="absolute inset-8 rounded-full border border-slate-700/60" />

              {/* Vinyl center sticker */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 border-4 border-slate-900 flex flex-col items-center justify-center text-center p-1 text-white shadow-inner">
                <Disc3 className="w-5 h-5 text-white animate-spin duration-3000" />
                <span className="text-[8px] font-bold tracking-tight">SPECIAL DEDICATION</span>
              </div>
            </motion.div>

            {/* Note badge */}
            <div className="absolute -bottom-2 -right-2 bg-white text-purple-600 px-2.5 py-1 rounded-full text-xs font-bold shadow-md border border-purple-200 flex items-center gap-1">
              <span>🎵</span>
              <span>Side A</span>
            </div>
          </div>

          {/* Player Controls & Dedication Message */}
          <div className="flex-1 w-full space-y-5">
            {/* Dedication Quote */}
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-pink-200 shadow-xs">
              <span className="text-xs uppercase font-bold text-pink-600 tracking-wider block font-mono mb-1">
                <EditableText
                  value={songContent.dedicationNoteLabel}
                  onChange={(val) =>
                    onUpdateSong({ ...songContent, dedicationNoteLabel: val })
                  }
                  isEditMode={isEditMode}
                  onEnterEditMode={onEnterEditMode}
                />
              </span>
              <div className="font-['Caveat',cursive] text-2xl font-bold text-slate-800 leading-snug">
                <span>"</span>
                <EditableText
                  value={songContent.dedicationMessage}
                  onChange={(val) =>
                    onUpdateSong({ ...songContent, dedicationMessage: val })
                  }
                  isEditMode={isEditMode}
                  onEnterEditMode={onEnterEditMode}
                  multiline
                  className="font-['Caveat',cursive] text-2xl font-bold text-slate-800"
                />
                <span>"</span>
              </div>
            </div>

            {/* Track Info */}
            <div className="flex items-center justify-between text-xs text-slate-600">
              <div className="truncate max-w-[240px]">
                <span className="font-semibold text-slate-800 block truncate">
                  <EditableText
                    value={songContent.defaultTrackTitle}
                    onChange={(val) => {
                      onUpdateSong({ ...songContent, defaultTrackTitle: val });
                      if (!audioSrc) setFileName(val);
                    }}
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                  />
                </span>
                <span className="text-[11px] text-purple-600">
                  {audioSrc ? songContent.uploadedTrackTag : songContent.defaultTrackTag}
                </span>
              </div>
              <span className="font-mono text-slate-500">
                {audioSrc
                  ? `${formatTime(currentTime)} / ${formatTime(duration)}`
                  : isPlaying
                  ? 'Playing Melody 🌸'
                  : 'Paused'}
              </span>
            </div>

            {/* Scrub slider if uploaded audio */}
            {audioSrc && (
              <div className="w-full">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>
            )}

            {/* Main Control Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  title={isPlaying ? 'Pause Song' : 'Play Dedicated Song'}
                  aria-label={isPlaying ? 'Pause song' : 'Play song'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  )}
                </motion.button>

                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 font-['Patrick_Hand',cursive]">
                    {isPlaying ? (
                      <EditableText
                        value={songContent.playingText}
                        onChange={(val) =>
                          onUpdateSong({ ...songContent, playingText: val })
                        }
                        isEditMode={isEditMode}
                        onEnterEditMode={onEnterEditMode}
                      />
                    ) : (
                      <EditableText
                        value={songContent.playText}
                        onChange={(val) =>
                          onUpdateSong({ ...songContent, playText: val })
                        }
                        isEditMode={isEditMode}
                        onEnterEditMode={onEnterEditMode}
                      />
                    )}
                  </span>
                  <span className="text-[11px] text-slate-600">
                    <EditableText
                      value={songContent.noAutoplayNote}
                      onChange={(val) =>
                        onUpdateSong({ ...songContent, noAutoplayNote: val })
                      }
                      isEditMode={isEditMode}
                      onEnterEditMode={onEnterEditMode}
                    />
                  </span>
                </div>
              </div>

              {/* Volume & Upload */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-white text-slate-600 hover:text-purple-600 rounded-full shadow-xs border border-purple-100 hover:scale-105 transition-all cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <input
                  type="file"
                  accept="audio/mp3,audio/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileUpload}
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-semibold shadow-xs hover:border-purple-300 transition-all cursor-pointer"
                  title="Nee Favourite Song MP3 Upload Cheyyi"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <EditableText
                    value={songContent.uploadButtonText}
                    onChange={(val) =>
                      onUpdateSong({ ...songContent, uploadButtonText: val })
                    }
                    isEditMode={isEditMode}
                    onEnterEditMode={onEnterEditMode}
                  />
                </button>

                {audioSrc && (
                  <button
                    onClick={handleResetToDefault}
                    className="p-2 bg-white text-slate-400 hover:text-rose-500 rounded-full shadow-xs border border-slate-200 hover:scale-105 transition-all cursor-pointer"
                    title="Default melody ki marchu"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
