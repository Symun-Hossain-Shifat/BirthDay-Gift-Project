"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Imageone from './assets/Image.jpeg'
import Imagetwo from './assets/second.jpeg'
import Image from "next/image";


const NAME = "Sristy";
const BIRTH_DATE = "৩১ আগস্ট"; // 31 August

function placeholderPhoto(bg1, bg2, emoji) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
        <defs>
          <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stop-color='${bg1}'/>
            <stop offset='100%' stop-color='${bg2}'/>
          </linearGradient>
        </defs>
        <rect width='400' height='400' fill='url(%23g)'/>
        <text x='50%' y='53%' font-size='90' text-anchor='middle' dominant-baseline='middle'>${emoji}</text>
      </svg>
    `)
  );
}

// Three photo slots — swap `src` with a real path once you have one, e.g. "/sristy-1.jpg"
const PHOTOS = [
  { src: null, fallback: placeholderPhoto("%23FFD6E0", "%23FF9AAE", "💗"), rotate: -6, z: 30, size: "w-48" },
  { src: null, fallback: placeholderPhoto("%23FFE1B3", "%23FFC1E3", "🥰"), rotate: 10, z: 20, size: "w-28" },
  { src: null, fallback: placeholderPhoto("%23C9A7FF", "%23FF9AAE", "💕"), rotate: -14, z: 10, size: "w-28" },
];

const MESSAGE = [
  {
    text:
      "সত্যি বলতে তোমাকে birthday wish করার জন্য অনেক কিছু লিখতে চেয়েছিলাম। কিন্তু যতবারই লিখতে বসেছি, ততবারই মনে হয়েছে—কিছু মানুষকে নিয়ে মনের কথাগুলো আসলে ঠিকভাবে লিখে প্রকাশ করা যায় না। 😅❤️",
  },
  {
    text:
      "তবুও আজ তোমার এই special দিনটায় একটা কথাই মন থেকে বলতে চাই—সবসময় ভালো থেকো, হাসিখুশি থেকো। তোমার ছোট-বড় সব ইচ্ছে এক এক করে পূরণ হোক, আর জীবনে যত কঠিন সময়ই আসুক না কেন, তুমি যেন সবকিছু পেরিয়ে নিজের মতো করে সুন্দর একটা জীবন কাটাতে পারো।",
  },
  {
    text:
      "আর একটা কথা... তুমি আমার জীবনে আসার পর থেকে হয়তো সবকিছু বদলে যায়নি, কিন্তু কিছু কিছু জিনিস সত্যিই আগের চেয়ে একটু বেশি সুন্দর হয়ে গেছে। কিছু মুহূর্ত, কিছু হাসি, কিছু কথা—এসবের মাঝে তোমার একটা আলাদা জায়গা তৈরি হয়ে গেছে। ❤️",
  },
  {
    text:
      "তোমার সাথে কাটানো প্রতিটা সুন্দর মুহূর্ত হয়তো সবসময় বলে বোঝানো সম্ভব না, কিন্তু সত্যি বলতে এগুলোর অনেকগুলোই আমার কাছে ভীষণ special। আর তুমি যেমন আছো, ঠিক তেমনই থেকো—নিজের স্বপ্নের পেছনে ছুটে, নিজের মতো করে হাসতে হাসতে।",
  },
  {
    text:
      "আজকে পুরো দিনটা শুধু তোমার। তাই আজ কোনো দুঃখ, কোনো overthinking, কোনো মন খারাপ না—শুধু হাসবে, enjoy করবে আর নিজের special দিনটা নিজের মতো করে সুন্দর করে কাটাবে। 🥰",
  },
  {
    text:
      "শেষে শুধু এটুকুই বলব—Happy Birthday, Sristy. 🎂❤️ তোমার নতুন বছরটা তোমার জীবনের সবচেয়ে সুন্দর বছরগুলোর একটা হোক। তোমার মুখের হাসিটা সবসময় এমনই থাকুক, আর তোমার জীবনে এমন অনেক কারণ আসুক যেগুলোর জন্য প্রতিদিন হাসতে ইচ্ছে করবে।",
  },
  {
    text:
      "আর হ্যাঁ... আজকের দিনটা special, কারণ আজকের দিনেই তুমি পৃথিবীতে এসেছিলে। আর কোনো একভাবে, তোমার আসাটা আমার জীবনকেও একটু সুন্দর করে দিয়েছে। ❤️",
  },

  { text: "Happy Birthday once again! 🫶", emphasis: true },
  { text: "ভালো থেকো, পাগলি। ❤️", emphasis: true },
];

const MESSAGE_END_DELAY = 0.6 + MESSAGE.length * 0.35;

export default function SristyBirthdayPage() {
  const [opened, setOpened] = useState(false);
  const [candleOut, setCandleOut] = useState(false);
  const [showFinale, setShowFinale] = useState(false);

  const stars = [
    { id: 0, top: 12, left: 20, size: 2, delay: 1, duration: 3 },
    { id: 1, top: 25, left: 65, size: 3, delay: 2, duration: 4 },
    { id: 2, top: 40, left: 35, size: 1.5, delay: 0.5, duration: 3 },
    { id: 3, top: 55, left: 80, size: 2, delay: 3, duration: 5 },
    { id: 4, top: 70, left: 15, size: 3, delay: 1.5, duration: 4 },
    { id: 5, top: 85, left: 50, size: 2, delay: 2.5, duration: 3 },
    { id: 6, top: 30, left: 90, size: 1.5, delay: 0, duration: 5 },
    { id: 7, top: 60, left: 60, size: 2.5, delay: 3, duration: 4 },
    { id: 8, top: 8, left: 45, size: 2, delay: 1, duration: 3 },
    { id: 9, top: 92, left: 75, size: 1.5, delay: 2, duration: 5 },
    { id: 10, top: 18, left: 78, size: 2.5, delay: 0.5, duration: 4 },
    { id: 11, top: 48, left: 8, size: 2, delay: 3, duration: 3 },
    { id: 12, top: 75, left: 92, size: 3, delay: 1.5, duration: 5 },
    { id: 13, top: 35, left: 52, size: 1.5, delay: 2.5, duration: 4 },
    { id: 14, top: 65, left: 42, size: 2, delay: 0, duration: 3 },
  ];
  const hearts = [
    { id: 0, left: 10, size: 14, duration: 12, delay: 1 },
    { id: 1, left: 22, size: 18, duration: 14, delay: 3 },
    { id: 2, left: 35, size: 12, duration: 11, delay: 2 },
    { id: 3, left: 48, size: 20, duration: 15, delay: 4 },
    { id: 4, left: 60, size: 15, duration: 13, delay: 1 },
    { id: 5, left: 72, size: 22, duration: 12, delay: 5 },
    { id: 6, left: 82, size: 13, duration: 14, delay: 2 },
    { id: 7, left: 90, size: 19, duration: 11, delay: 4 },
    { id: 8, left: 30, size: 16, duration: 13, delay: 6 },
    { id: 9, left: 55, size: 21, duration: 15, delay: 2 },
    { id: 10, left: 68, size: 12, duration: 10, delay: 5 },
    { id: 11, left: 95, size: 17, duration: 14, delay: 1 },
  ];

  // one-time burst when the envelope opens
  const openBurst = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    angle: (i / 24) * Math.PI * 2,
    distance: 90 + (i % 7) * 10,
    icon: i % 3 === 0 ? "✨" : "♥",
    size: 12 + (i % 5) * 2,
  }));

  // finale heart rain
  const finaleHearts = [
    { id: 0, left: 5, size: 18, delay: 0.1, duration: 2.5 },
    { id: 1, left: 12, size: 24, delay: 0.3, duration: 3 },
    { id: 2, left: 20, size: 16, delay: 0.5, duration: 2.7 },
    { id: 3, left: 28, size: 22, delay: 0.2, duration: 3.2 },
    { id: 4, left: 36, size: 19, delay: 0.6, duration: 2.4 },
    { id: 5, left: 44, size: 26, delay: 0.1, duration: 2.9 },
    { id: 6, left: 52, size: 17, delay: 0.4, duration: 3.1 },
    { id: 7, left: 60, size: 23, delay: 0.7, duration: 2.6 },
    { id: 8, left: 68, size: 20, delay: 0.2, duration: 3 },
    { id: 9, left: 76, size: 27, delay: 0.5, duration: 2.8 },
    { id: 10, left: 84, size: 18, delay: 0.3, duration: 3.2 },
    { id: 11, left: 92, size: 24, delay: 0.6, duration: 2.5 },
  ];
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0F0824] via-[#241338] to-[#3B1A44] flex items-center justify-center px-4 py-12">
      {/* aurora glow blobs, slowly drifting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-32 -left-24 rounded-full bg-[#FF6F91]/20 blur-[100px] animate-[sb-aurora1_14s_ease-in-out_infinite]" />
        <div className="absolute w-[420px] h-[420px] top-1/3 -right-24 rounded-full bg-[#8A5CF6]/20 blur-[100px] animate-[sb-aurora2_16s_ease-in-out_infinite]" />
        <div className="absolute w-[380px] h-[380px] bottom-0 left-1/4 rounded-full bg-[#FFC15E]/10 blur-[110px] animate-[sb-aurora1_18s_ease-in-out_infinite]" />
      </div>

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

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {!opened ? (
            /* ---------------- CLOSED: sealed envelope ---------------- */
            <motion.button
              key="envelope"
              onClick={() => setOpened(true)}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.35 } }}
              className="group relative mx-auto flex flex-col items-center gap-6 outline-none"
              aria-label="খুলে দেখো তোমার জন্য কী আছে"
            >
              {/* orbiting sparkles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="absolute top-0 left-1/2 text-lg">✨</span>
                <span className="absolute bottom-4 left-2 text-sm">💫</span>
                <span className="absolute bottom-6 right-0 text-lg">✨</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-64 h-44"
              >
                <div className="absolute inset-0 rounded-md bg-gradient-to-b from-[#F3E8FF] to-[#E4D0F5] shadow-[0_25px_60px_-15px_rgba(255,111,145,0.35)]" />
                <div
                  className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#D9BEEE] to-[#C7A6E3]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 85%)" }}
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[38%] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6F91] to-[#B33F5C] shadow-[0_0_25px_rgba(255,111,145,0.7)] flex items-center justify-center text-white text-lg"
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
              className="relative rounded-2xl bg-[#FFF8F0] shadow-[0_30px_80px_-15px_rgba(255,111,145,0.35)] px-6 py-8 sm:px-9 sm:py-10"
            >
              {/* one-time open burst */}
              <div className="pointer-events-none absolute top-10 left-1/2">
                {openBurst.map((p) => (
                  <motion.span
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                    animate={{
                      x: Math.cos(p.angle) * p.distance,
                      y: Math.sin(p.angle) * p.distance,
                      opacity: 0,
                      scale: 1.1,
                    }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="absolute text-[#FF6F91]"
                    style={{ fontSize: p.size }}
                  >
                    {p.icon}
                  </motion.span>
                ))}
              </div>

              {/* headline */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 16 }}
                className="text-center font-['Great_Vibes',cursive] text-5xl text-[#B33F5C] leading-tight drop-shadow-[0_0_18px_rgba(255,111,145,0.35)]"
              >
                Happy Birthday {NAME} ❤️
              </motion.h1>

              {/* photo stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="relative mx-auto mt-8 h-56 w-full flex items-center justify-center"
              >
                {/* soft heart glow behind the stack */}
                <div className="pointer-events-none absolute w-52 h-52 rounded-full bg-[#FF6F91]/25 blur-3xl" />

                {PHOTOS.slice(1).map((p, i) => (
                  <div
                    key={i}
                    className={`absolute ${p.size} bg-white p-2 pb-5 shadow-xl`}
                    style={{
                      transform: `rotate(${p.rotate}deg) translateX(${i === 0 ? -70 : 70}px)`,
                      zIndex: p.z,
                    }}
                  >
                    <div className="w-full aspect-square overflow-hidden bg-[#FFE1E9]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <Image src={Imageone} alt={NAME} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}

                <div
                  className={`absolute ${PHOTOS[0].size} bg-white p-3 pb-6 shadow-2xl`}
                  style={{ transform: `rotate(${PHOTOS[0].rotate}deg)`, zIndex: PHOTOS[0].z }}
                >
                  <div className="w-full aspect-square overflow-hidden bg-[#FFE1E9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Image
                      src={Imagetwo}
                      alt={NAME}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-center font-['Hind_Siliguri',sans-serif] text-xs text-[#8A2E45]">
                    {BIRTH_DATE} 🎂
                  </p>
                </div>
              </motion.div>

              {/* message, line by line with blur-in + heart bullet */}
              <div className="mt-10 space-y-5">
                {MESSAGE.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.6 + i * 0.35, duration: 0.6 }}
                    className={line.emphasis ? "text-center" : "flex items-start gap-2"}
                  >
                    {!line.emphasis && (
                      <span className="mt-1.5 text-[#FF6F91] text-xs shrink-0">❤</span>
                    )}
                    <p
                      className={
                        line.emphasis
                          ? "font-['Hind_Siliguri',sans-serif] text-xl font-semibold text-[#B33F5C]"
                          : "font-['Hind_Siliguri',sans-serif] text-[#4A2438] text-[15px] leading-relaxed"
                      }
                    >
                      {line.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* candle-blow interaction */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: MESSAGE_END_DELAY + 0.2 }}
                className="mt-8 flex flex-col items-center gap-2"
              >
                <button
                  onClick={() => setCandleOut(true)}
                  className="relative flex flex-col items-center outline-none active:scale-95 transition-transform"
                  aria-label="মোমবাতি নিভিয়ে একটা ইচ্ছে করো"
                >
                  <AnimatePresence>
                    {!candleOut && (
                      <motion.span
                        exit={{ opacity: 0, y: -6 }}
                        animate={{ opacity: [1, 0.5, 1], scale: [1, 1.15, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-lg mb-[-6px]"
                      >
                        🔥
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="text-4xl">🎂</span>
                </button>
                <span className="font-['Hind_Siliguri',sans-serif] text-xs text-[#8A2E45]/70">
                  {candleOut ? "ইচ্ছেটা পূরণ হোক ✨" : "মোমবাতিতে ট্যাপ করে ইচ্ছে করো"}
                </span>
              </motion.div>

              {/* final CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: MESSAGE_END_DELAY + 0.6 }}
                className="mt-8 flex justify-center"
              >
                <button
                  onClick={() => setShowFinale(true)}
                  className="font-['Hind_Siliguri',sans-serif] text-sm text-white bg-gradient-to-r from-[#FF6F91] to-[#B33F5C] px-6 py-2.5 rounded-full shadow-[0_10px_25px_-8px_rgba(179,63,92,0.6)] active:scale-95 transition-transform"
                >
                  ❤️ একটা hug পাঠাও
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------------- FINALE OVERLAY ---------------- */}
      <AnimatePresence>
        {showFinale && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFinale(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F0824]/90 backdrop-blur-sm px-6 cursor-pointer"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {finaleHearts.map((h) => (
                <motion.span
                  key={h.id}
                  initial={{ y: "110vh", opacity: 0 }}
                  animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: h.duration, delay: h.delay, ease: "easeOut" }}
                  className="absolute text-[#FF6F91]"
                  style={{ left: `${h.left}%`, fontSize: h.size }}
                >
                  ♥
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
              className="relative text-center"
            >
              <p className="font-['Great_Vibes',cursive] text-4xl sm:text-5xl text-[#FFD6E0] drop-shadow-[0_0_25px_rgba(255,111,145,0.6)]">
                তোমাকে অনেক ভালোবাসি 🥰
              </p>
              <p className="mt-4 font-['Hind_Siliguri',sans-serif] text-sm text-white/70">
                (আবার শুরু করতে যেকোনো জায়গায় ট্যাপ করো)
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}