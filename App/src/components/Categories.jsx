export default function Categories() {
  return (
    <>
      <div className='flex'>
        <button className='w-28 text-base mx-5 border-b-2 border-orange-500 hover:bg-gray-300'>
          All
        </button>
        <button className='w-28 text-base  mx-5 border-b-2 border-green-500 hover:bg-gray-300'>
          DESSERTS
        </button>
        <button className='w-28 text-base mx-5 border-b-2 border-sky-500 hover:bg-gray-300'>
          BREAKFAST
        </button>
        <button className='w-28 text-base mx-5 border-b-2 border-purple-500 hover:bg-gray-300'>
          LUNCH
        </button>
        <button className='w-28 text-base mx-5 border-b-2 border-red-500 hover:bg-gray-300'>
          DRINKS
        </button>
      </div>
    </>
  )
}
