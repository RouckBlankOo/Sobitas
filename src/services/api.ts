// Frontend-only API service - no backend dependencies
import type { Product } from '../types/product';
import { products } from '../data/products';

// Mock delay to simulate API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    await delay(300); // Simulate API delay
    return [...products];
  },

  // Get product by ID
  getById: async (id: number): Promise<Product> => {
    await delay(200);
    const product = products.find(p => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return { ...product };
  },

  // Get products by category
  getByCategory: async (category: string): Promise<Product[]> => {
    await delay(250);
    return products.filter(product => 
      typeof product.category === 'string' 
        ? product.category === category
        : product.category?.slug === category
    );
  },

  // Create new product (admin only) - mock implementation
  create: async (product: Partial<Product>): Promise<Product> => {
    await delay(400);
    const newProduct: Product = {
      id: Date.now(),
      title: product.title || 'New Product',
      designation: product.designation || 'New Product',
      slug: product.slug || 'new-product',
      _id: Date.now().toString(),
      description: product.description || 'New product description',
      price: product.price || 0,
      discountedPrice: product.discountedPrice || product.price || 0,
      currency: product.currency || 'DT',
      category: product.category || 'General',
      mainImage: product.mainImage || { url: '/placeholder.svg' },
      inStock: product.inStock ?? true,
      type: product.type || 'product',
      rupture: product.rupture || 'false',
      status: product.status ?? true,
      qte: product.qte || 0,
      quantity: product.quantity || 0,
      zone1: product.zone1 || '',
      zone2: product.zone2 || '',
      zone3: product.zone3 || '',
      zone4: product.zone4 || '',
      content_seo: product.content_seo || '',
      meta: product.meta || '',
      aroma_ids: product.aroma_ids || []
    };
    return newProduct;
  },

  // Update product (admin only) - mock implementation
  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    await delay(300);
    const existing = products.find(p => p.id === id);
    if (!existing) {
      throw new Error(`Product with id ${id} not found`);
    }
    const updated = { ...existing, ...product, id };
    return updated;
  },

  // Delete product (admin only) - mock implementation
  delete: async (id: number): Promise<void> => {
    await delay(200);
    // Mock deletion - in a real app this would remove from local state
    console.log(`Mock: Product ${id} deleted`);
  },
};

export const categoryApi = {
  // Get all categories - using predefined categories
  getAll: async () => {
    await delay(200);
    const categories = [
      { id: 1, name: 'Protéines', slug: 'proteins' },
      { id: 2, name: 'Compléments Alimentaires', slug: 'dietary' },
      { id: 3, name: 'Équipement', slug: 'equipment' },
      { id: 4, name: 'Pré-workout', slug: 'pre-workout' },
      { id: 5, name: 'BCAA', slug: 'bcaa' },
    ];
    return categories;
  },

  // Get category by ID - mock implementation
  getById: async (id: number) => {
    await delay(150);
    const categories = await categoryApi.getAll();
    const category = categories.find(c => c.id === id);
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return category;
  },

  // Create new category (admin only) - mock implementation
  create: async (category: { name: string; slug?: string }) => {
    await delay(300);
    const newCategory = { 
      id: Date.now(), 
      name: category.name,
      slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-')
    };
    return newCategory;
  },

  // Update category (admin only) - mock implementation
  update: async (id: number, category: { name: string; slug?: string }) => {
    await delay(250);
    const updated = { 
      id, 
      name: category.name,
      slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-')
    };
    return updated;
  },

  // Delete category (admin only) - mock implementation
  delete: async (id: number) => {
    await delay(200);
    console.log(`Mock: Category ${id} deleted`);
  },
};

// No actual API instance needed for frontend-only version
export default {
  get: async () => ({ data: [] }),
  post: async () => ({ data: {} }),
  patch: async () => ({ data: {} }),
  delete: async () => ({ data: {} }),
};
