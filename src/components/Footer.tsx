import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sobitas-black border-t border-sobitas-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <img src="Sobita" alt="SOBITAS" className="h-8 w-auto mb-4" />
            <p className="text-muted-foreground mb-6 max-w-md">
              Suppléments premium et équipements conçus pour les champions.
              Alimentez votre parcours fitness avec des produits de qualité
              professionnelle.
            </p>

            {/* Newsletter Signup */}
            <div className="max-w-md">
              <h3 className="text-foreground font-semibold mb-3">
                Restez Informé
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Entrez votre email"
                  className="bg-sobitas-charcoal border-sobitas-charcoal text-foreground placeholder:text-muted-foreground"
                />
                <Button className="gradient-primary text-white font-semibold px-6">
                  S'abonner
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">
              Liens Rapides
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-muted-foreground hover:text-sobitas-red transition-smooth"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-muted-foreground hover:text-sobitas-red transition-smooth"
                >
                  Produits
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-sobitas-red transition-smooth"
                >
                  À Propos
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-sobitas-red transition-smooth"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-sobitas-red transition-smooth"
                >
                  Centre d'Aide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-sobitas-red transition-smooth"
                >
                  Info Livraison
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-sobitas-red transition-smooth"
                >
                  Retours
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-sobitas-red transition-smooth"
                >
                  Suivi Commande
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-sobitas-charcoal mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2025 inoveralab. Tous droits réservés.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/sobitass"
                className="text-muted-foreground hover:text-sobitas-red transition-smooth"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/sobitas_/"
                className="text-muted-foreground hover:text-sobitas-red transition-smooth"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-sobitas-red transition-smooth"
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
