import { useDispatch, useSelector } from 'react-redux'
import { optionSort, setSearch, setSort } from '../store/navbarSlice'

export default function Navbar() {
  const dispatch = useDispatch()
  const navbarState = useSelector((state) => state.navbar)

  return (
    <>
      <div className='flex w-full bg-blue-950 justify-between py-2'>
        <div className='flex'>
          <button className='my-auto mx-7 font-bold text-3xl text-[#ECBEAE]'>
            SANS CAKE
          </button>
          <div className='flex bg-white my-3 mx-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='w-5 h-5 my-auto mx-3'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
            <input
              className='peer h-full w-96 outline-none border-none text-sm text-gray-700 pr-2'
              type='text'
              id='search'
              onChange={(e) => dispatch(setSearch(e.target.value))}
              value={navbarState.search}
              placeholder='Search something..'
            />
          </div>
          <div className='my-auto mx-3'>
            <select
              value={navbarState.sort}
              onChange={(e) => dispatch(setSort(e.target.value))}
              className='text-sm font-bold text-gray-600 w-30 bg-white border-none'
            >
              {optionSort.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button className='my-auto mx-3 py-1 px-3 bg-[#ffc600] rounded-md flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='w-7 h-7 mr-2 text-gray-600'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12'
              />
            </svg>
            <h1 className='my-auto font-bold text-gray-600'>HISTORY</h1>
          </button>
        </div>

        <div className='my-auto flex mr-5'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='w-12 h-12 text-[#ECBEAE]'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          <div className='mr-10 my-auto px-2 text-[#ECBEAE]'>
            <h1 className='font-bold text-2xl '>USER 1</h1>
            <h4 className='leading-none text-sm text-white font-bold text-left'>
              Cashier 1
            </h4>
          </div>
        </div>
      </div>
    </>
  )
}
