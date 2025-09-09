import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, Search } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedMain, setExpandedMain] = useState<string | null>(null);

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

  const products = [
    {
      id: 1,
      name: "Whey Protein Isolate",
      category: "protein",
      price: "299DT",
      originalPrice: "249DT",
      rating: 4.8,
      reviews: 127,
      image: "/api/placeholder/300/300",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Pre-Workout Extreme",
      category: "preworkout",
      price: "89DT",
      originalPrice: "119DT",
      rating: 4.9,
      reviews: 89,
      image: "/api/placeholder/300/300",
      badge: "New",
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
    const parsePrice = (p: string) =>
      parseFloat(p.replace(/[^0-9.]/g, "")) || 0;
    if (sortOption === "price-asc")
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sortOption === "price-desc")
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos <span className="text-gradient">Produits</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de suppléments premium et
            d'équipements de fitness conçus pour maximiser vos performances.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="hidden lg:block lg:col-span-3">
            <aside className="bg-white rounded-lg p-4 shadow-sm sticky top-24 min-h-[360px]">
              <div className="flex flex-col gap-2">
                {sidebarCategories.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => {
                      if (!c.sub) {
                        setSelectedCategory(c.value);
                        setExpandedMain(null);
                      } else {
                        setExpandedMain(
                          expandedMain === c.value ? null : c.value
                        );
                      }
                    }}
                    className={`text-left w-full px-3 py-2 rounded-md font-semibold transition-smooth text-sm whitespace-nowrap ${
                      c.sub ? "uppercase text-red-600" : "text-red-600"
                    } ${
                      expandedMain === c.value ? "bg-red-50" : "hover:bg-red-50"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </aside>
          </div>

          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-lg p-4 shadow-sm sticky top-24 min-h-[360px]">
              {expandedMain ? (
                (() => {
                  const group = sidebarCategories.find(
                    (g) => g.value === expandedMain
                  );
                  if (!group || !group.sub)
                    return (
                      <div className="text-sm text-gray-500 p-4">
                        Aucune sous-catégorie.
                      </div>
                    );
                  return (
                    <div>
                      <h4 className="text-sm font-bold text-gray-700 mb-2">
                        {group.name}
                      </h4>
                      <div className="flex flex-col gap-2">
                        {group.sub.map((s) => (
                          <button
                            key={s.value}
                            onClick={() => setSelectedCategory(s.value)}
                            className={`text-left px-3 py-2 rounded-md text-sm transition-smooth ${
                              selectedCategory === s.value
                                ? "bg-red-600 text-white"
                                : "text-gray-600 hover:text-red-600"
                            }`}
                          >
                            {s.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="flex items-center justify-center p-4 text-sm text-gray-500">
                  Sélectionnez une catégorie à gauche pour voir les
                  sous-catégories.
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 w-full md:w-1/2">
                <label htmlFor="product-search" className="sr-only">
                  Rechercher
                </label>
                <div className="relative w-full">
                  <Search className="absolute left-3 top-3 text-gray-400" />
                  <input
                    id="product-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Chercher un produit, ex: whey..."
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-sm text-gray-600">
                  Trier :
                </label>
                <select
                  id="sort"
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
                  className="px-3 py-2 rounded-md border border-gray-200 bg-white"
                >
                  <option value="relevance">Pertinence</option>
                  <option value="price-asc">Prix: du moins au plus</option>
                  <option value="price-desc">Prix: du plus au moins</option>
                  <option value="rating">Meilleures notes</option>
                </select>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                    setSortOption("relevance");
                  }}
                  className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-700"
                >
                  Réinitialiser
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
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
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Button className="bg-red-600 text-white">
                          Ajouter au panier
                        </Button>
                      </div>
                      <div className="text-sm text-gray-600">
                        {product.originalPrice && (
                          <span className="line-through mr-2">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {displayedProducts.length === 0 && (
              <div className="mt-8 text-center text-gray-500">
                Aucun produit trouvé pour cette sélection.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Products;
