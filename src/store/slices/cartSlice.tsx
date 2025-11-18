import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem,CartState } from "@/interfaces";

export const initialState: CartState = {
  items: [
    {
      id: 1,
      name: "Modern Sofa",
      price: 1299,
      image: "/assets/images/sofa.jpg",
      quantity: 1,
      color: "Charcoal Gray",
      size: "Large"
    },
    {
      id: 2,
      name: "Office Chair",
      price: 299,
      image: "/assets/images/office-chair.jpg",
      quantity: 2,
      color: "Black",
      size: "Standard"
    }
  ],
};

const cartSlice = createSlice ({
    name: 'cart',
    initialState,
    reducers: {
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
  addItem, 
  updateQuantity, 
  removeItem, 
  clearCart, 
  incrementQuantity, 
  decrementQuantity 
} = cartSlice.actions;