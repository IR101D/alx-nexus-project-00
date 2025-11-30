import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState, ApiCartResponse } from "@/interfaces";
import cartService from "@/src/services/cartService";
import type { AppDispatch } from "..";

export const initialState: CartState = {
  items: [

  ],
};

// Helper to map API response cart items to UI cart items
const mapApiToCartItems = (response: ApiCartResponse): CartItem[] => {
  return (response.items || []).map((it) => ({
    id: it.productId,
    name: it.productName,
    price: it.unitPrice,
    image: it.imageUrl,
    quantity: it.quantity,
    // Backend doesn’t track options; use sensible defaults
    color: "Default",
    size: "One Size",
  }));
};

const cartSlice = createSlice ({
    name: 'cart',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<CartItem[]>) => {
          state.items = action.payload;
        },
        addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => 
            {
         const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.color === action.payload.color && 
        item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1
        });
      }
    },

       updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },
      
     removeItem: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
     },

     clearCart: (state) => {
        state.items = [];
     },

     incrementQuantity: (state, action: PayloadAction<number>) => {
        const item = state.items.find(item => item.id === action.payload);
            if(item) {
                item.quantity += 1;
            }
     },
     
     decrementQuantity: (state, action: PayloadAction <number>) => {
        const item = state.items.find(item => item.id === action.payload);
        if(item && item.quantity >1){
            item.quantity -=1;
        }
     }

        }
})
export default cartSlice.reducer;
export const { 
  setItems,
  addItem, 
  updateQuantity, 
  removeItem, 
  clearCart, 
  incrementQuantity, 
  decrementQuantity 
} = cartSlice.actions;

// Thunk: hydrate cart from backend API on app start
export const fetchCartFromApi = () => async (dispatch: AppDispatch) => {
  try {
    const response: ApiCartResponse = await cartService.getMyCart();
    const mapped: CartItem[] = mapApiToCartItems(response);
    dispatch(setItems(mapped));
  } catch (e) {
    // Silently ignore on first load; UI can remain empty cart
    // console.error('Failed to fetch cart from API', e);
  }
};

// Thunk: add item to backend cart and sync Redux state
export const addToCartAsync = (params: { productId: number; quantity?: number }) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await cartService.addItem({ productId: params.productId, quantity: params.quantity ?? 1 });
      dispatch(setItems(mapApiToCartItems(res)));
    } catch (e) {
      // Optionally fall back to local add to keep UX responsive
      // But for coherence, we ignore on error here
    }
  };

// Thunk: update item quantity on backend and sync
export const updateCartItemAsync = (params: { productId: number; quantity: number }) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await cartService.updateItem(params.productId, params.quantity);
      dispatch(setItems(mapApiToCartItems(res)));
    } catch (e) {
      // no-op
    }
  };

// Thunk: remove an item from backend and sync
export const removeFromCartAsync = (productId: number) => async (dispatch: AppDispatch) => {
  try {
    const res = await cartService.removeItem(productId);
    dispatch(setItems(mapApiToCartItems(res)));
  } catch (e) {
    // no-op
  }
};

// Thunk: clear backend cart and sync (empty state)
export const clearCartAsync = () => async (dispatch: AppDispatch) => {
  try {
    await cartService.clearCart();
    dispatch(setItems([]));
  } catch (e) {
    // no-op
  }
};