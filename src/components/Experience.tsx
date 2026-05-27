"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experience, publications, leadership } from "@/data/portfolio";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-8 h-px" style={{ background: "var(--iron-gold)" }} />
          <span className="text-sm tracking-[0.4em]" style={{ color: "var(--iron-gold)" }}>
            04 // FIELD RECORD
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,215,0,0.1)" }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left */}
          <div className="space-y-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-black"
              style={{ color: "#fff" }}
            >
              EXPERIENCE
            </motion.h2>

            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="relative pl-6 space-y-3"
                style={{ borderLeft: "1px solid rgba(255,215,0,0.2)" }}
              >
                <div
                  className="absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-1/2"
                  style={{ background: "var(--iron-gold)", boxShadow: "0 0 8px var(--iron-gold)" }}
                />
                <div className="text-xs tracking-widest" style={{ color: "var(--iron-red)" }}>
                  {exp.period}
                </div>
                <div className="font-bold" style={{ color: "#fff" }}>{exp.role}</div>
                <div className="text-sm" style={{ color: "rgba(245,230,200,0.75)" }}>{exp.company}</div>
                <ul className="space-y-2">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-xs" style={{ color: "rgba(245,230,200,0.82)" }}>
                      <span style={{ color: "var(--iron-gold)", marginTop: 2 }}>▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Leadership */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-black mb-6" style={{ color: "#fff" }}>LEADERSHIP</h3>
              <div className="space-y-6">
                {leadership.map((lead, i) => (
                  <div
                    key={i}
                    className="relative pl-6 space-y-2"
                    style={{ borderLeft: "1px solid rgba(232,0,13,0.2)" }}
                  >
                    <div
                      className="absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-1/2"
                      style={{ background: "var(--iron-red)", boxShadow: "0 0 8px var(--iron-red)" }}
                    />
                    <div className="text-xs tracking-widest" style={{ color: "var(--iron-gold)" }}>
                      {lead.period}
                    </div>
                    <div className="font-bold text-sm" style={{ color: "#fff" }}>{lead.role}</div>
                    <div className="text-xs" style={{ color: "rgba(245,230,200,0.75)" }}>{lead.org}</div>
                    <ul className="space-y-1">
                      {lead.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-xs" style={{ color: "rgba(245,230,200,0.82)" }}>
                          <span style={{ color: "var(--iron-red)", marginTop: 2 }}>▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Publications */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-black mb-8" style={{ color: "#fff" }}>PUBLICATIONS</h2>
            {publications.map((pub, i) => (
              <div key={i} className="relative p-6 space-y-4"
                style={{ background: "rgba(5,3,8,0.7)", border: "1px solid rgba(255,215,0,0.15)" }}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "var(--iron-red)", boxShadow: "0 0 8px var(--iron-red)" }}
                  />
                  <span className="text-xs tracking-widest status-published border px-2 py-0.5">
                    IEEE PUBLISHED
                  </span>
                </div>
                <h3 className="font-bold leading-snug" style={{ color: "#fff" }}>{pub.title}</h3>
                <p className="text-xs" style={{ color: "rgba(245,230,200,0.72)" }}>{pub.venue}</p>
                <p
                  className="text-xs px-3 py-2"
                  style={{
                    border: "1px solid rgba(255,215,0,0.2)",
                    color: "var(--iron-gold)",
                    background: "rgba(255,215,0,0.04)",
                  }}
                >
                  {pub.highlight}
                </p>
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs tracking-widest transition-all duration-200"
                  style={{ color: "var(--iron-red)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.textShadow = "0 0 8px var(--iron-red)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.textShadow = "none"; }}
                >
                  DOI: {pub.doi} →
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
