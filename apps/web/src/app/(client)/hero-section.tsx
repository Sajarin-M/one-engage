'use client';

import Image from '@/components/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from '@/components/ui/carousel';
import { HomePageContentVm } from '@/types';

export default function HeroSection({ sliders }: { sliders: HomePageContentVm['sliders'] }) {
  return (
    <section>
      <Carousel>
        <CarouselContent draggable={false} className='h-[35rem]'>
          {sliders.map((slider) => (
            <CarouselItem>
              <div className='grid h-full grid-cols-[4fr_5fr] gap-6'>
                <div className='flex items-center justify-center overflow-hidden rounded-xl p-12 text-3xl font-semibold uppercase text-primary'>
                  <p>{slider.title}</p>
                </div>
                <div className='flex items-center justify-center overflow-hidden rounded-xl p-12'>
                  <Image className='h-[25rem] w-auto' image={slider.image} />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* {sliders.length > 1 && (
          <CarouselPrevious className='left-0 -translate-x-1/2 bg-[#EBEBEB]' />
        )}
        {sliders.length > 1 && <CarouselNext className='right-0 translate-x-1/2 bg-[#EBEBEB]' />} */}
      </Carousel>
    </section>
  );
}
