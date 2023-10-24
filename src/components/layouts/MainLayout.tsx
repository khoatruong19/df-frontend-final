import React from 'react';
import Header from '../core/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex flex-col min-h-screen bg-appPrimary">
      <Header />
      {children}
    </main>
  );
};

export default MainLayout;
