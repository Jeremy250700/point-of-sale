import axios from 'axios'
import { useEffect, useState } from 'react'
export default function Categories() {
  const [dataCategories, setDataCategories] = useState([])
  const getDataCategories = async () => {
    try {
      let response = await axios.get('http://localhost:3003/categories')
      setDataCategories(response.data)
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getDataCategories()
  }, [])
  return (
    <>
      <div className='flex justify-center'>
        <button className='w-28 py-1 text-base mx-5 rounded-md bg-blue-950 text-white hover:bg-white hover:text-blue-950'>
          ALL
        </button>
        {dataCategories.map((dataCategory) => (
          <button
            className='w-28 py-1 text-base mx-5 rounded-md bg-blue-950 text-white hover:bg-white hover:text-blue-950 uppercase'
            key={dataCategory.id}
          >
            {dataCategory.name}
          </button>
        ))}
      </div>
    </>
  )
}
