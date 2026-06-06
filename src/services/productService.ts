import axiosInstance from './axiosInstance';
import type { Product } from '../types/product.types';

const TRACTOR_NAMES = [
  "John Deere 8R 370",
  "Massey Ferguson 8700 S",
  "Case IH Steiger 580",
  "New Holland T8 Genesis",
  "Kubota M8 Series",
  "Claas Xerion 5000",
  "Fendt 1000 Vario",
  "Challenger MT700"
];

const TRACTOR_PRICES = [
  325000, 245000, 480000, 295000, 155000, 510000, 420000, 385000
];

const TRACTOR_CATEGORIES = [
  "heavy-duty",
  "utility",
  "articulated",
  "row-crop",
  "utility",
  "heavy-duty",
  "row-crop",
  "track-tractor"
];

export const transformToTractor = (product: Product, index: number): Product => {
  return {
    ...product,
    title: TRACTOR_NAMES[index % TRACTOR_NAMES.length],
    price: TRACTOR_PRICES[index % TRACTOR_PRICES.length] + Math.floor(product.price * 10), // add slight variance based on original price
    category: TRACTOR_CATEGORIES[index % TRACTOR_CATEGORIES.length],
  };
};

export const getProducts = async (): Promise<Product[]> => {
  // fetch 8 items to keep the list clean and avoid heavy image duplication
  const response = await axiosInstance.get<Product[]>('/products?limit=8');
  return response.data.map(transformToTractor);
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await axiosInstance.get<Product>(`/products/${id}`);
  return transformToTractor(response.data, id - 1); // approximate index matching based on ID
};

export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  const response = await axiosInstance.post<Product>('/products', productData);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};
