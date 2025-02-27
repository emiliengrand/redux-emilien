import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types";

// Définir l'interface pour l'argument passé à l'asyncThunk
interface FetchProductsArgs {
  page: number;
  search?: string;
}

// AsyncThunk pour récupérer les produits avec la recherche et la pagination
export const fetchProducts = createAsyncThunk<Product[], FetchProductsArgs>(
  "products/fetch",
  async ({ page, search }) => {
    let url = `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`;
    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data.products; // Retourne le tableau de produits
  }
);

// État initial de Redux avec la structure correcte
const initialState: {
  items: Product[];
  isLoading: boolean;
  currentPage: number;
  searchTerm: string;
} = {
  items: [],
  isLoading: false,
  currentPage: 1,
  searchTerm: "",
};

// Création du slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setPage, setSearchTerm } = productSlice.actions;
export default productSlice.reducer;