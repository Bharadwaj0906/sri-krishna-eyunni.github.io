import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsSection from "@/skills/SkillsSection";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <main style={{ position: "relative" }}>
      <ParticleBackground />
      <div style={{ position: "relative", zIndex: 1, isolation: "isolate" }}>
        <Navbar />
        <Hero />
        <About />
        <SkillsSection />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}
