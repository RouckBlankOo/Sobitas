import Hero from "../components/Hero";
import Features from "../components/Features";
import ProductShowcase from "../components/ProductShowcase";
import FAQ from "../components/FAQ";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    <div>
      <Navigation />
      <Hero />
      <Features />
      <ProductShowcase />
      <FAQ />
    </div>
  );
};

export default Index;
