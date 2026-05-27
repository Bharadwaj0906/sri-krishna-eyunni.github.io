"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "SYSTEM",     href: "#hero"       },
  { label: "PROFILE",    href: "#about"      },
  { label: "SKILLS",     href: "#skills"     },
  { label: "PROJECTS",   href: "#projects"   },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT",    href: "#contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("SYSTEM");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(navLinks[i].label);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
        style={{
          background: scrolled || menuOpen ? "rgba(5,3,8,0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,215,0,0.15)" : "none",
          backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="arc-reactor rounded-full" style={{
              width: 24, height: 24,
              background: "radial-gradient(circle, rgba(255,215,0,0.95) 0%, rgba(232,0,13,0.7) 60%, transparent 100%)",
            }} />
            <span className="font-bold tracking-widest text-xs glow-gold" style={{ color: "var(--iron-gold)" }}>
              J.A.R.V.I.S.
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                className="text-xs tracking-widest transition-all duration-300 relative"
                style={{ color: active === link.label ? "var(--iron-gold)" : "rgba(245,230,200,0.45)" }}>
                {link.label}
                <span className="absolute -bottom-1 left-0 right-0 h-px transition-all duration-300" style={{
                  background: "linear-gradient(90deg, var(--iron-red), var(--iron-gold))",
                  transform: active === link.label ? "scaleX(1)" : "scaleX(0)",
                  boxShadow: "0 0 8px var(--iron-gold)",
                }} />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 8px #00ff88" }} />
              <span className="text-xs tracking-widest" style={{ color: "#00ff88" }}>ONLINE</span>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                className="block w-6 h-0.5" style={{ background: "var(--iron-gold)" }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block w-6 h-0.5" style={{ background: "var(--iron-gold)" }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                className="block w-6 h-0.5" style={{ background: "var(--iron-gold)" }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{
              background: "rgba(5,3,8,0.97)",
              borderBottom: "1px solid rgba(201,168,76,0.2)",
              backdropFilter: "blur(20px)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-6 py-4 border-b text-xs tracking-widest"
                style={{
                  borderColor: "rgba(201,168,76,0.08)",
                  color: active === link.label ? "var(--iron-gold)" : "rgba(245,230,200,0.6)",
                }}
              >
                {link.label}
                {active === link.label && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--iron-gold)", boxShadow: "0 0 6px var(--iron-gold)" }} />
                )}
              </motion.a>
            ))}
            <div className="flex items-center gap-2 px-6 py-4">
              <div className="w-2 h-2 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 8px #00ff88" }} />
              <span className="text-xs tracking-widest" style={{ color: "#00ff88" }}>ONLINE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
