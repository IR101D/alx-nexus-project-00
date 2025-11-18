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
  };
  onFilterChange: (key: string, value: string | boolean) => void;
  onClearFilters: () => void;
  productCount: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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