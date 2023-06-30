import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrease, remove, totals } from '../store/cartSlice'
import { useEffect, useState } from 'react'

export default function Checkout() {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const [bayar, setBayar] = useState({ bayar: 0 })
  const [amount, setAmount] = useState({
    paid_amount: bayar.bayar,
    charged_amount: cart.cartTotalPrice,
    change_amount: bayar.bayar - cart.cartTotalPrice,
  })

  const handleRemoveCart = (item) => {
    dispatch(remove(item))
  }
  const handleDecrease = (item) => {
    if (item.quantity == 1) {
      dispatch(remove(item))
    } else {
      dispatch(decrease(item))
    }
  }
  const handleIncrease = (item) => {
    dispatch(addToCart(item))
  }

  const handleCheckout = () => {
    console.log(amount)
  }
  useEffect(() => {
    dispatch(totals())
  }, [cart])
  return (
    <>
      <div className='border-l-2 border-blue-950 bg-[#ECBEAE] w-4/12 p-2'>
        <div>
          {cart.cartItems?.map((cartItem) => (
            <div
              className='w-full h-max border-b-2 border-blue-950 text-blue-950'
              key={cartItem.id}
            >
              <div className=' px-5 py-2 flex w-full justify-between '>
                <h1 className='text-2xl font-bold'>{cartItem.title}</h1>
                <div className=''>
                  <h1 className='font-bold text-lg'>
                    {'Rp. ' +
                      new Intl.NumberFormat('en-US').format(
                        cartItem.price * cartItem.cartQuantity
                      )}
                  </h1>
                </div>
              </div>
              <div className='px-5 py-2 flex w-full justify-between'>
                <div className='flex h-3/4  my-auto'>
                  <button
                    onClick={() => handleDecrease(cartItem)}
                    className='px-3 bg-yellow-300 rounded-md mr-1'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      class='w-4 h-4'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M19.5 12h-15'
                      />
                    </svg>
                  </button>
                  <h1 className='text-sm font-bold px-5 py-2 bg-white rounded-md mx-1'>
                    {cartItem.cartQuantity}
                  </h1>
                  <button
                    onClick={() => handleIncrease(cartItem)}
                    className='px-3 bg-yellow-300 rounded-md ml-1'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      class='w-4 h-4'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M12 4.5v15m7.5-7.5h-15'
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveCart(cartItem)}
                  className='px-3 bg-red-700 rounded-md'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='bg-blue-950 my-10 text-white rounded-md px-5 py-3'>
          <div className='flex justify-between text-lg'>
            <h1>Total:</h1>
            <h1>
              {'Rp. ' +
                new Intl.NumberFormat('en-US').format(cart.cartTotalPrice)}
            </h1>
          </div>
          <div className='flex justify-between text-lg my-3'>
            <h1>Dibayar:</h1>
            <input
              className='text-blue-950 font-bold h-10'
              type='number'
              onChange={(e) => setBayar({ ...bayar, bayar: e.target.value })}
            />
          </div>
          <div className='flex justify-between text-lg'>
            <h1>Kembalian:</h1>
            <h1>
              {'Rp. ' +
                new Intl.NumberFormat('en-US').format(
                  bayar.bayar - cart.cartTotalPrice
                )}
            </h1>
          </div>
          <button
            onClick={() => handleCheckout()}
            className='bg-yellow-300 rounded-md text-blue-950 font-bold text-lg text-center py-1 w-full my-2
          '
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  )
}
