import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productsService from "../../services/productsService";
import { ApiProduct } from "@/interfaces";

interface ProductsState {
  items: ApiProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await productsService.getProducts();
  return res;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ApiProduct[]>) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load products";
      });
  },
});

export default productsSlice.reducer;
