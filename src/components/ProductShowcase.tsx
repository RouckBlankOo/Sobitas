import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import proteinPowder from "@/assets/protein.jpg";
import preWorkout from "@/assets/pre-workout.webp";
import gymEquipment from "@/assets/Materiel.webp";

const products = [
  {
    id: 1,
    name: "Protéine Whey Premium",
    description:
      "Isolat de protéine whey de haute qualité pour une croissance musculaire et récupération maximales.",
    price: "49,99€",
    originalPrice: "59,99€",
    image: proteinPowder,
    badge: "Meilleure Vente",
    features: ["25g Protéine", "Absorption Rapide", "Excellent Goût"],
  },
  {
    id: 2,
    name: "Pré-Entraînement Extrême",
    description:
      "Formule d'énergie et de concentration maximales pour surmonter vos entraînements les plus difficiles.",
    price: "39,99€",
    originalPrice: "49,99€",
    image: preWorkout,
    badge: "Nouveau",
    features: ["300mg Caféine", "Zéro Chute", "Formule Pump"],
  },
  {
    id: 3,
    name: "Équipement Professionnel",
    description:
      "Équipement différent de fitness de qualité commerciale conçu pour durer avec des matériaux premium.",
    price: "299,99€",
    originalPrice: "399,99€",
    image: gymEquipment,
    badge: "Limité",
    features: [
      "Ultra Résistant",
      "prix imbattables",
      "Garantie ",
      "Qualité Pro",
    ],
  },
];

const ProductShowcase = () => {
  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-b from-sobitas-black to-sobitas-charcoal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Produits</span>
            <span className="text-foreground"> Vedettes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre collection premium de suppléments et équipements
            conçus pour élever vos performances
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-card/50 backdrop-blur-sm border-sobitas-charcoal hover:border-sobitas-red transition-smooth shadow-card hover:shadow-glow animate-scale-in group"
            >
              <CardHeader className="relative p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-70 object-cover group-hover:scale-110 transition-smooth"
                  />
                  <Badge className="absolute top-4 left-4 gradient-primary text-white font-semibold">
                    {product.badge}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <CardTitle className="text-xl text-foreground mb-2">
                  {product.name}
                </CardTitle>

                <CardDescription className="text-muted-foreground mb-4">
                  {product.description}
                </CardDescription>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-sobitas-charcoal text-sobitas-red border-sobitas-red/20"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-sobitas-red">
                    {product.price}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                </div>

                <Button className="w-full gradient-primary text-white font-semibold hover:shadow-glow transition-smooth">
                  Ajouter au Panier
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="border-sobitas-red text-sobitas-red hover:bg-sobitas-red hover:text-white px-8 py-4 text-lg transition-smooth"
          >
            Voir Tous les Produits
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
