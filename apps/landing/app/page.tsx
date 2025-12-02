import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Soon } from "@/components/Soon";

export default function LandingPage() {
  return (
    <main className="font-sans">
      <div className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="">
          <Reveal delayMs={100}>
            <Soon />
          </Reveal>
        </div>
        <Footer />
      </div>
    </main>
  );
}
