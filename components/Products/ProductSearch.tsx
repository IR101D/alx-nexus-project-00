'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/interfaces';
import { ProductSearchProps } from '@/interfaces';


const ProductSearch = ({ 
  products, 
  onSearchResults, 
  className = '',
  placeholder = "Search products by name or initials..." 
}: ProductSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Perform search whenever searchQuery changes (real-time)
  useEffect(() => {
    if (!searchQuery.trim()) {
      onSearchResults(products); // Show all products when search is empty
      return;
    }

    setIsSearching(true);
    
    // Small delay to prevent excessive filtering during typing
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();
      const results = performSearch(products, query);
      onSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, products, onSearchResults]);

  const performSearch = (products: Product[], query: string): Product[] => {
    if (!query) return products;

    return products.filter(product => {
      const productName = product.name.toLowerCase();
      
      // 1. Exact name match
      if (productName === query) {
        return true;
      }
      
      // 2. Partial name match (contains the query)
      if (productName.includes(query)) {
        return true;
      }
      
      // 3. Initials match - check if query matches the initials of product name
      if (checkInitialsMatch(product.name, query)) {
        return true;
      }
      
      // 4. Word-by-word match - check if all query words appear in product name
      if (checkWordByWordMatch(product.name, query)) {
        return true;
      }

      return false;
    });
  };

  const checkInitialsMatch = (productName: string, query: string): boolean => {
    const productWords = productName.toLowerCase().split(/\s+/);
    const queryChars = query.toLowerCase().split('');
    
    // If query is longer than number of words, can't be initials
    if (queryChars.length > productWords.length) {
      return false;
    }
    
    // Check if each character in query matches the first character of corresponding word
    for (let i = 0; i < queryChars.length; i++) {
      if (productWords[i] && productWords[i][0] !== queryChars[i]) {
        return false;
      }
    }
    
    return queryChars.length > 0;
  };

  const checkWordByWordMatch = (productName: string, query: string): boolean => {
    const productWords = productName.toLowerCase().split(/\s+/);
    const queryWords = query.toLowerCase().split(/\s+/);
    
    // Check if all query words appear in product name
    return queryWords.every(queryWord => 
      productWords.some(productWord => productWord.includes(queryWord))
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled in real-time by useEffect
    console.log('Final search query:', searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSearch} className={`flex space-x-2 ${className}`}>
      <div className="relative flex-1">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent pr-12"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
        {isSearching && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#B88E2F]"></div>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-[#B88E2F] text-white px-6 py-3 rounded-lg hover:bg-[#A67C2A] transition-colors min-w-20"
      >
        Search
      </button>
    </form>
  );
};

export default ProductSearch;