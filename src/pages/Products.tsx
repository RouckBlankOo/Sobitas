/*import { Badge } from "@/components/ui/badge";
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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedMain, setExpandedMain] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { products, loading, error, fetchProductsByCategory } = useProducts();
  const navigate = useNavigate();

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

  const filteredProducts = (() => {
    if (selectedCategory === "all") return products;
    if (selectedCategory === "best-seller")
      return products.filter((p) => p.isBestSeller);
    if (selectedCategory === "new")
      return products.filter((p) => p.isNewProduct || p.isBestSeller);
    return products.filter((product) => 
      typeof product.category === 'string' 
        ? product.category === selectedCategory
        : product.category?.slug === selectedCategory
    );
  })();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<
    "relevance" | "price-asc" | "price-desc" | "rating"
  >("relevance");
    {
      id: 2,
      title: "BCAA 2:1:1",
      category: "dietary",
      price: 35,
      oldPrice: 50,
      mainImage: { url: "/api/placeholder/300/300" },
      inStock: true,
      _id: "2",
      designation: "BCAA 2:1:1",
      slug: "bcaa-211",
      type: "amino-acid",
      quantity: 0,
      qte: 0,
      status: true,
      rupture: "",
      zone1: "",
      zone2: "",
      zone3: "",
      zone4: "",
      content_seo: "",
      meta: "",
      aroma_ids: [],
      discountedPrice: 35,
      currency: "EUR",
    },
    {
      id: 3,
      title: "Citrulline Malate",
      category: "dietary",
      price: 40,
      oldPrice: 55,
      aggregateRating: 4.8,
      reviews: [],
      mainImage: { url: "/api/placeholder/300/300" },
      inStock: true,
      _id: "3",
      designation: "Citrulline Malate",
      slug: "citrulline-malate",
      type: "amino-acid",
      quantity: 10,
      qte: 10,
      status: true,
      rupture: "",
      zone1: "",
      zone2: "",
      zone3: "",
      zone4: "",
      content_seo: "",
      meta: "",
      aroma_ids: [],
      discountedPrice: 40,
      currency: "EUR",
    },
    {
      id: 4,
      title: "Créatine Monohydrate",
      category: "supplement",
      price: 45,
      oldPrice: 60,
      aggregateRating: 4.6,
      reviews: [],
      mainImage: { url: "/api/placeholder/300/300" },
      inStock: true,
      _id: "4",
      designation: "Créatine Monohydrate",
      slug: "creatine-monohydrate",
      type: "supplement",
      quantity: 35,
      qte: 35,
      status: true,
      rupture: "",
      zone1: "",
      zone2: "",
      zone3: "",
      zone4: "",
      content_seo: "",
      meta: "",
      aroma_ids: [],
      discountedPrice: 45,
      currency: "EUR",
    },
    {
      id: 5,
      title: "Haltères Ajustables",
      category: "equipment",
      price: 180,
      oldPrice: 220,
      aggregateRating: 4.5,
      reviews: [],
      mainImage: { url: "/src/assets/gym-equipment.jpg" },
      inStock: true,
      _id: "5",
      designation: "Haltères Ajustables",
      slug: "halteres-ajustables",
      type: "equipment",
      quantity: 3,
      qte: 3,
      status: true,
      rupture: "",
      zone1: "",
      zone2: "",
      zone3: "",
      zone4: "",
      content_seo: "",
      meta: "",
      aroma_ids: [],
      discountedPrice: 180,
      currency: "EUR",
    },
    {
      id: 6,
      title: "Shaker Premium",
      category: "equipment",
      price: 25,
      oldPrice: 35,
      aggregateRating: 4.4,
      reviews: [],
      mainImage: { url: "/api/placeholder/300/300" },
      inStock: true,
      _id: "6",
      designation: "Shaker Premium",
      slug: "shaker-premium",
      type: "equipment",
      quantity: 50,
      qte: 50,
      status: true,
      rupture: "",
      zone1: "",
      zone2: "",
      zone3: "",
      zone4: "",
      content_seo: "",
      meta: "",
      aroma_ids: [],
      discountedPrice: 25,
      currency: "EUR",
    },
  ];

  const filteredProducts = (() => {
    if (selectedCategory === "all") return products;
    if (selectedCategory === "best-seller")
      return products.filter((p) => p.isBestSeller);
    if (selectedCategory === "new")
      return products.filter((p) => p.isBestSeller); // Fallback to isBestSeller
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
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (sortOption === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortOption === "price-desc")
      list.sort((a, b) => b.price - a.price);
    else if (sortOption === "rating")
      list.sort((a, b) => (b.aggregateRating || 0) - (a.aggregateRating || 0));
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

        {/* Horizontal Category Tabs 
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

          {/* Sub-categories horizontal scroll 
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

        {/* Search and Filter Controls 
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

        {/* Products Grid - Masonry Style 
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
                      src={product.mainImage?.url}
                      alt={product.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-all duration-700"
                    />
                    {/* Only show badge for Best Seller 
                    {product.isBestSeller && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-3 py-1 rounded-full text-xs">
                        Best Seller
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors leading-tight">
                      {product.title}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.aggregateRating || 0)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 font-medium">
                        {product.reviews?.length ?? 0} avis
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        product.quantity > 10
                          ? "bg-green-500"
                          : product.quantity > 0
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm text-gray-600 font-medium">
                      {product.quantity > 10
                        ? "En stock"
                        : product.quantity > 0
                        ? `Plus que ${product.quantity}`
                        : "Épuisé"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-red-600">
                        {product.price} TND
                      </span>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.oldPrice} TND
                        </span>
                      )}
                    </div>
                    {product.oldPrice && product.oldPrice > product.price && (
                      <div className="inline-block bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                        -
                        {Math.round(
                          ((product.oldPrice - product.price) /
                            product.oldPrice) *
                            100
                        )}
                        %
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={product.quantity === 0}
                    onClick={() => {
                      if (product.quantity > 0) {
                        addToCart({
                          id: product.id,
                          name: product.title,
                          price: product.price,
                          image: product.mainImage?.url,
                          originalPrice: product.oldPrice,
                        });
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
*/