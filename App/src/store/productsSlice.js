import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		productList: []
	},
	reducers: {
		setProducts (state, action) {
			state.productList = action.payload
		}
	}
})

export const { setProducts } = productsSlice.actions
export default productsSlice.reducer

const result = (search, sort) => {
	switch (sort) {
		case 'Product Name':
			return `http://localhost:3003/products/?q=${search}&_sort=title`
		case 'Product Price':
			return `http://localhost:3003/products/?q=${search}&_sort=price`
		default:
			return `http://localhost:3003/products/?q=${search}`
	}
}

export function getDataProducts() {
	return async (dispatch, getState) => {
		try {
			const navbarState = getState().navbar
			const generatedLink = result(navbarState.search, navbarState.sort)
			let response = await axios.get(generatedLink)
			dispatch(setProducts(response.data))
		} catch (e) {
			console.log(e.message)
		}
	}
}