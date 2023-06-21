import FAQs from "@/components/FAQs";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll scroll-smooth">
      <Hero />
      <Features />
      <section id="pricing">
        <Pricing />
      </section>
      <FAQs />
      <Footer />
    </div>
  );
}
