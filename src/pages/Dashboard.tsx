import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  TrendingUp,
  Package,
  CreditCard,
  Users,
  Calendar,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userStats, setUserStats] = useState({
    totalOrders: 24,
    pendingOrders: 3,
    monthlySpending: 8950,
    availableCredit: 15000,
    totalSavings: 2340,
    loyaltyPoints: 1250,
  });

  const [recentOrders] = useState([
    {
      id: "CMD-2024-001",
      date: "2024-09-10",
      status: "livré",
      total: 1250.0,
      items: 8,
    },
    {
      id: "CMD-2024-002",
      date: "2024-09-08",
      status: "en cours",
      total: 2100.0,
      items: 15,
    },
    {
      id: "CMD-2024-003",
      date: "2024-09-05",
      status: "préparation",
      total: 850.0,
      items: 6,
    },
  ]);

  const [specialOffers] = useState([
    {
      title: "Réduction Volume Protéines",
      description:
        "15% de réduction sur les commandes de 50+ unités de protéines",
      validUntil: "2024-09-30",
      code: "PROTEIN15",
    },
    {
      title: "Offre Matériel Fitness",
      description: "Livraison gratuite sur tout équipement fitness",
      validUntil: "2024-09-25",
      code: "FREESHIP",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "livré":
        return "bg-green-100 text-green-800";
      case "en cours":
        return "bg-blue-100 text-blue-800";
      case "préparation":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "livré":
        return <CheckCircle className="w-4 h-4" />;
      case "en cours":
        return <Clock className="w-4 h-4" />;
      case "préparation":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Tableau de Bord
          </motion.h1>
          <p className="text-gray-600">
            Gérez vos commandes et consultez vos avantages
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Commandes totales
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {userStats.totalOrders}
                    </p>
                    <p className="text-sm text-green-600 mt-1">+12% ce mois</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      En attente
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {userStats.pendingOrders}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">À traiter</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Crédit disponible
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {userStats.availableCredit.toLocaleString()} TND
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Limite: 20,000 TND
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Économies totales
                    </p>
                    <p className="text-3xl font-bold text-purple-600">
                      {userStats.totalSavings.toLocaleString()} TND
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      Avec tarifs préférentiels
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Commandes récentes
                  </CardTitle>
                  <Link to="/orders">
                    <Button variant="outline" size="sm" className="text-sm">
                      Voir tout
                      <Eye className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-lg ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {order.id}
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.date} • {order.items} articles
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            {order.total.toFixed(2)} TND
                          </p>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Special Offers */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-0 shadow-sm mb-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Offres Spéciales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {specialOffers.map((offer, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {offer.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {offer.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800"
                          >
                            {offer.code}
                          </Badge>
                          <p className="text-xs text-gray-500">
                            Expire le {offer.validUntil}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Loyalty Program */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Programme de Fidélité
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-4">
                      <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-800">
                        {userStats.loyaltyPoints}
                      </p>
                      <p className="text-sm text-purple-600">
                        Points de fidélité
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Gagnez 1 point pour chaque 10 TND dépensé
                    </p>
                    <Button className="w-full" variant="outline">
                      Échanger mes points
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Actions Rapides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/products">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col space-y-2 w-full"
                  >
                    <Package className="w-6 h-6" />
                    <span className="text-sm">Catalogue</span>
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col space-y-2 w-full"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span className="text-sm">Nouvelle commande</span>
                  </Button>
                </Link>
                <Link to="/orders">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col space-y-2 w-full"
                  >
                    <Calendar className="w-6 h-6" />
                    <span className="text-sm">Mes commandes</span>
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col space-y-2 w-full"
                  >
                    <Users className="w-6 h-6" />
                    <span className="text-sm">Support</span>
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

export default Dashboard;
