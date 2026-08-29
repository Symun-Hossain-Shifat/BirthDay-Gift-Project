"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const INITIAL_COUPONS = [
  {
    id: "icecream",
    title: "🍦 Unlimited Ice Cream & Coffee",
    desc: "যেকোনো সময়ে, যেকোনো জায়গায় তোমার পছন্দের আইসক্রিম বা কফি ডেট! কোনো মানা নেই!",
    tag: "VALID FOREVER",
  },
  {
    id: "movie",
    title: "🎬 Movie Night Pick",
    desc: "তুমি যে মুভি দেখতে চাইবে সেটাই দেখতে হবে! কোনো তর্ক বা অমত করা যাবে না!",
    tag: "SPECIAL CHOICE",
  },
  {
    id: "queen",
    title: "👑 Queen Day Treatment",
    desc: "পুরো ১ দিন তোমার সব হুকুম ও আবদার মাথা পেতে মেনে নেওয়া হবে!",
    tag: "ROYAL PRIVILEGE",
  },
];

export default function LoveCoupons({ onClaim, playChime }) {
  const [claimed, setClaimed] = useState({});

  const handleClaim = (id) => {
    if (claimed[id]) return;
    setClaimed((prev) => ({ ...prev, [id]: true }));
    if (playChime) playChime();
    if (onClaim) onClaim();
  };

  return (
    <div className="mt-10 w-full">
      <h2 className="text-center font-['Hind_Siliguri',sans-serif] text-lg font-bold text-red-500 mb-4 flex items-center justify-center gap-2">
        <span>🎟️</span> তোমার জন্মদিনের স্পেশাল কুপন <span>🎟️</span>
      </h2>
      <p className="text-center text-xs text-red-600 mb-6">
        (নিচের কুপনগুলো তোমার জন্য রিডিম করার জন্য তৈরি! ট্যাপ করে ক্লেইম করে নাও)
      </p>

      <div className="grid grid-cols-1 gap-4">
        {INITIAL_COUPONS.map((coupon) => {
          const isClaimed = claimed[coupon.id];
          return (
            <motion.div
              key={coupon.id}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-pink-300/30 p-5 backdrop-blur-md shadow-lg flex flex-col justify-between"
            >
              {/* Dashed division line for coupon feel */}
              <div className="absolute top-0 bottom-0 left-3 border-l-2 border-dashed border-pink-300/20" />

              <div className="pl-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                    {coupon.tag}
                  </span>
                  <span className="text-xs font-semibold text-pink-500">
                    FOR SRISTY ONLY
                  </span>
                </div>
                <h3 className="mt-1 font-['Hind_Siliguri',sans-serif] text-base font-bold text-black">
                  {coupon.title}
                </h3>
                <p className="mt-1 text-xs text-purple-500 leading-relaxed font-['Hind_Siliguri',sans-serif]">
                  {coupon.desc}
                </p>
              </div>

              <div className="mt-4 pl-4 flex items-center justify-between">
                {isClaimed ? (
                  <div className="animate-stamp inline-block border-2 border-pink-400 rounded-md px-3 py-1 text-xs font-extrabold text-pink-400 uppercase tracking-widest bg-pink-950/40">
                    CLAIMED WITH LOVE ❤️
                  </div>
                ) : (
                  <button
                    onClick={() => handleClaim(coupon.id)}
                    className="rounded-full bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-1.5 text-xs font-bold text-white shadow-md hover:from-pink-600 hover:to-rose-700 active:scale-95 transition-all"
                  >
                    রিডিম করো 🎁
                  </button>
                )}
                <span className="text-lg">💖</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
