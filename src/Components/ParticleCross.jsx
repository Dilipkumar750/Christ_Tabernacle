import React, { useEffect, useRef } from "react";

export default function ParticleCross() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Golden sanctuary palette
    const colors = [
      "rgba(243, 217, 139, ", // gold-bright
      "rgba(214, 182, 107, ", // gold
      "rgba(255, 248, 230, ", // ivory
      "rgba(114, 195, 162, ", // soft green tint
    ];

    const particleCount = prefersReducedMotion ? 18 : 42;
    const particles = [];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width || window.innerWidth;
      height = rect?.height || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const isCrossAligned = Math.random() < 0.45;
        let x, y;

        if (isCrossAligned) {
          // Align along vertical beam or horizontal cross beam
          if (Math.random() < 0.6) {
            // Vertical bar
            x = width * 0.5 + (Math.random() - 0.5) * 60;
            y = height * (0.15 + Math.random() * 0.7);
          } else {
            // Horizontal bar
            x = width * (0.35 + Math.random() * 0.3);
            y = height * 0.38 + (Math.random() - 0.5) * 40;
          }
        } else {
          x = Math.random() * width;
          y = Math.random() * height;
        }

        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.1 : 0.4),
          vy: -Math.random() * (prefersReducedMotion ? 0.1 : 0.5) - 0.1,
          radius: Math.random() * 1.8 + 0.6,
          baseAlpha: Math.random() * 0.45 + 0.2,
          alpha: 0,
          colorPrefix: colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * Math.PI * 2,
          fadeSpeed: 0.015 + Math.random() * 0.02,
        });
      }
    };

    resize();
    initParticles();

    window.addEventListener("resize", resize);

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Subtle radiant cross glow in center
      const centerX = width * 0.5;
      const centerY = height * 0.38;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.max(width * 0.35, 180)
      );
      gradient.addColorStop(0, "rgba(243, 217, 139, 0.08)");
      gradient.addColorStop(0.5, "rgba(214, 182, 107, 0.03)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw faint cross beam light
      const beamAlpha = 0.04 + Math.sin(tick * 0.02) * 0.015;
      ctx.fillStyle = `rgba(243, 217, 139, ${beamAlpha})`;
      // Vertical beam
      ctx.fillRect(centerX - 1.5, centerY - 80, 3, 160);
      // Horizontal beam
      ctx.fillRect(centerX - 50, centerY - 30, 100, 3);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.fadeSpeed;
        p.alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.phase));

        // Wrap around smoothly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorPrefix}${Math.max(0, p.alpha)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
