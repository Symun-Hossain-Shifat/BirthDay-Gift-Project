"use client";

import { useEffect, useRef } from "react";

export default function ConfettiCanvas({ triggerBurst }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#FF6F91", "#FF9AAE", "#FFD6E0", "#FFC15E", "#C9A7FF", "#E4D0F5", "#FFFFFF"];
    const shapes = ["circle", "heart", "sparkle"];

    const createParticle = (x, y, isBurst = false) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = isBurst ? Math.random() * 8 + 3 : Math.random() * 2 + 1;
      return {
        x: x || Math.random() * canvas.width,
        y: y || (isBurst ? canvas.height / 2 : -20),
        vx: Math.cos(angle) * speed,
        vy: isBurst ? Math.sin(angle) * speed - 2 : Math.random() * 3 + 1,
        size: Math.random() * (isBurst ? 10 : 6) + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.1,
        alpha: 1,
        decay: isBurst ? Math.random() * 0.015 + 0.008 : 0,
      };
    };

    const drawHeart = (ctx, x, y, size, color, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(
        x,
        y,
        x - size / 2,
        y,
        x - size / 2,
        y + topCurveHeight
      );
      ctx.bezierCurveTo(
        x - size / 2,
        y + (size + topCurveHeight) / 2,
        x,
        y + size,
        x,
        y + size
      );
      ctx.bezierCurveTo(
        x,
        y + size,
        x + size / 2,
        y + (size + topCurveHeight) / 2,
        x + size / 2,
        y + topCurveHeight
      );
      ctx.bezierCurveTo(
        x + size / 2,
        y,
        x,
        y,
        x,
        y + topCurveHeight
      );
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (ctx, x, y, size, color, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(
          Math.cos((i * Math.PI) / 2) * size + x,
          Math.sin((i * Math.PI) / 2) * size + y
        );
        ctx.lineTo(
          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size / 3) + x,
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size / 3) + y
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        if (p.decay > 0) {
          p.alpha -= p.decay;
        }

        if (p.shape === "heart") {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha);
        } else if (p.shape === "sparkle") {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.alpha);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Remove dead particles
        if (p.alpha <= 0 || p.y > canvas.height + 50) {
          particlesRef.current.splice(idx, 1);
        }
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Mouse / Touch trail effect
    const handlePointerMove = (e) => {
      if (Math.random() > 0.4) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const p = createParticle(clientX, clientY, true);
        p.vy = (Math.random() - 0.5) * 2;
        p.vx = (Math.random() - 0.5) * 2;
        p.size = Math.random() * 6 + 3;
        particlesRef.current.push(p);
      }
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Trigger burst when triggerBurst count changes
  useEffect(() => {
    if (!triggerBurst || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const burstCount = 70;
    const newParticles = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.4;
    for (let i = 0; i < burstCount; i++) {
      const angle = (i / burstCount) * Math.PI * 2;
      const speed = Math.random() * 10 + 4;
      const colors = ["#FF6F91", "#FF9AAE", "#FFD6E0", "#FFC15E", "#C9A7FF", "#FFFFFF"];
      newParticles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 12 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: i % 3 === 0 ? "heart" : i % 3 === 1 ? "sparkle" : "circle",
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008,
      });
    }
    particlesRef.current.push(...newParticles);
  }, [triggerBurst]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
    />
  );
}
