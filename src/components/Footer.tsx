import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Shield,
  CreditCard,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "@/lib/utils";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Smooth scrolling navigation handler
  const handleSmoothNavigation = (
    e: React.MouseEvent,
    path: string,
    sectionId?: string
  ) => {
    e.preventDefault();

    if (sectionId && (location.pathname === "/" || path === "/")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          smoothScrollTo(sectionId, 90);
        }, 100);
      } else {
        smoothScrollTo(sectionId, 90);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <p className="text-gray-300 mb-6 max-w-md">
              Suppléments premium et équipements conçus pour les champions.
              Alimentez votre parcours fitness avec des produits de qualité
              professionnelle.
            </p>
            <div className="max-w-md">
              <h3 className="text-white font-semibold mb-3">
                Restez Informé
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Entrez votre email"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Button className="gradient-primary text-white font-semibold px-6">
                  S'abonner
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleSmoothNavigation(e, "/", "accueil")}
                  className="text-gray-300 hover:text-red-400 transition-smooth cursor-pointer"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  onClick={(e) =>
                    handleSmoothNavigation(e, "/products", "produits")
                  }
                  className="text-gray-300 hover:text-red-400 transition-smooth cursor-pointer"
                >
                  Produits
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) =>
                    handleSmoothNavigation(e, "/about", "a-propos")
                  }
                  className="text-gray-300 hover:text-red-400 transition-smooth cursor-pointer"
                >
                  À Propos
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-red-400 transition-smooth"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleSmoothNavigation(e, "/", "faq")}
                  className="text-gray-300 hover:text-red-400 transition-smooth cursor-pointer"
                >
                  FAQ
                </a>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-red-400 transition-smooth"
                >
                  Centre d'Aide
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-300 hover:text-red-400 transition-smooth"
                >
                  Info Livraison
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-300 hover:text-red-400 transition-smooth"
                >
                  Retours
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="text-gray-300 hover:text-red-400 transition-smooth"
                >
                  Suivi Commande
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 mt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <p className="text-gray-300 text-sm">
                  © 2025 Sobitas. Tous droits réservés.
                </p>
                <div className="flex space-x-4 text-sm">
                  <Link
                    to="/privacy"
                    className="text-gray-300 hover:text-red-400 transition-smooth"
                  >
                    Confidentialité
                  </Link>
                  <Link
                    to="/terms"
                    className="text-gray-300 hover:text-red-400 transition-smooth"
                  >
                    CGU
                  </Link>
                  <Link
                    to="/cookies"
                    className="text-gray-300 hover:text-red-400 transition-smooth"
                  >
                    Cookies
                  </Link>
                </div>
              </div>
              <p className="text-gray-500 text-xs opacity-60">
                Powered by <span className="text-gray-400">BreakNRoot</span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/groups/1650277201915391/"
                className="text-gray-300 hover:text-red-400 transition-smooth"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/protein.tunisie/"
                className="text-gray-300 hover:text-red-400 transition-smooth"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-red-400 transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-red-400 transition-smooth"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
