import Modal from '../../../components/Modal'
export default function ModalDetail(
  openModalDetail,
  setOpenModalDetail,
  formDataProduct
) {
  return (
    <>
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
