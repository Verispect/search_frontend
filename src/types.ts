export interface Product {
  id: string;
  product_name: string;
  brands: string;
  categories: string;
  countries: string;
  ingredients_text?: string;
  quantity?: string;
  packaging?: string;
  lang?: string;
  product_type?: string;
  created_t?: number;
  last_modified_t?: number;
}

export interface SearchResponse {
  total: number;
  limit: number;
  offset: number;
  results: Product[];
}

export interface SearchParams {
  q: string;
  brand: string;
  category: string;
  country: string;
  limit: number;
  offset: number;
}
