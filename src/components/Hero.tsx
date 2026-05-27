"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { personal } from "@/data/portfolio";

const bootLines = [
  "INITIALIZING J.A.R.V.I.S...",
  "OPERATOR AUTHENTICATED.",
  "PROJECTING INTERFACE...",
  "SYSTEM READY.",
];

const NAME_LETTERS = "BHARADWAJ".split("");

const orbitBlips = [
  { angle: 0,   label: "LLMs",      delay: 0    },
  { angle: 60,  label: "Agents",    delay: 0.1  },
  { angle: 120, label: "RAG",       delay: 0.2  },
  { angle: 180, label: "LangGraph", delay: 0.3  },
  { angle: 240, label: "FastAPI",   delay: 0.4  },
  { angle: 300, label: "PyTorch",   delay: 0.5  },
];

export default function Hero() {
  const [bootDone, setBootDone]   = useState(false);
  const [bootIdx, setBootIdx]     = useState(0);
  const [titleText, setTitleText] = useState("");
  const [isMobile, setIsMobile]   = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const fullTitle = "AI/ML Engineer & Data Scientist";

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "GOOD MORNING";
    if (h < 17) return "GOOD AFTERNOON";
    return "GOOD EVENING";
  })();

  useEffect(() => {
    if (bootIdx < bootLines.length) {
      const t = setTimeout(() => setBootIdx(i => i + 1), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setBootDone(true), 600);
    return () => clearTimeout(t);
  }, [bootIdx]);

  useEffect(() => {
    if (!bootDone) return;
    let i = 0;
    const iv = setInterval(() => {
      setTitleText(fullTitle.slice(0, i + 1));
      i++;
      if (i >= fullTitle.length) clearInterval(iv);
    }, 75);
    return () => clearInterval(iv);
  }, [bootDone]);

  return (
    <section id="hero" className="relative flex items-start md:items-center justify-center overflow-hidden" style={{ minHeight: "100dvh" }}>

      {/* Dark bottom fade to cover canvas bleed */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 z-10"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(2,4,8,0.95))" }} />

      {/* Boot overlay */}
      <AnimatePresence>
        {!bootDone && (
          <motion.div
            key="boot"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-20"
            style={{ background: "#020408" }}
          >
            {bootLines.slice(0, bootIdx).map((line, i) => (
              <motion.p key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="text-xs tracking-widest font-mono"
                style={{ color: i % 2 === 0 ? "#00d4ff" : "#c9a84c" }}>
                &gt; {line}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {bootDone && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:grid md:grid-cols-[340px_1fr] gap-4 md:gap-16 items-center pt-14 pb-12 md:py-28">

          {/* ══ LEFT: Real you ══════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center gap-2 md:gap-6"
          >
            {/* Orbiting blips around photo */}
            <div className="relative flex items-center justify-center w-[240px] h-[240px] md:w-[300px] md:h-[300px]">


              {/* Orbit rings */}
              {[1.1, 1.25, 1.4].map((scale, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 12 + i * 6, repeat: Infinity, ease: "linear" }}
                  style={{
                    border: i === 0 ? "1px solid rgba(0,212,255,0.35)" : `1px dashed rgba(${i === 1 ? "201,168,76" : "204,17,17"},0.2)`,
                    transform: `scale(${scale})`,
                  }}
                />
              ))}

              {/* Orbiting data blips */}
              {orbitBlips.map(({ angle, label, delay }) => {
                const rad = (angle * Math.PI) / 180;
                const r = isMobile ? 108 : 155;
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: delay + 0.8, type: "spring", duration: 0.4 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                      className="absolute"
                      style={{ width: r * 2, height: r * 2, top: "50%", left: "50%", marginTop: -r, marginLeft: -r, borderRadius: "50%" }}
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                        className="absolute font-mono text-center"
                        style={{
                          top: `calc(50% + ${Math.sin(rad) * r}px - ${isMobile ? 11 : 14}px)`,
                          left: `calc(50% + ${Math.cos(rad) * r}px - ${isMobile ? 32 : 38}px)`,
                          width: isMobile ? 64 : 76,
                        }}
                      >
                        <motion.div
                          animate={{ opacity: [0.55, 1, 1, 0.55], scale: [1, 1.08, 1.08, 1] }}
                          transition={{ duration: 3.5, repeat: Infinity, delay: delay, times: [0, 0.3, 0.7, 1] }}
                          whileHover={{ scale: 1.15, boxShadow: "0 0 16px rgba(0,212,255,0.8)" }}
                          className="px-1.5 py-0.5 md:px-2 md:py-1 text-center"
                          style={{
                            fontSize: isMobile ? 9 : 11,
                            fontWeight: 600,
                            color: "#00d4ff",
                            border: "1px solid rgba(0,212,255,0.5)",
                            background: "rgba(0,20,50,0.9)",
                            whiteSpace: "nowrap",
                            boxShadow: "0 0 8px rgba(0,212,255,0.3)",
                            letterSpacing: "0.04em",
                            textAlign: "center",
                            display: "block",
                          }}
                        >
                          {label}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Pulse rings expanding outward */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`pulse-${i}`}
                  className="absolute rounded-full hidden md:block"
                  style={{ border: "1px solid rgba(0,212,255,0.6)" }}
                  animate={{ width: [100, 320], height: [100, 320], opacity: [0.6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
                />
              ))}

              {/* Photo */}
              <div className="relative overflow-hidden rounded-full w-[140px] h-[140px] md:w-[200px] md:h-[200px]"
                style={{
                  zIndex: 2,
                  border: "2px solid rgba(0,212,255,0.5)",
                  boxShadow: "0 0 40px rgba(0,212,255,0.3), 0 0 80px rgba(0,80,200,0.15)",
                }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/bharadwaj.jpg`} alt="Bharadwaj"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                {/* Dark vignette edges */}
                <div className="absolute inset-0"
                  style={{ background: "radial-gradient(circle at center, transparent 55%, rgba(2,4,8,0.7) 100%)" }} />
                {/* Scan line sweep */}
                <motion.div
                  animate={{ top: ["-20%", "120%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 pointer-events-none"
                  style={{ height: 40, background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.35), transparent)" }}
                />
              </div>

              {/* Status dot */}
              <div className="hidden md:flex absolute bottom-10 right-10 z-10 items-center gap-1 px-2 py-1"
                style={{ background: "rgba(2,4,8,0.9)", border: "1px solid rgba(0,212,255,0.3)", borderRadius: 2 }}>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }}
                />
                <span className="text-xs font-mono tracking-wider" style={{ color: "#00ff88" }}>LIVE</span>
              </div>
            </div>

            {/* Connection beam to right side (horizontal line) */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="hidden md:block absolute"
              style={{
                left: 320, top: "50%",
                width: 80, height: 1,
                background: "linear-gradient(to right, rgba(0,212,255,0.6), transparent)",
                transformOrigin: "left",
              }}
            />
          </motion.div>

          {/* ══ RIGHT: Holographic content ══════════════════════ */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-6 mt-4 md:mt-0">

            {/* JARVIS label */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xs tracking-[0.5em] font-mono px-4 py-1"
                style={{
                  color: "rgba(0,212,255,0.8)",
                  border: "1px solid rgba(0,212,255,0.25)",
                  background: "rgba(0,212,255,0.05)",
                  backdropFilter: "blur(10px)",
                }}>
                {greeting} — J.A.R.V.I.S. ONLINE
              </motion.span>
            </motion.div>

            {/* NAME — letter by letter with glow */}
            <div className="relative">
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at center, rgba(0,212,255,0.1) 0%, transparent 70%)",
                filter: "blur(20px)", transform: "scale(1.5)",
              }} />

              {/* Scan line over name */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ top: ["-20%", "120%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0"
                  style={{ height: 50, background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.18), transparent)" }}
                />
              </div>

              <h1 className="relative flex items-end text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none">
                {NAME_LETTERS.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 60, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5, type: "spring" }}
                    style={{
                      color: "#fff",
                      textShadow: "0 0 20px rgba(0,212,255,0.7), 0 0 60px rgba(0,150,255,0.3)",
                      WebkitTextStroke: "1px rgba(0,212,255,0.25)",
                      display: "inline-block",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  style={{ color: "var(--iron-gold)", textShadow: "0 0 20px var(--iron-gold), 0 0 50px var(--iron-gold)", display: "inline-block" }}
                >.</motion.span>
              </h1>
            </div>

            {/* Holographic title panel — draws its border */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ delay: 1, duration: 0.6 }}
              className="relative px-8 py-3 overflow-hidden"
              style={{
                border: "1px solid rgba(0,212,255,0.3)",
                background: "rgba(0,20,50,0.45)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 30px rgba(0,212,255,0.1)",
                whiteSpace: "nowrap",
              }}
            >
              {["-top-px -left-px border-t border-l", "-top-px -right-px border-t border-r",
                "-bottom-px -left-px border-b border-l", "-bottom-px -right-px border-b border-r"].map((c, i) => (
                <div key={i} className={`absolute w-3 h-3 ${c}`} style={{ borderColor: "rgba(0,212,255,0.7)" }} />
              ))}
              <div className="text-sm sm:text-lg md:text-xl font-mono tracking-widest holo-text">
                {titleText}
                {titleText.length < fullTitle.length && <span className="blink">|</span>}
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="text-sm leading-relaxed max-w-md" style={{ color: "rgba(224,244,255,0.88)" }}>
              {personal.tagline.split("\n").map((line, i) => (
                <span key={i}>{line}{i < personal.tagline.split("\n").length - 1 && <br />}</span>
              ))}
            </motion.p>

            {/* CTA buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
              className="flex gap-3 flex-row w-full">
              <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="flex-1 text-center px-4 py-3 text-xs tracking-widest font-bold transition-all duration-300"
                style={{ border: "1px solid var(--iron-gold)", color: "var(--iron-gold)", background: "rgba(201,168,76,0.07)" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 30px var(--gold-glow)"; e.currentTarget.style.background = "rgba(201,168,76,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "rgba(201,168,76,0.07)"; }}>
                VIEW PROJECTS
              </motion.a>
              <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="flex-1 text-center px-4 py-3 text-xs tracking-widest font-bold transition-all duration-300"
                style={{ border: "1px solid var(--iron-red)", color: "var(--iron-red)", background: "rgba(204,17,17,0.07)" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 30px var(--red-glow)"; e.currentTarget.style.background = "rgba(204,17,17,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "rgba(204,17,17,0.07)"; }}>
                INITIATE CONTACT
              </motion.a>
            </motion.div>
          </div>{/* end right col */}
        </div>
      )}

      {/* Scroll indicator */}
      {bootDone && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
          <motion.span
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs tracking-widest" style={{ color: "rgba(0,212,255,0.5)" }}>
            SCROLL TO EXPLORE
          </motion.span>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, var(--arc-blue), transparent)" }}
          />
        </motion.div>
      )}
    </section>
  );
}
