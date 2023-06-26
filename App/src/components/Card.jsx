export default function Card(props) {
  return (
    <>
      <img src={props.image} alt='' className='rounded-t-md w-full h-36 ' />
      <div className='py-3 h-auto px-4 bg-blue-950 rounded-b-md text-white'>
        <h1 className='text-center text-sm font-semibold'>{props.title}</h1>
        <h1 className='text-center text-sm font-semibold'>Rp. {props.price}</h1>
      </div>
    </>
  )
}