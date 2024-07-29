import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function HomePage() {
  return (
    <div className='flex bg-[#FAFBFC]'>
      <Sidebar />
      <div className='relative grow'>
        <Navbar />
        <div className='ml-20 mr-5 mt-10 flex flex-col gap-10'>
          <div className='h-[600px] rounded-2xl bg-white shadow-[1px_1px_10px_0px_#00000017]'></div>
          <div className='h-[600px] rounded-2xl bg-white shadow-[1px_1px_10px_0px_#00000017]'></div>
        </div>
      </div>
    </div>
  );
}
