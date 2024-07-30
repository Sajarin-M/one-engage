'use client';

import HeroSection from '@/components/hero-section';
import Navbar from '@/components/navbar';
import PageContentSection from '@/components/page-content-section';
import Sidebar from '@/components/sidebar';

export default function HomePage() {
  return (
    <div className='flex bg-[#FAFBFC]'>
      <Sidebar />
      <div className='relative ml-[var(--w-sidebar)] grow'>
        <Navbar />
        <div className='ml-20 mr-5 mt-10 flex flex-col gap-10'>
          <HeroSection />
          <PageContentSection />
        </div>
      </div>
    </div>
  );
}
