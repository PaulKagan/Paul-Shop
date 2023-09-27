export interface User {
  username: string;
  email: string;
  password: string;
  // cart: Cart
}

export interface Rate {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image: string;
  rating?: Rate;
  count?: number;
}

export interface Cart {
  products: Product[];
}
