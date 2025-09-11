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
import { Link } from "react-router-dom";

const Cart = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Step state - 1 for cart, 2 for checkout
  const [currentStep, setCurrentStep] = useState(1);

  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: " SERIOUS MASS – 5,45 KG",
      price: 380,
      quantity: 1,
      image: "/api/placeholder/80/80",
      inStock: true,
    },
  ]);

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
      id: 1,
      name: "100% WHEY GOLD STANDARD – 2.27KG",
      price: "380 DT",
      rating: 5,
      image: "/api/placeholder/200/200",
      variants: ["1kg", "3kg"],
    },
    {
      id: 2,
      name: "REAL ISOLATE – 1,8 KG",
      price: "289 DT",
      rating: 5,
      image: "/api/placeholder/200/200",
    },
  ];

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping example
  const total = subtotal + shipping;

  // Cart functions
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {/* Step 1 - Shopping Cart */}
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  currentStep >= 1
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <span
                className={`ml-2 font-medium ${
                  currentStep >= 1 ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Shopping Cart
              </span>
            </div>

            <div
              className={`flex-1 h-0.5 ${
                currentStep >= 2 ? "bg-primary" : "bg-border"
              }`}
            ></div>

            {/* Step 2 - Shipping and Checkout */}
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  currentStep >= 2
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <span
                className={`ml-2 font-medium ${
                  currentStep >= 2 ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Shipping and Checkout
              </span>
            </div>

            <div
              className={`flex-1 h-0.5 ${
                currentStep >= 3 ? "bg-primary" : "bg-border"
              }`}
            ></div>

            {/* Step 3 - Confirmation */}
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  currentStep >= 3
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span
                className={`ml-2 font-medium ${
                  currentStep >= 3 ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Confirmation
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content based on current step */}
        {currentStep === 1 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
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
                        className="flex items-center gap-4 p-4 border rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.inStock ? "En stock" : "Rupture de stock"}
                          </p>
                        </div>

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
                          <span className="w-12 text-center font-medium">
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

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            {item.price * item.quantity} TND
                          </p>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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

            {/* IMPACT FIDELITY */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">IMPACT FIDELITY</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Les Points Fidélité de ce panier seront crédités sur ton
                  compte une fois le statut de la commande passé en « Terminé ».
                  Un délai de traitement de 7J est nécessaire après réception de
                  la commande pour la mise à jour du statut. Dès 1000 Points
                  cumulés (équivalents à 65 DT), soit 100 Points = 6,5 DT), le
                  module de conversion des points s'activera automatiquement.
                </p>
                <Button className="w-full gradient-primary">
                  Connecte-toi sur Mon Compte pour profiter pleinement du
                  Programme IMPACT Fidélité !
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
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
                    Saisissez votre adresse pour voir les options de livraison.
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
                      {product.price}
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

                    <Button className="w-full" variant="outline">
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
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Left Column - Billing Information */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Informations de facturation</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Prénom *</label>
                      <Input 
                        value={checkoutForm.firstName}
                        onChange={(e) => setCheckoutForm({...checkoutForm, firstName: e.target.value})}
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom *</label>
                      <Input 
                        value={checkoutForm.lastName}
                        onChange={(e) => setCheckoutForm({...checkoutForm, lastName: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Adresse e-mail *</label>
                    <Input 
                      type="email"
                      value={checkoutForm.email}
                      onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Téléphone *</label>
                    <Input 
                      type="tel"
                      value={checkoutForm.phone1}
                      onChange={(e) => setCheckoutForm({...checkoutForm, phone1: e.target.value})}
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Pays *</label>
                    <Input 
                      value={checkoutForm.country}
                      onChange={(e) => setCheckoutForm({...checkoutForm, country: e.target.value})}
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Gouvernorat *</label>
                      <Input 
                        value={checkoutForm.governorate}
                        onChange={(e) => setCheckoutForm({...checkoutForm, governorate: e.target.value})}
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Délégation *</label>
                      <Input 
                        value={checkoutForm.delegation}
                        onChange={(e) => setCheckoutForm({...checkoutForm, delegation: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Localité *</label>
                      <Input 
                        value={checkoutForm.locality}
                        onChange={(e) => setCheckoutForm({...checkoutForm, locality: e.target.value})}
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Code postal *</label>
                      <Input 
                        value={checkoutForm.postalCode}
                        onChange={(e) => setCheckoutForm({...checkoutForm, postalCode: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Right Column - Order Summary */}
              <div className="space-y-6">
                {/* Order Summary */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Votre commande</h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <span className="text-sm">{item.name} × {item.quantity}</span>
                        <span className="font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center font-semibold text-lg">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>
                </Card>

                {/* Terms and Conditions */}
                <Card className="p-6">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 mt-1"
                    />
                    <span className="text-sm">
                      J'ai lu et j'accepte les{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        conditions générales de vente
                      </a>
                    </span>
                  </label>
                </Card>

                {/* Order Button */}
                <Button 
                  className="w-full py-3 text-lg font-semibold"
                  onClick={() => setCurrentStep(3)}
                  disabled={!agreedToTerms}
                >
                  Commander - {total.toFixed(2)} €
                </Button>
              </div>
            </motion.div>
          </div>
        ) : (
          // Order Confirmation Step - Step 3
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
                  transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
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
                  Merci pour votre commande. Nous avons bien reçu votre demande et nous la traiterons dans les plus brefs délais.
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
                      <h3 className="text-xl font-semibold">Détails de la commande</h3>
                      <span className="text-sm text-gray-500">
                        Commande #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </span>
                    </div>

                    {/* Customer Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Informations client</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{checkoutForm.firstName} {checkoutForm.lastName}</p>
                          <p>{checkoutForm.email}</p>
                          <p>{checkoutForm.phone1}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Adresse de livraison</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{checkoutForm.locality}</p>
                          <p>{checkoutForm.delegation}, {checkoutForm.governorate}</p>
                          <p>{checkoutForm.country} {checkoutForm.postalCode}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Articles commandés</h4>
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between items-center py-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-xs font-medium">{item.name.charAt(0)}</span>
                              </div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-2xl">{total.toFixed(2)} €</span>
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
                  <h4 className="font-semibold text-blue-900 mb-2">Que se passe-t-il maintenant ?</h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p>• Vous recevrez un email de confirmation dans les prochaines minutes</p>
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
                      setCartItems([]);
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
                    onClick={() => window.location.href = '/'}
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
                  Contactez-nous au{' '}
                  <a href="tel:+21612345678" className="text-blue-600 hover:underline font-medium">
                    +216 12 345 678
                  </a>
                  {' '}ou par email à{' '}
                  <a href="mailto:contact@sobitas.com" className="text-blue-600 hover:underline font-medium">
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
