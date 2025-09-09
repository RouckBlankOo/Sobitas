import Hero from "../components/Hero";
import Features from "../components/Features";
import ProductShowcase from "../components/ProductShowcase";
import FAQ from "../components/FAQ";

const Index = () => {
  return (
    <div>
      <section id="accueil">
        <Hero />
      </section>
      <section id="a-propos">
        <Features />
      </section>
      <section id="produits">
        <ProductShowcase />
      </section>
      <section id="faq">
        <FAQ />
      </section>
    </div>
  );
};

export default Index;
