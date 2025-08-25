import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Trophy, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Qualité Premium",
    description:
      "Tous nos produits subissent des tests rigoureux et un contrôle qualité pour garantir les plus hauts standards et la pureté.",
  },
  {
    icon: Zap,
    title: "Résultats Rapides",
    description:
      "Suppléments formulés scientifiquement conçus pour fournir des résultats visibles dans les plus brefs délais.",
  },
  {
    icon: Trophy,
    title: "Formules Éprouvées",
    description:
      "Approuvé par des athlètes professionnels et des passionnés de fitness dans le monde entier pour des performances de compétition.",
  },
  {
    icon: Users,
    title: "Support Expert",
    description:
      "Obtenez des conseils personnalisés de nutritionnistes certifiés et d'experts fitness pour maximiser vos résultats.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pourquoi Choisir <span className="text-gradient">Sobitas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nous nous engageons à fournir des suppléments et équipements de la
            plus haute qualité pour alimenter votre parcours fitness. Avec{" "}
            <span className="text-red-600 font-semibold">
              15 années d'expérience
            </span>{" "}
            dans l'industrie, nous comprenons vos besoins.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-white border-gray-200 hover:border-red-500 transition-smooth shadow-sm hover:shadow-lg animate-scale-in group text-center"
              >
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-gradient mb-2">660K+</div>
            <div className="text-gray-600">Clients Satisfaits</div>
          </div>
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-gradient mb-2">300+</div>
            <div className="text-gray-600">Produits Premium</div>
          </div>
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-gradient mb-2">15+</div>
            <div className="text-gray-600">Années d'Expérience</div>
          </div>
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-gradient mb-2">100%</div>
            <div className="text-gray-600">Garantie Qualité</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
