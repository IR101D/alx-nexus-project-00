"use client";
import PageCover from "../components/layout/PageCover";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks/redux";
import { fetchCategories } from "@/src/store/slices/categoriesSlice";
import { fetchProducts } from "@/src/store/slices/productsSlice";
import ProductFilters from "@/components/Products/ProductFilters";
import ProductCard from "@/components/Products/productCard";
import Pagination from "@/components/Products/Pagination";
import { Product } from "@/interfaces";
import { productData, ProductsData } from "@/constants/data";
import ProductsGrid from "@/components/Products/ProductsGrid";
import { useRouter } from "next/navigation";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
      const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [viewType, setViewType] = useState<'pagination' | 'infinite'>('pagination');
  
  const productsPerPage = 9;
  const [loadedProductsCount, setLoadedProductsCount] = useState(productsPerPage);

  const [filters, setFilters] = useState({
        category: 'all',
        priceRange: 'all',
        inStock: false,
        sortBy: 'name'
    });
    

    // categories from redux
    const categories = useAppSelector((state) => state.categories.items);

    // products from redux (API)
    const apiProducts = useAppSelector((state) => state.products.items);

    useEffect(() => {
      // fetch categories on mount
      dispatch(fetchCategories() as any);
      // fetch products on mount
      dispatch(fetchProducts() as any);
    }, [dispatch]);

    useEffect(() => {
      // When API products are available, map them to the UI Product shape
      if (apiProducts && apiProducts.length > 0) {
        const mapped = apiProducts.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.imageUrl || "/assets/images/sofa.jpg",
          category: p.categoryName || "uncategorized",
          rating: 0,
          inStock: p.stock > 0,
        }));
        setProducts(mapped);
        setFilteredProducts(mapped);
        setDisplayedProducts(mapped);
      } else {
        // fallback to local data
        setProducts(ProductsData);
        setFilteredProducts(ProductsData);
        setDisplayedProducts(ProductsData);
      }
    }, [apiProducts]);

    //filters products
      useEffect(() => {
    let result = [...displayedProducts];

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(product => product.category === filters.category);
    }
    // price ranger filter
    if(filters.priceRange !== 'all') {
        switch (filters.priceRange){
            case'under-500':
            result = result.filter(product => product.price < 500);
            break;
            case '500-1000':
                result = result.filter(product => product.price >=500 && product.price <= 1000);
                break;
            case 'over-1000':
            result = result.filter (product => product.price > 1000);
            break;
        }
    }
    // in stock filter
    if (filters.inStock) {
        result = result.filter(product => product.inStock);
    }
    //Sort products
    switch(filters.sortBy) {
        case 'price-low':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            result.sort((a,b)=>b.price - a.price);
            break;
        case 'rating':
            result.sort((a, b) => b.rating - a.rating);
            break;
        default:
            result.sort((a, b)=> a.name.localeCompare(b.name));
    }
    setFilteredProducts(result);
    setCurrentPage(1);
    setLoadedProductsCount(productsPerPage);
      },[filters, products,displayedProducts,productsPerPage]);
     
       // Get current products based on view type
  const getCurrentProducts = () => {
    if (viewType === 'pagination') {
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    } else {
      // Infinite scrolling - show loaded products count
      return filteredProducts.slice(0, loadedProductsCount);
    }
  };

      // products for thepage

      const indexOfLastProducts = currentPage * productsPerPage;
      const indexofFirstProduct = indexOfLastProducts - productsPerPage;
      const currentProducts = filteredProducts.slice(indexofFirstProduct, indexOfLastProducts);
      const totalPages = Math.ceil(filteredProducts.length/productsPerPage);
      const hasMoreProducts = loadedProductsCount < filteredProducts.length;      const handleFilterChange = (key: string, value: string | boolean) => {
         setFilters(prev => ({ ...prev, [key]: value }));
       };

        // Load more products for infinite scrolling
     const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMoreProducts) return;

    setIsLoadingMore(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoadedProductsCount(prev => prev + productsPerPage);
    setIsLoadingMore(false);
  }, [isLoadingMore, hasMoreProducts, productsPerPage]);

      const clearFilters = () => {
           setFilters({
             category: 'all',
             priceRange: 'all',
             inStock: false,
             sortBy: 'name'
          });
       };

      const handleAddToCart = (product: Product)=> {
        console.log('Added to cart:', product);
        alert(`${product.name} added to cart!`);
      };
      const handlePageChange = (page: number) => {
        setCurrentPage(page);
            // Scroll to top when changing pages
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      const toggleViewType = () => {
    setViewType(prev => prev === 'pagination' ? 'infinite' : 'pagination');
    setCurrentPage(1);
    setLoadedProductsCount(productsPerPage);
  };
      return (
        <div>
         <PageCover
         pageTitle="Products"
         height="h-64"
         overlayOpacity={40}
         />
         <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
          <p className="text-gray-600 mt-2">Discover our amazing furniture collection</p>
        </div>
      </div>

         {/* View Type Toggle */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">View:</span>
              <button
                onClick={toggleViewType}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  viewType === 'pagination'
                    ? 'bg-[#B88E2F] text-white border-[#B88E2F]'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {viewType === 'pagination' ? 'Pagination' : 'Infinite Scroll'}
              </button>
            </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              productCount={filteredProducts.length}
              categories={categories}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <ProductsGrid
              products={currentProducts}
              currentPage={currentPage}
              productsPerPage={productsPerPage}
              totalProducts={filteredProducts.length}
              onAddToCart={handleAddToCart}
              onClearFilters={clearFilters}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onLoadMore={viewType === 'infinite' ? handleLoadMore : undefined}
              hasMore={hasMoreProducts}
              isLoading={isLoadingMore}
              showViewType={viewType}
            />
          </div>
        </div>
      </div>
    </div>
        </div>

        
    )
}
export default Products;