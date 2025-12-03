export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
<<<<<<< HEAD
=======
}

export interface AppointmentPetInfo {
  id: number;
  name: string;
  species?: string | null;
  breed?: string | null;
}

export interface Appointment {
  id: number;
  service: string;
  groomer: string;
  date: string;
  status: string;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  pet?: AppointmentPetInfo | null;
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
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
