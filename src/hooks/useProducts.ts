import { useState, useEffect } from 'react';
import { productApi } from '../services/api';
import type { Product } from '../types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAll();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (category: string) => {
    try {
      setLoading(true);
      const data = await productApi.getByCategory(category);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id: number): Promise<Product | null> => {
    try {
      return await productApi.getById(id);
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductsByCategory,
    getProduct,
    refetch: fetchProducts,
  };
};
