"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";



const NAME = "Sristy";
const BIRTH_DATE = "৩১ আগস্ট"; // 31 August
const PHOTO_SRC  = null; // set to "/sristy.jpg" once you add a real photo

// Fallback placeholder photo (soft gradient + heart) so the page works with zero setup
const PLACEHOLDER_PHOTO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='%23FFD6E0'/>
          <stop offset='100%' stop-color='%23FF9AAE'/>
        </linearGradient>
      </defs>
      <rect width='400' height='400' fill='url(%23g)'/>
      <text x='50%' y='53%' font-size='90' text-anchor='middle' dominant-baseline='middle'>💗</text>
    </svg>
  `);

const MESSAGE = [
  {
    text:
      "সত্যি বলতে birthday wish করার জন্য অনেক কিছু লিখতে চেয়েছিলাম, কিন্তু শেষ পর্যন্ত কী লিখব সেটাই বুঝতে পারছিলাম না। 😅",
  },
  {
    text:
      "শুধু একটা কথাই বলি, সবসময় ভালো থেকো, হাসিখুশি থেকো আর তোমার যেসব ইচ্ছে আছে সেগুলো এক এক করে পূরণ হোক। জীবনে যত কঠিন সময়ই আসুক, তুমি যেন সেগুলো পার করে নিজের মতো করে ভালো থাকতে পারো।",
  },
  {
    text:
      "আর একটা কথা... তুমি আমার জীবনে আসার পর থেকে অনেক কিছুই হয়তো আগের মতো নেই, কিছু জিনিস একটু বেশি সুন্দর হয়ে গেছে। ❤️",
  },
  {
    text:
      "আজকে তোমার দিন, তাই বেশি কিছু বলব না। শুধু চাই, আজকে অনেক হাসো, অনেক enjoy করো আর নিজের এই special দিনটা সুন্দর করে কাটাও।",
  },
  { text: "Happy Birthday once again! 🫶", emphasis: true },
  { text: "ভালো থেকো, পাগলি। ❤️", emphasis: true },
];

export default function SristyBirthdayPage() {
  const [opened, setOpened] = useState(false);

  const stars = [
  { id: 1, top: 10, left: 15, size: 2, delay: 1, duration: 3 },
  { id: 2, top: 25, left: 35, size: 1.5, delay: 2, duration: 4 },
  { id: 3, top: 40, left: 70, size: 2.5, delay: 0.5, duration: 3 },
  { id: 4, top: 55, left: 20, size: 1.5, delay: 1.5, duration: 5 },
  { id: 5, top: 70, left: 85, size: 2, delay: 3, duration: 4 },
  { id: 6, top: 85, left: 50, size: 1.5, delay: 2.5, duration: 3 },
  { id: 7, top: 15, left: 90, size: 2.5, delay: 1, duration: 4 },
  { id: 8, top: 35, left: 5, size: 2, delay: 2, duration: 5 },
  { id: 9, top: 60, left: 45, size: 1.5, delay: 0, duration: 3 },
  { id: 10, top: 90, left: 75, size: 2, delay: 1.5, duration: 4 },
];
 const hearts = [
  { id: 1, left: 10, size: 14, duration: 10, delay: 1 },
  { id: 2, left: 22, size: 18, duration: 12, delay: 3 },
  { id: 3, left: 35, size: 12, duration: 11, delay: 2 },
  { id: 4, left: 48, size: 20, duration: 14, delay: 4 },
  { id: 5, left: 60, size: 15, duration: 10, delay: 1 },
  { id: 6, left: 72, size: 22, duration: 13, delay: 5 },
  { id: 7, left: 82, size: 13, duration: 11, delay: 2 },
  { id: 8, left: 90, size: 19, duration: 15, delay: 4 },
];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#140A2B] via-[#241338] to-[#3B1A44] flex items-center justify-center px-4 py-12">
      {/* twinkling starfield */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.15, 1, 0.15] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* drifting hearts */}
      <div className="pointer-events-none absolute inset-0">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="absolute bottom-[-40px] select-none text-[#FF6F91]"
            style={{
              left: `${h.left}%`,
              fontSize: h.size,
              opacity: 0.4,
              animation: `sb-float ${h.duration}s ease-in ${h.delay}s infinite`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* soft glow behind everything */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#FF6F91]/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {!opened ? (
            /* ---------------- CLOSED: sealed envelope ---------------- */
            <motion.button
              key="envelope"
              onClick={() => setOpened(true)}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.35 } }}
              className="group mx-auto flex flex-col items-center gap-6 outline-none"
              aria-label="খুলে দেখো তোমার জন্য কী আছে"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-64 h-44"
              >
                {/* envelope body */}
                <div className="absolute inset-0 rounded-md bg-gradient-to-b from-[#F3E8FF] to-[#E4D0F5] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.6)]" />
                {/* envelope flap */}
                <div
                  className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#D9BEEE] to-[#C7A6E3]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 85%)" }}
                />
                {/* wax seal */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[38%] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6F91] to-[#B33F5C] shadow-lg flex items-center justify-center text-white text-lg"
                >
                  ❤
                </motion.div>
              </motion.div>

              <span className="font-['Hind_Siliguri',sans-serif] text-[#F3E8FF] text-sm tracking-wide bg-white/10 border border-white/20 px-5 py-2 rounded-full backdrop-blur-sm group-active:scale-95 transition-transform">
                সীলটা খুলে দেখো 💌
              </span>
            </motion.button>
          ) : (
            /* ---------------- OPENED: the letter ---------------- */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative rounded-2xl bg-[#FFF8F0] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)] px-6 py-8 sm:px-9 sm:py-10"
            >
              {/* headline */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 16 }}
                className="text-center font-['Great_Vibes',cursive] text-5xl text-[#B33F5C] leading-tight"
              >
                Happy Birthday {NAME} ❤️
              </motion.h1>

              {/* polaroid photo */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: -6 }}
                transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
                className="mx-auto mt-6 w-48 bg-white p-3 pb-6 shadow-xl"
              >
                <div className="w-full aspect-square overflow-hidden bg-[#FFE1E9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PHOTO_SRC ?? PLACEHOLDER_PHOTO}
                    alt={NAME}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 text-center font-['Hind_Siliguri',sans-serif] text-xs text-[#8A2E45]">
                  {BIRTH_DATE} 🎂
                </p>
              </motion.div>

              {/* message, line by line */}
              <div className="mt-8 space-y-4">
                {MESSAGE.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.35, duration: 0.5 }}
                    className={
                      line.emphasis
                        ? "font-['Hind_Siliguri',sans-serif] text-center text-xl font-semibold text-[#B33F5C]"
                        : "font-['Hind_Siliguri',sans-serif] text-[#4A2438] text-[15px] leading-relaxed"
                    }
                  >
                    {line.text}
                  </motion.p>
                ))}
              </div>

              {/* small decorative sparkles at the bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + MESSAGE.length * 0.35 + 0.2 }}
                className="mt-6 flex justify-center gap-3 text-xl"
              >
                <span>🎈</span>
                <span>✨</span>
                <span>🎂</span>
                <span>✨</span>
                <span>🎈</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    
    </div>
  );
}