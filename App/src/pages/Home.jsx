import { useEffect, useState } from 'react'
import Card from '../components/Card'
import Categories from '../components/Categories'
import axios from 'axios'
import Checkout from '../components/Checkout'
import { useSelector } from 'react-redux'

export default function Home() {
  const navbarState = useSelector(state => state.navbar)
  const [dataProducts, setDataProducts] = useState([])

  const result = () => {
    switch (navbarState.sort) {
      case 'Product Name':
        return `http://localhost:3003/products/?q=${navbarState.search}&_sort=title`
      case 'Product Price':
        return `http://localhost:3003/products/?q=${navbarState.search}&_sort=price`
      default:
        return `http://localhost:3003/products/?q=${navbarState.search}`
    }
  }

  const getDataProducts = async () => {
    try {
      const generatedLink = result()
      let response = await axios.get(generatedLink)
      setDataProducts(response.data)
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getDataProducts()
  }, [navbarState.search, navbarState.sort])
  return (
    <>
      <div className='w-screen h-full bg-[#ECBEAE] px-5 py-7'>
        <Categories />
        <div className='grid grid-cols-4 gap-3 my-4'>
          {dataProducts.map((dataProduct) => (
            <button key={dataProduct.id} className=''>
              <Card
                title={dataProduct.title}
                price={dataProduct.price}
                image={dataProduct.image}
              />
            </button>
          ))}
        </div>
      </div>
      <Checkout />
    </>
  )
}
