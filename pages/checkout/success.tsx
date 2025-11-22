// app/checkout/success/page.tsx
import Link from 'next/link';
import Button from '@/components/Button';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            You will receive an email confirmation shortly with your order details.
          </p>
          <div className="space-y-4">
           {/**  <Link href="/products">
             <Button variant="primary" size="lg" className="w-full">
                Continue Shopping
              </Button>
              </Link>
              */} 


             <Link href="/orders">
              <Button variant="secondary" className="w-full">
                View Your Orders
              </Button>
            </Link>
            
              <div className="mt-4 text-center">
                  <Link href="/products" className="text-[#B88E2F] hover:underline font-medium">
                    ← Continue Shopping
                  </Link>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}