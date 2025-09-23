import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBackground from "@/assets/hero-background.jpg";
import logo3D from "@/assets/3dLogo.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* 3D Floating Logo - FIRST ELEMENT - CLEAN VERSION */}
          <motion.div
            className="flex justify-center items-center mb-8 mt-16 sm:mt-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, 20, 0],
                rotateY: [-10, 10, -10],
                rotateX: [-5, 5, -5],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotateY: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotateX: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Main 3D Logo - Bigger Size for Mobile */}
              <motion.img
                src={logo3D}
                alt="Sobitas 3D Logo"
                className="relative z-10 w-40 h-32 sm:w-32 sm:h-22 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
                style={{
                  filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3))",
                  transformStyle: "preserve-3d",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Title - AFTER LOGO AND PRODUCTS */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <span className="text-gradient">Suppléments</span>
            <br />
            <span className="text-white">Premium</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Alimentez votre parcours fitness avec des suppléments et équipements
            de qualité professionnelle conçus pour les champions.
          </motion.p>

          {/* Buttons - LAST */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
          >
            <Button
              asChild
              size="lg"
              className="gradient-primary text-white font-semibold px-8 py-4 text-lg hover:shadow-glow transition-smooth animate-glow"
            >
              <Link to="/products">Explorer les Produits</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-red-600  text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 text-lg transition-smooth"
            >
              <Link to="/about">En Savoir Plus</Link>
            </Button>
          </motion.div>

          {/* SOBITAS Abbreviation */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 mt-12 font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <span className="text-primary font-bold">S</span>.
            <span className="text-primary font-bold">O</span>.
            <span className="text-primary font-bold">B</span>.
            <span className="text-primary font-bold">I</span>.
            <span className="text-primary font-bold">T</span>.
            <span className="text-primary font-bold">A</span>.
            <span className="text-primary font-bold">S</span>
          </motion.p>
          <motion.p
            className="text-base md:text-lg text-gray-300 mt-2 font-medium tracking-wide flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <span>
              <span className="text-primary font-bold">S</span>anté
            </span>
            <span>
              <span className="text-primary font-bold">O</span>ptimale
            </span>
            <span>
              <span className="text-primary font-bold">B</span>ase
            </span>
            <span>
              <span className="text-primary font-bold">I</span>ntensité
            </span>
            <span>
              <span className="text-primary font-bold">T</span>ransformation
            </span>
            <span>
              <span className="text-primary font-bold">A</span>mélioration
            </span>
            <span>
              <span className="text-primary font-bold">S</span>uccès
            </span>
          </motion.p>
        </div>
      </div>

      {/* Simple Floating Elements */}
      <motion.div
        className="absolute top-20 right-10 w-20 h-20 bg-red-500/20 rounded-full hidden lg:block"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 bg-red-500/30 rounded-full hidden lg:block"
        animate={{
          y: [10, -10, 10],
          opacity: [0.4, 0.7, 0.4],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  );
};

export default Hero;
