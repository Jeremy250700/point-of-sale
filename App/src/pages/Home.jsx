import { useEffect, useState } from 'react'
import Card from '../components/Card'
import Categories from '../components/Categories'
import axios from 'axios'
import Checkout from '../components/Checkout'

export default function Home() {
  const [dataProducts, setDataProducts] = useState([])
  const getDataProducts = async () => {
    try {
      let response = await axios.get('http://localhost:3003/products')
      setDataProducts(response.data)
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getDataProducts()
  }, [])
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
