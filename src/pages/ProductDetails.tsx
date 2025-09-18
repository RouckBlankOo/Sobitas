import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return <div>Produit introuvable.</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 pt-28">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.mainImage?.url}
          alt={product.title}
          className="w-full md:w-96 h-96 object-contain rounded-lg border"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center gap-4 mb-2">
            {product.oldPrice && (
              <span className="text-lg line-through text-gray-400">
                {product.oldPrice} DT
              </span>
            )}
            <span className="text-2xl text-red-600 font-bold">
              {product.price} DT
            </span>
          </div>
          <div className="mb-4">
            <strong>Caractéristiques:</strong>
            <ul className="list-disc ml-6">
              {product.features?.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
          <Button>Ajouter au panier</Button>
        </div>
      </div>
      <div className="mt-10">
        <div className="border-b mb-4 flex gap-6">
          <button
            className={`py-2 px-4 font-semibold border-b-2 transition-colors duration-200 ${
              activeTab === "description"
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`py-2 px-4 font-semibold border-b-2 transition-colors duration-200 ${
              activeTab === "nutrition"
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab("nutrition")}
          >
            Nutrition
          </button>
          <button
            className={`py-2 px-4 font-semibold border-b-2 transition-colors duration-200 ${
              activeTab === "questions"
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>
        </div>
        <div className="min-h-[120px]">
          {activeTab === "description" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="text-gray-700">
                {product.description || "Aucune description disponible."}
              </p>
            </div>
          )}
          {activeTab === "nutrition" && (
            <div>
              <h2 className="text-xl font-bold mb-2">
                Valeurs Nutritionnelles
              </h2>
              <p className="text-gray-700">
                {product.nutrition_values || "Non spécifié."}
              </p>
            </div>
          )}
          {activeTab === "questions" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Questions Fréquentes</h2>
              <p className="text-gray-700">
                {product.questions || "Aucune question disponible."}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Avis Clients</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <ul className="space-y-4">
            {product.reviews.map((review) => (
              <li key={review._id} className="bg-gray-100 p-4 rounded-lg">
                <div className="font-semibold">{review.user_id}</div>
                <div className="text-yellow-500">
                  {"★".repeat(review.stars)}
                </div>
                <div className="text-gray-700">{review.comment}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">Aucun avis pour ce produit.</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
