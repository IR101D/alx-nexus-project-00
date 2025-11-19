'use client';

import Link from "next/link";
import Button from "@/components/Button";
import { useAppSelector,useAppDispatch } from "@/src/store/hooks/redux";
import { 
  selectCartItems, 
  selectCartSubtotal, 
  selectCartTotal, 
  selectCartShipping
} from "@/src/store/selectors/cartSelectors";
import { 
  incrementQuantity, 
  decrementQuantity, 
  removeItem, 
  clearCart 
} from "@/src/store/slices/cartSlice";
import PageCover from "@/components/layout/PageCover";

export default function Cart () {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const subtotal = useAppSelector(selectCartSubtotal);
    const shipping = useAppSelector(selectCartShipping);
    const total = useAppSelector(selectCartTotal);

    const handleIncrement = (id: number) => {
        dispatch(incrementQuantity(id));
    };
    
    const handleDecrement = (id: number) => {
        dispatch(decrementQuantity(id));
    };

    const handleRemove = (id: number) => {
        dispatch(removeItem(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCheckout = () => {
        console.log('Preceeding to checkout the items:', cartItems);
        alert('Proceeding to checkout');
    };

    if (cartItems.length === 0) {
        return (
             <div className="min-h-screen bg-gray-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart</h1>
              <p className="text-gray-600">Your shopping cart is empty</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cart is Empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link href="/products">
                <Button variant="secondary" size="lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
     return (
    <div className="min-h-screen bg-gray-50 py-8">
      <PageCover
         pageTitle="Cart"
         height="h-64"
         overlayOpacity={40}
         />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
          </div>
          <button
            onClick={handleClearCart}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div  className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/*Cart Items */}
             <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 bg-[#EFE6D1] ">
                <div className="col-span-5">
                  <span className="font-semibold text-gray-900">Product</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-semibold text-gray-900">Price</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-semibold text-gray-900">Quantity</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-semibold text-gray-900">Subtotal</span>
                </div>
                <div className="col-span-1"></div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-6 items-center">
                    {/* Product Info */}
                    <div className="md:col-span-5 flex items-center space-x-4">
                      <div 
                        className="w-20 h-20 bg-gray-100 rounded-lg bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div>
                        <h3 className="font-semibold text-gray-900 hover:text-[#B88E2F] transition-colors">
                          <Link href={`/products/${item.id}`}>
                            {item.name}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-sm text-gray-500">Color: {item.color}</span>
                          <span className="text-sm text-gray-500">Size: {item.size}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-center">
                      <span className="text-lg font-semibold text-[#B88E2F]">
                        ${item.price}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-l border-r border-gray-300 min-w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="md:col-span-2 text-center">
                      <span className="text-lg font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <div className="md:col-span-1 flex justify-center">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link href="/products">
                <Button variant="secondary">
                  ← Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:col-span-1 ">
            <div className="bg-[#EFE6D1]  rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cart Totals</h2>
              
              <div className="space-y-4 mb-6">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-lg font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-lg font-semibold text-gray-900">
                    ${shipping.toFixed(2)}
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-[#B88E2F]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              </Link>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Free shipping on orders over $150
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

