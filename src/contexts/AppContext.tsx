import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Flower, CartItem, CustomerInfo, Order, SortOption, Coupon } from '../types';
import { flowers as initialFlowers, shops } from '../data/mockData';
import { coupons } from '../data/coupons';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AppState {
  flowers: Flower[];
  cart: CartItem[];
  selectedShop: string | null;
  sortBy: SortOption;
  orders: Order[];
  appliedCoupons: Coupon[];
  currentPage: number;
  itemsPerPage: number;
  currentPage: number;
  itemsPerPage: number;
  showAnalytics: boolean;
}

type AppAction =
  | { type: 'SET_SELECTED_SHOP'; payload: string | null }
  | { type: 'SET_SORT_BY'; payload: SortOption }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'ADD_TO_CART'; payload: Flower }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { flowerId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'LOAD_FLOWERS'; payload: Flower[] }
  | { type: 'APPLY_COUPON'; payload: Coupon }
  | { type: 'REMOVE_COUPON'; payload: string }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
  | { type: 'TOGGLE_ANALYTICS' };

const initialState: AppState = {
  flowers: initialFlowers,
  cart: [],
  selectedShop: null,
  sortBy: 'name',
  orders: [],
  appliedCoupons: [],
  currentPage: 1,
  itemsPerPage: 12,
  currentPage: 1,
  itemsPerPage: 12,
  showAnalytics: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SELECTED_SHOP':
      return { ...state, selectedShop: action.payload };
    
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        flowers: state.flowers.map(flower =>
          flower.id === action.payload
            ? { ...flower, isFavorite: !flower.isFavorite }
            : flower
        ),
      };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.flower.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.flower.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { flower: action.payload, quantity: 1 }],
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.flower.id !== action.payload),
      };
    
    case 'UPDATE_CART_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.flower.id !== action.payload.flowerId),
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.flower.id === action.payload.flowerId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: [],
      };
    
    case 'LOAD_CART':
      return { ...state, cart: action.payload };
    
    case 'LOAD_FLOWERS':
      return { ...state, flowers: action.payload };
    
    case 'APPLY_COUPON':
      const couponExists = state.appliedCoupons.find(c => c.id === action.payload.id);
      if (couponExists) return state;
      return {
        ...state,
        appliedCoupons: [...state.appliedCoupons, action.payload],
      };
    
    case 'REMOVE_COUPON':
      return {
        ...state,
        appliedCoupons: state.appliedCoupons.filter(c => c.id !== action.payload),
      };
    
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SET_ITEMS_PER_PAGE':
      return { ...state, itemsPerPage: action.payload, currentPage: 1 };
    
    case 'TOGGLE_ANALYTICS':
      return { ...state, showAnalytics: !state.showAnalytics };
    
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SET_ITEMS_PER_PAGE':
      return { ...state, itemsPerPage: action.payload, currentPage: 1 };
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  shops: typeof shops;
  coupons: typeof coupons;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [storedCart, setStoredCart] = useLocalStorage<CartItem[]>('flower-cart', []);
  const [storedFlowers, setStoredFlowers] = useLocalStorage<Flower[]>('flower-favorites', initialFlowers);

  useEffect(() => {
    dispatch({ type: 'LOAD_CART', payload: storedCart });
    dispatch({ type: 'LOAD_FLOWERS', payload: storedFlowers });
  }, []);

  useEffect(() => {
    setStoredCart(state.cart);
  }, [state.cart, setStoredCart]);

  useEffect(() => {
    setStoredFlowers(state.flowers);
  }, [state.flowers, setStoredFlowers]);

  return (
    <AppContext.Provider value={{ state, dispatch, shops, coupons }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}