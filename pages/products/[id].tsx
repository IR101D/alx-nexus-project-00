// app/products/[id]/page.tsx
'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Reviews from '@/components/HomePage/reviews';
import { productData, reviews } from '@/constants/data';

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleAddToCart = () => {
    const productToAdd = {
      ...productData,
      selectedColor: productData.colors[selectedColor],
      selectedSize: productData.sizes[selectedSize],
      quantity
    };
    console.log('Added to cart:', productToAdd);
    // Implement your cart logic here
    alert('Product added to cart!');
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
              <li className="text-gray-900">{productData.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="mb-4">
                <div 
                  className="h-96 bg-gray-100 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${productData.images[selectedImage]})` }}
                ></div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-4">
                {productData.images.map((image, index) => (
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{productData.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-lg ${
                        i < Math.floor(productData.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {productData.rating} ({productData.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#B88E2F]">${productData.price}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-8">{productData.description}</p>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {productData.colors.map((color, index) => (
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
                  Selected: {productData.colors[selectedColor].name}
                  {!productData.colors[selectedColor].inStock && ' (Out of Stock)'}
                </p>
              </div>

              {/* Size */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                <div className="flex space-x-3">
                  {productData.sizes.map((size, index) => (
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
                  disabled={!productData.colors[selectedColor].inStock}
                  className="flex-1"
                >
                  {productData.colors[selectedColor].inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {productData.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="text-[#B88E2F] mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8 ">
              {[
                { id: 'description', label: 'Description' },
                { id: 'additional', label: 'Additional Information' },
                { id: 'reviews', label: `Reviews (${productData.reviewCount})` }
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
                <p className="text-gray-600 mb-6">{productData.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Dimensions</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>Width: {productData.dimensions.width}</li>
                      <li>Depth: {productData.dimensions.depth}</li>
                      <li>Height: {productData.dimensions.height}</li>
                      <li>Weight: {productData.dimensions.weight}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Specifications</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>Material: {productData.specifications.material}</li>
                      <li>Frame: {productData.specifications.frame}</li>
                      <li>Filling: {productData.specifications.filling}</li>
                      <li>Care: {productData.specifications.care}</li>
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
    </div>
  );
}