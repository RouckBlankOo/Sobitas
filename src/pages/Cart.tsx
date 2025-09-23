import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Minus,
  Plus,
  Trash2,
  Gift,
  Star,
  ShoppingCart,
  Check,
  Package,
  CreditCard,
} from "lucide-react";
import {
  getGovernoratesList,
  getDelegationsList,
  getLocalitiesList,
} from "@/data/tunisianLocations";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Use cart context instead of local state
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
    addToCart,
  } = useCart();

  // Step state - 1 for cart, 2 for checkout
  const [currentStep, setCurrentStep] = useState(1);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Checkout form state
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    governorate: "",
    delegation: "",
    locality: "",
    postalCode: "",
    phone1: "",
    phone2: "",
    email: "",
    birthDate: "",
    orderNotes: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Recommended products
  const recommendedProducts = [
    {
      id: 101,
      name: "100% WHEY GOLD STANDARD – 2.27KG",
      price: 380,
      priceDisplay: "380 DT",
      rating: 5,
      image: "/api/placeholder/200/200",
      variants: ["1kg", "3kg"],
    },
    {
      id: 102,
      name: "REAL ISOLATE – 1,8 KG",
      price: 289,
      priceDisplay: "289 DT",
      rating: 5,
      image: "/api/placeholder/200/200",
    },
  ];

  // Calculate totals using cart context
  const subtotal = getTotalPrice();
  const shipping: number = 7; // Shipping cost
  const total = subtotal + shipping;

  // Cart functions - use context functions directly
  // updateQuantity and removeFromCart are now from useCart hook

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
      // Here you would typically validate the promo code
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background pt-20"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Progress Steps */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-8 overflow-x-auto pb-2">
            {/* Step 1 - Shopping Cart */}
            <div className="flex items-center flex-shrink-0">
              <div
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold text-sm ${
                  currentStep >= 1
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <span
                className={`ml-2 font-medium text-sm sm:text-base ${
                  currentStep >= 1 ? "text-foreground" : "text-muted-foreground"
                } hidden sm:inline`}
              >
                Shopping Cart
              </span>
              <span
                className={`ml-2 font-medium text-xs ${
                  currentStep >= 1 ? "text-foreground" : "text-muted-foreground"
                } sm:hidden`}
              >
                Panier
              </span>
            </div>

            <div
              className={`flex-1 h-0.5 mx-2 ${
                currentStep >= 2 ? "bg-primary" : "bg-border"
              }`}
            ></div>

            {/* Step 2 - Shipping and Checkout */}
            <div className="flex items-center flex-shrink-0">
              <div
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold text-sm ${
                  currentStep >= 2
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <span
                className={`ml-2 font-medium text-sm sm:text-base ${
                  currentStep >= 2 ? "text-foreground" : "text-muted-foreground"
                } hidden sm:inline`}
              >
                Shipping and Checkout
              </span>
              <span
                className={`ml-2 font-medium text-xs ${
                  currentStep >= 2 ? "text-foreground" : "text-muted-foreground"
                } sm:hidden`}
              >
                Livraison
              </span>
            </div>

            <div
              className={`flex-1 h-0.5 mx-2 ${
                currentStep >= 3 ? "bg-primary" : "bg-border"
              }`}
            ></div>

            {/* Step 3 - Confirmation */}
            <div className="flex items-center flex-shrink-0">
              <div
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold text-sm ${
                  currentStep >= 3
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span
                className={`ml-2 font-medium text-sm sm:text-base ${
                  currentStep >= 3 ? "text-foreground" : "text-muted-foreground"
                } hidden sm:inline`}
              >
                Confirmation
              </span>
              <span
                className={`ml-2 font-medium text-xs ${
                  currentStep >= 3 ? "text-foreground" : "text-muted-foreground"
                } sm:hidden`}
              >
                Confirm
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content based on current step */}
        {currentStep === 1 ? (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column - Cart Items */}
              <motion.div
                className="xl:col-span-2 space-y-4 sm:space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                }
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Cart Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Votre Panier ({cartItems.length} article
                      {cartItems.length !== 1 ? "s" : ""})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cartItems.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Votre panier est vide
                        </p>
                        <Button asChild className="mt-4">
                          <Link to="/products">Continuer vos achats</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <motion.div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {/* Product Image and Info - Mobile Layout */}
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                                <Package className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                              </div>

                              {/* Product Info */}
                              <div className="flex-1 sm:flex-initial">
                                <h3 className="font-semibold text-foreground text-sm sm:text-base">
                                  {item.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                  En stock
                                </p>
                              </div>
                            </div>

                            {/* Controls Section - Mobile Layout */}
                            <div className="flex items-center justify-between w-full sm:w-auto sm:flex-shrink-0 sm:gap-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="w-8 h-8 p-0"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center font-medium text-sm sm:text-base">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="w-8 h-8 p-0"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>

                              {/* Price and Remove */}
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <p className="font-semibold text-foreground text-sm sm:text-base">
                                    {item.price * item.quantity} TND
                                  </p>
                                </div>

                                {/* Remove Button */}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Promo Code */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Code promo"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={applyPromoCode}
                        variant="outline"
                        disabled={!promoCode.trim() || promoApplied}
                      >
                        {promoApplied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          "Appliquer le code promo"
                        )}
                      </Button>
                    </div>
                    <Button
                      variant="link"
                      className="text-muted-foreground p-0 h-auto mt-2"
                      disabled
                    >
                      Mettre à jour le panier
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right Column - Order Summary */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Order Summary */}
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Résumé de commande</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span className="font-semibold">{subtotal} TND</span>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Expédition</span>
                        <span className="text-muted-foreground">
                          {shipping === 0 ? "Gratuit" : `${shipping} TND`}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Saisissez votre adresse pour voir les options de
                        livraison.
                      </p>
                      <Button
                        variant="link"
                        className="text-xs p-0 h-auto text-primary"
                      >
                        Calculer les frais d'expédition
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{total} TND</span>
                    </div>

                    <Button
                      className="w-full gradient-primary text-white py-3"
                      disabled={cartItems.length === 0}
                      size="lg"
                      onClick={() => setCurrentStep(2)}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Valider la commande
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recommended Products */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Vous serez peut-être intéressé par...
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                          <Package className="h-16 w-16 text-muted-foreground" />
                        </div>

                        <h3 className="font-semibold text-foreground mb-2">
                          {product.name}
                        </h3>

                        <div className="flex items-center mb-2">
                          {[...Array(product.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>

                        <p className="font-bold text-primary mb-4">
                          {product.priceDisplay}
                        </p>

                        {product.variants && (
                          <div className="flex gap-2 mb-4">
                            {product.variants.map((variant, i) => (
                              <Badge key={i} variant="outline">
                                {variant}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => {
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                            });
                          }}
                        >
                          Ajouter au panier
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        ) : currentStep === 2 ? (
          // Checkout Step
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Column - Billing Information */}
              <div className="lg:col-span-2">
                <Card className="p-8 shadow-lg border-0 bg-white">
                  <div className="border-b border-gray-200 pb-6 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Informations de facturation
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Veuillez remplir vos informations de livraison
                    </p>
                  </div>
                  <div className="space-y-8">
                    {/* Personal Information Section */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-red-600 font-bold text-sm">
                            1
                          </span>
                        </div>
                        Informations personnelles
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Prénom <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={checkoutForm.firstName}
                            onChange={(e) =>
                              setCheckoutForm({
                                ...checkoutForm,
                                firstName: e.target.value,
                              })
                            }
                            className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            placeholder="Votre prénom"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Nom <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={checkoutForm.lastName}
                            onChange={(e) =>
                              setCheckoutForm({
                                ...checkoutForm,
                                lastName: e.target.value,
                              })
                            }
                            className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            placeholder="Votre nom"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-red-600 font-bold text-sm">
                            2
                          </span>
                        </div>
                        Contact
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Adresse e-mail{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="email"
                            value={checkoutForm.email}
                            onChange={(e) =>
                              setCheckoutForm({
                                ...checkoutForm,
                                email: e.target.value,
                              })
                            }
                            className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            placeholder="votre@email.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Téléphone <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="tel"
                            value={checkoutForm.phone1}
                            onChange={(e) =>
                              setCheckoutForm({
                                ...checkoutForm,
                                phone1: e.target.value,
                              })
                            }
                            className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            placeholder="+216 XX XXX XXX"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address Information Section */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-red-600 font-bold text-sm">
                            3
                          </span>
                        </div>
                        Adresse de livraison
                      </h4>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Pays/région <span className="text-red-500">*</span>
                          </label>
                          <div className="h-12 bg-gray-50 border border-gray-300 rounded-md px-4 flex items-center">
                            <span className="text-gray-700 font-medium">
                              🇹🇳 Tunisie
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Gouvernorat{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <Select
                              value={checkoutForm.governorate}
                              onValueChange={(value) => {
                                setCheckoutForm({
                                  ...checkoutForm,
                                  governorate: value,
                                  delegation: "",
                                  locality: "",
                                });
                              }}
                            >
                              <SelectTrigger className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500">
                                <SelectValue placeholder="Sélectionnez le gouvernorat" />
                              </SelectTrigger>
                              <SelectContent>
                                {getGovernoratesList().map((gov) => (
                                  <SelectItem key={gov} value={gov}>
                                    {gov}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Délégation <span className="text-red-500">*</span>
                            </label>
                            <Select
                              value={checkoutForm.delegation}
                              onValueChange={(value) => {
                                setCheckoutForm({
                                  ...checkoutForm,
                                  delegation: value,
                                  locality: "",
                                });
                              }}
                              disabled={!checkoutForm.governorate}
                            >
                              <SelectTrigger className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500 disabled:bg-gray-50">
                                <SelectValue placeholder="Sélectionnez la délégation" />
                              </SelectTrigger>
                              <SelectContent>
                                {checkoutForm.governorate &&
                                  getDelegationsList(
                                    checkoutForm.governorate
                                  ).map((del) => (
                                    <SelectItem key={del} value={del}>
                                      {del}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Localité <span className="text-red-500">*</span>
                            </label>
                            <Select
                              value={checkoutForm.locality}
                              onValueChange={(value) => {
                                setCheckoutForm({
                                  ...checkoutForm,
                                  locality: value,
                                });
                              }}
                              disabled={!checkoutForm.delegation}
                            >
                              <SelectTrigger className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500 disabled:bg-gray-50">
                                <SelectValue placeholder="Sélectionnez la localité" />
                              </SelectTrigger>
                              <SelectContent>
                                {checkoutForm.governorate &&
                                  checkoutForm.delegation &&
                                  getLocalitiesList(
                                    checkoutForm.governorate,
                                    checkoutForm.delegation
                                  ).map((loc) => (
                                    <SelectItem key={loc} value={loc}>
                                      {loc}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Code postal{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <Input
                              value={checkoutForm.postalCode}
                              onChange={(e) =>
                                setCheckoutForm({
                                  ...checkoutForm,
                                  postalCode: e.target.value,
                                })
                              }
                              className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                              placeholder="Ex: 1000"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column - Order Summary */}
              <div className="space-y-6">
                {/* Order Summary */}
                <Card className="p-6 shadow-lg border-0 bg-white sticky top-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-red-600" />
                    Votre commande
                  </h3>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div>
                            <span className="font-medium text-gray-900 text-sm block">
                              {item.name}
                            </span>
                            <span className="text-gray-500 text-xs">
                              Quantité: {item.quantity}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-red-600">
                          {(item.price * item.quantity).toFixed(2)} DT
                        </span>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Sous-total</span>
                        <span className="font-medium">
                          {subtotal.toFixed(2)} DT
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Livraison</span>
                        <span className="font-medium">
                          {shipping.toFixed(2)} DT
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 text-xl font-bold border-t border-gray-200 mt-3 pt-3">
                        <span>Total</span>
                        <span className="text-red-600">
                          {total.toFixed(2)} DT
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Terms and Conditions */}
                <Card className="p-6 shadow-lg border-0 bg-white">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">
                      Conditions générales
                    </h4>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        J'accepte les{" "}
                        <a
                          href="#"
                          className="text-red-600 hover:text-red-700 underline font-medium"
                        >
                          termes et conditions
                        </a>{" "}
                        et la{" "}
                        <a
                          href="#"
                          className="text-red-600 hover:text-red-700 underline font-medium"
                        >
                          politique de confidentialité
                        </a>
                      </span>
                    </label>
                  </div>
                </Card>

                {/* Order Button */}
                <Button
                  className="w-full py-4 text-lg font-bold bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 transition-all duration-300 shadow-lg"
                  onClick={() => setCurrentStep(3)}
                  disabled={!agreedToTerms}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Commander - {total.toFixed(2)} DT
                </Button>
              </div>
            </motion.div>
          </div>
        ) : (
          // Confirmation Step
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Success Icon */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-4"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Commande confirmée !
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Merci pour votre commande. Nous avons bien reçu votre demande
                  et nous la traiterons dans les plus brefs délais.
                </p>
              </motion.div>

              {/* Order Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Card className="p-8 max-w-2xl mx-auto text-left">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b pb-4">
                      <h3 className="text-xl font-semibold">
                        Détails de la commande
                      </h3>
                      <span className="text-sm text-gray-500">
                        Commande #
                        {Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </span>
                    </div>

                    {/* Customer Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Informations client
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            {checkoutForm.firstName} {checkoutForm.lastName}
                          </p>
                          <p>{checkoutForm.email}</p>
                          <p>{checkoutForm.phone1}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Adresse de livraison
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{checkoutForm.locality}</p>
                          <p>
                            {checkoutForm.delegation},{" "}
                            {checkoutForm.governorate}
                          </p>
                          <p>Tunisie {checkoutForm.postalCode}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Articles commandés
                      </h4>
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center py-2"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-xs font-medium">
                                  {item.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  Quantité: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="font-medium">
                              {(item.price * item.quantity).toFixed(2)} DT
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-2xl">{total.toFixed(2)} DT</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="space-y-6"
              >
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Que se passe-t-il maintenant ?
                  </h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p>
                      • Vous recevrez un email de confirmation dans les
                      prochaines minutes
                    </p>
                    <p>• Notre équipe traitera votre commande sous 24-48h</p>
                    <p>• Vous serez contacté pour organiser la livraison</p>
                    <p>• Un suivi de commande vous sera envoyé par email</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentStep(1);
                      clearCart();
                      setCheckoutForm({
                        firstName: "",
                        lastName: "",
                        country: "",
                        governorate: "",
                        delegation: "",
                        locality: "",
                        postalCode: "",
                        phone1: "",
                        phone2: "",
                        email: "",
                        birthDate: "",
                        orderNotes: "",
                      });
                      setAgreedToTerms(false);
                    }}
                    className="px-8 py-3"
                  >
                    Nouvelle commande
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/")}
                    className="px-8 py-3"
                  >
                    Retour à l'accueil
                  </Button>
                </div>
              </motion.div>

              {/* Customer Support */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-center border-t pt-8"
              >
                <p className="text-gray-600 mb-2">
                  Une question sur votre commande ?
                </p>
                <p className="text-sm text-gray-500">
                  Contactez-nous au{" "}
                  <a
                    href="tel:+21612345678"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    +216 12 345 678
                  </a>{" "}
                  ou par email à{" "}
                  <a
                    href="mailto:contact@sobitas.com"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    contact@sobitas.com
                  </a>
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
