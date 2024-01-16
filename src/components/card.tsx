export function Card(){
  return(
    <div className='flex bg-blue-200 p-3 rounded gap-8'>
      <div>
         <img 
           src='https://cdn-icons-png.flaticon.com/128/5996/5996278.png'
           className='w-72 mt-8'
        />
      </div>
      <div>
        <h2 className='text-blue-600 font-bold'>
          Get Our App
        </h2>
        <p className='text-gray-600'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum eget lectus nec imperdiet. Etiam volutpat turpis est, non aliquet purus dapibus a.
        </p>
        <button 
          className='border border-blue-400 text-blue-500 rounded-2xl p-2 px-8 mt-4 font-bold'>
          Learn more
        </button>
      </div>
    </div>
  )
}
