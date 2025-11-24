import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productsDetailService from "../../services/productsDetailService";
import { ApiProduct } from "@/interfaces";

interface ProductDetailState {
  item: ApiProduct | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: ProductDetailState = {
  item: null,
  status: "idle",
  error: null,
};

export const fetchProductDetail = createAsyncThunk("productDetail/fetch", async (id: string) => {
  const res = await productsDetailService.getProductDetail(id);
  return res;
});

export const updateProductDetail = createAsyncThunk(
  "productDetail/update",
  async ({ id, data }: { id: string; data: Partial<ApiProduct> }) => {
    const res = await productsDetailService.updateProduct(id, data);
    return res;
  }
);

export const deleteProductDetail = createAsyncThunk("productDetail/delete", async (id: string) => {
  await productsDetailService.deleteProduct(id);
  return id;
});

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    clearProductDetail: (state) => {
      state.item = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action: PayloadAction<ApiProduct>) => {
        state.item = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load product details";
      })
      .addCase(updateProductDetail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProductDetail.fulfilled, (state, action: PayloadAction<ApiProduct>) => {
        state.item = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateProductDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to update product";
      })
      .addCase(deleteProductDetail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProductDetail.fulfilled, (state) => {
        state.item = null;
        state.status = "succeeded";
      })
      .addCase(deleteProductDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to delete product";
      });
  },
});

export const { clearProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;
