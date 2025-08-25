import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import SobitasLogo from "@/assets/Sobitas2.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const productCategories = [
    "Protéines en Poudre",
    "Pré-Entraînements",
    "Créatine",
    "BCAA",
    "Brûleurs de Graisse",
    "Vitamines & Minéraux",
    "Équipement de Gym",
    "Accessoires d'Entraînement",
  ];

  // Shared button styles for consistency
  const cartButtonStyles = "text-white hover:text-red-400";
  const ctaButtonStyles =
    "gradient-primary text-white font-semibold hover:shadow-glow transition-smooth";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={SobitasLogo} alt="SOBITAS" className="h-32 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-white hover:text-red-400 transition-smooth font-medium"
              >
                Accueil
              </Link>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <button className="flex items-center text-white hover:text-red-400 transition-smooth font-medium">
                  Produits
                  <ChevronDown className="ml-1 h-4 w-4 text-white" />
                </button>

                {isProductsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in z-50">
                    <div className="py-2">
                      {productCategories.map((category) => (
                        <Link
                          key={category}
                          to="/products"
                          className="block px-4 py-2 text-sm text-gray-900 hover:text-red-600 hover:bg-red-50 transition-smooth"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className="text-white hover:text-red-400 transition-smooth font-medium"
              >
                À Propos
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-red-400 transition-smooth font-medium"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Desktop Cart and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={cartButtonStyles}
              aria-label="Voir le panier"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button asChild className={ctaButtonStyles}>
              <Link to="/shop">Acheter Maintenant</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-red-400"
                  aria-label="Ouvrir le menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-white border-l border-gray-200"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    to="/"
                    className="text-lg text-gray-900 hover:text-red-600 transition-smooth px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Accueil
                  </Link>

                  {/* Mobile Products Section */}
                  <div className="px-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Produits
                    </h3>
                    <div className="grid grid-cols-1 gap-2 pl-4">
                      {productCategories.map((category) => (
                        <Link
                          key={category}
                          to="/products"
                          className="text-sm text-gray-600 hover:text-red-600 transition-smooth py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/about"
                    className="text-lg text-gray-900 hover:text-red-600 transition-smooth px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    À Propos
                  </Link>
                  <Link
                    to="/contact"
                    className="text-lg text-gray-900 hover:text-red-600 transition-smooth px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>

                  {/* Mobile Cart and CTA */}
                  <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200 mt-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-900 hover:text-red-600"
                      aria-label="Voir le panier"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                    <Button asChild className={ctaButtonStyles}>
                      <Link to="/shop" onClick={() => setIsOpen(false)}>
                        Acheter Maintenant
                      </Link>
                    </Button>
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
