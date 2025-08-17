import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllProducts = createAsyncThunk ('products/getAll', async ()=> {
    const allProducts = await axios.get('https://fakestoreapi.com/products');


    return allProducts.data;
} )