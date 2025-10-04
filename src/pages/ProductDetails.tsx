import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import {
  Heart,
  Star,
  StarHalf,
  Truck,
  Shield,
  Award,
  Package,
  Info,
  CheckCircle,
  Zap,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const [activeTab, setActiveTab] = useState("overview");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show sticky nav after scrolling past the initial navigation
      setShowStickyNav(scrollY > 400);

      // Determine active section based on scroll position
      const sections = ["overview", "ingredients", "nutrition", "usage", "manufacturer"];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const elementBottom = elementTop + rect.height;
          
          // Check if section is in viewport (with some offset)
          if (scrollY >= elementTop - 200 && scrollY < elementBottom - 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) return <div>Produit introuvable.</div>;

  // Calculate average rating
  const averageRating = product.reviews?.length
    ? product.reviews.reduce((sum, review) => sum + review.stars, 0) /
      product.reviews.length
    : 4.5; // Default rating for demo

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf
            key={i}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleStickyNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Sticky Navigation Bar */}
      {showStickyNav && (
        <div className="fixed top-16 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <div className="flex space-x-1 sm:space-x-2 lg:space-x-6 overflow-x-auto py-3 sm:py-4">
                {[
                  { id: "overview", label: "Aperçu" },
                  { id: "ingredients", label: "Paramètres" },
                  { id: "nutrition", label: "Nutrition" },
                  { id: "usage", label: "Usage" },
                  { id: "manufacturer", label: "Qualité" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${
                      activeSection === tab.id
                        ? "bg-black text-white shadow-md"
                        : "text-gray-600 hover:text-blue-600 hover:bg-red-50"
                    }`}
                    onClick={(e) => handleStickyNavClick(e, tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Hero Section with Product Image and Basic Info */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.mainImage.url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto">
                {[1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md cursor-pointer border-2 border-transparent hover:border-blue-500"
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={product.mainImage.url}
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Product Name & Rating */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {renderStars(averageRating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.reviews?.length || 127} avis)
                  </span>
                </div>
                <Badge variant="secondary" className="mb-4">
                  {typeof product.category === "string"
                    ? product.category
                    : product.category?.title || "Non catégorisé"}
                </Badge>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.price}DT
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {product.oldPrice}DT
                    </span>
                  )}
                </div>
                {product.oldPrice && (
                  <Badge variant="destructive" className="text-xs">
                    Économisez {(product.oldPrice - product.price).toFixed(2)}DT
                  </Badge>
                )}
              </div>

              {/* Key Benefits */}
              <div className="bg-gradient-to-r from-red-50 to-red-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Package className="w-8 h-8 mx-auto text-red-600 mb-2" />
                    <div className="text-lg font-bold text-gray-900">90</div>
                    <div className="text-xs text-gray-600">Comprimés</div>
                    <div className="text-xs text-gray-500">
                      dans l'emballage
                    </div>
                  </div>
                  <div>
                    <Award className="w-8 h-8 mx-auto text-red-600 mb-2" />
                    <div className="text-lg font-bold text-gray-900">45</div>
                    <div className="text-xs text-gray-600">Portions</div>
                    <div className="text-xs text-gray-500">
                      dans l'emballage
                    </div>
                  </div>
                  <div>
                    <Zap className="w-8 h-8 mx-auto text-red-600 mb-2" />
                    <div className="text-lg font-bold text-gray-900">2</div>
                    <div className="text-xs text-gray-600">Comprimés</div>
                    <div className="text-xs text-gray-500">
                      1 portion = 2 comprimés
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900">Quantité:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    size="lg"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`px-4 ${
                      isFavorite ? "text-red-500 border-red-500" : ""
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isFavorite ? "fill-red-500" : ""}`}
                    />
                  </Button>
                </div>
              </div>

              {/* Shipping & Quality Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span>Livraison gratuite dès 50DT</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Qualité certifiée laboratoire</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description & Key Benefits */}
        <div className="bg-white rounded-xl shadow-lg mb-8 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {product.title}
          </h2>
          <div className="prose max-w-none text-gray-700 mb-6">
            <p className="text-lg leading-relaxed">
              {product.description ||
                `${product.title} est un complément alimentaire complet qui est une source d'ingrédients précieux - la préparation contient, entre autres, de la glucosamine, de la chondroïtine et de la vitamine C. Il s'agit d'un produit sous forme de comprimés faciles à avaler, créé pour les personnes qui souhaitent compléter leur alimentation quotidienne avec des composés précieux.`}
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">
                  Source de nombreux composés précieux - une portion du
                  complément apporte au corps 1000 mg de sulfate de glucosamine,
                  600 mg de méthylsulfonylméthane, 400 mg de sulfate de
                  chondroïtine et 160 mg de vitamine C.
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">
                  Grande absorption - l'utilisation de glucosamine et de
                  chondroïtine dans le produit sous forme de sulfate a un effet
                  positif sur la biodisponibilité des composés.
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">1 portion = 2 comprimés.</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">
                  Commodité - préparation sous forme de comprimés faciles à
                  avaler.
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">
                  Efficacité - l'emballage du produit contient 45 portions de la
                  préparation.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div
          id="overview"
          className="bg-white rounded-xl shadow-lg mb-8 p-6 lg:p-8"
        >
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              Propriétés des ingrédients contenus dans {product.title}
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Glucosamine
                </h4>
                <p className="text-gray-700">
                  est un composé chimique organique qui est un dérivé aminé du
                  glucose, qui se produit naturellement dans de nombreux tissus
                  du corps humain. Elle est synthétisée en petites quantités
                  dans l'organisme, et la capacité de l'organisme à la produire
                  diminue avec l'âge. Cet ingrédient peut être fourni avec de la
                  nourriture ou sous forme de compléments alimentaires.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">MSM</h4>
                <p className="text-gray-700">
                  ou méthylsulfonylméthane, est un composé soufré organique que
                  l'on trouve dans l'alimentation quotidienne dans le lait et
                  les produits laitiers, les œufs, les fruits, les légumes et
                  les céréales complètes. Le MSM est une substance très délicate
                  qui est facilement dégradée par le traitement thermique, la
                  pasteurisation ou la congélation. Par conséquent, il peut être
                  judicieux de fournir ce composé par le biais d'une
                  supplémentation.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Chondroïtine
                </h4>
                <p className="text-gray-700">
                  est un composé chimique organique appartenant au groupe des
                  mucopolysaccharides, construit à partir de résidus d'acide
                  glucuronique et de N-acétylgalactosamine. C'est une substance
                  naturellement synthétisée dans le corps humain, mais la
                  capacité du corps à la produire diminue avec l'âge. Ce
                  composant se trouve dans le cartilage bovin, ainsi que dans
                  les compléments alimentaires.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Vitamine C</h4>
                <p className="text-gray-700">
                  également connue sous le nom d'acide ascorbique, est un
                  composé chimique organique soluble dans l'eau, qui en tant que
                  substance exogène doit être régulièrement fournie à
                  l'organisme avec de la nourriture ou sous forme de compléments
                  alimentaires. Dans les aliments, on la trouve dans les
                  poivrons, le chou, les choux de Bruxelles, le kiwi, les
                  fraises et les cassis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div
          id="ingredients"
          className="bg-white rounded-xl shadow-lg mb-8 p-4 sm:p-6 lg:p-8"
        >
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Paramètres
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              {/* Mobile-first responsive design */}
              <div className="hidden sm:block">
                {/* Desktop Table */}
                <table className="w-full">
                  <tbody className="space-y-2">
                    <tr className="border-b border-gray-200">
                      <td className="font-medium text-gray-600 py-2">
                        Forme du produit:
                      </td>
                      <td className="text-gray-900 py-2">comprimés</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="font-medium text-gray-600 py-2">
                        Portions par contenant:
                      </td>
                      <td className="text-gray-900 py-2">45</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="font-medium text-gray-600 py-2">
                        Quantité:
                      </td>
                      <td className="text-gray-900 py-2">90</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="font-medium text-gray-600 py-2">
                        Poids net:
                      </td>
                      <td className="text-gray-900 py-2">132 g</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="font-medium text-gray-600 py-2">
                        Ingrédient dominant:
                      </td>
                      <td className="text-gray-900 py-2">glucosamine</td>
                    </tr>
                    <tr>
                      <td className="font-medium text-gray-600 py-2">
                        Code EAN:
                      </td>
                      <td className="text-gray-900 py-2">5903933923901</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Mobile List */}
              <div className="block sm:hidden space-y-3">
                <div className="border-b border-gray-200 pb-2">
                  <div className="font-medium text-gray-600 text-sm">
                    Forme du produit:
                  </div>
                  <div className="text-gray-900 font-medium">comprimés</div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="font-medium text-gray-600 text-sm">
                    Portions par contenant:
                  </div>
                  <div className="text-gray-900 font-medium">45</div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="font-medium text-gray-600 text-sm">
                    Quantité:
                  </div>
                  <div className="text-gray-900 font-medium">90</div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="font-medium text-gray-600 text-sm">
                    Poids net:
                  </div>
                  <div className="text-gray-900 font-medium">132 g</div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="font-medium text-gray-600 text-sm">
                    Ingrédient dominant:
                  </div>
                  <div className="text-gray-900 font-medium">glucosamine</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600 text-sm">
                    Code EAN:
                  </div>
                  <div className="text-gray-900 font-medium">5903933923901</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Section */}
        <div
          id="nutrition"
          className="bg-white rounded-xl shadow-lg mb-8 p-4 sm:p-6 lg:p-8"
        >
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Valeurs Nutritionnelles
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Par portion (2 comprimés):
              </p>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-600 text-sm sm:text-base">
                      Sulfate de glucosamine
                    </span>
                    <span className="font-medium text-sm sm:text-base">1000 mg</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-600 text-sm sm:text-base">
                      Méthylsulfonylméthane (MSM)
                    </span>
                    <span className="font-medium text-sm sm:text-base">600 mg</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-600 text-sm sm:text-base">
                      Sulfate de chondroïtine
                    </span>
                    <span className="font-medium text-sm sm:text-base">400 mg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">Vitamine C</span>
                    <span className="font-medium text-sm sm:text-base">160 mg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Section */}
        <div
          id="usage"
          className="bg-white rounded-xl shadow-lg mb-8 p-4 sm:p-6 lg:p-8"
        >
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Mode d'emploi suggéré
            </h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded-r-lg">
              <p className="text-blue-800 font-medium mb-2 text-sm sm:text-base">
                Dosage recommandé:
              </p>
              <p className="text-blue-700 text-sm sm:text-base">
                Prendre 2 comprimés par jour avec un repas et un verre d'eau.
              </p>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 sm:p-6 rounded-r-lg">
              <p className="text-amber-800 font-medium mb-2 text-sm sm:text-base">
                Avertissement:
              </p>
              <p className="text-amber-700 text-sm sm:text-base leading-relaxed">
                Ne pas dépasser la dose journalière recommandée. Les compléments
                alimentaires ne doivent pas être utilisés comme substitut d'une
                alimentation variée. Une alimentation équilibrée et un mode de
                vie sain sont recommandés.
              </p>
            </div>
          </div>
        </div>

        {/* Manufacturer Section */}
        <div
          id="manufacturer"
          className="bg-white rounded-xl shadow-lg mb-8 p-4 sm:p-6 lg:p-8"
        >
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Qualité confirmée en laboratoire
            </h3>
            <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
              Pour la santé de nos clients, les produits que nous fabriquons
              sont régulièrement testés dans un laboratoire accrédité
              indépendant pour assurer et maintenir la plus haute qualité.
            </p>

            <div className="flex items-center justify-center space-x-4 sm:space-x-8 mb-4 sm:mb-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-900">HAMILTON</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-900">BAG-MRA</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-900">PCA</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-blue-600">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm underline cursor-pointer leading-relaxed">
                  {product.title} - Test microbiologique 07.08.2025
                </span>
              </div>
              <div className="flex items-start space-x-3 text-blue-600">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm underline cursor-pointer leading-relaxed">
                  {product.title} - Test de teneur en métaux lourds 06.08.2025
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Avis sur {product.title}
          </h2>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {product.reviews.map((review) => (
                <Card key={review._id} className="border border-gray-200">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2 sm:gap-0">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          {review.user_id}
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(review.stars)}
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 self-start sm:self-auto">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {review.comment}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-gray-200">
              <CardContent className="text-center py-8 sm:py-12">
                <div className="text-gray-400 mb-4">
                  <Star className="w-8 h-8 sm:w-12 sm:h-12 mx-auto" />
                </div>
                <p className="text-base sm:text-lg text-gray-500 mb-2">
                  Aucun avis pour ce produit.
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Soyez le premier à laisser un avis!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
