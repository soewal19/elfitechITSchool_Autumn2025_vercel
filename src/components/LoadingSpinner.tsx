import React from 'react';
import { Flower, Loader2, Heart, ShoppingCart } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'flower' | 'cart' | 'heart';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default', 
  text = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const getIcon = () => {
    switch (variant) {
      case 'flower':
        return <Flower className={`${sizeClasses[size]} text-purple-600 animate-spin`} />;
      case 'cart':
        return <ShoppingCart className={`${sizeClasses[size]} text-pink-600 animate-bounce`} />;
      case 'heart':
        return <Heart className={`${sizeClasses[size]} text-red-500 animate-pulse`} />;
      default:
        return <Loader2 className={`${sizeClasses[size]} text-purple-600 animate-spin`} />;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative">
        {getIcon()}
        {variant === 'default' && (
          <div className="absolute inset-0 rounded-full border-2 border-purple-200 animate-ping"></div>
        )}
      </div>
      {text && (
        <p className={`${textSizes[size]} text-gray-600 font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
}

// Specialized loading components
export function FlowerLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <Flower className="h-16 w-16 text-purple-600 animate-spin" />
        <div className="absolute inset-0 rounded-full border-4 border-purple-200 animate-ping"></div>
      </div>
      <div className="mt-4 space-y-2 text-center">
        <p className="text-lg font-semibold text-gray-800 animate-pulse">
          Loading Beautiful Flowers...
        </p>
        <p className="text-sm text-gray-600">
          Preparing the finest selection for you
        </p>
      </div>
      <div className="mt-6 flex space-x-2">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}

export function CartLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <ShoppingCart className="h-12 w-12 text-pink-600 animate-bounce" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
        Loading Cart...
      </p>
    </div>
  );
}

export function AnalyticsLoadingSpinner() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-2 border-pink-200 border-b-pink-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-xl font-semibold text-gray-800 animate-pulse">
            Generating Analytics...
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Analyzing sales data and trends
          </p>
        </div>
        <div className="mt-6 flex space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg animate-pulse"></div>
            <span className="text-xs text-gray-500 mt-1">Revenue</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <span className="text-xs text-gray-500 mt-1">Orders</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <span className="text-xs text-gray-500 mt-1">Products</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-8 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-4 border-pink-200 border-b-pink-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          <Flower className="absolute inset-0 m-auto h-8 w-8 text-purple-600 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 animate-pulse">
          Flower Delivery
        </h2>
        <p className="text-gray-600 animate-pulse">
          Loading your beautiful experience...
        </p>
        <div className="mt-6 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}