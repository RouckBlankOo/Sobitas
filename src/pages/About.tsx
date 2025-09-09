import { Shield, Award, Users, Target } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Qualité Premium",
      description:
        "Nous ne compromettrons jamais sur la qualité. Chaque produit est rigoureusement testé.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description:
        "15 années d'expertise dans l'industrie du fitness et de la nutrition sportive.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Communauté",
      description:
        "Plus de 500K athlètes nous font confiance pour leurs objectifs de fitness.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Résultats",
      description:
        "Nos produits sont conçus pour livrer des résultats mesurables et durables.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div 
      className="min-h-screen bg-white pt-20"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-gray-900 to-black text-white py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            À Propos de <span className="text-gradient">Sobitas</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Nous sommes passionnés par l'aide que nous apportons aux athlètes et
            aux passionnés de fitness pour atteindre leurs objectifs avec des
            produits de qualité supérieure.
          </motion.p>
        </div>
      </motion.section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Fondée en 2009, Sobitas a commencé comme un petit magasin
                  local avec une mission simple: fournir des suppléments de la
                  plus haute qualité aux athlètes sérieux.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers d'être l'un des leaders de
                  l'industrie, servant plus de 500,000 clients satisfaits dans
                  le monde entier avec notre gamme étendue de produits premium.
                </p>
                <p>
                  Notre engagement envers l'innovation, la qualité et la
                  satisfaction client nous a permis de bâtir une réputation de
                  confiance dans la communauté du fitness.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Nos Chiffres</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">500K+</div>
                    <div className="text-red-100">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">15</div>
                    <div className="text-red-100">Années</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">300+</div>
                    <div className="text-red-100">Produits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24+</div>
                    <div className="text-red-100">État</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ce qui nous guide dans tout ce que nous faisons
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-smooth card-hover"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {value.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Notre Équipe d'Experts
          </h2>
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nutritionnistes Certifiés & Experts Fitness
            </h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Notre équipe est composée de nutritionnistes certifiés,
              d'entraîneurs personnels expérimentés et d'experts en performance
              sportive. Ils travaillent ensemble pour développer et sélectionner
              les meilleurs produits pour votre parcours fitness.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
