export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
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
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
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
