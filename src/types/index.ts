export interface Flower {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  shopId: string;
  isFavorite: boolean;
  dateAdded: Date;
}

export interface Shop {
  id: string;
  name: string;
  category: string;
}

export interface CartItem {
  flower: Flower;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  total: number;
  orderDate: Date;
  timeZone: string;
  appliedCoupons?: Coupon[];
  discount?: number;
  deliveryLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  shopLocation?: {
    lat: number;
    lng: number;
    name: string;
  };
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  discount: number; // percentage
  isActive: boolean;
  expiryDate: Date;
  minOrderAmount?: number;
}

export type SortOption = 'name' | 'price-low' | 'price-high' | 'date' | 'favorites';