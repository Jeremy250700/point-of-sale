import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.all.min.js'
import { Dialog } from '@headlessui/react'
import Modal from '../components/Modal'

export default function History() {
  const [transactions, setTransactions] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [detailTransactions, setDetailTransactions] = useState([])

  const getDataTransactions = async () => {
    const item = await axios.get('http://localhost:3003/transactions')
    setTransactions(item.data)
  }
  const getDetail = async (transactionId) => {
    const dataProduct = await axios.get(
      `http://localhost:3003/transactions_detail?transactionId=${transactionId}&_expand=product`
    )
    setDetailTransactions(dataProduct.data)
    setIsOpenModal(true)
  }
  useEffect(() => {
    getDataTransactions()
  }, [])
  return (
    <>
      <div className='flex justify-center min-h-screen bg-[#ECBEAE] w-full py-5'>
        <div className='col-span-12'>
          <div className=''>
            <table className='table text-white border-separate space-y-6 text-lg'>
              <thead className='rounded-md bg-blue-950 text-white'>
                <tr>
                  <th className='py-3 px-5 text-center'>NO</th>
                  <th className='py-3 text-center'>DATE</th>
                  <th className='py-3 text-center'>TOTAL</th>
                  <th className='py-3  text-center'>PAID</th>
                  <th className='py-3  text-center'>CHANGE</th>
                  <th className='py-3  text-center'>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((data, index) => (
                  <tr className='bg-blue-950' key={data.id}>
                    <td className='text-center  text-lg'>{index + 1}</td>
                    <td className='text-center  text-lg px-10'>{data.date}</td>
                    <td className='text-center text-lg px-7'>
                      {'Rp. ' +
                        new Intl.NumberFormat('en-US').format(
                          data.charged_amount
                        )}
                    </td>
                    <td className='text-center  text-lg px-7'>
                      {'Rp. ' +
                        new Intl.NumberFormat('en-US').format(data.paid_amount)}
                    </td>
                    <td className='text-center  text-lg px-7'>
                      {'Rp. ' +
                        new Intl.NumberFormat('en-US').format(
                          data.change_amount
                        )}
                    </td>
                    <td className='px-10 py-3 flex'>
                      <button
                        className='py-1 px-3 border-2 border-[#ffc600] rounded-md flex mr-2'
                        onClick={(e) => getDetail(data.id)}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        title='Detail Produk'
      >
        <div className=''>
          {detailTransactions.map((detail, index) => (
            <div key={index} className='flex justify-between my-3 text-white'>
              <div className=' w-1/2'>{detail.product.title}</div>
              <div className=' w-1/2'>
                {'Rp. ' +
                  new Intl.NumberFormat('en-US').format(detail.subtotal)}
              </div>
              <div className=' w-1/8'>{detail.quantity}</div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
