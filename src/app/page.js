"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


const HEART_COUNT = 14;
const CONFETTI_COUNT = 26;
const CONFETTI_COLORS = ["#E8607A", "#F4C95D", "#FF9F7D", "#FFFFFF", "#C9587A"];

export default function BirthdayWish({
  name,
  date,
  message = "Every candle on this cake is a reason I'm grateful for you. Happy birthday, my love.",
  photoSrc,
}) {
  const [opened, setOpened] = useState(false);

  // Randomized once so hearts/confetti don't re-roll on every render
  const hearts = useMemo(
    () =>
      Array.from({ length: HEART_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 18,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 6,
      })),
    []
  );

  const confetti = useMemo(
    () =>
      Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 320,
        rotate: Math.random() * 360,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 0.15,
        size: 6 + Math.random() * 6,
      })),
    []
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#FFE8E0] via-[#FFDCE3] to-[#FBC9D4] flex items-center justify-center px-4 py-10">
      {/* ambient dotted texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(#B33F5C 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* floating hearts, always drifting */}
      <div className="pointer-events-none absolute inset-0">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="absolute bottom-[-40px] select-none"
            style={{
              left: `${h.left}%`,
              fontSize: h.size,
              animation: `bw-float ${h.duration}s ease-in ${h.delay}s infinite`,
              color: "#E8607A",
              opacity: 0.35,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* bunting flags across the top */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 flex justify-center">
        <div className="flex -space-x-1 pt-3">
          {Array.from({ length: 11 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ rotate: 0 }}
              animate={{ rotate: [(-6), 6, -6] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.08,
              }}
              style={{
                transformOrigin: "top center",
                borderTopColor: i % 2 === 0 ? "#E8607A" : "#F4C95D",
              }}
              className="w-6 h-8 border-t-[22px] border-l-[12px] border-r-[12px] border-l-transparent border-r-transparent"
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {!opened ? (
            /* ---------------- CLOSED STATE: tap the gift ---------------- */
            <motion.button
              key="closed"
              onClick={() => setOpened(true)}
              exit={{ opacity: 0, scale: 0.8 }}
              className="group mx-auto flex flex-col items-center gap-5 outline-none"
              aria-label="Open your birthday surprise"
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* box */}
                <div className="w-40 h-32 rounded-xl bg-gradient-to-br from-[#E8607A] to-[#C9587A] shadow-[0_18px_40px_-12px_rgba(200,60,90,0.55)] relative">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-6 h-full bg-[#F4C95D]/90" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-6 bg-[#F4C95D]/90" />
                </div>
                {/* lid + bow */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[168px] h-8 rounded-lg bg-gradient-to-br from-[#FF7C97] to-[#E8607A] shadow-md" />
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 text-3xl">🎀</div>
              </motion.div>

              <span className="font-['Poppins',sans-serif] text-[#8A2E45] font-medium tracking-wide text-sm bg-white/60 px-4 py-1.5 rounded-full shadow-sm group-active:scale-95 transition-transform">
                Tap to open your surprise
              </span>
            </motion.button>
          ) : (
            /* ---------------- OPENED STATE: the reveal ---------------- */
            <motion.div
              key="opened"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* confetti burst, plays once on open */}
              <div className="pointer-events-none absolute -top-6 left-1/2">
                {confetti.map((c) => (
                  <motion.span
                    key={c.id}
                    initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                    animate={{
                      x: c.x,
                      y: 220 + Math.random() * 60,
                      opacity: 0,
                      rotate: c.rotate,
                    }}
                    transition={{ duration: 1.4, delay: c.delay, ease: "easeOut" }}
                    className="absolute block"
                    style={{
                      width: c.size,
                      height: c.size * 0.4,
                      background: c.color,
                      borderRadius: 2,
                    }}
                  />
                ))}
              </div>

              {/* headline */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                className="relative mt-2"
              >
                <span className="absolute -top-7 left-2 text-3xl -rotate-12">🎉</span>
                <h1 className="font-['Playfair_Display',serif] text-4xl font-extrabold text-[#7A2340] drop-shadow-sm">
                  Happy Birthday
                </h1>
              </motion.div>

              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="font-['Caveat',cursive] text-3xl text-[#E8607A] -mt-1"
              >
                {name} ✨
              </motion.p>

              {/* photo frame with balloons */}
              <motion.div
                initial={{ y: 30, opacity: 0, scale: 0.85 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
                className="relative mt-8"
              >
                <span className="absolute -left-10 -top-6 text-3xl">🎈</span>
                <span className="absolute -right-9 -top-3 text-3xl rotate-12">🎈</span>

                <div className="w-44 h-44 rounded-full p-1.5 bg-gradient-to-br from-[#F4C95D] via-[#FF9F7D] to-[#E8607A] shadow-[0_15px_35px_-10px_rgba(200,60,90,0.5)]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {photoSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photoSrc} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">🥳</span>
                    )}
                  </div>
                </div>

                {/* date badge */}
                <div className="absolute -bottom-2 -left-6 bg-white shadow-md rounded-full px-3 py-1 flex items-center gap-1 text-xs font-semibold text-[#8A2E45] font-['Poppins',sans-serif]">
                  <span>⭐</span> {date}
                </div>

                {/* cutie tag */}
                <div className="absolute -bottom-2 -right-8 bg-[#E8607A] shadow-md rounded-full px-3 py-1 flex items-center gap-1 text-xs font-semibold text-white font-['Poppins',sans-serif]">
                  Cutie <span>♥</span>
                </div>
              </motion.div>

              {/* personal note */}
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mt-10 max-w-[280px] font-['Poppins',sans-serif] text-[#7A2340]/90 text-sm leading-relaxed"
              >
                {message}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes bw-float {
          0% {
            transform: translateY(0) translateX(0) scale(0.9);
            opacity: 0;
          }
          10% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(-110vh) translateX(20px) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}