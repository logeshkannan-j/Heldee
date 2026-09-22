import Hero from "@/components/sections/Hero";
import WhoIsHeldee from "@/components/sections/WhoIsHeldee";
import Featured from "@/components/sections/Featured";
import Skills from "@/components/sections/Skills";
import Workbench from "@/components/sections/Workbench";
import Estimator from "@/components/sections/Estimator";
import Process from "@/components/sections/Process";
import Footer from "@/components/sections/Footer";

// Work, Services, Pricing, About and Contact are now their own dedicated
// pages (see src/pages/WorkPage.tsx etc. and the routes in main.tsx),
// linked from the nav. The homepage stays as a shorter introduction.
export default function Home() {
  return (
    <main className="font-body">
      <Hero />
      <WhoIsHeldee />
      <Featured />
      <Skills />
      <Workbench />
      <Estimator />
      <Process />
      <Footer />
    </main>
  );
}
