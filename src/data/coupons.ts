import { Coupon } from '../types';

export const coupons: Coupon[] = [
  {
    id: '1',
    code: 'SPRING20',
    name: 'Spring Special',
    description: 'Get 20% off on all spring flowers',
    discount: 20,
    isActive: true,
    expiryDate: new Date('2024-06-30'),
    minOrderAmount: 30
  },
  {
    id: '2',
    code: 'WELCOME10',
    name: 'Welcome Discount',
    description: 'First-time customer discount',
    discount: 10,
    isActive: true,
    expiryDate: new Date('2024-12-31'),
    minOrderAmount: 25
  },
  {
    id: '3',
    code: 'LOVE15',
    name: 'Love Special',
    description: 'Perfect for romantic occasions',
    discount: 15,
    isActive: true,
    expiryDate: new Date('2024-12-31'),
    minOrderAmount: 40
  },
  {
    id: '4',
    code: 'SUMMER25',
    name: 'Summer Sale',
    description: 'Beat the heat with fresh flowers',
    discount: 25,
    isActive: true,
    expiryDate: new Date('2024-08-31'),
    minOrderAmount: 50
  },
  {
    id: '5',
    code: 'BIRTHDAY12',
    name: 'Birthday Special',
    description: 'Make birthdays more special',
    discount: 12,
    isActive: true,
    expiryDate: new Date('2024-12-31'),
    minOrderAmount: 35
  },
  {
    id: '6',
    code: 'BULK30',
    name: 'Bulk Order Discount',
    description: 'For large orders and events',
    discount: 30,
    isActive: true,
    expiryDate: new Date('2024-12-31'),
    minOrderAmount: 100
  },
  {
    id: '7',
    code: 'SAVE50',
    name: 'Mega Savings',
    description: 'Huge discount for premium customers',
    discount: 50,
    isActive: true,
    expiryDate: new Date('2025-03-31'),
    minOrderAmount: 150
  },
  {
    id: '8',
    code: 'FLOWERS30',
    name: 'Flower Power',
    description: 'Special discount on all flower arrangements',
    discount: 30,
    isActive: true,
    expiryDate: new Date('2025-02-28'),
    minOrderAmount: 75
  },
  {
    id: '9',
    code: 'VALENTINE20',
    name: 'Valentine Special',
    description: 'Perfect for your loved ones',
    discount: 20,
    isActive: true,
    expiryDate: new Date('2025-02-14'),
    minOrderAmount: 60
  },
  {
    id: '10',
    code: 'NEWUSER25',
    name: 'New Customer Bonus',
    description: 'Welcome bonus for new customers',
    discount: 25,
    isActive: true,
    expiryDate: new Date('2025-12-31'),
    minOrderAmount: 40
  }
];