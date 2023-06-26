import { configureStore } from "@reduxjs/toolkit"
import navbarSlice from "./navbarSlice"

const store = configureStore({
	reducer: {
		navbar: navbarSlice
	}
})

export default store