import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Search, User, Eye } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CustomSelect, SelectOption } from "@/components/ui/custom-select";

// Mock blog data - you can replace this with actual data fetching
const blogPosts = [
  {
    id: 1,
    title:
      "Polysaccharides - what are they, where are they found, and what are their properties?",
    excerpt:
      "Polysaccharides are complex sugars found in food, cosmetics, and medicine. They support immunity, digestion, and skin health. Discover where they occur and how they work.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "health",
    author: "Dr. Sobitas",
    publishedDate: "2025-09-18",
    readTime: "5 min",
    views: 1250,
    image: "/src/assets/Health.jpg",
    tags: ["polysaccharides", "health", "nutrition"],
    featured: true,
  },
  {
    id: 2,
    title:
      "What helps with cough? The best home remedies for throat irritation and bothersome...",
    excerpt:
      "A cough can make life difficult - especially when you don't know how to deal with it effectively. Discover proven methods for dry and wet cough and find out when it's worth consulting a doctor.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "supplementation",
    author: "Health Expert",
    publishedDate: "2025-09-17",
    readTime: "7 min",
    views: 980,
    image: "/src/assets/Suplements.jpg",
    tags: ["cough", "remedies", "health"],
    featured: false,
  },
  {
    id: 3,
    title: "Complete Guide to Workout Nutrition",
    excerpt:
      "Learn the essential nutrients and timing strategies to maximize your workout performance and recovery.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "workout",
    author: "Fitness Coach",
    publishedDate: "2025-09-15",
    readTime: "10 min",
    views: 2100,
    image: "/src/assets/Workout.jpg",
    tags: ["workout", "nutrition", "performance"],
    featured: true,
  },
  {
    id: 4,
    title: "The Ultimate Diet Plan for Weight Loss",
    excerpt:
      "A comprehensive approach to sustainable weight loss through proper nutrition and lifestyle changes.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "diet",
    author: "Nutritionist",
    publishedDate: "2025-09-10",
    readTime: "6 min",
    views: 1500,
    image: "/src/assets/Diet.jpg",
    tags: ["diet", "weight-loss", "nutrition"],
    featured: false,
  },
  {
    id: 5,
    title: "Essential Vitamins and Minerals for Athletes",
    excerpt:
      "Discover which vitamins and minerals are crucial for athletic performance and recovery.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "vitamins",
    author: "Sports Nutritionist",
    publishedDate: "2025-09-08",
    readTime: "8 min",
    views: 890,
    image: "/src/assets/Vitamins & minerals.jpg",
    tags: ["vitamins", "minerals", "athletes"],
    featured: false,
  },
  {
    id: 6,
    title: "Healthy Eating Habits for Better Living",
    excerpt:
      "Simple yet effective healthy eating habits that can transform your lifestyle and improve your well-being.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "healthy-eating",
    author: "Wellness Expert",
    publishedDate: "2025-09-05",
    readTime: "9 min",
    views: 1320,
    image: "/src/assets/Healthy Eating.jpg",
    tags: ["healthy-eating", "lifestyle", "wellness"],
    featured: true,
  },
  {
    id: 7,
    title: "Effective Weight Loss Strategies That Actually Work",
    excerpt:
      "Evidence-based weight loss strategies that focus on sustainable results rather than quick fixes.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "weight-loss",
    author: "Weight Loss Coach",
    publishedDate: "2025-09-03",
    readTime: "12 min",
    views: 1890,
    image: "/src/assets/WeightLoss.jpg",
    tags: ["weight-loss", "strategies", "health"],
    featured: true,
  },
];

const Blog = () => {
  // All hooks at the top level
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<
    "recent" | "popular" | "alphabetical" | "rating"
  >("recent");

  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const sidebarCategories = [
    { name: "Supplementation", value: "supplementation" },
    { name: "Workout", value: "workout" },
    { name: "Health", value: "health" },
    { name: "Diet", value: "diet" },
    { name: "Weight loss", value: "weight-loss" },
    { name: "Vitamins & minerals", value: "vitamins" },
    { name: "Healthy Eating", value: "healthy-eating" },
  ];

  const sortOptions: SelectOption[] = [
    { value: "recent", label: "Plus récents" },
    { value: "popular", label: "Plus populaires" },
    { value: "alphabetical", label: "Alphabétique" },
    { value: "rating", label: "Mieux notés" },
  ];

  const filteredPosts = (() => {
    if (selectedCategory === "all") return blogPosts;
    return blogPosts.filter((post) => post.category === selectedCategory);
  })();

  const displayedPosts = useMemo(() => {
    let list = [...filteredPosts];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    if (sortOption === "popular") list.sort((a, b) => b.views - a.views);
    else if (sortOption === "alphabetical")
      list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortOption === "recent")
      list.sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
      );
    else if (sortOption === "rating") list.sort((a, b) => b.views - a.views); // Using views as rating for now
    return list;
  }, [filteredPosts, searchQuery, sortOption]);

  // Handle blog post navigation
  const handlePostClick = (postId: number) => {
    // You can navigate to a blog post detail page
    navigate(`/blog/${postId}`);
  };

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
            Blog <span className="text-gradient">Sobitas</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto">
            Découvrez nos derniers articles sur le fitness, la nutrition et les
            conseils d'entraînement pour maximiser vos performances.
          </p>
        </motion.div>

        {/* Sidebar and Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Categories */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === "all"
                      ? "bg-red-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  All Articles
                </button>
                {sidebarCategories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category.value
                        ? "bg-red-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search and Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher des articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <CustomSelect
                options={sortOptions}
                value={sortOption}
                onChange={(value) => setSortOption(value as "recent" | "popular" | "alphabetical" | "rating")}
                className="w-full sm:w-auto min-w-[200px]"
              />
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden group cursor-pointer">
                    <CardHeader className="p-0 relative">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onClick={() => handlePostClick(post.id)}
                        />
                      </div>
                      {post.featured && (
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                          Featured
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span className="font-medium text-red-600 capitalize">
                          {post.category}
                        </span>
                        <span>/</span>
                        <span>
                          {new Date(post.publishedDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <h3
                        className="font-bold text-xl mb-3 line-clamp-2 text-gray-900 cursor-pointer hover:text-red-600 transition-colors"
                        onClick={() => handlePostClick(post.id)}
                      >
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {displayedPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="flex justify-center mb-6">
                  <img
                    src="/src/assets/research.png"
                    alt="Aucun article trouvé"
                    className="w-24 h-24 opacity-60"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Aucun article trouvé
                </h3>
                <p className="text-gray-500">
                  Essayez de modifier vos critères de recherche
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
