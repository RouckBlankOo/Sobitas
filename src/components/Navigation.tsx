import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  BarChart3,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SobitasLogo from "@/assets/Sobitas2.png";
import { smoothScrollTo } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [productsLocked, setProductsLocked] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const productsRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Update auth state when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Smooth scrolling navigation handler
  const handleSmoothNavigation = (
    e: React.MouseEvent,
    path: string,
    sectionId?: string
  ) => {
    e.preventDefault();

    // If we're navigating to a section on the home page
    if (sectionId && (location.pathname === "/" || path === "/")) {
      if (location.pathname !== "/") {
        // Navigate to home first, then scroll
        navigate("/");
        setTimeout(() => {
          smoothScrollTo(sectionId, 90);
        }, 100);
      } else {
        // Already on home page, just scroll
        smoothScrollTo(sectionId, 90);
      }
      setIsOpen(false); // Close mobile menu if open
    } else {
      // Regular navigation
      navigate(path);
      setIsOpen(false);
    }
  };

  const productCategories = [
    {
      name: "Meilleures Ventes",
      path: "/products?filter=best-seller",
      highlight: true,
    },
    {
      name: "Nouveau",
      path: "/products?filter=new",
      highlight: true,
    },
    {
      name: "Dietary Supplements",
      path: "/products/dietary-supplements",
      highlight: false,
      subcategories: [
        {
          name: "Amino Acids",
          path: "/products/dietary-supplements/amino-acids",
        },
        { name: "BCAA", path: "/products/dietary-supplements/bcaa" },
        {
          name: "Citrulline",
          path: "/products/dietary-supplements/citrulline",
        },
        { name: "Creatine", path: "/products/dietary-supplements/creatine" },
        { name: "EAA", path: "/products/dietary-supplements/eaa" },
        { name: "Glutamine", path: "/products/dietary-supplements/glutamine" },
        { name: "HMB", path: "/products/dietary-supplements/hmb" },
        {
          name: "L-Arginine",
          path: "/products/dietary-supplements/l-arginine",
        },
        { name: "Minerals", path: "/products/dietary-supplements/minerals" },
        { name: "Omega 3", path: "/products/dietary-supplements/omega-3" },
        {
          name: "Hormone Boosters",
          path: "/products/dietary-supplements/hormone-boosters",
        },
        { name: "Vitamins", path: "/products/dietary-supplements/vitamins" },
        { name: "ZMA", path: "/products/dietary-supplements/zma" },
        {
          name: "Beta Alanine",
          path: "/products/dietary-supplements/beta-alanine",
        },
        {
          name: "Ashwagandha",
          path: "/products/dietary-supplements/ashwagandha",
        },
        { name: "Tribulus", path: "/products/dietary-supplements/tribulus" },
        { name: "Collagen", path: "/products/dietary-supplements/collagen" },
        { name: "Zinc", path: "/products/dietary-supplements/zinc" },
        { name: "Magnesium", path: "/products/dietary-supplements/magnesium" },
      ],
    },
    {
      name: "Weight Loss",
      path: "/products/weight-loss",
      highlight: false,
      subcategories: [
        { name: "CLA", path: "/products/weight-loss/cla" },
        { name: "Fat Burner", path: "/products/weight-loss/fat-burner" },
        { name: "L-Carnitine", path: "/products/weight-loss/l-carnitine" },
        { name: "Fat Burners", path: "/products/weight-loss/fat-burners" },
      ],
    },
    {
      name: "Mass Gain",
      path: "/products/mass-gain",
      highlight: false,
      subcategories: [
        {
          name: "High Energy Gainers",
          path: "/products/mass-gain/high-energy-gainers",
        },
        {
          name: "Protein-Rich Gainers",
          path: "/products/mass-gain/protein-rich-gainers",
        },
        { name: "Carbohydrates", path: "/products/mass-gain/carbohydrates" },
      ],
    },
    {
      name: "Proteins",
      path: "/products/proteins",
      highlight: false,
      subcategories: [
        { name: "Whey Protein", path: "/products/proteins/whey-protein" },
        { name: "Whey Isolate", path: "/products/proteins/whey-isolate" },
        { name: "Casein Protein", path: "/products/proteins/casein-protein" },
        {
          name: "Complete Proteins",
          path: "/products/proteins/complete-proteins",
        },
        { name: "Beef Protein", path: "/products/proteins/beef-protein" },
        { name: "Hair Proteins", path: "/products/proteins/hair-proteins" },
        { name: "Hydrolyzed Whey", path: "/products/proteins/hydrolyzed-whey" },
      ],
    },
    {
      name: "Training Supplements",
      path: "/products/training-supplements",
      highlight: false,
      subcategories: [
        {
          name: "Pre-Workout",
          path: "/products/training-supplements/pre-workout",
        },
        {
          name: "Intra-Workout",
          path: "/products/training-supplements/intra-workout",
        },
        {
          name: "Post-Workout Recovery",
          path: "/products/training-supplements/post-workout-recovery",
        },
      ],
    },
    {
      name: "Sports Equipment & Accessories",
      path: "/products/sports-equipment-accessories",
      highlight: false,
      subcategories: [
        {
          name: "Muscle Support Bands",
          path: "/products/sports-equipment-accessories/muscle-support-bands",
        },
        {
          name: "Weightlifting Belt",
          path: "/products/sports-equipment-accessories/weightlifting-belt",
        },
        {
          name: "Weightlifting & Fitness Gloves",
          path: "/products/sports-equipment-accessories/weightlifting-fitness-gloves",
        },
        {
          name: "Shakers & Sports Bottles",
          path: "/products/sports-equipment-accessories/shakers-sports-bottles",
        },
        {
          name: "Sports T-Shirts",
          path: "/products/sports-equipment-accessories/sports-t-shirts",
        },
        {
          name: "Weightlifting Equipment",
          path: "/products/sports-equipment-accessories/weightlifting-equipment",
        },
        {
          name: "Cardio Fitness Equipment",
          path: "/products/sports-equipment-accessories/cardio-fitness-equipment",
        },
      ],
    },
  ];

  // Shared button styles for consistency
  const cartButtonStyles = "text-white hover:text-primary";
  const ctaButtonStyles =
    "gradient-primary text-white font-semibold hover:shadow-glow transition-smooth";

  // Check if the current route is /products or a filtered products route
  const isProductsActive = location.pathname.startsWith("/products");

  const toggleCategory = (categoryName) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const handleProductsClick = () => {
    // Toggle lock: when locked, the dropdown stays open until clicked again or click outside
    const newLocked = !productsLocked;
    setProductsLocked(newLocked);
    setIsProductsOpen(newLocked ? true : false);
  };

  // Close products dropdown when clicking outside and unlock
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!productsRef.current) return;
      const target = e.target as Node;
      if (productsRef.current && !productsRef.current.contains(target)) {
        setIsProductsOpen(false);
        setProductsLocked(false);
      }
    };

    if (isProductsOpen && productsLocked) {
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }
    return;
  }, [isProductsOpen, productsLocked]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={SobitasLogo} alt="SOBITAS" className="h-32 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <div className="flex items-center space-x-8">
              <a
                href="/"
                onClick={(e) => handleSmoothNavigation(e, "/", "accueil")}
                className={`text-white hover:text-primary transition-smooth cursor-pointer ${
                  location.pathname === "/" ? "text-primary" : ""
                }`}
              >
                Accueil
              </a>

              {/* Products Dropdown */}
              <div
                className="relative"
                ref={productsRef}
                onMouseEnter={() => !productsLocked && setIsProductsOpen(true)}
                onMouseLeave={() => !productsLocked && setIsProductsOpen(false)}
              >
                <button
                  onClick={handleProductsClick}
                  className={`flex items-center text-white hover:text-primary transition-smooth ${
                    isProductsActive ? "text-primary" : ""
                  }`}
                  aria-current={isProductsActive ? "page" : undefined}
                  aria-expanded={isProductsOpen}
                >
                  Produits
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {isProductsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg animate-fade-in z-50">
                    <div className="py-2">
                      {productCategories.map((category) => (
                        <div key={category.name} className="relative group">
                          {category.subcategories ? (
                            <>
                              <div className="flex items-center justify-between px-4 py-2 text-sm hover:bg-accent transition-smooth cursor-pointer">
                                <Link
                                  to={category.path}
                                  className={`flex-1 ${
                                    category.highlight
                                      ? "text-primary font-semibold"
                                      : "text-black hover:text-primary"
                                  }`}
                                >
                                  {category.name}
                                </Link>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                              {/* Subcategory dropdown */}
                              <div className="absolute left-full top-0 ml-1 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-60">
                                <div className="py-2">
                                  {category.subcategories.map((subcategory) => (
                                    <Link
                                      key={subcategory.name}
                                      to={subcategory.path}
                                      className="block px-4 py-2 text-sm text-black hover:text-primary hover:bg-accent transition-smooth"
                                    >
                                      {subcategory.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </>
                          ) : (
                            <Link
                              to={category.path}
                              className={`block px-4 py-2 text-sm ${
                                category.highlight
                                  ? "text-primary font-semibold hover:bg-accent"
                                  : "text-black hover:text-primary hover:bg-accent"
                              } transition-smooth`}
                            >
                              {category.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className={`text-white hover:text-primary transition-smooth ${
                  location.pathname === "/blog" ? "text-primary" : ""
                }`}
              >
                Blogue
              </Link>
              <a
                href="/about"
                onClick={(e) => handleSmoothNavigation(e, "/about", "a-propos")}
                className={`text-white hover:text-primary transition-smooth cursor-pointer ${
                  location.pathname === "/about" ? "text-primary" : ""
                }`}
              >
                À Propos
              </a>
              <a
                href="#faq"
                onClick={(e) => handleSmoothNavigation(e, "/", "faq")}
                className="text-white hover:text-primary transition-smooth cursor-pointer"
              >
                FAQ
              </a>
              <Link
                to="/contact"
                className={`text-white hover:text-primary transition-smooth ${
                  location.pathname === "/contact" ? "text-primary" : ""
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={cartButtonStyles}
              aria-label="Voir le panier"
            >
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>

            {isLoggedIn ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary"
                  aria-label="Dashboard"
                >
                  <Link to="/dashboard">
                    <BarChart3 className="h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-foreground hover:text-red-600"
                  aria-label="Se déconnecter"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-primary"
                >
                  <Link to="/login">Se connecter</Link>
                </Button>

                <Button asChild className={ctaButtonStyles}>
                  <Link to="/register">S'inscrire</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary"
                  aria-label="Ouvrir le menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-card border-l border-border overflow-y-auto"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  <a
                    href="/"
                    className={`text-lg text-foreground hover:text-primary transition-smooth px-4 py-2 cursor-pointer ${
                      location.pathname === "/" ? "text-primary" : ""
                    }`}
                    onClick={(e) => handleSmoothNavigation(e, "/", "accueil")}
                  >
                    Accueil
                  </a>

                  {/* Mobile Products Section */}
                  <div className="px-4">
                    <button
                      onClick={() => toggleCategory("main-products")}
                      className={`flex items-center justify-between w-full text-lg font-semibold text-foreground mb-3 ${
                        isProductsActive ? "text-primary" : ""
                      }`}
                    >
                      Produits
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedCategories.has("main-products")
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {expandedCategories.has("main-products") && (
                      <div className="pl-4 space-y-2">
                        {productCategories.map((category) => (
                          <div key={category.name}>
                            <div className="flex items-center justify-between">
                              <Link
                                to={category.path}
                                className={`text-sm ${
                                  category.highlight
                                    ? "text-primary font-semibold"
                                    : "text-muted-foreground"
                                } hover:text-primary transition-smooth py-1 flex-1`}
                                onClick={() => setIsOpen(false)}
                              >
                                {category.name}
                              </Link>
                              {category.subcategories && (
                                <button
                                  onClick={() => toggleCategory(category.name)}
                                  className="ml-2 p-1"
                                >
                                  <ChevronDown
                                    className={`h-3 w-3 text-muted-foreground transition-transform ${
                                      expandedCategories.has(category.name)
                                        ? "rotate-180"
                                        : ""
                                    }`}
                                  />
                                </button>
                              )}
                            </div>

                            {category.subcategories &&
                              expandedCategories.has(category.name) && (
                                <div className="pl-4 mt-1 space-y-1">
                                  {category.subcategories.map((subcategory) => (
                                    <Link
                                      key={subcategory.name}
                                      to={subcategory.path}
                                      className="block text-xs text-muted-foreground hover:text-primary transition-smooth py-1"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {subcategory.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    to="/blog"
                    className={`text-lg text-foreground hover:text-primary transition-smooth px-4 py-2 ${
                      location.pathname === "/blog" ? "text-primary" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Blogue
                  </Link>
                  <a
                    href="/about"
                    className={`text-lg text-foreground hover:text-primary transition-smooth px-4 py-2 cursor-pointer ${
                      location.pathname === "/about" ? "text-primary" : ""
                    }`}
                    onClick={(e) =>
                      handleSmoothNavigation(e, "/about", "a-propos")
                    }
                  >
                    À Propos
                  </a>
                  <a
                    href="#faq"
                    className="text-lg text-foreground hover:text-primary transition-smooth px-4 py-2 cursor-pointer"
                    onClick={(e) => handleSmoothNavigation(e, "/", "faq")}
                  >
                    FAQ
                  </a>
                  <Link
                    to="/contact"
                    className={`text-lg text-foreground hover:text-primary transition-smooth px-4 py-2 ${
                      location.pathname === "/contact" ? "text-primary" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>

                  {/* Mobile Authentication & Actions */}
                  <div className="px-4 py-4 border-t border-border mt-6 space-y-4">
                    {/* Cart */}
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className={`${cartButtonStyles} w-full justify-start`}
                      aria-label="Voir le panier"
                    >
                      <Link to="/cart" onClick={() => setIsOpen(false)}>
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Mon Panier
                      </Link>
                    </Button>

                    {isLoggedIn ? (
                      <div className="space-y-2">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-foreground hover:text-primary"
                        >
                          <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                          >
                            <BarChart3 className="h-5 w-5 mr-2" />
                            Dashboard
                          </Link>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                          className="w-full justify-start text-foreground hover:text-red-600"
                        >
                          <LogOut className="h-5 w-5 mr-2" />
                          Se déconnecter
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-foreground hover:text-primary"
                        >
                          <Link to="/login" onClick={() => setIsOpen(false)}>
                            Se connecter
                          </Link>
                        </Button>

                        <Button asChild className={`${ctaButtonStyles} w-full`}>
                          <Link to="/register" onClick={() => setIsOpen(false)}>
                            S'inscrire
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
