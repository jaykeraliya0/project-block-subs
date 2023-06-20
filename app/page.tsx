import FAQs from "@/components/FAQs";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
      <FAQs />
      <Footer />
    </div>
  );
}
