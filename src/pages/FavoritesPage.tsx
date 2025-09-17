import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { FlowerLoadingSpinner, SuspenseWrapper } from '../components/LoadingSpinner';
import { FlowerCard } from '../components/FlowerCard';
import { useApp } from '../contexts/AppContext';

export function FavoritesPage() {
  const { state } = useApp();
  const [isLoading, setIsLoading] = React.useState(true);
  const favoriteFlowers = state.flowers.filter(flower => flower.isFavorite);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-12 w-12 text-red-500 mr-3 fill-current" />
          <h1 className="text-4xl font-bold text-gray-800">My Favorites</h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your handpicked collection of beautiful flowers. Add flowers to favorites by clicking the heart icon on any flower card.
        </p>
      </div>

      {favoriteFlowers.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-32 w-32 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Favorites Yet</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Start browsing our beautiful flower collection and add your favorites by clicking the heart icon on any flower you love!
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-200 hover:shadow-md hover:from-purple-600 hover:to-pink-600"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Browse Flowers</span>
          </a>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Your Favorite Flowers ({favoriteFlowers.length})
            </h2>
            <p className="text-gray-600">
              These are the flowers you've marked as favorites. Click on any flower to view details or add to cart.
            </p>
          </div>

          {isLoading ? (
            <FlowerLoadingSpinner />
          ) : (
            <SuspenseWrapper variant="component">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteFlowers.map((flower) => (
                  <FlowerCard key={flower.id} flower={flower} />
                ))}
              </div>
            </SuspenseWrapper>
          )}

          <div className="mt-12 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 text-center">
            <Heart className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Love More Flowers?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Discover more beautiful flowers in our collection and add them to your favorites. 
              Your favorites are saved locally and will be here whenever you return!
            </p>
            <a
              href="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-200 hover:shadow-md hover:from-red-600 hover:to-pink-600"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Continue Shopping</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
}