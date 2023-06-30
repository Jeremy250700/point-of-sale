import { createSlice } from "@reduxjs/toolkit"
import {toast} from "react-toastify"

const initialState ={
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
    cartTotalQuantity: 0,
    cartTotalAmount:0
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state,action){
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity +=1
                toast.info(`Increased ${action.payload.title} quantity`,{
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                })
            }else{
                const tempProduct ={...action.payload, cartQuantity:1}
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.title} add to cart`, {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        remove(state, action) {
            const nextCartItems = state.cartItems.filter(
              (item) => item.id !== action.payload.id
            )
            state.cartItems = nextCartItems
            toast.error(`Remove ${action.payload.title}`,{
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
          },
          decrease(state, action) {
            const itemIndex = state.cartItems.findIndex(
              (item) => item.id === action.payload.id
            )
      
            if (state.cartItems[itemIndex].cartQuantity > 1) {
              state.cartItems[itemIndex].cartQuantity -= 1
              toast.info(`Decrease ${action.payload.title} quantity`,{
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
              const nextCartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
              )
              state.cartItems = nextCartItems
              toast.error(`Remove ${action.payload.title}`,{
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
          },
          totals(state, action) {
            let { total, quantity } = state.cartItems.reduce(
              (cartTotal, item) => {
                const { price, cartQuantity } = item
                const itemTotal = price * cartQuantity
      
                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity
      
                return cartTotal
              },
              {
                total: 0,
                quantity: 0,
              }
            )
            state.cartTotalPrice = total
            state.cartTotalQuantity = quantity
          },
          clear(state, action) {
            state.cartItems = []
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
          },
    }
})

export const {addToCart, remove, decrease, totals, clear} = cartSlice.actions
export default cartSlice.reducer