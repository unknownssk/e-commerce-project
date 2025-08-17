import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../API/productsApi";


const initialState = {
    items: [],
    loading: false,
    error: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllProducts.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
          })
          .addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    },
})

export default productsSlice.reducer;