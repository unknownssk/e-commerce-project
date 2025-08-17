import { configureStore} from "@reduxjs/toolkit";
import productsReducer from "./slices";

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
    
})