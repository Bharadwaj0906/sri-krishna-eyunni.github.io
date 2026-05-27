"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─── Canvas: arc reactor + hex grid + particles + atmosphere ─────────────────
function IronManCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth || window.innerWidth;
    const H = () => canvas.offsetHeight || window.innerHeight;

    // ── Atmosphere: dramatic ambient glow zones ────────────────
    const drawAtmosphere = () => {
      // Blue JARVIS glow — top center
      const blueGlow = ctx.createRadialGradient(W() / 2, 0, 0, W() / 2, 0, H() * 0.85);
      blueGlow.addColorStop(0,   "rgba(0,120,255,0.45)");
      blueGlow.addColorStop(0.4, "rgba(0,60,180,0.18)");
      blueGlow.addColorStop(1,   "transparent");
      ctx.fillStyle = blueGlow;
      ctx.fillRect(0, 0, W(), H());

      // Red warmth — bottom
      const redGlow = ctx.createRadialGradient(W() / 2, H(), 0, W() / 2, H(), H() * 0.7);
      redGlow.addColorStop(0,   "rgba(200,0,10,0.32)");
      redGlow.addColorStop(0.5, "rgba(140,0,8,0.12)");
      redGlow.addColorStop(1,   "transparent");
      ctx.fillStyle = redGlow;
      ctx.fillRect(0, 0, W(), H());

      // Gold accent — right
      const goldGlow = ctx.createRadialGradient(W(), H() * 0.5, 0, W(), H() * 0.5, W() * 0.6);
      goldGlow.addColorStop(0,   "rgba(180,120,0,0.18)");
      goldGlow.addColorStop(1,   "transparent");
      ctx.fillStyle = goldGlow;
      ctx.fillRect(0, 0, W(), H());
    };

    // ── Hex grid ───────────────────────────────────────────────
    const drawHex = () => {
      const size = 28;
      const w = size * 2;
      const h = Math.sqrt(3) * size;
      ctx.strokeStyle = "rgba(0,180,255,0.09)";
      ctx.lineWidth = 0.7;
      for (let row = -1; row < H() / h + 1; row++) {
        for (let col = -1; col < W() / w + 2; col++) {
          const x = col * w * 0.75 + (row % 2 === 0 ? 0 : w * 0.375);
          const y = row * h;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            const px = x + size * Math.cos(a);
            const py = y + size * Math.sin(a);
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    };

    // ── Arc reactor ────────────────────────────────────────────
    const drawReactor = (cx: number, cy: number) => {
      const rings = [
        { r: 38,  spd:  0.018, dir:  1, dash: [5,  3],  w: 2.5, c: [0,   212, 255], op: 0.90, glow: 20 },
        { r: 60,  spd: -0.012, dir: -1, dash: [8,  5],  w: 2.0, c: [0,   212, 255], op: 0.70, glow: 16 },
        { r: 88,  spd:  0.008, dir:  1, dash: [10, 7],  w: 1.5, c: [232, 0,   13],  op: 0.60, glow: 18 },
        { r: 120, spd: -0.006, dir: -1, dash: [7,  12], w: 1.2, c: [201, 168, 76],  op: 0.50, glow: 12 },
        { r: 158, spd:  0.004, dir:  1, dash: [14, 9],  w: 1.0, c: [232, 0,   13],  op: 0.35, glow: 10 },
        { r: 200, spd: -0.003, dir: -1, dash: [20, 12], w: 0.8, c: [201, 168, 76],  op: 0.25, glow:  8 },
        { r: 250, spd:  0.002, dir:  1, dash: [28, 16], w: 0.6, c: [0,   150, 220], op: 0.15, glow:  6 },
      ];

      // Outer bloom
      const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, 280);
      bloom.addColorStop(0,   "rgba(0,160,255,0.20)");
      bloom.addColorStop(0.4, "rgba(0,80,200,0.08)");
      bloom.addColorStop(1,   "transparent");
      ctx.fillStyle = bloom;
      ctx.beginPath(); ctx.arc(cx, cy, 280, 0, Math.PI * 2); ctx.fill();

      rings.forEach(ring => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * ring.spd);
        ctx.beginPath();
        ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
        ctx.setLineDash(ring.dash);
        ctx.strokeStyle = `rgba(${ring.c[0]},${ring.c[1]},${ring.c[2]},${ring.op})`;
        ctx.lineWidth = ring.w;
        ctx.shadowBlur = ring.glow;
        ctx.shadowColor = `rgba(${ring.c[0]},${ring.c[1]},${ring.c[2]},0.9)`;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.shadowBlur = 0;
        ctx.restore();
      });

      // 12 spokes
      for (let i = 0; i < 12; i++) {
        const a = (Math.PI * 2 / 12) * i + t * 0.005;
        const p = 0.5 + 0.5 * Math.sin(t * 0.08 + i * 0.5);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * 28, Math.sin(a) * 28);
        ctx.lineTo(Math.cos(a) * 42, Math.sin(a) * 42);
        ctx.strokeStyle = `rgba(0,212,255,${p * 0.9})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(0,212,255,1)";
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // Triangle mark (Iron Man chest)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.003);
      ctx.beginPath();
      ctx.moveTo(0, -14); ctx.lineTo(12, 7); ctx.lineTo(-12, 7); ctx.closePath();
      ctx.strokeStyle = "rgba(0,212,255,0.7)";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 14;
      ctx.shadowColor = "rgba(0,212,255,1)";
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Core pulse
      const p = 0.8 + 0.2 * Math.sin(t * 0.06);
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22 * p);
      core.addColorStop(0,   "rgba(230,248,255,1)");
      core.addColorStop(0.3, "rgba(0,220,255,0.95)");
      core.addColorStop(0.7, "rgba(0,120,220,0.5)");
      core.addColorStop(1,   "transparent");
      ctx.fillStyle = core;
      ctx.shadowBlur = 30;
      ctx.shadowColor = "rgba(0,212,255,1)";
      ctx.beginPath(); ctx.arc(cx, cy, 22 * p, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    };

    // ── Perspective floor grid ─────────────────────────────────
    const drawFloor = () => {
      const hy = H() * 0.75;
      const vx = W() / 2;
      const spread = W() * 2;
      const cols = 20, rows = 16;

      for (let i = 0; i <= cols; i++) {
        const frac = i / cols;
        const bx = -spread / 2 + spread * frac;
        const a = 0.03 + 0.1 * (1 - Math.abs(frac - 0.5) * 2);
        ctx.strokeStyle = `rgba(201,168,76,${a})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(vx, hy);
        ctx.lineTo(vx + bx, H());
        ctx.stroke();
      }
      for (let j = 1; j <= rows; j++) {
        const frac = Math.pow(j / rows, 2);
        const y = hy + (H() - hy) * frac;
        const xL = vx + (-spread / 2) * frac;
        const xR = vx + ( spread / 2) * frac;
        ctx.strokeStyle = `rgba(201,168,76,${0.03 + 0.1 * frac})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(xL, y); ctx.lineTo(xR, y); ctx.stroke();
      }
    };

    // ── Scan line ──────────────────────────────────────────────
    const drawScan = () => {
      const y = ((t * 2) % (H() + 80)) - 40;
      const g = ctx.createLinearGradient(0, y - 2, 0, y + 2);
      g.addColorStop(0, "transparent");
      g.addColorStop(0.5, "rgba(232,0,13,0.55)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, y - 2, W(), 4);
    };

    // ── Particles ──────────────────────────────────────────────
    interface P { x: number; y: number; vx: number; vy: number; a: number; r: number; c: string; }
    const COLORS = ["rgba(0,212,255,", "rgba(201,168,76,", "rgba(232,0,13,"];
    const particles: P[] = Array.from({ length: 110 }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 1200,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: 0.15 + Math.random() * 0.45,
      r: 0.6 + Math.random() * 1.0,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const drawParticles = () => {
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W(); if (p.x > W()) p.x = 0;
        if (p.y < 0) p.y = H(); if (p.y > H()) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.c}${p.a})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = `${p.c}0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    // ── Main loop ──────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      drawAtmosphere();
      drawHex();
      drawFloor();
      drawParticles();
      // Reactor — right middle
      if (W() >= 768) drawReactor(W() * 0.82, H() * 0.5);
      drawScan();
      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0 w-full h-full" style={{ willChange: "transform", transform: "translateZ(0)" }} />
  );
}

