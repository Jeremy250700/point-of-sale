import axios from 'axios'
import { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.all.min.js'
import ListProduct from './Partials/ListProduct'
import ModalAdd from './Partials/ModalAdd'
import ModalUpdate from './Partials/ModalUpdate'

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
        getDataProducts()
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
      <ListProduct
        {...{
          products,
          handleModalAdd,
          handleModalDetail,
          handleModalUpdate,
          handleDelete,
        }}
      />

      {/* modal add */}
      <ModalAdd
        {...{
          openModalAdd,
          setOpenModalAdd,
          handleSave,
          formDataProduct,
          setValue,
          categories,
        }}
      />

      {/* modal update */}
      <ModalUpdate
        {...{
          openModalUpdate,
          setOpenModalUpdate,
          handleUpdate,
          formDataProduct,
          setValue,
          categories,
        }}
      />

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
