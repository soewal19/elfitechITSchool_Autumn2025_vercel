import React, { useState } from 'react';
import { Copy, Check, Tag, Calendar, DollarSign } from 'lucide-react';
import { Coupon } from '../types';
import { useApp } from '../contexts/AppContext';

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const { state, dispatch } = useApp();
  const [copied, setCopied] = useState(false);
  const isApplied = state.appliedCoupons.some(c => c.id === coupon.id);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy coupon code:', err);
    }
  };

  const handleApply = () => {
    if (isApplied) {
      dispatch({ type: 'REMOVE_COUPON', payload: coupon.id });
    } else {
      dispatch({ type: 'APPLY_COUPON', payload: coupon });
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const isExpired = new Date() > coupon.expiryDate;

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 ${
      isExpired ? 'border-gray-400 opacity-60' : 'border-purple-500'
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${isExpired ? 'bg-gray-100' : 'bg-purple-100'}`}>
              <Tag className={`h-6 w-6 ${isExpired ? 'text-gray-500' : 'text-purple-600'}`} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{coupon.name}</h3>
              <p className="text-gray-600 text-sm">{coupon.description}</p>
            </div>
          </div>
          <div className={`text-right ${isExpired ? 'text-gray-500' : 'text-purple-600'}`}>
            <div className="text-2xl font-bold">{coupon.discount}%</div>
            <div className="text-xs">OFF</div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span>Min. order: ${coupon.minOrderAmount || 0}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Expires: {formatDate(coupon.expiryDate)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2 font-mono text-sm font-bold text-center">
            {coupon.code}
          </div>
          <button
            onClick={handleCopy}
            disabled={isExpired}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              copied
                ? 'bg-green-500 text-white'
                : isExpired
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={handleApply}
            disabled={isExpired}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isApplied
                ? 'bg-green-500 text-white hover:bg-green-600'
                : isExpired
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-pink-500 text-white hover:bg-pink-600'
            }`}
          >
            {isApplied ? 'Applied' : 'Apply'}
          </button>
        </div>

        {isExpired && (
          <div className="mt-3 text-center text-sm text-red-500 font-medium">
            This coupon has expired
          </div>
        )}
      </div>
    </div>
  );
}