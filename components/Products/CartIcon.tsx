'use client';

import Link from "next/link";
import { useAppSelector } from "@/src/store/hooks/redux";
import { selectCartItems, selectCartItemsCount } from "@/src/store/selectors/cartSelectors";
import { ShoppingCart } from "lucide-react";

const CartIcon = () => {
    const itemCount = useAppSelector(selectCartItemsCount);

    return(
        <Link href="/cart" className="relative text-gray-500 hover:text-gray-700 p-2">
            <ShoppingCart/>
            {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
        </Link>
    );
};
export default CartIcon;