import Hero from "@/components/sections/Hero";
import WhoIsHeldee from "@/components/sections/WhoIsHeldee";
import WhatIBuild from "@/components/sections/WhatIBuild";
import Work from "@/components/sections/Work";
import Featured from "@/components/sections/Featured";
import Skills from "@/components/sections/Skills";
import Workbench from "@/components/sections/Workbench";
import Pricing from "@/components/sections/Pricing";
import Estimator from "@/components/sections/Estimator";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="font-body">
      <Hero />
      <WhoIsHeldee />
      <WhatIBuild />
      <Work />
      <Featured />
      <Skills />
      <Workbench />
      <Pricing />
      <Estimator />
      <Process />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
