import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import categoriesReducer from "./slices/categoriesSlice";

export const store = configureStore ({
    reducer: {
        cart: cartSlice,
        categories: categoriesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
