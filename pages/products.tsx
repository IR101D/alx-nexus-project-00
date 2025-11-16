'use client';
import PageCover from "../components/layout/PageCover";
import React from "react";
import { useState, useEffect } from "react";
import ProductFilters from "@/components/Products/ProductFilters";
import ProductCard from "@/components/Products/productCard";
import Pagination from "@/components/Products/Pagination";
import { Product } from "@/interfaces";
import { ProductsData } from "@/constants/data";
import ProductsGrid from "@/components/Products/ProductsGrid";
import { useRouter } from "next/navigation";

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        category: 'all',
        priceRange: 'all',
        inStock: false,
        sortBy: 'name'
    });
    const productsPerPage = 9;
    useEffect(()=> {ProductsData;
        setProducts(ProductsData);
        setFilteredProducts(ProductsData);
    },[]);

    //filters products
      useEffect(() => {
    let result = [...products];

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
      },[filters, products]);

      // products for thepage

      const indexOfLastProducts = currentPage * productsPerPage;
      const indexofFirstProduct = indexOfLastProducts - productsPerPage;
      const currentProducts = filteredProducts.slice(indexofFirstProduct, indexOfLastProducts);
      const totalPages = Math.ceil(filteredProducts.length/productsPerPage);
      const handleFilterChange = (key: string, value: string | boolean) => {
         setFilters(prev => ({ ...prev, [key]: value }));
       };
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
      };
      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              productCount={filteredProducts.length}
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
            />
          </div>
        </div>
      </div>
    </div>
        </div>

        
    )
}
export default Products;