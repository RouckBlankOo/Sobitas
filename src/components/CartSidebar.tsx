import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const CartSidebar: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40"
            onClick={closeCart}
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-black to-gray-900 shadow-2xl z-50 flex flex-col border-l border-red-600"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-red-600/30 bg-black/50">
              <h2 className="text-xl font-bold text-white">Panier</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeCart}
                className="text-red-400 hover:text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-black">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-300 mb-4">Votre panier est vide</p>
                  <Button
                    onClick={closeCart}
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    Continuer vos achats
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border border-red-600/30 rounded-lg bg-black/40 backdrop-blur-sm hover:bg-red-900/20 hover:border-red-500 transition-all duration-200"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md border border-red-600/50"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-300 mb-2">
                          Qté: {item.quantity} × {item.price.toFixed(2)} TND
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(item.id, item.quantity - 1);
                              } else {
                                removeFromCart(item.id);
                              }
                            }}
                            className="w-8 h-8 p-0 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>

                          <span className="w-8 text-center text-sm font-medium text-white bg-red-900/50 border border-red-600/50 rounded px-2 py-1">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 p-0 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-red-400">
                          {(item.price * item.quantity).toFixed(2)} TND
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-red-600/30 p-6 space-y-4 bg-black/60 backdrop-blur-sm">
                {/* Total */}
                <div className="flex justify-between items-center text-lg font-bold border-b border-red-600/30 pb-3">
                  <span className="text-white">Total:</span>
                  <span className="text-red-400 text-xl">
                    {getTotalPrice().toFixed(2)} DT
                  </span>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Link to="/cart" onClick={closeCart}>
                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                      AFFICHER VOTRE PANIER
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    onClick={closeCart}
                    className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white font-semibold py-3 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    CONTINUER MES ACHATS
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
