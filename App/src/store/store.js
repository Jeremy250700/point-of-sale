import { configureStore } from "@reduxjs/toolkit"
import navbarSlice from "./navbarSlice"
import productsSlice from "./productsSlice"

const store = configureStore({
	reducer: {
		navbar: navbarSlice,
		products: productsSlice
	}
})

export default store