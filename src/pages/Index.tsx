import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-sobitas-black">
      <Navigation />
      <Hero />
      <ProductShowcase />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
