import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import categoriesService from "../../services/categoriesService";
import { Category } from "@/interfaces";

interface CategoriesState {
  items: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: CategoriesState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  const res = await categoriesService.getCategories();
  return res;
});

export const createCategory = createAsyncThunk(
  "categories/add",
  async (category: Omit<Category, "id" | "createdAt" | "updatedAt">) => {
    const res = await categoriesService.addCategory(category as any);
    return res;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load categories";
      })
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.items.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to add category";
      });
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
