import axios from 'axios'
import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.all.min.js'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalUpdate, setOpenModalUpdate] = useState(false)
  const [openModalDetail, setOpenModalDetail] = useState(false)

  const [formDataProduct, setFormDataProduct] = useState({
    title: '',
    categoryId: 0,
    price: 0,
    image: '',
    stock: 0,
  })

  const setValue = (event) => {
    setFormDataProduct({
      ...formDataProduct,
      [event.target.name]: event.target.value,
    })
  }

  const getDataCategories = async () => {
    const item = await axios.get('http://localhost:3003/categories')
    setCategories(item.data)
  }

  const getDataProducts = async () => {
    const item = await axios.get(
      'http://localhost:3003/products?_expand=category'
    )
    setProducts(item.data)
  }

  const handleModalAdd = () => {
    setFormDataProduct({
      title: '',
      categoryId: 0,
      price: 0,
      image: '',
      stock: 0,
    })
    setOpenModalAdd(true)
  }

  const handleModalDetail = async (id) => {
    setOpenModalDetail(true)
    const item = await axios.get('http://localhost:3003/products/' + id)
    setFormDataProduct(item.data)
  }

  const handleModalUpdate = async (id) => {
    const item = await axios.get('http://localhost:3003/products/' + id)
    setFormDataProduct(item.data)
    setOpenModalUpdate(true)
  }

  const handleSave = async (event) => {
    event.preventDefault()
    await axios.post('http://localhost:3003/products', formDataProduct)
    setOpenModalAdd(false)
    await Swal.fire({
      icon: 'success',
      title: 'Product has been saved',
      showConfirmButton: false,
      timer: 1500,
    })
    location.reload()
  }
  const handleUpdate = async (event) => {
    event.preventDefault()
    await axios.put(
      'http://localhost:3003/products/' + formDataProduct.id,
      formDataProduct
    )
    setOpenModalUpdate(false)
    await Swal.fire({
      icon: 'success',
      title: 'Product has been updated',
      showConfirmButton: false,
      timer: 1500,
    })
    location.reload()
  }
  const handleDelete = async (id) => {
    await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete('http://localhost:3003/products/' + id)
        location.reload()
      }
    })
  }

  useEffect(() => {
    getDataProducts()
    getDataCategories()
  }, [])

  return (
    <>
      {/* list product */}
      <div className='min-h-screen bg-[#ECBEAE] w-full pb-8'>
        <div className='p-5 flex justify-between'>
          <h1 className='text-4xl  font-bold text-blue-950'>LIST PRODUCT</h1>
          <button
            className='py-1 px-3 rounded-md flex bg-[#ffc600] border-2 border-blue-950'
            onClick={handleModalAdd}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='w-6 h-6 mr-2 my-auto text-blue-950'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M12 4.5v15m7.5-7.5h-15'
              />
            </svg>

            <h1 className='my-auto font-bold text-blue-950 text-lg'>
              ADD NEW PRODUCT
            </h1>
          </button>
        </div>
        <div className='flex justify-center '>
          <div className='col-span-12'>
            <div className=''>
              <table className='table text-white border-separate space-y-6 text-lg'>
                <thead className='rounded-md bg-blue-950 text-white'>
                  <tr>
                    <th className='py-3 px-5 text-center'>NO</th>
                    <th className='py-3 text-center'>NAME</th>
                    <th className='py-3 text-center px-5'>CATEGORY</th>
                    <th className='py-3  text-center'>PRICE</th>
                    <th className='py-3  text-center px-2'>STOCK</th>
                    <th className='py-3  text-center'>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((data, index) => (
                    <tr className='bg-blue-950' key={data.id}>
                      <td className='text-center  text-lg'>{index + 1}</td>
                      <td className='text-center  text-lg px-10'>
                        {data.title}
                      </td>
                      <td className='text-center text-lg '>
                        {data.category.name}
                      </td>
                      <td className='text-center  text-lg px-7'>
                        {'Rp. ' +
                          new Intl.NumberFormat('en-US').format(data.price)}
                      </td>
                      <td className='text-center  text-lg px-7'>
                        {data.stock}
                      </td>
                      <td className='px-10 py-3 flex'>
                        <button
                          className='py-1 px-3 border-2 border-[#ffc600] rounded-md flex'
                          onClick={(e) => handleModalDetail(data.id)}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                            class='w-7 h-7 mr-2 text-[#ffc600]'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
                            />
                          </svg>

                          <h1 className='my-auto font-bold text-[#ffc600] text-sm'>
                            DETAIL
                          </h1>
                        </button>

                        <button
                          className='py-1 px-3 border-2 border-green-500 rounded-md flex mx-3'
                          onClick={(e) => handleModalUpdate(data.id)}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                            class='w-7 h-7 mr-2 text-green-500'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              d='M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z'
                            />
                          </svg>

                          <h1 className='my-auto font-bold text-green-500 text-sm'>
                            UPDATE
                          </h1>
                        </button>

                        <button
                          className='py-1 px-3 border-2 border-red-700 rounded-md flex '
                          onClick={(e) => handleDelete(data.id)}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                            class='w-7 h-7 text-red-700'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                            />
                          </svg>

                          <h1 className='my-auto font-bold text-red-700 text-sm'>
                            DELETE
                          </h1>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* modal add */}
      <Modal
        isOpen={openModalAdd}
        setIsOpen={setOpenModalAdd}
        title='ADD DATA PRODUCT'
      >
        <div className=''>
          <form className='mt-6' onSubmit={handleSave}>
            <div>
              <label className='block text-white'>NAME</label>
              <input
                type='text'
                name='title'
                value={formDataProduct.title}
                onChange={setValue}
                placeholder='Enter Product Name'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 focus:bg-white focus:outline-none'
                required
              />
            </div>
            <div>
              <label className='block text-white mt-2'>CATEGORY</label>
              <select
                type='number'
                name='categoryId'
                onChange={setValue}
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 focus:bg-white focus:outline-none'
                required
              >
                <option selected defaultValue={''} disabled>
                  Select Category
                </option>
                {categories.map((data, index) => (
                  <option value={data.id} key={data.id} className='uppercase'>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-white mt-2'>PRICE</label>
              <input
                type='number'
                name='price'
                value={formDataProduct.price}
                onChange={setValue}
                placeholder='Enter Product Price'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 focus:bg-white focus:outline-none'
                required
              />
            </div>
            <div>
              <label className='block text-white mt-2'>STOCK</label>
              <input
                type='number'
                name='stock'
                value={formDataProduct.stock}
                onChange={setValue}
                placeholder='Enter Product Stock'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 focus:bg-white focus:outline-none'
                required
              />
            </div>
            <div>
              <label className='block text-white mt-2'>IMAGE</label>
              <input
                type='text'
                name='image'
                value={formDataProduct.image}
                onChange={setValue}
                placeholder='Enter Product Image'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 focus:bg-white focus:outline-none'
                required
              />
            </div>

            <button
              type='submit'
              className='w-full block bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md
              px-4 py-2 mt-6'
            >
              SAVE
            </button>
          </form>
        </div>
      </Modal>

      {/* modal update */}
      <Modal
        isOpen={openModalUpdate}
        setIsOpen={setOpenModalUpdate}
        title='UPDATE DATA PRODUCT'
      >
        <div className=''>
          <form className='mt-6' onSubmit={handleUpdate}>
            <div>
              <label className='block text-white'>NAME</label>
              <input
                type='text'
                name='title'
                value={formDataProduct.title}
                onChange={setValue}
                placeholder='Enter Product Name'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 focus:bg-white focus:outline-none'
                required
              />
            </div>
            <div>
              <label className='block text-white mt-2'>CATEGORY</label>
              <select
                type='number'
                name='categoryId'
                onChange={setValue}
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 focus:bg-white focus:outline-none'
                required
              >
                <option selected defaultValue={''} disabled>
                  Select Category
                </option>
                {categories.map((data, index) => (
                  <option value={data.id} key={data.id} className='uppercase'>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-white mt-2'>PRICE</label>
              <input
                type='number'
                name='price'
                value={formDataProduct.price}
                onChange={setValue}
                placeholder='Enter Product Price'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 focus:bg-white focus:outline-none'
                required
              />
            </div>
            <div>
              <label className='block text-white mt-2'>STOCK</label>
              <input
                type='number'
                name='stock'
                value={formDataProduct.stock}
                onChange={setValue}
                placeholder='Enter Product Stock'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 focus:bg-white focus:outline-none'
                required
              />
            </div>
            <div>
              <label className='block text-white mt-2'>IMAGE</label>
              <input
                type='text'
                name='image'
                value={formDataProduct.image}
                onChange={setValue}
                placeholder='Enter Product Image'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 focus:bg-white focus:outline-none'
                required
              />
            </div>

            <button
              type='submit'
              className='w-full block bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md
          px-4 py-2 mt-6'
            >
              SAVE
            </button>
          </form>
        </div>
      </Modal>

      {/* modal detail */}
      <Modal
        isOpen={openModalDetail}
        setIsOpen={setOpenModalDetail}
        title='DETAIL PRODUCT'
      >
        <div className=''>
          <img src={formDataProduct.image} alt='' />
        </div>
      </Modal>
    </>
  )
}
