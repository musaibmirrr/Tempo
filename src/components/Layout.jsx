import React from 'react';
import ModernNavbar from './Navbar/ModernNavbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <ModernNavbar />
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
      <footer className="border-t py-6 mt-12 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Tempo App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
