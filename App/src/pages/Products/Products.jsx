import axios from 'axios'
import { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.all.min.js'

import ListProduct from './partials/ListProduct.jsx'
import ModalUpdate from './partials/ModalUpdate'

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
    getDataProducts()
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
    getDataProducts()
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
      <ListProduct {...{ products, handleModalAdd, handleModalDetail, handleModalUpdate, handleDelete }} />

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
      <ModalUpdate {...{ openModalUpdate, setOpenModalUpdate, handleUpdate, formDataProduct, setValue, categories }} />

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
