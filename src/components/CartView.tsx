import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { CartLoadingSpinner } from './LoadingSpinner';
import { SuspenseWrapper } from './SuspenseWrapper';
import { CartItem } from './CartItem';
import { OrderForm } from './OrderForm';
import { OrderSuccess } from './OrderSuccess';
import { useApp } from '../contexts/AppContext';
import { Order } from '../types';

export function CartView() {
  const { state } = useApp();
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleOrderComplete = (order: Order) => {
    setCompletedOrder(order);
  };

  const handleBackToShop = () => {
    setCompletedOrder(null);
  };

  if (completedOrder) {
    return <OrderSuccess order={completedOrder} onBackToShop={handleBackToShop} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
        <ShoppingBag className="h-8 w-8 mr-2" />
        Shopping Cart ({state.cart.length} items)
      </h2>

      {state.cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:shadow-md hover:from-purple-600 hover:to-pink-600"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <CartLoadingSpinner />
            ) : (
              <SuspenseWrapper variant="component">
                <div className="space-y-4">
                  {state.cart.map((item) => (
                    <CartItem key={item.flower.id} item={item} />
                  ))}
                </div>
              </SuspenseWrapper>
            )}
          </div>

          {/* Order Form */}
          <div className="lg:col-span-1">
            <SuspenseWrapper variant="component">
              <OrderForm onOrderComplete={handleOrderComplete} />
            </SuspenseWrapper>
          </div>
        </div>
      )}
    </div>
  );
}