"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Reviews from "@/components/HomePage/reviews";
import { productData as fallbackProductData } from "@/constants/data";
import productsDetailService from "@/src/services/productsDetailService";
import productsService from "@/src/services/productsService";
import { ApiProduct } from "@/interfaces";
import { useAppDispatch } from "@/src/store/hooks/redux";
import { addItem } from "@/src/store/slices/cartSlice";

export default function ProductDetailPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [productDetail, setProductDetail] = useState<ApiProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Reset selection when a new product loads
    setSelectedImage(0);
    setSelectedColor(0);
    setSelectedSize(0);
  }, [productDetail]);

  useEffect(() => {
    const productId = router.query.id;
    if (!productId || Array.isArray(productId)) return;

    const loadProduct = async () => {
      try {
          const allProducts = await productsService.getProducts();
          const match = allProducts.find((p) => p.id === Number(productId));
          if (match) {
            setProductDetail(match);
            setError(null);
            return;
          }
        }catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load product";
        }
    };

    loadProduct();
  }, [router.query.id]);

  const displayProduct = useMemo(() => {
    if (!productDetail) return null;
    const images = productDetail.imageUrl
      ? [productDetail.imageUrl, ...fallbackProductData.images]
      : fallbackProductData.images;

    return {
      ...fallbackProductData,
      id: productDetail.id,
      name: productDetail.name,
      price: productDetail.price,
      description: productDetail.description || fallbackProductData.description,
      images,
    };
  }, [productDetail]);

  const handleAddToCart = () => {
    if (!displayProduct) return;
    const payload = {
      id: displayProduct.id,
      name: displayProduct.name,
      price: displayProduct.price,
      image: displayProduct.images[selectedImage] ?? displayProduct.images[0],
      color: displayProduct.colors[selectedColor].name,
      size: displayProduct.sizes[selectedSize],
      quantity,
    };

    dispatch(addItem(payload));
    alert(`${displayProduct.name} added to cart!`);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Product Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li><a href="/" className="hover:text-[#B88E2F]">Home</a></li>
              <li>/</li>
              <li><a href="/products" className="hover:text-[#B88E2F]">Products</a></li>
              <li>/</li>
              <li className="text-gray-900">{displayProduct?.name ?? "Product"}</li>
            </ol>
          </nav>

         {/*{isLoading && <div className="mb-6 text-gray-600">Loading product details...</div>} */}
          {error && <div className="mb-6 text-red-600">Error: {error}</div>}
          {!displayProduct && !isLoading && !error && (
            <div className="mb-6 text-gray-600">Product not found.</div>
          )}
          {displayProduct && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="mb-4">
                <div 
                  className="h-96 bg-gray-100 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${displayProduct.images[selectedImage]})` }}
                ></div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-4">
                {displayProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 bg-gray-100 rounded-lg border-2 bg-cover bg-center ${
                      selectedImage === index ? 'border-[#B88E2F]' : 'border-transparent'
                    }`}
                    style={{ backgroundImage: `url(${image})` }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{displayProduct.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-lg ${
                        i < Math.floor(displayProduct.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {displayProduct.rating} ({displayProduct.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#B88E2F]">${displayProduct.price}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-8">{displayProduct.description}</p>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {displayProduct.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      disabled={!color.inStock}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                        selectedColor === index ? 'border-[#B88E2F]' : 'border-gray-300'
                      } ${!color.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{ backgroundColor: color.value }}
                      title={`${color.name} ${!color.inStock ? '(Out of Stock)' : ''}`}
                    >
                      {!color.inStock && (
                        <div className="w-6 h-0.5 bg-red-500 transform rotate-45 absolute"></div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {displayProduct.colors[selectedColor].name}
                  {!displayProduct.colors[selectedColor].inStock && ' (Out of Stock)'}
                </p>
              </div>

              {/* Size */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                <div className="flex space-x-3">
                  {displayProduct.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(index)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedSize === index
                          ? 'border-[#B88E2F] bg-[#B88E2F] text-white'
                          : 'border-gray-300 text-gray-700 hover:border-[#B88E2F]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-l border-r border-gray-300">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!displayProduct.colors[selectedColor].inStock}
                  className="flex-1"
                >
                  {displayProduct.colors[selectedColor].inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>

              {/* Features */}
                 {/**  <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {displayProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="text-[#B88E2F] mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>*/}  
            </div>
          </div>
          )}
        </div>
      </section>

      {displayProduct && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8 ">
              {[
                { id: 'description', label: 'Description' },
                { id: 'additional', label: 'Additional Information' },
                { id: 'reviews', label: `Reviews (${displayProduct?.reviewCount ?? 0})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-[#B88E2F] text-[#B88E2F]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="max-w-4xl">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
                  <p className="text-gray-600 mb-6">{displayProduct.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Dimensions</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>Width: {displayProduct.dimensions.width}</li>
                        <li>Depth: {displayProduct.dimensions.depth}</li>
                        <li>Height: {displayProduct.dimensions.height}</li>
                        <li>Weight: {displayProduct.dimensions.weight}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Specifications</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>Material: {displayProduct.specifications.material}</li>
                        <li>Frame: {displayProduct.specifications.frame}</li>
                        <li>Filling: {displayProduct.specifications.filling}</li>
                        <li>Care: {displayProduct.specifications.care}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'additional' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Additional Information</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Warranty & Support</h4>
                      <p className="text-gray-600">
                        This product comes with a 5-year limited warranty covering manufacturing defects. 
                        Our customer support team is available 24/7 to assist you with any questions or concerns.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Shipping & Delivery</h4>
                      <p className="text-gray-600">
                        Free standard shipping on all orders. White-glove delivery service available for an additional fee. 
                        Most items ship within 2-3 business days.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Returns</h4>
                      <p className="text-gray-600">
                        30-day return policy. Items must be in original condition. Return shipping is free for defective items.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                  <Reviews/>
                  
                  {/* Add Review Button */}
                  <div className="mt-8">
                    <Button >
                      Write a Review
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
