// components/ProductsGrid.tsx
import ProductCard from './productCard';
import Button from '../Button';
import { ProductsGridProps } from '@/interfaces';



const ProductsGrid = ({ 
  products, 
  currentPage, 
  productsPerPage, 
  totalProducts, 
  onAddToCart,
  onClearFilters 
}: ProductsGridProps) => {
  const indexOfFirstProduct = (currentPage - 1) * productsPerPage;
  const indexOfLastProduct = currentPage * productsPerPage;

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found matching your filters.</p>
        <Button 
          onClick={onClearFilters}
          className="mt-4"
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Products Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, totalProducts)} of {totalProducts} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;