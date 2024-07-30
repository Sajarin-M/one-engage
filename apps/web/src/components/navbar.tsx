import ChevronDownIcon from './icons/chevron-down';
import EngIcon from './icons/eng';
import NotificationsIcon from './icons/notifications';
import SearchIcon from './icons/search';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';

export default function Navbar() {
  return (
    <nav className='sticky top-0 ml-10 flex items-center gap-5 bg-white px-7 py-5'>
      <h1 className='text-2xl font-semibold'>Dashboard</h1>
      <div className='relative ml-auto'>
        <Input className='border-none bg-[#F9FAFB] pl-12' placeholder='Search here...' />
        <div className='absolute top-1/2 ml-3 h-6 w-6 -translate-y-1/2'>
          <SearchIcon />
        </div>
      </div>
      <div className='mx-5 flex items-center gap-4'>
        <div className='size-5'>
          <EngIcon />
        </div>
        <span className='text-sm font-semibold'>Eng (US)</span>
        <div className='size-5 text-[#A098AE]'>
          <ChevronDownIcon />
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='size-8'>
          <NotificationsIcon />
        </div>
        <Avatar className='rounded-md'>
          <AvatarImage className='rounded-md' src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback className='rounded-md'>CN</AvatarFallback>
        </Avatar>
        <div className='space-y-1'>
          <div className='text-xs font-semibold'>Shadcn</div>
          <div className='text-xs font-light text-[#737791]'>Admin</div>
        </div>
        <div className='size-5 self-start'>
          <ChevronDownIcon />
        </div>
      </div>
    </nav>
  );
}
