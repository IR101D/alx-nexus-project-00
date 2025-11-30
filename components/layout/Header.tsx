'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import CartIcon from '../Products/CartIcon';
import { Product } from '@/interfaces';
import { ProductsData } from '@/constants/data';
import SearchModal from '../Products/SearchModal';

const Header : React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);


    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    }, [pathname]);
  // Fetch products for search (you might want to use a context or global state)
  useEffect(() => {
   //replace with API request later
    setProducts(ProductsData);
  }, []);

  // Determine auth state from localStorage tokens
  useEffect(() => {
    const readAuth = () => {
      try {
        const access = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        const refresh = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
        setIsLoggedIn(!!access && !!refresh);
      } catch {
        setIsLoggedIn(false);
      }
    };

    readAuth();

    // React to cross-tab changes
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'accessToken' || e.key === 'refreshToken') {
        readAuth();
      }
    };
    window.addEventListener('storage', onStorage);

    // Update when tab regains focus
    const onVisibility = () => {
      if (document.visibilityState === 'visible') readAuth();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', onClickOutside);
    }
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // Also clear any sessionStorage mirrors
      try {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
      } catch {}
    } catch {}
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
    { href: '/orders', label: 'orders'},
  ];
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="mx-auto flex items-center justify-between h-16">
          {/* App Name - Left */}
          <div className="flex-1">
            <Link href="/" className="text-xl font-bold text-gray-900">
              E-Nexus
            </Link>
          </div>

          {/* Centered Navigation Links */}
          <nav className=" md:flex flex-1 justify-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium">
              Products
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium">
              Contact
            </Link>
            <Link href="/orders" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium">
              Orders
            </Link>
          </nav>

          {/* Icons - Right */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            {/* Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-500 hover:text-blue-500 p-2 transition-colors duration-200"
            >
              <Search/>
            </button>

            {/* Cart Icon */}
            <button className="text-gray-500 hover:text-gray-700 p-2">
              <CartIcon/>
            </button>
            {!isLoggedIn ? (
              <Link href="/signin" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Sign In
              </Link>
            ) : (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 border border-gray-200 rounded-md"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">U</span>
                  <span className="hidden sm:inline">Account</span>
                  <svg className={`h-4 w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Search Bar - Slides down when open */}
       {/** {isSearchOpen && (
          <div className="border-t border-gray-200 py-4">
            <form onSubmit={handleSearch} className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for products, brands, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 p-1"
                >
                  <Search/>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </form>
          </div> 
        )}*/} 
           {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
      />

      </div>
    </header>
  );
};

export default Header;
