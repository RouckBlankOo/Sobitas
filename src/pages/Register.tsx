import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { Users, Building2, Eye, EyeOff, Check } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("Veuillez accepter les conditions générales");
      return;
    }

    // Here you would typically handle registration
    console.log("Registration data:", formData);

    // Simulate successful registration
    alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
    navigate("/login");
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Créer un compte
              </CardTitle>
              <p className="text-sm sm:text-base text-gray-600">
                Rejoignez la communauté Sobitas
              </p>
            </CardHeader>

            <CardContent className="px-4 sm:px-6 pb-6">
              {/* User Type Toggle */}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Prénom *"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="h-11 sm:h-12 text-base"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Nom *"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="h-11 sm:h-12 text-base"
                    />
                  </div>
                </div>

                <div>
                  <Input
                    placeholder="Adresse e-mail *"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-11 sm:h-12 text-base"
                  />
                </div>

                <div>
                  <Input
                    placeholder="Numéro de téléphone *"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-11 sm:h-12 text-base"
                  />
                </div>

                <Separator className="my-4" />

                {/* Password */}
                <div className="relative">
                  <Input
                    placeholder="Mot de passe *"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="h-11 sm:h-12 pr-12 text-base"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 sm:h-12 w-12 px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="relative">
                  <Input
                    placeholder="Confirmer le mot de passe *"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="h-11 sm:h-12 pr-12 text-base"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 sm:h-12 w-12 px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreeToTerms}
                    onChange={(e) =>
                      handleInputChange("agreeToTerms", e.target.checked)
                    }
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm sm:text-base text-gray-600 leading-relaxed"
                  >
                    J'accepte les{" "}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      conditions générales d'utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link
                      to="/privacy"
                      className="text-blue-600 hover:underline"
                    >
                      politique de confidentialité
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-base sm:text-lg"
                >
                  Créer mon compte
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-sm sm:text-base text-gray-600 mb-3">
                  Vous avez déjà un compte ?
                </p>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="w-full h-11 sm:h-12 text-base"
                  >
                    Se connecter
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
