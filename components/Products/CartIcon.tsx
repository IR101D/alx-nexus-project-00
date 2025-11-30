'use client';

import Link from "next/link";
import { useAppSelector } from "@/src/store/hooks/redux";
import { selectCartItems, selectCartItemsCount } from "@/src/store/selectors/cartSelectors";
import { ShoppingCart } from "lucide-react";

const CartIcon = () => {
    const itemCount = useAppSelector(selectCartItemsCount);

    return (
        <Link href="/cart" className="relative text-gray-500 hover:text-gray-700 p-2 flex items-center justify-center">
    <span className="relative inline-block">
      <ShoppingCart className="w-7 h-7" />
        {itemCount > 0 && (
            <span className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
          {itemCount}
        </span>
        )}
    </span>
        </Link>
    );
};
export default CartIcon;