export default function LoadingPage() {
  return (
    <div className='absolute  bg-[#00000040] z-50 w-full h-screen left-0 top-0 flex items-center cursor-pointer' >
      <span className=' block text-xl absolute -translate-x-1/2 border-8 border-[#15B79E] border-r-transparent rounded-full w-20 h-20  left-1/2 font-bold animate-spin'></span>
    </div>
  );
}
