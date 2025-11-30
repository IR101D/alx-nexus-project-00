'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductSearch from './ProductSearch';
import { Product } from '@/interfaces';
import { SearchModalProps } from '@/interfaces';


const SearchModal = ({ isOpen, onClose, products }: SearchModalProps) => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const router = useRouter();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSearchResults = (results: Product[]) => {
    setSearchResults(results);
  };

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
    onClose();
  };

  const handleViewAllResults = () => {
    if (searchResults.length > 0) {
      // You could navigate to a search results page or the products page with filter
      router.push('/products');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-96 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <ProductSearch
            products={products}
            onSearchResults={handleSearchResults}
            placeholder="Search products by name or initials..."
            className="mb-0"
          />
        </div>

        {/* Search Results */}
        <div className="max-h-64 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {searchResults.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div 
                    className="w-12 h-12 bg-gray-100 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500">${product.price}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-gray-500 text-sm ml-1">{product.rating}</span>
                  </div>
                </div>
              ))}
              
              {searchResults.length > 5 && (
                <div 
                  className="p-3 text-center text-[#B88E2F] hover:bg-gray-50 cursor-pointer font-medium"
                  onClick={handleViewAllResults}
                >
                  View all {searchResults.length} results →
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-gray-500">No products found</p>
              <p className="text-sm text-gray-400 mt-1">
                Try searching by product name or initials
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              Close
            </button>
            <span className="text-sm text-gray-500">
              {searchResults.length} results
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;