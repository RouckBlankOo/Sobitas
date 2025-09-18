export interface ProductImage {
  url: string;
  img_id?: string;
}

export type Review = {
  rating: number;
  _id: string;
  id: string;
  user_id: string;
  product_id: string;
  stars: number;
  comment: string;
  publier: string;
  created_at: string;
  updated_at: string;
};

export type Product = {
  rupture: string;
  status: boolean;
  qte: number;
  quantity: number;
  zone4: string;
  zone3: string;
  zone2: string;
  zone1: string;
  content_seo: string;
  meta: string;
  aroma_ids: string[];
  designation_fr?: string;
  promo?: number;
  prix?: number;
  gallery?: boolean;
  title: string;
  price: number;
  cover?: string;
  meta_description_fr?: string;
  discountedPrice: number;
  id: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
  currency: string;
  _id: string;
  designation: string;
  slug: string;
  oldPrice?: number;
  mainImage: ProductImage;
  images?: ProductImage[];
  inStock?: boolean;
  reviews?: Review[];
  features?: string[];
  brand?: string;
  smallDescription?: string;
  description?: string;
  category?: string | {
    slug: string;
    title: string;
    _id: string;
    designation: string;
  };
  subCategory?: Array<string | { _id: string; designation: string }>;
  sous_categorie_id?: string;
  venteflashDate?: Date;
  isFlashSale?: boolean;
  discountPercentage?: number;
  type: string;
  isNewProduct?: boolean;
  isBestSeller?: boolean;
  isOutOfStock?: boolean;
  isPublished?: boolean;
  aggregateRating?: number;
  promoExpirationDate?: Date;
  createdAt?: Date | string;
  nutrition_values?: string;
  questions?: string;
};
