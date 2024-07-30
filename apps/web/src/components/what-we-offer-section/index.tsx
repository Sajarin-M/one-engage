'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  useChangeWhatWeOfferVisibilityMutation,
  useWhatWeOfferQuery,
} from '@/lib/queries/what-we-offer';
import { Button } from '@/components/ui/button';
import HomeScreenCard from '../home-screen-card';
import Image from '../image';
import VisibilityButton from '../visibility-button';
import EditWhatWeOffer from './edit-what-we-offer';

export default function WhatWeOfferSection() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: whatWeOffer, isPending: isWhatWeOfferPending } = useWhatWeOfferQuery();
  const {
    variables,
    isPending: isVisibilityMutationPending,
    mutateAsync: changeVisibility,
  } = useChangeWhatWeOfferVisibilityMutation({
    onSuccess: (data, { visible }) => {
      queryClient.setQueryData(useWhatWeOfferQuery.getKey(), data);
      toast.success(
        visible ? 'What we offer section is now visible' : 'What we offer section is now hidden',
      );
    },
  });

  return (
    <HomeScreenCard>
      <div className='flex items-center gap-2'>
        <h2 className='font-normal'>What We Offer</h2>
        <VisibilityButton
          isLoading={isWhatWeOfferPending}
          value={isVisibilityMutationPending ? variables.visible : whatWeOffer?.visible || false}
          onChange={(newState) => {
            if (whatWeOffer && newState !== whatWeOffer.visible) {
              changeVisibility({ visible: newState });
            }
          }}
          className='ml-auto'
        />
        <Button
          className='w-[6.5rem] rounded-3xl'
          size='sm'
          onClick={() => {
            setOpen(true);
          }}
        >
          Edit
        </Button>
      </div>
      <EditWhatWeOffer data={whatWeOffer} open={open} onOpenChange={setOpen} />
      <div className='mt-5 grid h-[35rem] grid-cols-[2fr_3fr] grid-rows-[2fr_4fr_4fr] gap-5'>
        <div className='col-span-2 flex items-center text-balance rounded-lg bg-primary p-6 text-2xl font-extrabold text-primary-foreground'>
          {whatWeOffer?.title}
        </div>
        <div className='flex items-center text-balance rounded-lg bg-primary p-6 text-lg font-bold text-primary-foreground'>
          {whatWeOffer?.subtitle}
        </div>
        <div className='row-span-2 flex items-center justify-center rounded-lg bg-primary p-6 text-primary-foreground'>
          {whatWeOffer && <Image className='h-4/5 w-auto' image={whatWeOffer.image} />}
        </div>
        <div className='flex items-center text-balance rounded-lg bg-primary p-6 text-primary-foreground'>
          {whatWeOffer?.description}
        </div>
      </div>
    </HomeScreenCard>
  );
}
