import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export function SkeletonLoader({ 
  className = '', 
  variant = 'rectangular', 
  width = '100%', 
  height = '1rem',
  lines = 1 
}: SkeletonLoaderProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';
  
  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded-md',
    circular: 'rounded-full'
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={{
              ...style,
              width: index === lines - 1 ? '75%' : style.width
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Specialized skeleton components
export function FlowerCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <SkeletonLoader variant="rectangular" height="12rem" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <SkeletonLoader variant="text" width="60%" height="1.5rem" />
          <SkeletonLoader variant="text" width="20%" height="1.5rem" />
        </div>
        <SkeletonLoader variant="text" lines={2} height="0.875rem" className="mb-3" />
        <div className="flex justify-between items-center">
          <SkeletonLoader variant="rectangular" width="4rem" height="1.5rem" />
          <SkeletonLoader variant="rectangular" width="7rem" height="2.5rem" />
        </div>
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-4">
        <SkeletonLoader variant="rectangular" width="4rem" height="4rem" />
        <div className="flex-1">
          <SkeletonLoader variant="text" width="70%" height="1.25rem" className="mb-2" />
          <SkeletonLoader variant="text" width="30%" height="1rem" />
        </div>
        <div className="flex items-center space-x-3">
          <SkeletonLoader variant="circular" width="2rem" height="2rem" />
          <SkeletonLoader variant="text" width="2rem" height="1.5rem" />
          <SkeletonLoader variant="circular" width="2rem" height="2rem" />
        </div>
        <SkeletonLoader variant="text" width="4rem" height="1.25rem" />
        <SkeletonLoader variant="circular" width="2.5rem" height="2.5rem" />
      </div>
    </div>
  );
}

export function OrderHistorySkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <SkeletonLoader variant="circular" width="1.5rem" height="1.5rem" />
            <div>
              <SkeletonLoader variant="text" width="8rem" height="1.25rem" className="mb-1" />
              <SkeletonLoader variant="text" width="12rem" height="1rem" />
            </div>
          </div>
          <SkeletonLoader variant="text" width="5rem" height="1.5rem" />
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <SkeletonLoader variant="text" width="6rem" height="1.25rem" className="mb-3" />
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <SkeletonLoader variant="rectangular" width="3rem" height="3rem" />
                  <div className="flex-1">
                    <SkeletonLoader variant="text" width="70%" height="1rem" className="mb-1" />
                    <SkeletonLoader variant="text" width="40%" height="0.875rem" />
                  </div>
                  <SkeletonLoader variant="text" width="3rem" height="1rem" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SkeletonLoader variant="text" width="8rem" height="1.25rem" className="mb-3" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <SkeletonLoader variant="circular" width="1rem" height="1rem" />
                  <SkeletonLoader variant="text" width="80%" height="1rem" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SkeletonLoader variant="text" width="6rem" height="1.25rem" className="mb-3" />
            <div className="bg-blue-50 rounded-lg p-4">
              <SkeletonLoader variant="text" lines={4} height="0.875rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}