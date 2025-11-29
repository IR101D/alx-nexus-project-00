// components/ProductCard.tsx
import { useRouter } from 'next/router';
import Button from '../Button';
import { Product,ProductCardProps } from '@/interfaces';
import { useAppDispatch } from '@/src/store/hooks/redux';
import { addToCartAsync } from '@/src/store/slices/cartSlice';
import Swal from 'sweetalert2';

  const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    handleAddToCartApi(product);
  };
  const handleAddToCartApi = async (product: Product)=> {
    try {
      // Centralized via slice thunk; it will sync items from API
      await dispatch(addToCartAsync({ productId: product.id, quantity: 1 }));
      // Success alert
      await Swal.fire({
        icon: 'success',
        title: 'Added to cart',
        text: `${product.name} has been added to your cart.`,
        timer: 1500,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add to cart';
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      });
      console.error('Add to cart error:', err);
    }
  };
  const handleProductClick = () => {
    router.push(`/products/${product.id}`);
  };


  return (
 <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
      onClick={handleProductClick}
    >
<div className="relative">
        <div 
          className="h-64 bg-cover bg-center rounded-t-lg"
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#B88E2F]">
            ${product.price}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          className="w-full mt-4"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;