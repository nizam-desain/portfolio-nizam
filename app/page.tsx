import { Opening } from "@/components/site/opening";
import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { Experience } from "@/components/home/experience";
import { About } from "@/components/home/about";
import { Method } from "@/components/home/method";
import { Capabilities } from "@/components/home/capabilities";
import { Recognition } from "@/components/home/recognition";
import { Credentials } from "@/components/home/credentials";
import { Contact } from "@/components/home/contact";

export default function Home() {
  return (
    <>
      <Opening />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <SelectedWork />
        <Experience />
        <About />
        <Method />
        <Capabilities />
        <Recognition />
        <Credentials />
        <Contact />
      </main>
    </>
  );
}
