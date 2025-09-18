import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../hooks/useCart";
import proteinPowder from "@/assets/protein.jpg";
import preWorkout from "@/assets/pre-workout.webp";
import gymEquipment from "@/assets/Materiel.webp";
import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    title: "Protéine Whey Premium",
    description:
      "Isolat de protéine whey de haute qualité pour une croissance musculaire et récupération maximales.",
    price: 259,
    oldPrice: 299,
    mainImage: { url: proteinPowder },
    slug: "proteine-whey-premium",
    _id: "1",
    designation: "Protéine Whey Premium",
    type: "supplement",
    quantity: 10,
    qte: 10,
    features: ["25g Protéine", "Absorption Rapide", "Excellent Goût"],
    status: true,
    rupture: "",
    zone1: "",
    zone2: "",
    zone3: "",
    zone4: "",
    content_seo: "",
    meta: "",
    aroma_ids: [],
    discountedPrice: 259,
    currency: "DT",
    reviews: [],
  },
  {
    id: 2,
    title: "Pré-Entraînement Extrême",
    description:
      "Formule d'énergie et de concentration maximales pour surmonter vos entraînements les plus difficiles.",
    price: 89,
    oldPrice: 119,
    mainImage: { url: preWorkout },
    isNewProduct: true,
    features: ["300mg Caféine Par Scoop", "Zéro Chute", "Formule Pump"],
    _id: "2",
    designation: "Pré-Entraînement Extrême",
    slug: "pre-entrainement-extreme",
    type: "supplement",
    quantity: 8,
    qte: 8,
    status: true,
    rupture: "",
    zone1: "",
    zone2: "",
    zone3: "",
    zone4: "",
    content_seo: "",
    meta: "",
    aroma_ids: [],
    discountedPrice: 89,
    currency: "DT",
    reviews: [],
  },
  {
    id: 3,
    title: "Équipement Professionnel",
    description:
      "Équipement différent de fitness de qualité commerciale conçu pour durer avec des matériaux premium.",
    price: 1499,
    oldPrice: 1899,
    mainImage: { url: gymEquipment },
    features: [
      "Ultra Résistant",
      "prix imbattables",
      "Garantie",
      "Qualité Pro",
    ],
    _id: "3",
    designation: "Équipement Professionnel",
    slug: "equipement-professionnel",
    type: "equipment",
    quantity: 2,
    qte: 2,
    status: true,
    rupture: "",
    zone1: "",
    zone2: "",
    zone3: "",
    zone4: "",
    content_seo: "",
    meta: "",
    aroma_ids: [],
    discountedPrice: 1499,
    currency: "DT",
    reviews: [],
  },
];

const ProductShowcase = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.mainImage?.url,
      originalPrice: product.oldPrice,
    };
    addToCart(cartItem);
  };

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <section id="products" className="py-20 bg-white">
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
              className="bg-card backdrop-blur-sm border-border hover:border-primary transition-smooth shadow-card hover:shadow-glow animate-scale-in group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <CardHeader className="relative p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.mainImage?.url}
                    alt={product.title}
                    className="w-full h-70 object-cover group-hover:scale-110 transition-smooth"
                  />
                  <Badge className="absolute top-4 left-4 gradient-primary text-white font-semibold">
                    {(product.isBestSeller && "Meilleure Vente") ||
                      (product.isNewProduct && "Nouveau")}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <CardTitle className="text-xl text-foreground mb-2">
                  {product.title}
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
                      className="bg-secondary text-primary border-primary/20"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {product.price}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {product.oldPrice}
                  </span>
                </div>

                <Button
                  className="w-full gradient-primary text-white font-semibold hover:shadow-glow transition-smooth"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
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
            className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg transition-smooth"
          >
            <Link to="/products">Voir Tous les Produits</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
