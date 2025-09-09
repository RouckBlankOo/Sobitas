import { useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  Globe,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Store,
  CreditCard,
  Truck,
  Headphones,
} from "lucide-react";

// Create motion components
const MotionCard = motion(Card);
const MotionButton = motion(Button);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Store locations data
  const storeLocations = [
    {
      name: "SOBITAS Sousse",
      address: "4000 Rue Ribat, Sousse 4000",
      hours: "8h30 - 19h00 (lundi au samedi)",
      phone: "71 751 934",
      features: [
        "Fermeture dimanche et jours fériés",
        "Paiement par CB accepté",
        "Possibilité de retrait en magasin",
      ],
      mapUrl: "https://maps.app.goo.gl/Wq1PUXaCMbw21ZKC9",
    },
  ];

  // FAQ data
  const faqData = [
    {
      category: "NOS BOUTIQUES",
      questions: [
        {
          question: "Où puis-je trouver vos magasins physiques ?",
          answer:
            "Nous avons actuellement deux boutiques : une à Menzah 5 et une autre à La Marsa. Consultez nos horaires et adresses détaillées ci-dessus.",
        },
        {
          question: "Puis-je retirer ma commande en magasin ?",
          answer:
            "Oui, vous pouvez choisir le retrait en magasin lors de votre commande. Nous vous préviendrons dès que votre commande sera prête.",
        },
      ],
    },
    {
      category: "SUIVI DES COMMANDES",
      questions: [
        {
          question: "Comment suivre ma commande ?",
          answer:
            "Après votre commande, vous recevrez un email de confirmation avec un numéro de suivi. Vous pouvez également nous contacter pour connaître le statut de votre commande.",
        },
        {
          question: "Quels sont les délais de livraison ?",
          answer:
            "Les délais de livraison varient selon votre localisation. En général, comptez 2-4 jours ouvrables pour la Tunisie.",
        },
      ],
    },
    {
      category: "CONDITIONS GÉNÉRALES DE VENTES",
      questions: [
        {
          question: "Quelles sont vos conditions de retour ?",
          answer:
            "Vous disposez de 14 jours pour retourner un produit non ouvert. Les frais de retour sont à votre charge sauf en cas de défaut du produit.",
        },
        {
          question: "Acceptez-vous tous les moyens de paiement ?",
          answer:
            "Nous acceptons les cartes bancaires, les virements et le paiement à la livraison selon les modalités disponibles.",
        },
      ],
    },
    {
      category: "BESOIN D'UN CONSEIL SCIENTIFIQUE ?",
      questions: [
        {
          question: "Puis-je avoir des conseils sur les suppléments ?",
          answer:
            "Oui, notre équipe d'experts est disponible pour vous conseiller sur le choix de vos suppléments selon vos objectifs fitness.",
        },
        {
          question: "Comment choisir le bon produit pour mes objectifs ?",
          answer:
            "Contactez-nous via le formulaire ou par téléphone. Nous vous aiderons à sélectionner les produits adaptés à vos besoins spécifiques.",
        },
      ],
    },
  ];

  // Business hours data
  const businessHours = [
    { day: "Lundi - Vendredi", hours: "9:00 - 20:00", isOpen: true },
    { day: "Samedi", hours: "10:00 - 18:00", isOpen: true },
    { day: "Dimanche", hours: "12:00 - 17:00", isOpen: false },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const formVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Form handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        firstName: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 3000);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background pt-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-4 gradient-primary rounded-full">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Contactez <span className="text-gradient">Nous</span>
          </h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Nous sommes là pour répondre à toutes vos questions sur nos
            produits, votre commande ou pour vous conseiller dans votre parcours
            fitness.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Stores and FAQ */}
          <motion.div
            className="lg:col-span-2 space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Store Locations Section */}
            <motion.div variants={itemVariants}>
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center justify-center p-3 gradient-primary rounded-full mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Store className="h-6 w-6 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Rendez-nous visite en point de vente
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {storeLocations.map((store, index) => (
                  <MotionCard
                    key={index}
                    className="border hover:border-primary/50 shadow-sm hover:shadow-lg transition-all duration-300"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg text-foreground mb-3">
                        {store.name}
                      </h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            {store.address}
                          </p>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Clock className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            {store.hours}
                          </p>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            Téléphone: {store.phone}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {store.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span className="text-xs text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                        onClick={() => window.open(store.mapUrl, "_blank")}
                      >
                        Voir sur la carte
                      </Button>
                    </CardContent>
                  </MotionCard>
                ))}
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div variants={itemVariants}>
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center justify-center p-3 gradient-primary rounded-full mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <HelpCircle className="h-6 w-6 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Questions les plus fréquentes
                </h2>
                <p className="text-muted-foreground">
                  On répond à vos questions
                </p>
              </div>

              <div className="space-y-4">
                {faqData.map((category, categoryIndex) => (
                  <MotionCard
                    key={categoryIndex}
                    className="border shadow-sm"
                    variants={cardVariants}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold text-white bg-gradient-to-r from-red-600 to-black p-3 rounded-lg">
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {category.questions.map((faq, questionIndex) => {
                        const globalIndex = categoryIndex * 10 + questionIndex; // Unique index
                        return (
                          <div
                            key={questionIndex}
                            className="border rounded-lg"
                          >
                            <button
                              className="w-full text-left p-4 hover:bg-muted/50 transition-colors flex items-center justify-between"
                              onClick={() => toggleFaq(globalIndex)}
                            >
                              <span className="font-medium text-foreground">
                                {faq.question}
                              </span>
                              {expandedFaq === globalIndex ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              )}
                            </button>
                            {expandedFaq === globalIndex && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-4 pb-4"
                              >
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </CardContent>
                  </MotionCard>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <MotionCard className="border shadow-lg sticky top-24">
              <CardHeader className="pb-6">
                <div className="text-center mb-4">
                  <motion.div
                    className="inline-flex items-center justify-center p-3 gradient-primary rounded-full mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <User className="h-6 w-6 text-white" />
                  </motion.div>
                  <CardTitle className="text-2xl text-foreground">
                    Contactez-nous via le formulaire
                  </CardTitle>
                  <p className="text-muted-foreground text-sm mt-2">
                    Besoin d'aide ?
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Message Envoyé!
                    </h3>
                    <p className="text-muted-foreground">
                      Merci pour votre message. Nous vous répondrons sous peu.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nom*
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full focus:border-primary focus:ring-primary"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Prénom*
                      </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full focus:border-primary focus:ring-primary"
                        placeholder="Votre prénom"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        E-mail*
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full focus:border-primary focus:ring-primary"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Téléphone*
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full focus:border-primary focus:ring-primary"
                        placeholder="+216 XX XXX XXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Demande
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full focus:border-primary focus:ring-primary resize-none"
                        placeholder="Décrivez votre demande..."
                      />
                    </div>

                    <MotionButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gradient-primary hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="flex items-center justify-center"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        </motion.div>
                      ) : (
                        <span className="flex items-center justify-center">
                          Valider
                        </span>
                      )}
                    </MotionButton>
                  </form>
                )}

                {/* Chat Support Section */}
                <div className="mt-8 p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Headphones className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        ISN CHAT
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Dialoguez avec l'équipe commerciale et technique via la
                        messagerie de chat instantanée
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    (service actif tous les jours de 8h à 22h30).
                  </p>
                </div>

                {/* Quick Info Cards */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <User className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h5 className="font-semibold text-sm text-foreground">
                      Conseils scientifiques
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      Chat en Ligne
                    </p>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <CreditCard className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h5 className="font-semibold text-sm text-foreground">
                      Paiement par Visa CB
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      100% Sécurisé
                    </p>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <Phone className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h5 className="font-semibold text-sm text-foreground">
                      Suivi de vos Commandes
                    </h5>
                    <p className="text-xs text-muted-foreground">70838365</p>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h5 className="font-semibold text-sm text-foreground">
                      Livraison gratuite par CB
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      Et retrait en magasin
                    </p>
                  </div>
                </div>
              </CardContent>
            </MotionCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
