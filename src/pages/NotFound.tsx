import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-20">
      <div className="max-w-md w-full text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Non Trouvée
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="btn-primary">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Retour à l'Accueil
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600"
          >
            <Link to="/products">Voir nos Produits</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
