import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { CaseStudies } from "@/components/sections/case-studies";
import { WorkBand } from "@/components/sections/work-band";
import { Marquee } from "@/components/sections/marquee";
import { AcademicProjects } from "@/components/sections/academic-projects";
import { Skills } from "@/components/sections/skills";
import { Certifications } from "@/components/sections/certifications";
import { Honors } from "@/components/sections/honors";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { BackToTop } from "@/components/ui/back-to-top";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <WorkBand>
          <Marquee />
          <CaseStudies />
        </WorkBand>
        <AcademicProjects />
        <Skills />
        <Certifications />
        <Honors />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
