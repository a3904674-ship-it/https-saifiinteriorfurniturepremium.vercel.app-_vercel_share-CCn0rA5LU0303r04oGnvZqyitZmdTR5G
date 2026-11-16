import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import BeforeAfter from "./components/BeforeAfter";
import Showcase from "./components/Showcase";
import Process from "./components/Process";
import About from "./components/About";
import Areas from "./components/Areas";
import Quote from "./components/Quote";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import Cursor from "./components/Cursor";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain min-h-screen bg-cream font-sans text-espresso antialiased">
        {/* Skip link for keyboard users */}
        <a
          href="#services"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-[2px] focus:bg-espresso focus:px-5 focus:py-3 focus:text-[12px] focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-cream"
        >
          Skip to content
        </a>

        <Cursor />
        <Nav />

        <main>
          <Hero />
          <TrustStrip />
          <Services />
          <Gallery />
          <BeforeAfter />
          <Showcase />
          <Process />
          <About />
          <Areas />
          <Quote />
        </main>

        <Footer />
        <FloatingCTA />
      </div>
    </MotionConfig>
  );
}
