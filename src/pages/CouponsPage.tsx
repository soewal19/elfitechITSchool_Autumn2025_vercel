import React from 'react';
import { Ticket, Gift } from 'lucide-react';
import { LoadingSpinner, SuspenseWrapper } from '../components/LoadingSpinner';
import { CouponCard } from '../components/CouponCard';
import { useApp } from '../contexts/AppContext';

export function CouponsPage() {
  const { coupons, state } = useApp();
  const [isLoading, setIsLoading] = React.useState(true);
  const activeCoupons = coupons.filter(coupon => coupon.isActive);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Gift className="h-12 w-12 text-purple-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">Special Offers & Coupons</h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Save money on your flower orders with our exclusive discount codes. 
          Copy the code and apply it at checkout to enjoy amazing savings!
        </p>
      </div>

      {state.appliedCoupons.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Ticket className="h-6 w-6 mr-2 text-green-600" />
            Applied Coupons ({state.appliedCoupons.length})
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: state.appliedCoupons.length || 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <LoadingSpinner size="sm" variant="default" />
                </div>
              ))}
            </div>
          ) : (
            <SuspenseWrapper variant="component">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.appliedCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))}
              </div>
            </SuspenseWrapper>
          )}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Ticket className="h-6 w-6 mr-2 text-purple-600" />
          Available Coupons ({activeCoupons.length})
        </h2>
        
        {activeCoupons.length === 0 ? (
          <div className="text-center py-12">
            <Ticket className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No active coupons available at the moment.</p>
            <p className="text-gray-500">Check back later for new deals!</p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <LoadingSpinner size="md" variant="default" />
              </div>
            ))}
          </div>
        ) : (
          <SuspenseWrapper variant="component">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCoupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>
          </SuspenseWrapper>
        )}
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">How to Use Coupons</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="flex items-start space-x-3">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h4 className="font-semibold text-gray-800">Copy Code</h4>
              <p className="text-gray-600 text-sm">Click the "Copy" button to copy the coupon code to your clipboard.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h4 className="font-semibold text-gray-800">Shop Flowers</h4>
              <p className="text-gray-600 text-sm">Add your favorite flowers to the cart and proceed to checkout.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h4 className="font-semibold text-gray-800">Apply & Save</h4>
              <p className="text-gray-600 text-sm">Paste the code at checkout and enjoy your discount!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}