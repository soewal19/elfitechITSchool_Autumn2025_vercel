import React, { useState } from 'react';
import { History, Search, Package, Calendar, DollarSign, MapPin, Phone, Mail, Navigation, Tag } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SuspenseWrapper } from '../components/SuspenseWrapper';
import { useApp } from '../contexts/AppContext';

export function HistoryPage() {
  const { state } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchOrderId, setSearchOrderId] = useState('');

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredOrders = state.orders.filter(order => {
    const emailMatch = !searchEmail || order.customerInfo.email.toLowerCase().includes(searchEmail.toLowerCase());
    const phoneMatch = !searchPhone || order.customerInfo.phone.includes(searchPhone);
    const orderIdMatch = !searchOrderId || order.id.includes(searchOrderId);
    
    return emailMatch && phoneMatch && orderIdMatch;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const clearSearch = () => {
    setSearchEmail('');
    setSearchPhone('');
    setSearchOrderId('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <History className="h-10 w-10 text-purple-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Order History</h1>
        </div>
        <p className="text-gray-600">Find your previous orders using your email, phone number, or order ID</p>
      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Search Orders</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
              Order ID
            </label>
            <input
              id="orderId"
              type="text"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              placeholder="Enter order ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        
        {(searchEmail || searchPhone || searchOrderId) && (
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Found {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={clearSearch}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="space-y-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8">
              <LoadingSpinner size="lg" text="Loading order history..." />
            </div>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {state.orders.length === 0 ? 'No Orders Yet' : 'No Orders Found'}
          </h3>
          <p className="text-gray-500 mb-6">
            {state.orders.length === 0 
              ? 'Start shopping to see your order history here!'
              : 'Try adjusting your search criteria to find your orders.'
            }
          </p>
          {state.orders.length === 0 && (
            <a
              href="/"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:shadow-md hover:from-purple-600 hover:to-pink-600"
            >
              Start Shopping
            </a>
          )}
        </div>
      ) : (
        <SuspenseWrapper variant="component">
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <Package className="h-6 w-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(order.orderDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-xl font-bold text-green-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Applied Coupons */}
                {order.appliedCoupons && order.appliedCoupons.length > 0 && (
                  <div className="mt-3 flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      Coupons Applied: {order.appliedCoupons.map(c => c.code).join(', ')}
                    </span>
                    <span className="text-sm text-green-600">
                      (Saved: ${order.discount?.toFixed(2) || '0.00'})
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.flower.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.flower.image}
                            alt={item.flower.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-800">{item.flower.name}</h5>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">
                              ${(item.flower.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">${item.flower.price} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Customer Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-sm">
                            {order.customerInfo.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-gray-800">{order.customerInfo.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{order.customerInfo.email}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{order.customerInfo.phone}</span>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                        <span className="text-gray-600">{order.customerInfo.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Delivery Information */}
                  {order.deliveryLocation && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Navigation className="h-4 w-4 mr-2 text-blue-600" />
                        Delivery Details
                      </h4>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">Delivery Location:</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">{order.deliveryLocation.address}</p>
                          
                          {order.shopLocation && (
                            <>
                              <div className="flex items-center space-x-2 mt-3">
                                <Package className="h-4 w-4 text-purple-600" />
                                <span className="text-sm font-medium text-gray-700">From Shop:</span>
                              </div>
                              <p className="text-sm text-gray-600 ml-6">{order.shopLocation.name}</p>
                            </>
                          )}
                          
                          <div className="mt-3 pt-3 border-t border-blue-200">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">Estimated Delivery:</span>
                              <span className="text-sm font-bold text-blue-600">25-35 min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              </div>
            ))}
          </div>
        </SuspenseWrapper>
      )}
    </div>
  );
}