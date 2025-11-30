import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import categoriesReducer from "./slices/categoriesSlice";
import productsReducer from "./slices/productsSlice";
import productDetailReducer from "./slices/productsDetailslice";

export const store = configureStore ({
    reducer: {
        cart: cartSlice,
        categories: categoriesReducer,
        products: productsReducer,
        productDetail: productDetailReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
