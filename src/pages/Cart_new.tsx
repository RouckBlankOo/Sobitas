import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  ShoppingCart,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Lock,
} from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Current step state (1: Cart, 2: Checkout, 3: Confirmation)
  const [currentStep, setCurrentStep] = useState(1);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Whey Protein Premium", price: 45.99, quantity: 2 },
    { id: 2, name: "Créatine Monohydrate", price: 29.99, quantity: 1 },
    { id: 3, name: "Pre-Workout Energy", price: 34.99, quantity: 1 },
  ]);

  const [promoCode, setPromoCode] = useState("");

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

  const [paymentMethod, setPaymentMethod] = useState("delivery");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Recommended products
  const recommendedProducts = [
    {
      id: 1,
      name: "Whey Protein Premium",
      price: "45.99",
      originalPrice: "59.99",
      description:
        "Protéine de lactosérum de haute qualité pour la récupération musculaire.",
      variants: ["Vanille", "Chocolat", "Fraise"],
    },
    {
      id: 2,
      name: "Créatine Monohydrate",
      price: "29.99",
      description: "Créatine pure pour améliorer les performances et la force.",
    },
    {
      id: 3,
      name: "Pre-Workout Energy",
      price: "34.99",
      description:
        "Boost d'énergie pré-entraînement avec caféine et vitamines.",
      variants: ["Fruit Punch", "Blue Raspberry"],
    },
  ];

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  // Functions
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    // Logic for applying promo code
    console.log("Applying promo code:", promoCode);
  };

  const resetCart = () => {
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
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {currentStep === 1 && "Votre Panier"}
            {currentStep === 2 && "Informations de livraison"}
            {currentStep === 3 && "Commande confirmée"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentStep === 1 &&
              "Vérifiez vos articles et procédez au paiement"}
            {currentStep === 2 &&
              "Complétez vos informations pour finaliser votre commande"}
            {currentStep === 3 &&
              "Merci pour votre commande ! Nous la traiterons rapidement."}
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${
                    currentStep >= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <ArrowRight
                    className={`w-5 h-5 mx-2 ${
                      currentStep > step
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step 1: Cart Items */}
        {currentStep === 1 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-lg text-muted-foreground mb-4">
                      Votre panier est vide
                    </p>
                    <Button onClick={() => (window.location.href = "/shop")}>
                      Continuer les achats
                    </Button>
                  </Card>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-card rounded-lg p-4 shadow-sm border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl font-semibold text-gray-600">
                            {item.name.charAt(0)}
                          </span>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-muted-foreground">
                            {item.price}DT / unité
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(0, item.quantity - 1)
                              )
                            }
                          >
                            -
                          </Button>
                          <span className="w-12 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            {(item.price * item.quantity).toFixed(2)}DT
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Right column - Order Summary */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)}DT</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span>
                        {shipping === 0 ? "Gratuite" : `${shipping}DT`}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{total.toFixed(2)}DT</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Code promo"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyPromoCode}>
                        Appliquer
                      </Button>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => setCurrentStep(2)}
                      disabled={cartItems.length === 0}
                    >
                      Valider la commande
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Recommended Products */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16"
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
                    <Card className="overflow-hidden">
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-400">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xl font-bold text-primary">
                            {product.price}DT
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice}DT
                            </span>
                          )}
                        </div>

                        {product.variants && (
                          <div className="space-y-2 mb-4">
                            <p className="text-sm font-medium">Saveurs:</p>
                            <div className="flex flex-wrap gap-1">
                              {product.variants.map((variant, index) => (
                                <span
                                  key={index}
                                  className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                                >
                                  {variant}
                                </span>
                              ))}
                            </div>
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
        )}

        {/* Step 2: Checkout Form */}
        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Left Column - Billing Information */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">
                  Informations de facturation
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Prénom *
                      </label>
                      <Input
                        value={checkoutForm.firstName}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            firstName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nom *
                      </label>
                      <Input
                        value={checkoutForm.lastName}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            lastName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Adresse e-mail *
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
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Téléphone *
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
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Pays *
                    </label>
                    <Input
                      value={checkoutForm.country}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          country: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Gouvernorat *
                      </label>
                      <Input
                        value={checkoutForm.governorate}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            governorate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Délégation *
                      </label>
                      <Input
                        value={checkoutForm.delegation}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            delegation: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Localité *
                      </label>
                      <Input
                        value={checkoutForm.locality}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            locality: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Code postal *
                      </label>
                      <Input
                        value={checkoutForm.postalCode}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            postalCode: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Right Column - Order Summary & Payment */}
              <div className="space-y-6">
                {/* Order Summary */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Votre commande</h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          {(item.price * item.quantity).toFixed(2)} DT
                        </span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center font-semibold text-lg">
                      <span>Total</span>
                      <span>{total.toFixed(2)} DT</span>
                    </div>
                  </div>
                </Card>

                {/* Payment Method */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Mode de paiement
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="flex-1">Carte bancaire</span>
                      <div className="flex space-x-1">
                        <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          VISA
                        </div>
                        <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                          MC
                        </div>
                        <div className="w-8 h-5 bg-gray-800 rounded text-white text-xs flex items-center justify-center font-bold">
                          ???
                        </div>
                      </div>
                    </label>

                    {/* Card Payment Form - Shows when card is selected */}
                    {paymentMethod === "card" && (
                      <div className="border rounded-lg p-4 bg-blue-50">
                        <p className="text-sm text-blue-800 mb-4 flex items-center">
                          <Lock className="w-4 h-4 mr-2" />
                          Payez avec votre carte bancaire à travers le service
                          ClicToPay et bénéficiez de 25 Points de Fidélité et
                          d'une livraison gratuite.
                        </p>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Numéro de carte *
                            </label>
                            <Input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Date d'expiration *
                              </label>
                              <Input
                                type="text"
                                placeholder="MM/AA"
                                className="w-full"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                CVV *
                              </label>
                              <Input
                                type="text"
                                placeholder="123"
                                className="w-full"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Nom sur la carte *
                            </label>
                            <Input
                              type="text"
                              placeholder="JOHN DOE"
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    )}
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
                      J'ai lu et j'accepte les{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        conditions générales de vente
                      </a>
                    </span>
                  </label>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setCurrentStep(3)}
                    disabled={!agreedToTerms}
                  >
                    Commander - {total.toFixed(2)} DT
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {currentStep === 3 && (
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
                          <p>
                            {checkoutForm.country} {checkoutForm.postalCode}
                          </p>
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

                    {/* Payment Method */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Mode de paiement:{" "}
                        <span className="font-medium capitalize">
                          {paymentMethod}
                        </span>
                      </p>
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
                    onClick={resetCart}
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
