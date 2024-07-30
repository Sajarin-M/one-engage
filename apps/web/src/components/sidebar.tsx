import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import companyLogo from '@/assets/logo.svg';
import AboutUsIcon from './icons/about-us';
import DashboardIcon from './icons/dashboard';
import HomeIcon from './icons/home';
import OurServicesIcon from './icons/our-services';

export default function Sidebar() {
  const sidebarLinks = [
    {
      name: 'Dashboard',
      icon: DashboardIcon,
      href: '',
    },
    {
      name: 'Home',
      icon: HomeIcon,
      href: '',
    },
    {
      name: 'About Us',
      icon: AboutUsIcon,
      href: '',
    },
    {
      name: 'Our Services',
      icon: OurServicesIcon,
      href: '',
    },
  ];

  return (
    <div className='fixed top-0 h-screen w-[var(--w-sidebar)] shrink-0 bg-white px-8 py-12'>
      <Image src={companyLogo} alt='One Engage Logo' className='h-[2.15rem] w-auto' />
      <ul className='mt-12 flex flex-col gap-3 text-[#737791]'>
        {sidebarLinks.map((link) => {
          const isActive = link.name === 'Home';

          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={cn(
                  'flex items-center gap-2 rounded-[16px] px-6 py-4',
                  !isActive && 'hover:bg-gray-100 hover:text-black',
                  isActive && 'bg-[#FF6410] text-white',
                )}
              >
                <link.icon />
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
