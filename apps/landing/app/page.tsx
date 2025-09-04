import { Navbar } from "@/components/Navbar";
import { FeaturesDiagram } from "@/components/FeaturesDiagram";
import { Overview, Vision, Pillars } from "@/components/ContentSections";
import { CallToAction } from "@/components/CallToAction";
import { IntegrationsCarousel } from "@/components/IntegrationsCarousel";
import { Evolution } from "@/components/Evolution";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <main className="font-sans">
      <Navbar />
      <Reveal delayMs={100}><FeaturesDiagram /></Reveal>
      <Reveal delayMs={300}><IntegrationsCarousel /></Reveal>
      <Reveal delayMs={400}><Evolution /></Reveal>
      <Reveal delayMs={200}><Pillars /></Reveal>
      <Reveal delayMs={500}><CallToAction /></Reveal>
      <Footer />
    </main>
  );
}
