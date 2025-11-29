import { ButtonHTMLAttributes, ReactNode } from "react";

export interface PageCoverProps {
  pageTitle: string;
  height?: string;
  overlayOpacity?: number;
}

export interface Review {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  review: string;
  date: string;
}

export interface ClientReviewsProps {
  title?: string;
  subtitle?: string;
  reviews: Review[];
  backgroundColor?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  coverImage: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export interface ProductsGridProps {
  products: Product[];
  currentPage: number;
  productsPerPage: number;
  totalProducts: number;
  onAddToCart: (product: Product) => void;
  onClearFilters: () => void;
}

export interface ProductSearchProps {
  products: Product[];
  onSearchResults: (results: Product[]) => void;
  className?: string;
  placeholder?: string;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export interface FilterProps {
  filters: {
    category: string;
    priceRange: string;
    inStock: boolean;
    sortBy: string;
    categories?: any;
  };
  onFilterChange: (key: string, value: string | boolean) => void;
  onClearFilters: () => void;
  productCount: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  showViewType?: 'pagination' | 'infinite' | 'both';
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
  size: string;
}

export interface CartState {
  items: CartItem[];
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  apartment: string;
  city: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  paymentMethod: 'bank' | 'cash';
  createAccount: boolean;
  privacyPolicy: boolean;
  privacyPolicyAlert: string,
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToTermsAlert: string,
  newsletter: boolean;
}

export interface OrderStatus {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  description: string;
  location?: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
}

export interface Order {
  id: string;
  orderDate: string;
  estimatedDelivery: string;
  status: OrderStatus['status'];
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    province: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  trackingNumber?: string;
  carrier?: string;
  timeline: OrderStatus[];
}

// New: Orders API types
export interface ShippingAddress {
  fullName: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface CheckoutRequest {
  shippingAddress: ShippingAddress;
  guestToken?: string | null;
  email : string;
}

export interface CheckoutResponse {
  orderId?: string | number;
  status?: string;
  message?: string;
  // Added: tracking code returned by backend after successful checkout
  trackingCode?: string;
}

// Track Order API types
export interface TrackOrderRequest {
  orderId?: string | number;
  trackingCode?: string;
  email: string; // required
}

export interface TrackOrderResponse {
  orderId?: string | number;
  email: string;
  steps: string[]; // e.g., ["Order Received", "Payment Confirmed", ...]
  message?: string; // friendly failure message on errors
}

export interface ApiCartItemResponse {
    productId: number;
    productName: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
}

export interface ApiCartResponse {
    items: ApiCartItemResponse[];
    total: number;
}

export interface ApiCartItemRequest {
    productId: number;
    quantity?: number; // default on backend is likely 1
}