import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, Search } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";
import { useNavigate } from "react-router-dom";

const Products = () => {
  // All hooks at the top level
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedMain, setExpandedMain] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<
    "relevance" | "price-asc" | "price-desc" | "rating"
  >("relevance");

  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
        { name: "Whey", value: "whey" },
        { name: "Isolate", value: "isolate" },
        { name: "Caséine", value: "casein" },
      ],
    },
  ];

  const filteredProducts = (() => {
    if (selectedCategory === "all") return products;
    if (selectedCategory === "best-seller")
      return products.filter((p) => p.isBestSeller);
    if (selectedCategory === "new")
      return products.filter((p) => p.isNewProduct || p.isBestSeller);
    return products.filter((product) =>
      typeof product.category === "string"
        ? product.category === selectedCategory
        : product.category?.slug === selectedCategory
    );
  })();

  const displayedProducts = useMemo(() => {
    let list = [...filteredProducts];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.designation.toLowerCase().includes(q)
      );
    }
    if (sortOption === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortOption === "price-desc")
      list.sort((a, b) => b.price - a.price);
    else if (sortOption === "rating")
      list.sort((a, b) => (b.aggregateRating || 0) - (a.aggregateRating || 0));
    return list;
  }, [filteredProducts, searchQuery, sortOption]);

  // Handle cart addition with proper type conversion
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.title,
      image: product.mainImage?.url || "/placeholder.svg",
      price: product.price,
    });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement des produits...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-xl text-red-600">Erreur: {error}</div>
      </div>
    );
  }

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
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-red-600 to-black text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Tous les produits
            </button>
            {sidebarCategories.map((category) => (
              <div key={category.value} className="relative">
                <button
                  onClick={() => {
                    if (category.sub) {
                      setExpandedMain(
                        expandedMain === category.value ? null : category.value
                      );
                    } else {
                      setSelectedCategory(category.value);
                    }
                  }}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.value ||
                    category.sub?.some((sub) => sub.value === selectedCategory)
                      ? "bg-gradient-to-r from-red-600 to-black text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {category.name}
                </button>
                {category.sub && expandedMain === category.value && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-10 min-w-[200px]"
                  >
                    {category.sub.map((subCategory) => (
                      <button
                        key={subCategory.value}
                        onClick={() => {
                          setSelectedCategory(subCategory.value);
                          setExpandedMain(null);
                        }}
                        className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                          selectedCategory === subCategory.value
                            ? "bg-red-50 text-red-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {subCategory.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="relevance">Pertinence</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden group cursor-pointer">
                <CardHeader className="p-0 relative">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.mainImage?.url || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                  </div>
                  {product.oldPrice && product.oldPrice > product.price && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                      -
                      {Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100
                      )}
                      %
                    </Badge>
                  )}
                  {product.isNewProduct && (
                    <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                      Nouveau
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="p-6 flex flex-col justify-between flex-grow">
                  <div className="mb-4">
                    <h3
                      className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.aggregateRating || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.aggregateRating?.toFixed(1) || "0.0"})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-600">
                        {product.price} {product.currency}
                      </span>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">
                          {product.oldPrice} {product.currency}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    className={`w-full ${
                      product.quantity === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900"
                    } text-white`}
                    disabled={product.quantity === 0}
                    onClick={() => {
                      if (product.quantity > 0) {
                        handleAddToCart(product);
                      }
                    }}
                  >
                    {product.quantity === 0
                      ? "Indisponible"
                      : "Ajouter au panier"}
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
