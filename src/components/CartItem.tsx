import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useApp } from '../contexts/AppContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useApp();

  const handleQuantityChange = (quantity: number) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { flowerId: item.flower.id, quantity },
    });
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.flower.id });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.flower.image}
          alt={item.flower.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{item.flower.name}</h3>
          <p className="text-purple-600 font-bold">${item.flower.price}</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          
          <span className="font-medium text-lg min-w-[2rem] text-center">
            {item.quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="text-right">
          <p className="font-bold text-gray-800">
            ${(item.flower.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <button
          onClick={handleRemove}
          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}