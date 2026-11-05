import React from 'react';

export const FloatingDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft pastel bokeh glows */}
      <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-pink-200/35 blur-3xl" />
      <div className="absolute top-1/3 right-12 w-96 h-96 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="absolute bottom-10 right-20 w-88 h-88 rounded-full bg-amber-100/40 blur-3xl" />

      {/* Floating cute tiny decorative SVG items */}
      <div className="absolute top-24 left-[15%] text-pink-300 text-xl animate-bounce duration-1000">💖</div>
      <div className="absolute top-48 right-[18%] text-sky-300 text-2xl animate-pulse">✨</div>
      <div className="absolute top-[45%] left-[8%] text-purple-300 text-lg animate-bounce duration-700">🌸</div>
      <div className="absolute top-[60%] right-[10%] text-amber-300 text-xl animate-pulse">⭐</div>
      <div className="absolute top-[75%] left-[12%] text-pink-300 text-2xl animate-bounce">🎀</div>
      <div className="absolute top-[88%] right-[22%] text-blue-300 text-xl animate-pulse">💫</div>
    </div>
  );
};
