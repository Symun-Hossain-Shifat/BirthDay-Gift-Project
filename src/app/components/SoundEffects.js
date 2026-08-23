"use client";

import { useEffect, useRef, useState } from "react";

export function useAudio() {
  const audioCtxRef = useRef(null);
  const musicTimerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play a soft bell/chime note
  const playNote = (freq, duration = 0.8, type = "sine", gainVal = 0.15) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  };

  // Magical Chime sound effect (for envelope open or coupon claim)
  const playChime = () => {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playNote(freq, 1.2, "triangle", 0.12);
      }, idx * 100);
    });
  };

  // Candle blowing sound effect (whoosh + spark sound)
  const playBlowSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Soft wind noise
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.6);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();

      // Sparkle chime right after blow
      setTimeout(() => {
        playChime();
      }, 300);
    } catch (e) {
      console.warn("Blow sound error:", e);
    }
  };

  // Hug/Finale sound effect
  const playFanfare = () => {
    const chord = [392, 493.88, 587.33, 783.99]; // G4, B4, D5, G5
    chord.forEach((freq) => playNote(freq, 2.5, "sine", 0.1));
    setTimeout(() => playChime(), 400);
  };

  // Toggle ambient music loop synthesized soft lullaby/melody
  const startMusic = () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    setIsPlaying(true);
    // Simple romantic melody notes (in Hz)
    const melody = [
      { f: 329.63, d: 0.8 }, // E4
      { f: 392.00, d: 0.8 }, // G4
      { f: 440.00, d: 1.2 }, // A4
      { f: 392.00, d: 0.8 }, // G4
      { f: 523.25, d: 1.5 }, // C5
      { f: 493.88, d: 1.2 }, // B4
      { f: 440.00, d: 0.8 }, // A4
      { f: 392.00, d: 1.5 }, // G4
    ];

    let step = 0;
    const playMelodyStep = () => {
      const item = melody[step % melody.length];
      playNote(item.f, item.d * 1.5, "sine", 0.08);
      // Soft background harmony note
      if (step % 2 === 0) {
        playNote(item.f / 2, item.d * 2, "sine", 0.04);
      }
      step++;
    };

    playMelodyStep();
    musicTimerRef.current = setInterval(playMelodyStep, 1100);
  };

  const stopMusic = () => {
    if (musicTimerRef.current) {
      clearInterval(musicTimerRef.current);
      musicTimerRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      if (musicTimerRef.current) clearInterval(musicTimerRef.current);
    };
  }, []);

  return {
    isPlaying,
    toggleMusic,
    startMusic,
    stopMusic,
    playChime,
    playBlowSound,
    playFanfare,
  };
}

export default function AudioController({ isPlaying, toggleMusic }) {
  return (
    <button
      onClick={toggleMusic}
      className="fixed top-4 right-4 z-40 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-xs text-pink-200 shadow-lg hover:bg-white/20 active:scale-95 transition-all"
      aria-label="Toggle Romantic Music"
    >
      <span className="text-base">{isPlaying ? "🎶" : "🎵"}</span>
      <span>{isPlaying ? "Music: On" : "Music: Off"}</span>
      {isPlaying && (
        <div className="flex items-end gap-0.5 h-3 ml-1">
          <span className="w-0.5 bg-pink-400 h-full animate-[bounce_0.6s_infinite]" />
          <span className="w-0.5 bg-pink-300 h-2/3 animate-[bounce_0.8s_infinite]" />
          <span className="w-0.5 bg-pink-400 h-4/5 animate-[bounce_0.5s_infinite]" />
        </div>
      )}
    </button>
  );
}
