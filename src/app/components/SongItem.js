"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SongItem({ onPlay, playChime }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  const videoId = "w_8pdmiOhBI";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?si=YmqwZVMFcjpFSumB&autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`;

  const handlePlayToggle = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (onPlay) onPlay(); // Stop background synth music
      if (playChime) playChime();
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="mt-8 w-full rounded-3xl bg-gradient-to-br from-[#FFF0F4] via-[#FFEBF1] to-[#FFF5F8] p-5 sm:p-6 border border-pink-200/80 shadow-[0_15px_35px_-5px_rgba(255,111,145,0.3)] relative overflow-hidden"
    >
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full bg-pink-300/30 blur-2xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-purple-300/20 blur-2xl" />

      {/* Header Info */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FF6F91] to-[#B33F5C] text-white shadow-lg shadow-pink-500/30 text-xl">
            🎵
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-pink-500"></span>
              </span>
            )}
          </div>
          <div>
            <h3 className="font-['Hind_Siliguri',sans-serif] text-base font-bold text-[#8A2E45]">
              তোমার জন্য বিশেষ গান 🎶
            </h3>
            <p className="font-['Hind_Siliguri',sans-serif] text-xs text-[#8A2E45]/70">
              প্লে করে শোনো সুন্দর এই গানটি ❤️
            </p>
          </div>
        </div>

        {/* Video Mode Toggle Button */}
        <button
          onClick={() => setShowVideo((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-pink-600 shadow-sm border border-pink-200 hover:bg-white transition-all active:scale-95"
        >
          <span>{showVideo ? "🙈 প্লেয়ার লুকাও" : "📹 ভিডিও দেখাও"}</span>
        </button>
      </div>

      {/* Sound Visualizer & Play Bar */}
      <div className="mb-4 flex items-center justify-between bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-pink-100">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6F91] to-[#B33F5C] text-white shadow-md hover:scale-105 active:scale-95 transition-all"
            aria-label={isPlaying ? "Pause Song" : "Play Song"}
          >
            <span className="text-sm">{isPlaying ? "⏸️" : "▶️"}</span>
          </button>
          <div className="flex flex-col">
            <span className="font-['Hind_Siliguri',sans-serif] text-xs font-bold text-gray-800">
              {isPlaying ? "এখন চলছে..." : "প্লে করতে ট্যাপ করো"}
            </span>
            <span className="font-['Hind_Siliguri',sans-serif] text-[10px] text-pink-500">
              YouTube Music Player
            </span>
          </div>
        </div>

        {/* Equalizer animation bars */}
        <div className="flex items-end gap-1 h-5 px-2">
          <span className={`w-1 rounded-full bg-pink-400 ${isPlaying ? "animate-[bounce_0.6s_infinite] h-full" : "h-2 opacity-40"}`} />
          <span className={`w-1 rounded-full bg-pink-500 ${isPlaying ? "animate-[bounce_0.9s_infinite] h-3/4" : "h-3 opacity-40"}`} />
          <span className={`w-1 rounded-full bg-pink-600 ${isPlaying ? "animate-[bounce_0.5s_infinite] h-full" : "h-1.5 opacity-40"}`} />
          <span className={`w-1 rounded-full bg-pink-400 ${isPlaying ? "animate-[bounce_0.8s_infinite] h-1/2" : "h-2.5 opacity-40"}`} />
        </div>
      </div>

      {/* YouTube Video Player Embed Container */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-2xl shadow-lg border border-pink-200 bg-black/90"
          >
            <div className="relative w-full aspect-video">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
