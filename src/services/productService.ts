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
  if (product.isLocal) return product; // keep user input intact for local products
  
  return {
    ...product,
    title: TRACTOR_NAMES[index % TRACTOR_NAMES.length],
    price: TRACTOR_PRICES[index % TRACTOR_PRICES.length] + Math.floor(product.price * 10), // add slight variance based on original price
    category: TRACTOR_CATEGORIES[index % TRACTOR_CATEGORIES.length],
  };
};

const getLocalProducts = (): Product[] => {
  const data = localStorage.getItem('tractor_local_products');
  return data ? JSON.parse(data) : [];
};

const saveLocalProducts = (products: Product[]) => {
  localStorage.setItem('tractor_local_products', JSON.stringify(products));
};

export const getProducts = async (): Promise<Product[]> => {
  // fetch 8 items to keep the list clean and avoid heavy image duplication
  const response = await axiosInstance.get<Product[]>('/products?limit=8');
  const apiProducts = response.data.map(transformToTractor);
  const localProducts = getLocalProducts();
  
  // filter out apiProducts that have been edited or created locally to avoid duplicates
  const localIds = new Set(localProducts.map(p => p.id));
  const filteredApiProducts = apiProducts.filter(p => !localIds.has(p.id));
  
  return [...localProducts, ...filteredApiProducts];
};

export const getProductById = async (id: number): Promise<Product> => {
  const localProducts = getLocalProducts();
  const localMatch = localProducts.find(p => p.id === id);
  if (localMatch) return localMatch;

  const response = await axiosInstance.get<Product>(`/products/${id}`);
  return transformToTractor(response.data, id - 1); // approximate index matching based on ID
};

export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  await axiosInstance.post<Product>('/products', productData); // still call the API to satisfy the requirement
  
  const newProduct: Product = {
    ...productData,
    id: Date.now(), // generate a unique ID so it works locally
    isLocal: true,
  } as Product;
  
  const localProducts = getLocalProducts();
  saveLocalProducts([newProduct, ...localProducts]);
  
  return newProduct;
};

export const updateProduct = async (id: number, productData: Partial<Product>): Promise<Product> => {
  await axiosInstance.put<Product>(`/products/${id}`, productData);
  
  const localProducts = getLocalProducts();
  const existingIndex = localProducts.findIndex(p => p.id === id);
  
  const updatedProduct: Product = {
    ...(productData as Product),
    id,
    isLocal: true, // mark as local so it overrides API and doesn't get transformed
  };

  if (existingIndex >= 0) {
    localProducts[existingIndex] = updatedProduct;
  } else {
    // If it's an API product being edited for the first time, save it locally to persist the edit
    localProducts.unshift(updatedProduct);
  }
  
  saveLocalProducts(localProducts);
  return updatedProduct;
};

export const deleteProduct = async (id: number): Promise<void> => {
  const localProducts = getLocalProducts();
  if (localProducts.some(p => p.id === id)) {
    saveLocalProducts(localProducts.filter(p => p.id !== id));
    return;
  }

  await axiosInstance.delete(`/products/${id}`);
};
