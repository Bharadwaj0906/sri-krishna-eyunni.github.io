"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { personal } from "@/data/portfolio";
import ArcReactor from "./ArcReactor";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const links = [
    { label: "EMAIL",    value: personal.email,       href: `mailto:${personal.email}` },
    { label: "LINKEDIN", value: "bharadwaj-eyunni",   href: personal.linkedin           },
    { label: "GITHUB",   value: "Bharadwaj0906",      href: personal.github             },
    { label: "PHONE",    value: personal.phone,       href: `tel:${personal.phone}`     },
  ];

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(232,0,13,0.06) 0%, rgba(255,215,0,0.03) 40%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-8 h-px" style={{ background: "var(--iron-red)" }} />
          <span className="text-sm tracking-[0.4em]" style={{ color: "var(--iron-red)" }}>
            05 // COMM LINK
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(232,0,13,0.15)" }} />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <ArcReactor size={110} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl font-black mb-4"
          style={{ color: "#fff" }}
        >
          INITIATE{" "}
          <span className="glow-red" style={{ color: "var(--iron-red)" }}>CONTACT</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm mb-12"
          style={{ color: "rgba(245,230,200,0.45)" }}
        >
          Open to research collaborations, internship opportunities, and full-time roles in AI/ML.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.5 }}
          className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== "PHONE" && link.label !== "EMAIL" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -2, boxShadow: "0 0 20px rgba(255,215,0,0.2)" }}
              className="hud-panel p-5 text-left transition-all duration-200"
            >
              <div className="text-xs tracking-[0.3em] mb-1" style={{ color: "var(--iron-red)" }}>
                {link.label}
              </div>
              <div className="text-sm font-medium" style={{ color: "rgba(245,230,200,0.8)" }}>
                {link.value}
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
          className="mt-20 pt-8"
          style={{ borderTop: "1px solid rgba(255,215,0,0.1)" }}
        >
          <p className="text-xs tracking-widest" style={{ color: "rgba(245,230,200,0.2)" }}>
            J.A.R.V.I.S. INTERFACE v1.0 — {personal.name.toUpperCase()} © 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
