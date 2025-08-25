import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <p className="text-gray-600 mb-6 max-w-md">
              Suppléments premium et équipements conçus pour les champions.
              Alimentez votre parcours fitness avec des produits de qualité
              professionnelle.
            </p>
            <div className="max-w-md">
              <h3 className="text-gray-900 font-semibold mb-3">
                Restez Informé
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Entrez votre email"
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
                <Button className="gradient-primary text-white font-semibold px-6">
                  S'abonner
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-red-600 transition-smooth"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-red-600 transition-smooth"
                >
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-red-600 transition-smooth"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-red-600 transition-smooth"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/help"
                  className="text-gray-600 hover:text-red-600 transition-smooth"
                >
                  Centre d'Aide
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-600 hover:text-red-600 transition-smooth"
                >
                  Info Livraison
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-600 hover:text-red-600 transition-smooth"
                >
                  Retours
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="text-gray-600 hover:text-red-600 transition-smooth"
                >
                  Suivi Commande
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2025 inoveralab. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/sobitass"
                className="text-gray-600 hover:text-red-600 transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/sobitas_/"
                className="text-gray-600 hover:text-red-600 transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-600 transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-600 transition-smooth"
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
