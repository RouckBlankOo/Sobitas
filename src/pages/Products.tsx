import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, Search } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useCart } from "../hooks/useCart";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedMain, setExpandedMain] = useState<string | null>(null);
  const { addToCart } = useCart();

  const sidebarCategories = [
    { name: "Meilleures Ventes", value: "best-seller" },
    { name: "Nouveau", value: "new" },
    {
      name: "COMPLÉMENTS ALIMENTAIRES",
      value: "dietary",
      sub: [
        { name: "Acides Aminés", value: "dietary-acids" },
        { name: "BCAA", value: "bcaa" },
        { name: "Citrulline", value: "citrulline" },
        { name: "Créatine", value: "creatine" },
      ],
    },
    {
      name: "PROTÉINES",
      value: "proteins",
      sub: [
        { name: "Protéine Whey", value: "protein" },
        { name: "Isolat De Whey", value: "protein" },
      ],
    },
    {
      name: "COMPLÉMENTS D'ENTRAINEMENT",
      value: "training",
      sub: [
        { name: "Pré-Workout", value: "preworkout" },
        { name: "Pendant L'entraînement", value: "intra" },
      ],
    },
    {
      name: "ÉQUIPEMENTS ET ACCESSOIRES SPORTIFS",
      value: "equipment",
      sub: [
        { name: "Matériel De Musculation", value: "equipment" },
        { name: "Shakers Et Bouteilles", value: "equipment" },
      ],
    },
  ];

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const products = [
    {
      id: 1,
      name: "Whey Protein Isolate",
      category: "protein",
      price: 299,
      originalPrice: 349,
      rating: 4.8,
      reviews: 127,
      image: "/src/assets/protein.jpg",
      badge: "Best Seller",
      stock: 25,
    },
    {
      id: 2,
      name: "Pre-Workout Extreme",
      category: "preworkout",
      price: 89,
      originalPrice: 119,
      rating: 4.9,
      reviews: 89,
      image: "/src/assets/pre-workout.webp",
      badge: "New",
      stock: 12,
    },
    {
      id: 3,
      name: "BCAA Energy Boost",
      category: "bcaa",
      price: 65,
      originalPrice: 85,
      rating: 4.7,
      reviews: 203,
      image: "/api/placeholder/300/300",
      badge: "",
      stock: 8,
    },
    {
      id: 4,
      name: "Créatine Monohydrate",
      category: "creatine",
      price: 45,
      originalPrice: 60,
      rating: 4.6,
      reviews: 156,
      image: "/api/placeholder/300/300",
      badge: "",
      stock: 35,
    },
    {
      id: 5,
      name: "Haltères Ajustables",
      category: "equipment",
      price: 180,
      originalPrice: 220,
      rating: 4.5,
      reviews: 87,
      image: "/src/assets/gym-equipment.jpg",
      badge: "",
      stock: 3,
    },
    {
      id: 6,
      name: "Shaker Premium",
      category: "equipment",
      price: 25,
      originalPrice: 35,
      rating: 4.4,
      reviews: 294,
      image: "/api/placeholder/300/300",
      badge: "",
      stock: 50,
    },
  ];

  const filteredProducts = (() => {
    if (selectedCategory === "all") return products;
    if (selectedCategory === "best-seller")
      return products.filter(
        (p) => p.badge && p.badge.toLowerCase().includes("best")
      );
    if (selectedCategory === "new")
      return products.filter((p) => p.badge === "New");
    return products.filter((product) => product.category === selectedCategory);
  })();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<
    "relevance" | "price-asc" | "price-desc" | "rating"
  >("relevance");

  const displayedProducts = useMemo(() => {
    let list = filteredProducts.slice();
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sortOption === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortOption === "price-desc")
      list.sort((a, b) => b.price - a.price);
    else if (sortOption === "rating")
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list;
  }, [filteredProducts, searchQuery, sortOption]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-20"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[99%] 2xl:max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos <span className="text-gradient">Produits</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto">
            Découvrez notre gamme complète de suppléments premium et
            d'équipements de fitness conçus pour maximiser vos performances.
          </p>
        </motion.div>

        {/* Horizontal Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setExpandedMain(null);
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 shadow-md"
              }`}
            >
              Tous les produits
            </button>
            {sidebarCategories.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  if (!c.sub) {
                    setSelectedCategory(c.value);
                    setExpandedMain(null);
                  } else {
                    setExpandedMain(expandedMain === c.value ? null : c.value);
                  }
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  expandedMain === c.value || selectedCategory === c.value
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 shadow-md"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Sub-categories horizontal scroll */}
          {expandedMain && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-wrap justify-center gap-2 mb-4"
            >
              {(() => {
                const group = sidebarCategories.find(
                  (g) => g.value === expandedMain
                );
                if (!group || !group.sub) return null;
                return group.sub.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSelectedCategory(s.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === s.value
                        ? "bg-red-100 text-red-700 border-2 border-red-300"
                        : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    {s.name}
                  </button>
                ));
              })()}
            </motion.div>
          )}
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 w-full lg:w-1/2">
            <div className="relative w-full">
              <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              <input
                id="product-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher vos produits favoris..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 text-base transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(
                  e.target.value as
                    | "relevance"
                    | "price-asc"
                    | "price-desc"
                    | "rating"
                )
              }
              className="px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-red-400 text-base"
            >
              <option value="relevance">Tendances</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
            </select>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setSortOption("relevance");
              }}
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Products Grid - Masonry Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6">
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white rounded-2xl overflow-hidden border-0 shadow-lg">
                <CardHeader className="relative p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-all duration-700"
                    />
                    {product.badge && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-3 py-1 rounded-full text-xs">
                        {product.badge}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors leading-tight">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
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
                      <span className="text-sm text-gray-500 font-medium">
                        {product.reviews} avis
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        product.stock > 10
                          ? "bg-green-500"
                          : product.stock > 0
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm text-gray-600 font-medium">
                      {product.stock > 10
                        ? "En stock"
                        : product.stock > 0
                        ? `Plus que ${product.stock}`
                        : "Épuisé"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-red-600">
                        {product.price} TND
                      </span>
                      {product.originalPrice &&
                        product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice} TND
                          </span>
                        )}
                    </div>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <div className="inline-block bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                          -
                          {Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100
                          )}
                          %
                        </div>
                      )}
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={product.stock === 0}
                    onClick={() => {
                      if (product.stock > 0) {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          originalPrice: product.originalPrice,
                        });
                      }
                    }}
                  >
                    {product.stock === 0 ? "Indisponible" : "Ajouter au panier"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {displayedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="flex justify-center mb-6">
              <img
                src="/src/assets/research.png"
                alt="Aucun produit trouvé"
                className="w-24 h-24 opacity-60"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Products;
