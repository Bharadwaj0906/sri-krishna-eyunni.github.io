"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const bootLines = [
  "> INITIALIZING J.A.R.V.I.S. v7.0...",
  "> SCANNING BIOMETRIC DATABASE...",
  "> OPERATOR IDENTIFIED.",
  "> LOADING HOLOGRAPHIC PROJECTION...",
  "> RENDERING COMPLETE.",
];

export default function HolographicIntro({ onDone }: { onDone: () => void }) {
  const [stage, setStage]         = useState<"boot" | "holo" | "exit">("boot");
  const [bootIdx, setBootIdx]     = useState(0);
  const [nameText, setNameText]   = useState("");
  const [titleText, setTitleText] = useState("");
  const canvasRef                 = useRef<HTMLCanvasElement>(null);
  const animRef                   = useRef<number>(0);

  const fullName  = "BHARADWAJ EYUNNI";
  const fullTitle = "AI/ML ENGINEER  ·  DATA SCIENTIST  ·  IEEE AUTHOR";

  // Boot sequence
  useEffect(() => {
    if (stage !== "boot") return;
    if (bootIdx < bootLines.length) {
      const t = setTimeout(() => setBootIdx((i) => i + 1), 420);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStage("holo"), 500);
    return () => clearTimeout(t);
  }, [bootIdx, stage]);

  // Typewriter for name
  useEffect(() => {
    if (stage !== "holo") return;
    let i = 0;
    const iv = setInterval(() => {
      setNameText(fullName.slice(0, i + 1));
      i++;
      if (i >= fullName.length) clearInterval(iv);
    }, 55);
    return () => clearInterval(iv);
  }, [stage]);

  // Typewriter for title (after name done)
  useEffect(() => {
    if (nameText !== fullName) return;
    let i = 0;
    const iv = setInterval(() => {
      setTitleText(fullTitle.slice(0, i + 1));
      i++;
      if (i >= fullTitle.length) clearInterval(iv);
    }, 28);
    return () => clearInterval(iv);
  }, [nameText]);

  // Auto-exit after title done
  useEffect(() => {
    if (titleText !== fullTitle) return;
    const t = setTimeout(() => {
      setStage("exit");
      setTimeout(onDone, 1200);
    }, 1800);
    return () => clearTimeout(t);
  }, [titleText, onDone]);

  // Canvas holographic scan lines over the photo
  useEffect(() => {
    if (stage !== "holo") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Horizontal scan lines
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fillRect(0, y, canvas.width, 2);
      }

      // Moving bright scan line
      const scanY = (t * 2) % canvas.height;
      const sg = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      sg.addColorStop(0,   "transparent");
      sg.addColorStop(0.5, "rgba(0,220,255,0.35)");
      sg.addColorStop(1,   "transparent");
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 20, canvas.width, 40);

      // Edge glow
      const eg = ctx.createLinearGradient(0, 0, canvas.width, 0);
      eg.addColorStop(0,    "rgba(0,212,255,0.25)");
      eg.addColorStop(0.15, "transparent");
      eg.addColorStop(0.85, "transparent");
      eg.addColorStop(1,    "rgba(0,212,255,0.25)");
      ctx.fillStyle = eg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glitch flicker (occasional)
      if (Math.random() < 0.012) {
        const gh = 8 + Math.random() * 20;
        const gy = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(0,212,255,${Math.random() * 0.25})`;
        ctx.fillRect(0, gy, canvas.width, gh);
      }

      // Interference noise strips
      if (Math.random() < 0.04) {
        const nh = 2 + Math.random() * 6;
        const ny = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(0,212,255,${Math.random() * 0.15})`;
        ctx.fillRect(Math.random() * canvas.width * 0.3, ny, canvas.width * 0.6, nh);
      }

      t++;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [stage]);

  return (
    <AnimatePresence>
      {stage !== "exit" ? (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 flex flex-col items-center justify-center z-[9999]"
          style={{ background: "#020408" }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,212,255,0.04) 1px,transparent 1px), linear-gradient(90deg,rgba(0,212,255,0.04) 1px,transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Corner brackets */}
          {[
            "top-4 left-4 border-t-2 border-l-2",
            "top-4 right-4 border-t-2 border-r-2",
            "bottom-4 left-4 border-b-2 border-l-2",
            "bottom-4 right-4 border-b-2 border-r-2",
          ].map((cls, i) => (
            <div
              key={i}
              className={`absolute w-14 h-14 ${cls}`}
              style={{ borderColor: "rgba(201,168,76,0.7)", boxShadow: "0 0 10px rgba(201,168,76,0.4)" }}
            />
          ))}

          {/* Boot stage */}
          {stage === "boot" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-start gap-2 px-8"
            >
              {bootLines.slice(0, bootIdx).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-mono tracking-widest"
                  style={{ color: i === bootIdx - 1 ? "#00d4ff" : "rgba(0,212,255,0.45)" }}
                >
                  {line}
                </motion.p>
              ))}
              <span className="text-sm font-mono" style={{ color: "#00d4ff" }}>
                <span className="blink">█</span>
              </span>
            </motion.div>
          )}

          {/* Hologram stage */}
          {stage === "holo" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6 relative z-10"
            >
              {/* JARVIS label */}
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.8em" }}
                animate={{ opacity: 1, letterSpacing: "0.4em" }}
                transition={{ duration: 0.8 }}
                className="text-xs font-mono tracking-[0.4em] holo-flicker"
                style={{ color: "rgba(0,212,255,0.6)" }}
              >
                J.A.R.V.I.S. — OPERATOR IDENTIFIED
              </motion.p>

              {/* Holographic photo */}
              <motion.div
                initial={{ scale: 0.3, opacity: 0, filter: "blur(20px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                {/* Outer ring */}
                <div
                  className="absolute inset-0 rounded-full rotate-slow"
                  style={{
                    border: "2px solid rgba(0,212,255,0.5)",
                    borderTopColor: "#00d4ff",
                    boxShadow: "0 0 30px rgba(0,212,255,0.4), inset 0 0 30px rgba(0,212,255,0.1)",
                    transform: "scale(1.12)",
                  }}
                />
                {/* Middle ring */}
                <div
                  className="absolute inset-0 rounded-full rotate-reverse"
                  style={{
                    border: "1px dashed rgba(201,168,76,0.4)",
                    transform: "scale(1.22)",
                  }}
                />

                {/* Photo container */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: 240,
                    height: 240,
                    borderRadius: "50%",
                    border: "2px solid rgba(0,212,255,0.6)",
                    boxShadow: "0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(0,100,255,0.2)",
                  }}
                >
                  {/* Photo with holographic filter */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/bharadwaj.jpg`}
                    alt="Bharadwaj"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "hue-rotate(170deg) saturate(2.5) brightness(1.15) contrast(1.1)",
                      mixBlendMode: "normal",
                    }}
                  />

                  {/* Blue overlay tint */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(0,80,180,0.3)", mixBlendMode: "multiply" }}
                  />

                  {/* Cyan glow overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "radial-gradient(circle at 50% 30%, rgba(0,212,255,0.15) 0%, transparent 70%)",
                    }}
                  />

                  {/* Scan lines canvas */}
                  <canvas
                    ref={canvasRef}
                    width={240}
                    height={240}
                    className="absolute inset-0"
                    style={{ borderRadius: "50%" }}
                  />
                </div>

                {/* Bottom platform glow */}
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                  style={{
                    width: 200,
                    height: 12,
                    background: "radial-gradient(ellipse, rgba(0,212,255,0.6) 0%, transparent 70%)",
                    filter: "blur(4px)",
                  }}
                />
              </motion.div>

              {/* Name */}
              <motion.div className="text-center space-y-2">
                <h1
                  className="text-4xl md:text-5xl font-black tracking-widest"
                  style={{
                    color: "#fff",
                    textShadow: "0 0 20px rgba(0,212,255,0.8), 0 0 50px rgba(0,150,255,0.4)",
                  }}
                >
                  {nameText}
                  {nameText.length < fullName.length && (
                    <span className="blink" style={{ color: "#00d4ff" }}>|</span>
                  )}
                </h1>

                {nameText === fullName && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-mono tracking-[0.25em]"
                    style={{ color: "rgba(201,168,76,0.8)" }}
                  >
                    {titleText}
                    {titleText.length < fullTitle.length && (
                      <span className="blink" style={{ color: "#c9a84c" }}>|</span>
                    )}
                  </motion.p>
                )}
              </motion.div>

              {/* Skip button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => { setStage("exit"); setTimeout(onDone, 1200); }}
                className="text-xs tracking-widest font-mono mt-2 transition-all duration-200"
                style={{ color: "rgba(0,212,255,0.35)", border: "none", background: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(0,212,255,0.7)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(0,212,255,0.35)"; }}
              >
                [ PRESS TO SKIP ]
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
