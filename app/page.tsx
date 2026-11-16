import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { CaseStudies } from "@/components/sections/case-studies";
import { AcademicProjects } from "@/components/sections/academic-projects";
import { Skills } from "@/components/sections/skills";
import { Certifications } from "@/components/sections/certifications";
import { Honors } from "@/components/sections/honors";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Thread } from "@/components/ui/thread";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* The thread is measured against this box: it starts in the hero and ends at the contact section. */}
      <div className="relative">
        <Thread />
        <main id="main">
          <Hero />
          <About />
          <Experience />
          <CaseStudies />
          <AcademicProjects />
          <Skills />
          <Certifications />
          <Honors />
          <Education />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
