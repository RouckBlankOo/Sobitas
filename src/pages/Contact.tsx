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
} from "lucide-react";

// Create motion components
const MotionCard = motion(Card);
const MotionButton = motion(Button);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Contact information data
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@sobitas.com",
      description: "Envoyez-nous un email",
      href: "mailto:info@sobitas.com",
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+1 (555) 123-4567",
      description: "Appelez-nous directement",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "123 Fitness Street, Gym City, GC 12345",
      description: "Visitez notre magasin",
      href: "https://maps.google.com",
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
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white pt-20" ref={ref}>
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
            <div className="p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
            Contactez{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Nous
            </span>
          </h1>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Nous sommes là pour répondre à toutes vos questions sur nos
            produits, votre commande ou pour vous conseiller dans votre parcours
            fitness. Notre équipe d'experts est prête à vous aider.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Contact Information Cards */}
          <motion.div
            className="xl:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <MotionCard
                      className="h-full cursor-pointer group border border-gray-200 hover:border-red-500 shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
                      variants={cardVariants}
                      whileHover="hover"
                      onClick={() => window.open(info.href, "_blank")}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <motion.div
                            className="p-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 shadow-md"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </motion.div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                              {info.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {info.description}
                            </p>
                            <p className="text-gray-800 font-medium group-hover:text-red-700 transition-colors">
                              {info.value}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </MotionCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Business Hours Card */}
            <motion.div variants={itemVariants}>
              <MotionCard
                className="border border-gray-200 shadow-sm bg-white"
                variants={cardVariants}
                whileHover={{ scale: 1.01 }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="p-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg"
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Clock className="h-5 w-5 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl text-gray-900">
                      Heures d'Ouverture
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {businessHours.map((schedule, index) => (
                      <motion.div
                        key={index}
                        className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -20 }
                        }
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <span className="font-medium text-gray-900">
                          {schedule.day}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">
                            {schedule.hours}
                          </span>
                          <Badge
                            variant={schedule.isOpen ? "default" : "secondary"}
                            className={
                              schedule.isOpen
                                ? "bg-red-100 text-red-800 border-red-200"
                                : "bg-gray-100 text-gray-600 border-gray-200"
                            }
                          >
                            {schedule.isOpen ? "Ouvert" : "Fermé"}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </MotionCard>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <MotionCard className="border border-gray-200 shadow-lg sticky top-24 bg-white">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-gray-900 flex items-center">
                  <User className="h-6 w-6 mr-2 text-red-600" />
                  Envoyez-nous un Message
                </CardTitle>
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
                      className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <CheckCircle className="h-8 w-8 text-red-600" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Message Envoyé!
                    </h3>
                    <p className="text-gray-600">
                      Merci pour votre message. Nous vous répondrons sous peu.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Nom Complet *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500 bg-white"
                        placeholder="Votre nom complet"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500 bg-white"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Sujet
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500 bg-white"
                        placeholder="Sujet de votre message"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500 resize-none bg-white"
                        placeholder="Écrivez votre message ici..."
                      />
                    </div>

                    <MotionButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
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
                          <Send className="h-5 w-5 mr-2" />
                          Envoyer le Message
                        </span>
                      )}
                    </MotionButton>
                  </form>
                )}
              </CardContent>
            </MotionCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
