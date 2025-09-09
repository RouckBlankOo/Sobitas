import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Trophy, Users } from "lucide-react";
import {
  motion,
  Variants,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { slideUpVariants, scaleVariants } from "@/lib/utils";

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

const stats = [
  { number: 660, suffix: "K+", label: "Clients Satisfaits" },
  { number: 300, suffix: "+", label: "Produits Premium" },
  { number: 15, suffix: "+", label: "Années d'Expérience" },
  { number: 100, suffix: "%", label: "Garantie Qualité" },
];

// Create motion components
const MotionCard = motion(Card);

// Animated Counter Component
const AnimatedCounter = ({
  targetNumber,
  suffix,
  duration = 2,
  delay = 0,
  isInView,
}: {
  targetNumber: number;
  suffix: string;
  duration?: number;
  delay?: number;
  isInView: boolean;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, targetNumber, {
        duration,
        delay,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, targetNumber, duration, delay, count]);

  return (
    <span className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

  const headerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const iconVariants: Variants = {
    hidden: {
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const statsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const statItemVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            Pourquoi Choisir{" "}
            <motion.span
              className="text-gradient"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            >
              Sobitas
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            Nous nous engageons à fournir des suppléments et équipements de la
            plus haute qualité pour alimenter votre parcours fitness. Avec{" "}
            <motion.span
              className="text-red-600 font-semibold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            >
              15 années d'expérience
            </motion.span>{" "}
            dans l'industrie, nous comprenons vos besoins.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative"
              >
                <MotionCard
                  className="bg-white border-gray-200 hover:border-red-500 transition-all duration-500 shadow-sm hover:shadow-xl group text-center h-full relative overflow-hidden"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(220, 38, 38, 0.1)",
                  }}
                >
                  {/* Background gradient effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  <CardHeader className="pb-4 relative z-10">
                    <motion.div
                      className="mx-auto w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mb-4"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      <CardTitle className="text-xl text-gray-900">
                        {feature.title}
                      </CardTitle>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="pt-0 relative z-10">
                    <motion.p
                      className="text-gray-600 leading-relaxed"
                      initial={{ opacity: 0, y: 15 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                      }
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      {feature.description}
                    </motion.p>
                  </CardContent>

                  {/* Decorative border animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-red-700"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </MotionCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section with Animated Counters */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          variants={statsContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statItemVariants}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
              className="group cursor-default"
            >
              <motion.div className="mb-2">
                <AnimatedCounter
                  targetNumber={stat.number}
                  suffix={stat.suffix}
                  duration={1.5}
                  delay={0.5 + index * 0.2}
                  isInView={isInView}
                />
              </motion.div>

              <motion.div
                className="text-gray-600 group-hover:text-red-600 transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                {stat.label}
              </motion.div>

              {/* Animated underline */}
              <motion.div
                className="mx-auto mt-2 h-0.5 bg-gradient-to-r from-red-600 to-red-700"
                initial={{ width: 0 }}
                animate={isInView ? { width: "60%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 1.0 + index * 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
