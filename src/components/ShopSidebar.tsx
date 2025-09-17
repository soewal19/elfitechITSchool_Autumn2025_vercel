import React from 'react';
import { useApp } from '../contexts/AppContext';

export function ShopSidebar() {
  const { state, dispatch, shops } = useApp();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Shops:</h3>
      <div className="space-y-2">
        <button
          onClick={() => dispatch({ type: 'SET_SELECTED_SHOP', payload: null })}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
            state.selectedShop === null
              ? 'bg-purple-100 text-purple-800 border border-purple-200'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          All Shops
        </button>
        {shops.map((shop) => (
          <button
            key={shop.id}
            onClick={() => dispatch({ type: 'SET_SELECTED_SHOP', payload: shop.id })}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
              state.selectedShop === shop.id
                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div>
              <div className="font-medium">{shop.name}</div>
              <div className="text-sm text-gray-500">{shop.category}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}