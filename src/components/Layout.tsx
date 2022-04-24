import React from 'react';
import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-400">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
