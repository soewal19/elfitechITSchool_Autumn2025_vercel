import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flower, ShoppingCart, Heart, Ticket, History } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Header() {
  const { state } = useApp();
  const location = useLocation();
  
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = state.flowers.filter(flower => flower.isFavorite).length;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Flower className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">Flower Delivery</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8" data-testid="desktop-nav">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Flower className="h-4 w-4" />
              <span>Shop</span>
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                isActive('/favorites') 
                  ? 'bg-red-100 text-red-700' 
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  <span data-testid="favorites-counter">{favoritesCount}</span>
                </span>
              )}
            </Link>

            <Link
              to="/coupons"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/coupons') 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Ticket className="h-4 w-4" />
              <span>Coupons</span>
            </Link>

            <Link
              to="/history"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/history') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <History className="h-4 w-4" />
              <span>History</span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                isActive('/cart') 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-md hover:from-purple-600 hover:to-pink-600'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  <span data-testid="cart-counter">{cartItemsCount}</span>
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link
              to="/cart"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-200 hover:shadow-md relative"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 py-2" data-testid="mobile-nav">
          <nav className="flex items-center justify-around">
            <Link
              to="/"
              className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'text-purple-700' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Flower className="h-5 w-5" />
              <span>Shop</span>
            </Link>

            <Link
              to="/favorites"
              className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 relative ${
                isActive('/favorites') 
                  ? 'text-red-700' 
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link
              to="/coupons"
              className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive('/coupons') 
                  ? 'text-green-700' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Ticket className="h-5 w-5" />
              <span>Coupons</span>
            </Link>

            <Link
              to="/history"
              className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive('/history') 
                  ? 'text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <History className="h-5 w-5" />
              <span>History</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}