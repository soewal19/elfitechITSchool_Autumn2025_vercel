import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppProvider } from './contexts/AppContext';
import { PageLoadingSpinner } from './components/LoadingSpinner';

// Lazy load components for better performance
const ShopView = lazy(() => import('./components/ShopView').then(module => ({ default: module.ShopView })));
const CartView = lazy(() => import('./components/CartView').then(module => ({ default: module.CartView })));
const CouponsPage = lazy(() => import('./pages/CouponsPage').then(module => ({ default: module.CouponsPage })));
const HistoryPage = lazy(() => import('./pages/HistoryPage').then(module => ({ default: module.HistoryPage })));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage').then(module => ({ default: module.FavoritesPage })));

function App() {
  return (
    <AppProvider>
      <Router>
        <Suspense fallback={<PageLoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ShopView />} />
              <Route path="cart" element={<CartView />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="coupons" element={<CouponsPage />} />
              <Route path="history" element={<HistoryPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AppProvider>
  );
}

export default App;