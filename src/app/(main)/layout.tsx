'use client';

import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">Loading...</div>
    );
  }

  if (!isAuthenticated) {
    return redirect('/');
  }

  return <>{children}</>;
};

export default AuthLayout;