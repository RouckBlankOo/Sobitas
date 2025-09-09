import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div 
      className="min-h-screen bg-background pt-20"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Blog <span className="text-gradient">Sobitas</span>
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Découvrez nos derniers articles sur le fitness, la nutrition et les conseils d'entraînement.
        </motion.p>
        
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-muted-foreground">
            Prochainement : articles passionnants et mises à jour !
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Blog;
