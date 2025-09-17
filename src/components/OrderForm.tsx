import React, { useState } from 'react';
import { Tag, X, MapPin } from 'lucide-react';
import { CustomerInfo, Order } from '../types';
import { useApp } from '../contexts/AppContext';
import { GoogleMap } from './GoogleMap';

interface OrderFormProps {
  onOrderComplete: (order: Order) => void;
}

export function OrderForm({ onOrderComplete }: OrderFormProps) {
  const { state, dispatch, coupons } = useApp();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number; address: string} | null>(null);
  const [showMap, setShowMap] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) return;
    
    const coupon = coupons.find(c => 
      c.code.toLowerCase() === couponCode.trim().toLowerCase() && 
      c.isActive && 
      new Date() <= c.expiryDate
    );
    
    if (!coupon) {
      setCouponError('Invalid or expired coupon code');
      return;
    }
    
    const subtotal = state.cart.reduce((sum, item) => sum + (item.flower.price * item.quantity), 0);
    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      setCouponError(`Minimum order amount is $${coupon.minOrderAmount}`);
      return;
    }
    
    const isAlreadyApplied = state.appliedCoupons.some(c => c.id === coupon.id);
    if (isAlreadyApplied) {
      setCouponError('Coupon already applied');
      return;
    }
    
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
    setCouponCode('');
    setCouponError('');
  };

  const removeCoupon = (couponId: string) => {
    dispatch({ type: 'REMOVE_COUPON', payload: couponId });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const subtotal = state.cart.reduce((sum, item) => sum + (item.flower.price * item.quantity), 0);
    const discount = state.appliedCoupons.reduce((sum, coupon) => sum + (subtotal * coupon.discount / 100), 0);
    const total = subtotal - discount;
    
    const order: Order = {
      id: Date.now().toString(),
      items: [...state.cart],
      customerInfo: { ...customerInfo },
      total,
      orderDate: new Date(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      appliedCoupons: [...state.appliedCoupons],
      discount,
      deliveryLocation: selectedLocation || undefined,
      shopLocation: selectedLocation ? {
        lat: 40.7589,
        lng: -73.9851,
        name: 'Flowery Fragrant'
      } : undefined,
    };

    dispatch({ type: 'ADD_ORDER', payload: order });
    onOrderComplete(order);
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLocationSelect = (location: {lat: number; lng: number; address: string}) => {
    setSelectedLocation(location);
    setCustomerInfo(prev => ({ ...prev, address: location.address }));
    if (errors.address) {
      setErrors(prev => ({ ...prev, address: undefined }));
    }
  };
  const subtotal = state.cart.reduce((sum, item) => sum + (item.flower.price * item.quantity), 0);
  const discount = state.appliedCoupons.reduce((sum, coupon) => sum + (subtotal * coupon.discount / 100), 0);
  const total = subtotal - discount;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Customer Information</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            id="name"
            type="text"
            value={customerInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            id="phone"
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Address *
          </label>
          <div className="flex space-x-2 mb-2">
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              <span>{showMap ? 'Hide Map' : 'Select on Map'}</span>
            </button>
          </div>
          <textarea
            id="address"
            value={customerInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your complete delivery address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        {/* Interactive Google Map */}
        {showMap && (
          <div className="mt-4">
            <GoogleMap
              onLocationSelect={handleLocationSelect}
              selectedLocation={selectedLocation}
              shopLocation={{
                lat: 40.7589,
                lng: -73.9851,
                name: 'Flowery Fragrant'
              }}
              showRoute={!!selectedLocation}
              className="border-2 border-blue-200"
            />
          </div>
        )}
        {/* Coupon Section */}
        <div className="border-t pt-4">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Coupons & Discounts</h4>
          
          {/* Applied Coupons */}
          {state.appliedCoupons.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Applied Coupons:</p>
              <div className="space-y-2">
                {state.appliedCoupons.map((coupon) => (
                  <div key={coupon.id} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">{coupon.code}</span>
                      <span className="text-sm text-green-600">(-{coupon.discount}%)</span>
                    </div>
                    <button
                      onClick={() => removeCoupon(coupon.id)}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Add Coupon */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setCouponError('');
              }}
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
            >
              Apply
            </button>
          </div>
          {couponError && <p className="text-red-500 text-sm mt-1">{couponError}</p>}
        </div>

        <div className="border-t pt-4 mt-6">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span>Discount:</span>
                <span className="font-medium">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-purple-600">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={state.cart.length === 0}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:shadow-md hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}