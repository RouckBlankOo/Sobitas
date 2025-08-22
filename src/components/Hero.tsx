import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-sobitas-black/90 to-sobitas-black/70" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Suppléments</span>
            <br />
            <span className="text-foreground">Premium</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Alimentez votre parcours fitness avec des suppléments et équipements de qualité professionnelle conçus pour les champions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="gradient-primary text-white font-semibold px-8 py-4 text-lg hover:shadow-glow transition-smooth animate-glow"
            >
              Explorer les Produits
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-sobitas-red text-sobitas-red hover:bg-sobitas-red hover:text-white px-8 py-4 text-lg transition-smooth"
            >
              En Savoir Plus
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-sobitas-red/20 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-sobitas-red/10 rounded-full animate-pulse hidden lg:block" />
    </section>
  );
};

export default Hero;