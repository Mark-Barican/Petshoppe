export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
}

export interface Testimonial {
  name: string;
  time: string;
  rating: number;
  review: string;
  avatarUrl: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  id: number;
  userId: number;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}
