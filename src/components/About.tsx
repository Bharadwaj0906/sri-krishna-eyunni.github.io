"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { personal, education } from "@/data/portfolio";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-8 h-px" style={{ background: "var(--iron-red)" }} />
          <span className="text-sm tracking-[0.4em]" style={{ color: "var(--iron-red)" }}>
            01 // PROFILE
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(232,0,13,0.15)" }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: bio */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-black" style={{ color: "#fff" }}>
              OPERATOR{" "}
              <span className="glow-gold" style={{ color: "var(--iron-gold)" }}>PROFILE</span>
            </h2>
            <p className="leading-relaxed text-sm" style={{ color: "rgba(245,230,200,0.88)" }}>
              Master's student in Data Science at Arizona State University and an IEEE-published
              researcher (ICDABI 2024) working on real-world machine learning systems across
              computer vision and LLM-based architectures.
            </p>
            <p className="leading-relaxed text-sm" style={{ color: "rgba(245,230,200,0.88)" }}>
              Currently building <span style={{ color: "var(--iron-gold)" }}>Cruzo.ai</span>, a
              production-grade multi-tenant SaaS platform powered by AI agents, LangChain,
              multi-turn LLM chatbots, AutoML forecasting, and generative AI pipelines using
              Claude and Gemini APIs.
            </p>
            <p className="leading-relaxed text-sm" style={{ color: "rgba(245,230,200,0.88)" }}>
              My work includes a sequence-aware LRCN model achieving 98% accuracy for video-based
              human activity recognition, and distributed ML systems on AWS · real-time face
              recognition pipelines using EC2, SQS, and Lambda with auto-scaled inference.
            </p>
            <p className="leading-relaxed text-sm" style={{ color: "rgba(245,230,200,0.88)" }}>
              More recently focused on LLM-powered systems · retrieval pipelines with semantic
              embeddings, automated data ingestion, and vector databases for scalable,
              context-aware applications. Also experienced in large-scale EDA and dashboard
              analytics for actionable insights from structured datasets.
            </p>
            <p className="leading-relaxed text-sm" style={{ color: "rgba(245,230,200,0.88)" }}>
              Core strength: combining ML, data systems, and cloud infrastructure into end-to-end
              solutions. Currently seeking <span style={{ color: "var(--iron-gold)" }}>AI Engineer / Data Scientist</span> roles.
            </p>

            {/* Contact links */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { label: "EMAIL",    href: `mailto:${personal.email}` },
                { label: "LINKEDIN", href: personal.linkedin           },
                { label: "GITHUB",   href: personal.github             },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs tracking-widest transition-all duration-300"
                  style={{
                    border: "1px solid var(--hud-border)",
                    color: "var(--iron-gold)",
                    background: "var(--hud-panel)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--iron-gold)";
                    e.currentTarget.style.boxShadow = "0 0 12px var(--gold-glow)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--hud-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: education panels */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <p className="text-xs tracking-widest mb-6" style={{ color: "rgba(232,0,13,0.85)" }}>
              ACADEMIC RECORD
            </p>
            {education.map((edu, i) => (
              <div key={i} className="relative p-6 space-y-2"
                style={{
                  background: "rgba(5,3,8,0.7)",
                  border: "1px solid rgba(0,212,255,0.2)",
                }}>
                <div className="text-xs tracking-widest" style={{ color: "var(--iron-red)" }}>
                  {edu.period}
                </div>
                <div className="font-bold text-sm" style={{ color: "#fff" }}>
                  {edu.degree}
                </div>
                <div className="text-xs" style={{ color: "rgba(245,230,200,0.72)" }}>
                  {edu.school} · {edu.location}
                </div>
              </div>
            ))}

            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ border: "1px solid rgba(255,215,0,0.12)" }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 8px #00ff88" }} />
              <span className="text-xs tracking-widest" style={{ color: "rgba(245,230,200,0.72)" }}>
                LOCATION: {personal.location.toUpperCase()}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
