import { FilterProps } from "@/interfaces";

const ProductFilters = ({ filters, onFilterChange, onClearFilters, productCount }: FilterProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={onClearFilters}
          className="text-sm text-[#B88E2F] hover:text-[#A67C2A]"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Category</h3>
        <select 
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="living-room">Living Room</option>
          <option value="bedroom">Bedroom</option>
          <option value="dining">Dining</option>
          <option value="office">Office</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
        <select 
          value={filters.priceRange}
          onChange={(e) => onFilterChange('priceRange', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
        >
          <option value="all">All Prices</option>
          <option value="under-500">Under $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="over-1000">Over $1000</option>
        </select>
      </div>

      {/* In Stock Filter */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onFilterChange('inStock', e.target.checked)}
            className="rounded border-gray-300 text-[#B88E2F] focus:ring-[#B88E2F]"
          />
          <span className="ml-2 text-gray-900">In Stock Only</span>
        </label>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
        <select 
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
        >
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing {productCount} products
        </p>
      </div>
    </div>
  );
};

export default ProductFilters;