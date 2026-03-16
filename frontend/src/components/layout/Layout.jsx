import React from 'react';
import { Outlet } from 'react-router-dom';
import { HomeNavigation } from '../HomeNavigation';
import { Footer } from './Footer';

// Light purple/lavender palette - same as HomePage
const layoutStyle = {
  backgroundColor: '#f0eefa',
  minHeight: '100vh',
};

const mainStyle = {
  paddingTop: '64px', // Account for fixed navbar height
};

export function Layout() {
  return (
    <div className="flex flex-col font-sans antialiased" style={layoutStyle}>
      <HomeNavigation />
      <main className="flex-1" style={mainStyle}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
