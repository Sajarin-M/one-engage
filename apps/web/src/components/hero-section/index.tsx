'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useDeleteSliderMutation, useSlidersQuery } from '@/lib/queries/sliders';
// import { useSlidersQuery } from '@/lib/queries/sliders';
import EditSlider from '@/components/hero-section/edit-slider';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import HomeScreenCard from '../home-screen-card';
import Image from '../image';

export default function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [open, setOpen] = useState(false);
  const [selectedSliderIndex, setSelectedSliderIndex] = useState(0);
  const [mode, setMode] = useState<'edit' | 'create'>('create');

  const queryClient = useQueryClient();
  const { data: sliders = [] } = useSlidersQuery();
  const { mutate: deleteSlider, isPending } = useDeleteSliderMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useSlidersQuery.getKey() });
    },
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setSelectedSliderIndex(api.selectedScrollSnap());
    };
    onSelect();
    api.on('select', onSelect);
  }, [api]);

  console.log(selectedSliderIndex);

  return (
    <HomeScreenCard>
      <div className='flex items-center gap-2'>
        <h2 className='font-normal'>Hero Section</h2>
        <Button
          className='ml-auto w-action-btn rounded-3xl'
          size='sm'
          onClick={() => {
            setMode('create');
            setOpen(true);
          }}
        >
          Add
        </Button>
        <Button
          className='w-action-btn rounded-3xl'
          size='sm'
          disabled={sliders.length === 0}
          onClick={() => {
            setMode('edit');
            setOpen(true);
          }}
        >
          Edit
        </Button>
        <Button
          size='sm'
          disabled={sliders.length <= 1}
          className='w-action-btn rounded-3xl'
          loading={isPending}
          onClick={() => {
            if (sliders.length === 1) {
              toast.error('You must have at least one slider');
            }
            const currentSlider = sliders[selectedSliderIndex];
            if (currentSlider) {
              deleteSlider(currentSlider.id);
            }
          }}
        >
          Delete
        </Button>
      </div>
      <EditSlider
        data={
          mode === 'edit' && selectedSliderIndex >= 0 ? sliders[selectedSliderIndex] : undefined
        }
        open={open}
        onOpenChange={setOpen}
      />
      <div className='mt-10'>
        <Carousel setApi={setApi}>
          <CarouselContent draggable={false} className='h-[30rem]'>
            {sliders.map((slider) => (
              <CarouselItem>
                <div className='grid h-full grid-cols-[4fr_5fr] gap-6'>
                  <div className='flex items-center justify-center overflow-hidden rounded-xl bg-[#F7F7F7] p-12 text-3xl font-semibold uppercase text-primary'>
                    <p>{slider.title}</p>
                  </div>
                  <div className='flex items-center justify-center overflow-hidden rounded-xl bg-[#F7F7F7] p-12'>
                    <Image className='h-[25rem] w-auto' image={slider.image} />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {sliders.length > 1 && (
            <CarouselPrevious className='left-0 -translate-x-1/2 bg-[#EBEBEB]' />
          )}
          {sliders.length > 1 && <CarouselNext className='right-0 translate-x-1/2 bg-[#EBEBEB]' />}
        </Carousel>
      </div>
    </HomeScreenCard>
  );
}
