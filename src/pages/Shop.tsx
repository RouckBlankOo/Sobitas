import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const Shop = () => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gradient">Shop</span> Now
        </motion.h1>
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">Prochainement</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Notre boutique en ligne est en cours de construction. Revenez bientôt pour des offres exceptionnelles !
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Shop;