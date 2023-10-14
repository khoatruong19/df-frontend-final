import React from 'react';
import Header from '../core/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      {children}
    </main>
  );
};

export default MainLayout;
