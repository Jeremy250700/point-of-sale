import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.all.min.js'

export default function History() {
  const [transactions, setTransactions] = useState([])
  const getDataTransactions = async () => {
    const item = await axios.get('http://localhost:3003/transactions')
    setTransactions(item.data)
  }
  const getDetail = async (transactionId) => {
    const dataProduct = await axios.get(
      `http://localhost:3003/transactions_detail?transactionId=${transactionId}&_expand=product`
    )
    for (let i = 0; i < dataProduct.data.length; i++) {
      console.log(dataProduct.data[i].product.title)
      console.log(dataProduct.data[i].product.price)
      console.log(dataProduct.data[i].product.image)
    }
    Swal.fire({})
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
                  <th className='py-3 px-10 text-center'>DATE</th>
                  <th className='py-3 px-10 text-center'>TOTAL</th>
                  <th className='py-3 px-10 text-center'>PAID</th>
                  <th className='py-3 px-10 text-center'>CHANGE</th>
                  <th className='py-3 px-5 text-center'>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((data, index) => (
                  <tr className='bg-blue-950' key={data.id}>
                    <td className='text-center  text-lg'>{index + 1}</td>
                    <td className='text-center  text-lg px-3'>{data.date}</td>
                    <td className='text-center text-lg'>
                      {'Rp. ' +
                        new Intl.NumberFormat('en-US').format(
                          data.charged_amount
                        )}
                    </td>
                    <td className='text-center  text-lg'>
                      {'Rp. ' +
                        new Intl.NumberFormat('en-US').format(data.paid_amount)}
                    </td>
                    <td className='text-center  text-lg'>
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
                      <button className='py-1 px-3 border-2 border-red-700 rounded-md flex ml-2'>
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
    </>
  )
}
