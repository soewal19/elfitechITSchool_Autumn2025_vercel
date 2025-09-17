import React from 'react';
import { CheckCircle, Package, Clock, MapPin, Navigation } from 'lucide-react';
import { Order } from '../types';
import { GoogleMap } from './GoogleMap';

interface OrderSuccessProps {
  order: Order;
  onBackToShop: () => void;
}

export function OrderSuccess({ order, onBackToShop }: OrderSuccessProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <div className="flex items-center mb-2">
                  <Package className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="font-semibold text-gray-700">Order ID:</span>
                </div>
                <p className="text-gray-800 font-mono">{order.id}</p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="font-semibold text-gray-700">Order Date:</span>
                </div>
                <p className="text-gray-800">{formatDate(order.orderDate)}</p>
              </div>
            </div>
          </div>

          <div className="text-left mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Order Summary:</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.flower.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div>
                    <span className="font-medium">{item.flower.name}</span>
                    <span className="text-gray-600 ml-2">×{item.quantity}</span>
                  </div>
                  <span className="font-medium">${(item.flower.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {order.appliedCoupons && order.appliedCoupons.length > 0 && (
                <div className="py-2 border-b border-gray-200">
                  <div className="text-sm text-green-600">
                    Applied Coupons: {order.appliedCoupons.map(c => c.code).join(', ')}
                  </div>
                  <div className="text-sm text-green-600">
                    Discount: -${order.discount?.toFixed(2) || '0.00'}
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold text-purple-600">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="text-left mb-8">
            <h3 className="font-semibold text-gray-800 mb-3">Delivery Information:</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p><strong>Name:</strong> {order.customerInfo.name}</p>
              <p><strong>Email:</strong> {order.customerInfo.email}</p>
              <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
              <p><strong>Address:</strong> {order.customerInfo.address}</p>
            </div>
          </div>

          {/* Delivery Map */}
          {order.deliveryLocation && (
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Delivery Route & Tracking
              </h3>
              <GoogleMap
                selectedLocation={order.deliveryLocation}
                shopLocation={order.shopLocation}
                showRoute={true}
              />
              
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <Navigation className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Estimated Delivery Time</p>
                      <p className="text-sm text-gray-600">Your flowers are being prepared</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">25-35 min</div>
                    <p className="text-xs text-gray-500">From order confirmation</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={onBackToShop}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-200 hover:shadow-md hover:from-purple-600 hover:to-pink-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}