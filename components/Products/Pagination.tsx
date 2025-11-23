import { useState, useEffect, useCallback, useRef } from 'react';
import { PaginationProps } from '@/interfaces';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  onLoadMore, // For infinite scrolling
  hasMore = true, // For infinite scrolling
  isLoading = false, // For infinite scrolling
  showViewType = 'pagination' // 'pagination' | 'infinite' | 'both'
}: PaginationProps & {
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  showViewType?: 'pagination' | 'infinite' | 'both';
}) => {
  const [isInView, setIsInView] = useState(false);
  const prevInViewRef = useRef(false);

  // Intersection Observer for infinite scrolling
  const loadMoreRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  // Trigger load more when element comes into view
  useEffect(() => {
    // Only trigger load when sentinel transitions from not-in-view -> in-view
    if (isInView && !prevInViewRef.current && hasMore && !isLoading && onLoadMore) {
      onLoadMore();
    }

    // Update previous in-view ref for next effect run
    prevInViewRef.current = isInView;
  }, [isInView, hasMore, isLoading, onLoadMore]);

  // Generate page numbers with ellipsis for better UX
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate start and end of visible pages
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if we're near the start
    if (currentPage <= 3) {
      end = 4;
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push('...');
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1 && !onLoadMore) return null;

  return (
    <div className="space-y-6">
      {/* Traditional Pagination */}
      {(showViewType === 'pagination' || showViewType === 'both') && totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 flex-wrap gap-2">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`px-3 py-2 rounded-lg border transition-colors duration-200 min-w-[40px] ${
                currentPage === page
                  ? 'bg-[#B88E2F] text-white border-[#B88E2F]'
                  : page === '...'
                  ? 'border-transparent cursor-default'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-1"
          >
            <span>Next</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Infinite Scrolling Load More */}
      {(showViewType === 'infinite' || showViewType === 'both') && onLoadMore && (
        <div className="text-center">
          {/* Loading indicator at the bottom for infinite scroll */}
          <div 
            ref={loadMoreRef}
            className="h-4" // Sentinel element for intersection observer
          />
          
          {hasMore && (
            <div className="mt-4">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <svg className="animate-spin h-5 w-5 text-[#B88E2F]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading more products...</span>
                </div>
              ) : (
                <button
                  onClick={onLoadMore}
                  className="bg-[#B88E2F] text-white px-6 py-3 rounded-lg hover:bg-[#A67C2A] transition-colors duration-200 font-medium"
                >
                  Load More Products
                </button>
              )}
            </div>
          )}

          {!hasMore && totalPages > 1 && (
            <div className="text-center py-4">
              <p className="text-gray-500 font-medium">🎉 You've reached the end!</p>
              <p className="text-gray-400 text-sm mt-1">No more products to load.</p>
            </div>
          )}
        </div>
      )}

      {/* Page Info */}
      <div className="text-center text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;