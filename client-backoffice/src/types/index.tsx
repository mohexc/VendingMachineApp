export interface Machine {
  id: string;
  name: string;
  image: string;
  address: string;
}

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
  inventories: Inventory[];
}

export interface CartItem {
  inventory: Inventory;
  qyt: number;
}

export interface CurrentUser {
  id: number;
  username: string;
}

export interface OrderItem {
  id: number;
  created_at: string;
  updated_at: string;
  qyt: number;
  product: Product;
}

export interface Order {
  id: number;
  created_at: string;
  updated_at: string;
  total_price: number;
  shop: Shop;
  order_items: OrderItem[];
}
export interface Alert {
  id: number;
  created_at: string;
  updated_at: string;
  isReaded: false;
  description: string;
  title: string;
  shop: Shop;
}

export interface CreateModalRef {
  showModal(): void;
}

export interface ParamsInterface {
  id: string;
}

export interface AlertInterface {
  title: string;
  description: string;
  isReaded: boolean;
  id: number;
  created_at: string;
  updated_at: string;
}
