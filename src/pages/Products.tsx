import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, Filter, Search } from "lucide-react";
import { useState } from "react";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "Tous les Produits" },
    { value: "protein", label: "Protéines" },
    { value: "preworkout", label: "Pré-Entraînements" },
    { value: "creatine", label: "Créatine" },
    { value: "equipment", label: "Équipements" },
  ];

  const products = [
    {
      id: 1,
      name: "Whey Protein Isolate",
      category: "protein",
      price: "49.99€",
      originalPrice: "59.99€",
      rating: 4.8,
      reviews: 127,
      image: "/api/placeholder/300/300",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Pre-Workout Extreme",
      category: "preworkout",
      price: "39.99€",
      originalPrice: "49.99€",
      rating: 4.9,
      reviews: 89,
      image: "/api/placeholder/300/300",
      badge: "New",
    },
    // Add more products as needed
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos <span className="text-gradient">Produits</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de suppléments premium et
            d'équipements de fitness conçus pour maximiser vos performances.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Filtrer par:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
                selectedCategory === category.value
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-red-600 hover:text-red-600"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-smooth card-hover"
            >
              <CardHeader className="relative p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-smooth"
                  />
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 gradient-primary text-white font-semibold">
                      {product.badge}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-smooth">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-red-600">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                <Button className="w-full btn-primary">
                  Ajouter au Panier
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de changer votre filtre ou revenez plus tard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
