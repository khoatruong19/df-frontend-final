import React from 'react';
import ConvexClientProvider from './ConvexClientProvider';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
};

export default AppProviders;
