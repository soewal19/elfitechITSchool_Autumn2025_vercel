import React, { useMemo } from 'react';
import { BarChart3 } from 'lucide-react';
import { FlowerCardSkeleton } from './SkeletonLoader';
import { FlowerLoadingSpinner, ComponentSuspense } from './LoadingSpinner';
import { SuspenseWrapper } from './SuspenseWrapper';
import { Pagination } from './Pagination';
import { ShopSidebar } from './ShopSidebar';
import { SortControls } from './SortControls';
import { FlowerCard } from './FlowerCard';
import { AnalyticsLoadingSpinner } from './LoadingSpinner';
import { useApp } from '../contexts/AppContext';

// Lazy load AnalyticsDashboard for better performance
const AnalyticsDashboard = React.lazy(() => 
  import('./AnalyticsDashboard').then(module => ({ default: module.AnalyticsDashboard }))
);

export function ShopView() {
  const { state, dispatch } = useApp();
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [state.selectedShop, state.sortBy]);

  const filteredAndSortedFlowers = useMemo(() => {
    let filtered = state.flowers;

    // Filter by selected shop
    if (state.selectedShop) {
      filtered = filtered.filter(flower => flower.shopId === state.selectedShop);
    }

    // Sort flowers
    const sorted = [...filtered].sort((a, b) => {
      switch (state.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'date':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case 'favorites':
          if (a.isFavorite && !b.isFavorite) return -1;
          if (!a.isFavorite && b.isFavorite) return 1;
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [state.flowers, state.selectedShop, state.sortBy]);

  const totalPages = Math.ceil(filteredAndSortedFlowers.length / state.itemsPerPage);
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const paginatedFlowers = filteredAndSortedFlowers.slice(startIndex, startIndex + state.itemsPerPage);

  const handlePageChange = (page: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: itemsPerPage });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Analytics Dashboard */}
      {state.showAnalytics && (
        <div className="mb-8">
          <SuspenseWrapper 
            fallback={<AnalyticsLoadingSpinner />}
            variant="component"
          >
            <AnalyticsDashboard />
          </SuspenseWrapper>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <ShopSidebar />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {state.selectedShop ? 'Shop Flowers' : 'All Flowers'} ({filteredAndSortedFlowers.length})
              </h2>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_ANALYTICS' })}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  state.showAnalytics
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-purple-600 border border-purple-300 hover:bg-purple-50'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>{state.showAnalytics ? 'Hide Analytics' : 'Show Analytics'}</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <SortControls />
            </div>
          </div>

          {/* Flowers grid */}
          {isLoading ? (
            <FlowerLoadingSpinner />
          ) : (
            <SuspenseWrapper 
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <FlowerCardSkeleton key={index} />
                  ))}
                </div>
              }
              variant="component"
            >
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                data-testid="flowers-grid"
              >
                {paginatedFlowers.map((flower) => (
                  <FlowerCard key={flower.id} flower={flower} />
                ))}
              </div>
            </SuspenseWrapper>
          )}

          {!isLoading && filteredAndSortedFlowers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No flowers found.</p>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={state.currentPage}
            totalPages={totalPages}
            totalItems={filteredAndSortedFlowers.length}
            itemsPerPage={state.itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
}