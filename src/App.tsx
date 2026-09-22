import Home from "@/pages/Home";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <div className="vignette" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <ScrollProgress />
      <Home />
    </>
  );
}
