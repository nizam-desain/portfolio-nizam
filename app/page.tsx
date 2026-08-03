import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Leadership } from "@/components/sections/leadership";
import { Tools } from "@/components/sections/tools";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { CommandPalette } from "@/components/sections/command-palette";
import { CursorGlow } from "@/components/sections/cursor-glow";
import { LoadingScreen } from "@/components/sections/loading-screen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Leadership />
        <Tools />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
