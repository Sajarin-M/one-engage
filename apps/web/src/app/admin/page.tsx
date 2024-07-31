'use client';

import HeroSection from '@/components/hero-section';
import Navbar from '@/components/navbar';
import NoMattersSection from '@/components/no-matters-section';
import PageContentSection from '@/components/page-content-section';
import Sidebar from '@/components/sidebar';
import UnlockYourWorldSection from '@/components/unlock-your-world-section';
import WhatWeOfferSection from '@/components/what-we-offer-section';
import WhoWeAreSection from '@/components/who-we-are-section';
import WithAuth from '@/components/with-auth';

function HomePage() {
  return (
    <div className='flex bg-[#FAFBFC]'>
      <Sidebar />
      <div className='relative ml-[var(--w-sidebar)] grow'>
        <Navbar />
        <div className='ml-20 mr-5 mt-10 flex flex-col gap-10'>
          <HeroSection />
          <PageContentSection />
          <WhoWeAreSection />
          <WhatWeOfferSection />
          <UnlockYourWorldSection />
          <NoMattersSection />
        </div>
      </div>
    </div>
  );
}

export default WithAuth(HomePage);
