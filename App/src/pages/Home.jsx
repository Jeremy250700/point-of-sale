import { useEffect, useState } from 'react'
import Card from '../components/Card'
import Categories from '../components/Categories'
import Checkout from '../components/Checkout'
import { useDispatch, useSelector } from 'react-redux'
import { getDataProducts } from '../store/productsSlice'
import { addToCart } from '../store/cartSlice'

export default function Home() {
  const dispatch = useDispatch()
  const navbarState = useSelector((state) => state.navbar)
  const dataProducts = useSelector((state) => state.products.productList)

  const handleAddToCart = (dataProduct) => {
    dispatch(addToCart(dataProduct))
  }

  useEffect(() => {
    dispatch(getDataProducts())
  }, [navbarState.search, navbarState.sort])

  return (
    <>
      <div className='w-7/12 bg-[#ECBEAE] px-5 py-7'>
        <Categories />
        <div className='grid grid-cols-4 gap-3 my-4'>
          {dataProducts.map((dataProduct) => (
            <button
              key={dataProduct.id}
              className=''
              onClick={() => handleAddToCart(dataProduct)}
            >
              <Card
                title={dataProduct.title}
                price={dataProduct.price}
                image={dataProduct.image}
                stock={dataProduct.stock}
              />
            </button>
          ))}
        </div>
      </div>
      <Checkout />
    </>
  )
}
