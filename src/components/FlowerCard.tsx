import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Flower } from '../types';
import { useApp } from '../contexts/AppContext';

interface FlowerCardProps {
  flower: Flower;
}

export function FlowerCard({ flower }: FlowerCardProps) {
  const { dispatch, shops } = useApp();
  const shop = shops.find(s => s.id === flower.shopId);
  const [imgError, setImgError] = React.useState(false);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: flower });
  };

  const handleToggleFavorite = async () => {
    // Optimistic update
    dispatch({ type: 'TOGGLE_FAVORITE', payload: flower.id });
    try {
      const API_BASE = (import.meta as any)?.env?.VITE_API_URL || 'http://localhost:4000';
      await fetch(`${API_BASE}/api/flowers/${flower.id}/favorite`, { method: 'PATCH' });
    } catch (e) {
      // В случае ошибки серверного запроса оставляем локальное состояние,
      // так как избранное также хранится в localStorage.
      // Здесь можно реализовать откат или уведомление при необходимости.
      console.warn('Failed to sync favorite with API', e);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      data-testid="flower-card"
    >
      <div className="relative">
        {(!flower.image || imgError) ? (
          <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400 uppercase tracking-wide">
            no image
          </div>
        ) : (
          <img
            src={flower.image}
            alt={flower.name}
            className="w-full h-48 object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        <button
          onClick={handleToggleFavorite}
          data-testid="favorite-button"
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            flower.isFavorite
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white bg-opacity-80 text-gray-600 hover:bg-opacity-100'
          }`}
        >
          <Heart className={`h-5 w-5 ${flower.isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 text-lg">{flower.name}</h3>
          <span 
            className="font-bold text-purple-600 text-lg"
            data-testid="flower-price"
          >
            ${flower.price}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{flower.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {shop?.name}
          </span>
          <button
            onClick={handleAddToCart}
            data-testid="add-to-cart"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:from-purple-600 hover:to-pink-600 flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}