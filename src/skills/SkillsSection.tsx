"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/data/portfolio";

const categories = [
  { label: "LANGUAGES",      key: "languages"  as const, color: "#ffd700", accent: "rgba(255,215,0,0.15)"  },
  { label: "ML & AI",        key: "mlAi"       as const, color: "#e8000d", accent: "rgba(232,0,13,0.12)"   },
  { label: "CLOUD & TOOLS",  key: "cloudTools" as const, color: "#ffd700", accent: "rgba(255,215,0,0.15)"  },
  { label: "GENERATIVE AI",  key: "genAi"      as const, color: "#e8000d", accent: "rgba(232,0,13,0.12)"   },
];

function SkillBadge({ label, color, accent, delay }: { label: string; color: string; accent: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25 }}
      whileHover={{ scale: 1.08, boxShadow: `0 0 14px ${color}80`, y: -2 }}
      className="px-3 py-1.5 text-xs tracking-wide font-medium cursor-default transition-all duration-200"
      style={{
        border: `1px solid ${color}55`,
        color: color,
        background: accent,
        borderRadius: 2,
        textShadow: `0 0 8px ${color}60`,
      }}
    >
      {label}
    </motion.span>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(255,215,0,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-8 h-px" style={{ background: "var(--iron-gold)" }} />
          <span className="text-sm tracking-[0.4em]" style={{ color: "var(--iron-gold)" }}>
            02 // SYSTEM CAPABILITIES
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,215,0,0.1)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-black mb-12"
          style={{ color: "#fff" }}
        >
          SKILLS{" "}
          <span className="glow-red" style={{ color: "var(--iron-red)" }}>DATABASE</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.2 + ci * 0.1 }}
              className="relative p-6 space-y-4"
              style={{
                background: "rgba(5,3,8,0.7)",
                border: `1px solid ${cat.color}25`,
                boxShadow: `inset 0 0 40px ${cat.color}06`,
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 pb-2" style={{ borderBottom: `1px solid ${cat.color}20` }}>
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                />
                <span className="text-sm tracking-[0.3em] font-bold" style={{ color: cat.color }}>
                  {cat.label}
                </span>
                <span className="ml-auto text-xs font-mono" style={{ color: `${cat.color}60` }}>
                  {skills[cat.key].length} MODULES
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {skills[cat.key].map((skill, si) => (
                  <SkillBadge
                    key={skill}
                    label={skill}
                    color={cat.color}
                    accent={cat.accent}
                    delay={inView ? 0.3 + ci * 0.1 + si * 0.03 : 0}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
