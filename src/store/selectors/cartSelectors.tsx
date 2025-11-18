import { RootState } from "..";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemsCount = (state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: RootState) =>
    state.cart.items.reduce((total, item)=> total + (item.price * item.quantity),0);

export const selectCartTotal = (state: RootState) => {
    const subtotal = selectCartSubtotal(state);
    const shipping = state.cart.items.length >0 ? 50:0;
    return subtotal + shipping
};

export const selectCartShipping = (state: RootState) =>
    state.cart.items.length > 0 ? 50 : 0;

export const selectItemInCart = (id: number) => (state: RootState) =>
    state.cart.items.some(item => item.id === id);