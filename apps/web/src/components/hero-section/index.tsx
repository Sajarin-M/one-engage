'use client';

import { useState } from 'react';
// import { useSlidersQuery } from '@/lib/queries/sliders';
import EditSlider from '@/components/hero-section/edit-slider';
import { Button } from '@/components/ui/button';
import HomeScreenCard from '../home-screen-card';

export default function HeroSection() {
  const [open, setOpen] = useState(false);
  const [_selectedSliderId, setSelectedSliderId] = useState<string | null>(null);

  // const { data: sliders = [] } = useSlidersQuery();

  return (
    <HomeScreenCard>
      <div className='flex items-center gap-2'>
        <h2 className='font-normal'>Hero Section</h2>
        <Button
          className='ml-auto w-action-btn rounded-3xl'
          size='sm'
          onClick={() => {
            setSelectedSliderId(null);
            setOpen(true);
          }}
        >
          Add
        </Button>
        <Button
          className='w-action-btn rounded-3xl'
          size='sm'
          onClick={() => {
            setOpen(true);
          }}
        >
          Edit
        </Button>
        <Button className='w-action-btn rounded-3xl' size='sm' onClick={() => {}}>
          Delete
        </Button>
      </div>
      <EditSlider open={open} onOpenChange={setOpen} />
    </HomeScreenCard>
  );
}