// ─── Framer Motion HUD chrome ────────────────────────────────────────────────
function HudChrome() {
  const corners = [
    { style: { top: 14, left: 14 },     rot: "0deg"   },
    { style: { top: 14, right: 14 },    rot: "90deg"  },
    { style: { bottom: 14, right: 14 }, rot: "180deg" },
    { style: { bottom: 14, left: 14 },  rot: "270deg" },
  ];
  return <>
    {corners.map((c, i) => (
      <motion.div key={i} className="pointer-events-none fixed z-0 hidden md:block"
        style={{ ...c.style, width: 52, height: 52, rotate: c.rot }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0.6, 1, 0.6], scale: 1 }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 + i * 0.4 }}>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <path d="M2 22 L2 2 L22 2" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="square"
            filter="drop-shadow(0 0 4px rgba(201,168,76,0.9))" />
          <circle cx="2" cy="2" r="3.5" fill="#e8000d"
            filter="drop-shadow(0 0 5px rgba(232,0,13,1))" />
        </svg>
      </motion.div>
    ))}
  </>;
}

export default function ParticleBackground() {
  const isLinkedIn = typeof navigator !== "undefined" &&
    /LinkedIn/i.test(navigator.userAgent);

  if (isLinkedIn) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,60,180,0.35) 0%, transparent 70%), radial-gradient(ellipse at 50% 100%, rgba(180,0,10,0.25) 0%, transparent 70%), #020408" }} />
    );
  }

  return (
    <>
      <IronManCanvas />
      <HudChrome />
    </>
  );
}
