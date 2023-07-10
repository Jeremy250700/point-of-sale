import Modal from '../../../components/Modal'
export default function ModalAdd({
  openModalAdd,
  setOpenModalAdd,
  handleSave,
  formDataProduct,
  setValue,
  categories,
}) {
  return (
    <>
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
    </>
  )
}
