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
