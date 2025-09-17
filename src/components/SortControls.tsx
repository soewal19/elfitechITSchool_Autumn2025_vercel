import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { SortOption } from '../types';

export function SortControls() {
  const { state, dispatch } = useApp();

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name', label: 'Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'date', label: 'Date Added' },
    { value: 'favorites', label: 'Favorites First' },
  ];

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <ArrowUpDown className="h-5 w-5 text-gray-600" />
        <span className="font-medium text-gray-700">Sort by:</span>
      </div>
      <select
        value={state.sortBy}
        onChange={(e) => dispatch({ type: 'SET_SORT_BY', payload: e.target.value as SortOption })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}