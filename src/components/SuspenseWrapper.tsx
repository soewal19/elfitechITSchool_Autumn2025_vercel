import React, { Suspense } from 'react';
import { LoadingSpinner, PageLoadingSpinner } from './LoadingSpinner';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  variant?: 'page' | 'component' | 'inline';
}

export function SuspenseWrapper({ 
  children, 
  fallback, 
  variant = 'component' 
}: SuspenseWrapperProps) {
  const getDefaultFallback = () => {
    switch (variant) {
      case 'page':
        return <PageLoadingSpinner />;
      case 'inline':
        return <LoadingSpinner size="sm" />;
      default:
        return (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" text="Loading..." />
          </div>
        );
    }
  };

  return (
    <Suspense fallback={fallback || getDefaultFallback()}>
      {children}
    </Suspense>
  );
}

// Specialized Suspense wrappers
export function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SuspenseWrapper variant="page">
      {children}
    </SuspenseWrapper>
  );
}

export function ComponentSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SuspenseWrapper variant="component">
      {children}
    </SuspenseWrapper>
  );
}

export function InlineSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SuspenseWrapper variant="inline">
      {children}
    </SuspenseWrapper>
  );
}