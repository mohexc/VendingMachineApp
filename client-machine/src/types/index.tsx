export interface Product {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  image: string;
  price: number;
}

export interface Inventory {
  id: number;
  created_at: string;
  updated_at: string;
  qyt: number;
  product: Product;
}

export interface Shop {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  image: string;
  address: string;
  isOpen: string;
}

export interface CartItem {
  inventory: Inventory;
  qyt: number;
}

export interface CurrentUser {
  id: number;
  username: string;
}

export interface ParamsInterface {
  id: string;
}
