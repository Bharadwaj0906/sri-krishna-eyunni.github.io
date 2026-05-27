"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/portfolio";

const statusClass: Record<string, string> = {
  ACTIVE:    "status-active",
  COMPLETE:  "status-complete",
  PUBLISHED: "status-published",
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);

  const featured = projects.filter((p) => p.featured);
  const extra    = projects.filter((p) => !p.featured);
  const displayed = showAll ? projects : featured;

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(232,0,13,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-8 h-px" style={{ background: "var(--iron-red)" }} />
          <span className="text-sm tracking-[0.4em]" style={{ color: "var(--iron-red)" }}>
            03 // MISSION LOG
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(232,0,13,0.15)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-black mb-12"
          style={{ color: "#fff" }}
        >
          DEPLOYED{" "}
          <span className="glow-gold" style={{ color: "var(--iron-gold)" }}>SYSTEMS</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {displayed.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 0 30px rgba(255,215,0,0.12)" }}
              className="relative p-6 space-y-4 cursor-default flex flex-col"
              style={{ background: "rgba(5,3,8,0.7)", border: "1px solid rgba(255,215,0,0.12)" }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-bold text-lg leading-tight" style={{ color: "#fff" }}>
                  {project.name}
                </h3>
                <span className={`text-xs px-2 py-0.5 border tracking-widest shrink-0 ${statusClass[project.status]}`}>
                  {project.status}
                </span>
              </div>

              {/* Period */}
              <div className="text-xs tracking-widest" style={{ color: "rgba(232,0,13,0.65)" }}>
                {project.period}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "rgba(245,230,200,0.6)" }}>
                {project.description}
              </p>

              {/* Bullets */}
              <ul className="space-y-1">
                {project.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2 text-xs" style={{ color: "rgba(245,230,200,0.5)" }}>
                    <span style={{ color: "var(--iron-gold)", marginTop: 2 }}>▸</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 tracking-wide"
                    style={{
                      border: "1px solid rgba(255,215,0,0.18)",
                      color: "rgba(255,215,0,0.65)",
                      background: "rgba(255,215,0,0.04)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* GitHub link */}
              {project.github && (
                <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,215,0,0.1)" }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs tracking-widest transition-all duration-200"
                    style={{ color: "var(--iron-red)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.textShadow = "0 0 8px var(--iron-red)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.textShadow = "none"; }}
                  >
                    VIEW SOURCE →
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {extra.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => setShowAll((v) => !v)}
              className="px-8 py-3 text-xs tracking-widest transition-all duration-300"
              style={{
                border: "1px solid var(--hud-border)",
                color: "var(--iron-gold)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,215,0,0.08)";
                e.currentTarget.style.boxShadow = "0 0 16px var(--gold-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {showAll ? "COLLAPSE SYSTEMS" : `LOAD ${extra.length} MORE SYSTEMS`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
