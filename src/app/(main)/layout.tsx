'use client';

import LoadingSpinner from '@/components/core/LoadingSpinner';
import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect('/');
  }

  return <>{children}</>;
};

export default AuthLayout;
