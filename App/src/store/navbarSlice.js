import { createSlice } from "@reduxjs/toolkit"

export const optionSort = ['Product Name', 'Product Price']

const navbarSlice = createSlice({
	name: 'navbar',
	initialState: {
		search: '',
		sort: optionSort[0],
	},
	reducers: {
		setSearch (state, action) {
			state.search = action.payload
		},
		setSort (state, action) {
			state.sort = action.payload
		},
	}
})

export const { setSearch, setSort } = navbarSlice.actions
export default navbarSlice.reducer