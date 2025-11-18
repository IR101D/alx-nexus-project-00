'use client';

import React, { useEffect, useState } from 'react';
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

  // Fetch products for search (you might want to use a context or global state)
  useEffect(() => {
   //replace with API request later
    setProducts(ProductsData);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
  ];
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16">
          {/* App Name - Left */}
          <div className="flex-1">
            <Link href="/" className="text-xl font-bold text-gray-900">
              E-Nexus
            </Link>
          </div>

          {/* Centered Navigation Links */}
          <nav className="hidden md:flex flex-1 justify-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium">
              Product
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium">
              Contact
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
