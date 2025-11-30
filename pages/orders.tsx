'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import { OrderItem, OrderStatus,Order } from '@/interfaces';
import ordersService from '@/src/services/ordersService';


export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [trackingCode, setTrackingCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [trackingSteps, setTrackingSteps] = useState<string[]>([]);
  const [infoMessage, setInfoMessage] = useState<string>('');

  // Mock order data - replace with actual API call
  const mockOrder: Order = {
    id: 'ORD-123456',
    orderDate: '2024-01-15',
    estimatedDelivery: '2024-01-22',
    status: 'shipped',
    trackingNumber: 'TRK789456123',
    carrier: 'FedEx',
    items: [
      {
        id: 1,
        name: "Modern Sofa",
        price: 1299,
        quantity: 1,
        image: "/assets/images/sofa.jpg",
        color: "Charcoal Gray",
        size: "Large"
      },
      {
        id: 2,
        name: "Coffee Table",
        price: 349,
        quantity: 1,
        image: "/assets/images/coffee-table.jpg",
        color: "Walnut",
        size: "Medium"
      }
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      province: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567"
    },
    paymentMethod: "Credit Card",
    subtotal: 1648,
    shipping: 50,
    tax: 131.84,
    total: 1829.84,
    timeline: [
      {
        status: 'pending',
        date: '2024-01-15 10:30 AM',
        description: 'Order placed'
      },
      {
        status: 'confirmed',
        date: '2024-01-15 11:45 AM',
        description: 'Order confirmed and payment processed'
      },
      {
        status: 'processing',
        date: '2024-01-16 09:15 AM',
        description: 'Order is being processed in our warehouse'
      },
      {
        status: 'shipped',
        date: '2024-01-18 02:30 PM',
        description: 'Order has been shipped',
        location: 'New York Distribution Center'
      }
    ]
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Require email and at least one of orderId or trackingCode
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!orderId.trim() && !trackingCode.trim()) {
      setError('Please provide either Order ID or Tracking Code');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setInfoMessage('');
    setTrackingSteps([]);

    try {
      const result = await ordersService.trackOrder({
        email: email.trim(),
        orderId: orderId.trim() || undefined,
        trackingCode: trackingCode.trim() || undefined,
      });

      if (result?.steps?.length) {
        setTrackingSteps(result.steps);
      }
      if (result?.message && (!result.steps || result.steps.length === 0)) {
        setError(result.message);
      } else if (!result?.steps || result.steps.length === 0) {
        setInfoMessage('No tracking updates are available yet. Please check back later.');
      }

      // We currently do not have an API providing full order details here,
      // so we keep detailed order section hidden by leaving `order` as null.
      setOrder(null);
    } catch (error) {
      setError('Order not found. Please check your order ID and email address.');
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: OrderStatus['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const getStatusIcon = (status: OrderStatus['status']) => {
    const icons = {
      pending: '⏳',
      confirmed: '✅',
      processing: '🏭',
      shipped: '🚚',
      delivered: '📦',
      cancelled: '❌'
    };
    return icons[status];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enter your order details below to check the current status and tracking information.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <form onSubmit={handleTrackOrder} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID (optional)
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                  placeholder="e.g., ORD-123456"
                />
              </div>

              <div>
                <label htmlFor="trackingCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Tracking Code (optional)
                </label>
                <input
                  type="text"
                  id="trackingCode"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                  placeholder="e.g., TRK-789456123"
                />
                <p className="mt-2 text-xs text-gray-500">Provide either Order ID or Tracking Code along with your email.</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                  placeholder="Enter the email used for ordering"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            {!error && infoMessage && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700">{infoMessage}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Tracking Order...
                </>
              ) : (
                'Track Order'
              )}
            </Button>
          </form>
        </div>

        {/* Tracking Steps */}
        {trackingSteps.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tracking History</h2>
            <ol className="list-decimal ml-6 space-y-2">
              {trackingSteps.map((step, idx) => (
                <li key={idx} className="text-gray-700">{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Order Details */}
        {order && (
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order #{order.id}</h2>
                  <p className="text-gray-600 mt-1">
                    Placed on {new Date(order.orderDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    <span className="mr-2">{getStatusIcon(order.status)}</span>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Tracking Info */}
              {order.trackingNumber && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Tracking Number</h3>
                      <p className="text-lg font-semibold text-gray-900">{order.trackingNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Carrier</h3>
                      <p className="text-lg font-semibold text-gray-900">{order.carrier}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Delivery</h3>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Timeline */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Timeline</h3>
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        index <= order.timeline.findIndex(e => e.status === order.status) 
                          ? 'bg-[#B88E2F] text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 capitalize">
                            {event.status.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-gray-500">{event.date}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        {event.location && (
                          <p className="text-sm text-gray-500 mt-1">📍 {event.location}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div 
                        className="w-16 h-16 bg-gray-100 rounded-lg bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          Color: {item.color} | Size: {item.size}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${item.price}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="font-semibold text-[#B88E2F]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping and Payment Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="mt-2">📞 {order.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                    <span>Total</span>
                    <span className="text-[#B88E2F]">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Payment Method: <span className="font-medium">{order.paymentMethod}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Section */}
          {/**  <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  ❓
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about your order or need assistance, our customer service team is here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="secondary" size="sm">
                      📞 Call Support
                    </Button>
                    <Button variant="secondary" size="sm">
                      📧 Email Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>*/} 
          </div>
        )}

        {/* No Order Found State */}
        {!order && !isLoading && orderId && email && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find an order matching the provided details. Please check your order ID and email address.
              </p>
              <div className="space-y-3 text-sm text-gray-500">
                <p>• Ensure the order ID is correct</p>
                <p>• Use the email address associated with the order</p>
                <p>• Check your email for the order confirmation</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}