import { configureStore } from "@reduxjs/toolkit"
import navbarSlice from "./navbarSlice"
import productsSlice from "./productsSlice"
import cartSlice from "./cartSlice"
const store = configureStore({
    reducer:{
        navbar:navbarSlice,
        products: productsSlice,
        cart:cartSlice,
    }
})

export default store