"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOVE_NOTES = [
  {
    id: 1,
    title: "তোমার ওই মিষ্টি হাসি 🥰",
    text: "তোমার হাসিটা যখন দেখি, তখন মনে হয় পৃথিবীর সব সৌন্দর্য একসাথে ফুটে উঠেছে। তোমার হাসিটা সবসময় এমন রেখো!",
  },
  {
    id: 2,
    title: "আমার জীবনের সেরা উপহার 🎁",
    text: "তুমি আমার জীবনে আসার পর থেকে প্রতিদিন একটু একটু করে সব সুন্দর হতে শুরু করেছে। thank you for being you!",
  },
  {
    id: 3,
    title: "অভিমানী মিষ্টি পাগলি 🙈",
    text: "তুমি যখন ছোট ছোট বিষয়ে রাগ করো বা মুখ গোমরা করে থাকো, সত্যি বলতে তখনও তোমাকে অনেক মিষ্টি লাগে!",
  },
  {
    id: 4,
    title: "আমরণ পাশে থাকার অঙ্গীকার 🤝❤️",
    text: "জীবনের প্রতিটি পদক্ষেপে, আলো কিংবা আঁধারে—তোমার হাতটা ধরে রাখতে চাই আজীবন।",
  },
  {
    id: 5,
    title: "তোমার কণ্ঠস্বর 🎶",
    text: "তোমার সাথে কথা বলার সময় মনটা শান্ত হয়ে যায়। সারাদিনের ক্লান্তি নিমেষেই উধাও হয়ে যায় তোমার কথা শুনলে।",
  },
  {
    id: 6,
    title: "আমার সবচেয়ে প্রিয় মানুষ 👑",
    text: "পৃথিবীর ৭০০ কোটি মানুষের ভিড়ে তুমিই আমার একমাত্র বিশেষ একজন। ইউ আর মাই অনলি কোইন!",
  },
  {
    id: 7,
    title: "সবসময় তোমার হাসিমুখ চাই 🌸",
    text: "তোমার চোখে কোনোদিন জল যেন না আসে, তোমার ঠোঁটে যেন সবসময় একটা মিষ্টি হাসি লেগে থাকে—এই প্রার্থনাই করি।",
  },
];

export default function LoveJarModal({ playChime }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(1);

  const handleNext = () => {
    if (playChime) playChime();
    setCurrentIndex((prev) => (prev + 1) % LOVE_NOTES.length);
    setRevealedCount((prev) => Math.min(LOVE_NOTES.length, prev + 1));
  };

  const currentNote = LOVE_NOTES[currentIndex];

  return (
    <div className="mt-8 flex flex-col items-center">
      {/* Trigger Button: Glowing Jar */}
      <button
        onClick={() => {
          setIsOpen(true);
          if (playChime) playChime();
        }}
        className="group relative flex flex-col items-center justify-center p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-pink-300/30 shadow-[0_10px_30px_rgba(255,111,145,0.25)] hover:bg-white/15 active:scale-95 transition-all"
      >
        <div className="relative">
          <motion.span
            animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl block filter drop-shadow-[0_0_15px_rgba(255,182,193,0.8)]"
          >
            🫙✨
          </motion.span>
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white shadow-md">
            {revealedCount}/{LOVE_NOTES.length}
          </span>
        </div>
        <span className="mt-3 font-['Hind_Siliguri',sans-serif] text-sm font-medium text-pink-100 group-hover:text-white transition-colors">
          গোপন চিরকুটের বয়াম 💌 (খুলে দেখো)
        </span>
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-b from-[#FFF5F7] to-[#FFE6ED] p-7 text-gray-800 shadow-[0_25px_60px_rgba(255,111,145,0.4)] border border-pink-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold hover:bg-pink-200 transition-colors"
              >
                ✕
              </button>

              {/* Heart Badge */}
              <div className="flex justify-center">
                <span className="text-4xl animate-bounce">💌</span>
              </div>

              {/* Note Content */}
              <div className="mt-4 text-center">
                <span className="text-xs uppercase tracking-widest text-pink-500 font-semibold">
                  চিরকুট #{currentNote.id}
                </span>
                <h3 className="mt-1 font-['Hind_Siliguri',sans-serif] text-xl font-bold text-[#8A2E45]">
                  {currentNote.title}
                </h3>
                <p className="mt-3 font-['Hind_Siliguri',sans-serif] text-sm text-[#5C2B39] leading-relaxed">
                  "{currentNote.text}"
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={handleNext}
                  className="w-full rounded-full bg-gradient-to-r from-[#FF6F91] to-[#B33F5C] py-2.5 text-sm font-semibold text-white shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <span>আরেকটি চিরকুট বের করো 🌸</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 text-xs font-medium text-pink-600 hover:underline"
                >
                  বয়াম বন্ধ করো
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
