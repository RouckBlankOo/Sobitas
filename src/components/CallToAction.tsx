"use client";

import { Button } from "@/components/ui/button";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Clock,
  Shield,
  Zap,
  Phone,
  Mail,
  MapPin,
  Dumbbell,
  Trophy,
  Users,
} from "lucide-react";

// Custom hook for mouse position relative to element
const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const updateMousePosition = (event: MouseEvent) => {
    if (!to.current) return;
    const { top, left } = to.current.getBoundingClientRect();
    mouseX.set(event.x - left);
    mouseY.set(event.y - top);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return [mouseX, mouseY];
};

// MAIN FUNCTION
export const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const borderedDivRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("general");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-100, 100]
  );

  const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(220, 38, 38, 0.1), transparent)`;

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const supportFeatures = [
    {
      icon: <MessageCircle className="w-6 h-6 text-red-600" />,
      title: "Support Expert 24h/24 7j/7",
      description:
        "Obtenez de l'aide de nutritionnistes fitness certifiés à tout moment",
    },
    {
      icon: <Clock className="w-6 h-6 text-red-600" />,
      title: "Réponse Rapide",
      description: "Temps de réponse moyen sous 2 heures",
    },
    {
      icon: <Shield className="w-6 h-6 text-red-600" />,
      title: "Garantie Qualité",
      description: "Garantie de satisfaction 100% sur tous les produits",
    },
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-5 h-5 text-red-600" />,
      title: "Appelez-nous",
      info: "+33 1 23 45 67 89",
      description: "Lun-Ven 9h-20h",
    },
    {
      icon: <Mail className="w-5 h-5 text-red-600" />,
      title: "Écrivez-nous",
      info: "support@sobitas.com",
      description: "Réponse sous 24 heures",
    },
    {
      icon: <MapPin className="w-5 h-5 text-red-600" />,
      title: "Visitez-nous",
      info: "123 Avenue du Fitness, Paris",
      description: "Horaires magasin : 8h-22h tous les jours",
    },
  ];

  const inquiryTopics = [
    { value: "general", label: "Demande Générale" },
    { value: "product", label: "Information Produit" },
    { value: "order", label: "Support Commande" },
    { value: "nutrition", label: "Conseil Nutrition" },
    { value: "equipment", label: "Aide Équipement" },
    { value: "wholesale", label: "Commandes Grossistes" },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-3 mb-6"
          >
            <Dumbbell className="w-8 h-8 text-red-600" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Besoin d'Aide pour Votre Parcours Fitness ?
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Nos experts nutritionnistes certifiés et spécialistes fitness sont
            là pour vous aider à choisir les bons suppléments et équipements
            selon vos objectifs.
          </motion.p>
        </div>

        {/* Support Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {supportFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            ref={borderedDivRef}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
            style={{ backgroundPositionY }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              style={{ maskImage }}
            />

            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-8 group hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Obtenez des Conseils d'Expert
                </h3>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Message Envoyé avec Succès !
                  </h4>
                  <p className="text-gray-600">
                    Un de nos experts fitness vous contactera dans les 24 heures
                    pour vous aider à atteindre vos objectifs.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="Entrez votre prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="Entrez votre nom"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro de Téléphone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comment pouvons-nous vous aider ? *
                    </label>
                    <select
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    >
                      {inquiryTopics.map((topic) => (
                        <option key={topic.value} value={topic.value}>
                          {topic.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                      placeholder="Parlez-nous de vos objectifs fitness, votre routine actuelle, ou toute question spécifique que vous avez..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-4 px-8 rounded-lg hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Obtenir de l'Aide Maintenant
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    En soumettant ce formulaire, vous acceptez nos Conditions
                    d'Utilisation et Politique de Confidentialité.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Autres Moyens de Nous Contacter
                </h3>
              </div>

              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {method.title}
                      </h4>
                      <p className="text-red-600 font-medium">{method.info}</p>
                      <p className="text-gray-600 text-sm">
                        {method.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ CTA */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 text-white">
              <h4 className="text-xl font-bold mb-3">
                Questions Fréquemment Posées
              </h4>
              <p className="text-gray-300 mb-6">
                Trouvez des réponses rapides aux questions courantes sur nos
                suppléments protéinés, équipements, livraisons et conseils
                nutritionnels.
              </p>
              <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Voir la FAQ
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h4 className="font-semibold text-green-800 mb-3">
                Pourquoi Choisir Sobitas ?
              </h4>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Suppléments approuvés FDA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-green-600" />
                  <span className="text-sm">
                    Approuvé par plus de 50 000 athlètes
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Livraison gratuite dès 400DT</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
