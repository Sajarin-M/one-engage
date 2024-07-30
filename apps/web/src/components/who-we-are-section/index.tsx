'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useChangeWhoWeAreVisibilityMutation, useWhoWeAreQuery } from '@/lib/queries/who-we-are';
import { Button } from '@/components/ui/button';
import HomeScreenCard from '../home-screen-card';
import Image from '../image';
import VisibilityButton from '../visibility-button';
import EditSliderForm from './edit-who-we-are';

export default function WhoWeAreSection() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: whoWeAre, isPending: isWhoWeArePending } = useWhoWeAreQuery();
  const {
    variables,
    isPending: isVisibilityMutationPending,
    mutateAsync: changeVisibility,
  } = useChangeWhoWeAreVisibilityMutation({
    onSuccess: (data, { visible }) => {
      queryClient.setQueryData(useWhoWeAreQuery.getKey(), data);
      toast.success(
        visible ? 'Who we are section is now visible' : 'Who we are section is now hidden',
      );
    },
  });

  return (
    <HomeScreenCard>
      <div className='flex items-center gap-2'>
        <h2 className='font-normal'>Who We Are</h2>
        <VisibilityButton
          isLoading={isWhoWeArePending}
          value={isVisibilityMutationPending ? variables.visible : whoWeAre?.visible || false}
          onChange={(newState) => {
            if (whoWeAre && newState !== whoWeAre.visible) {
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
      <EditSliderForm data={whoWeAre} open={open} onOpenChange={setOpen} />
      <div className='mt-5 grid h-[35rem] grid-cols-[2fr_3fr] grid-rows-[3fr_4fr_4fr_6rem] gap-5'>
        <div className='flex items-center text-balance rounded-lg bg-[#F7F7F7] p-6 text-2xl font-extrabold text-primary'>
          {whoWeAre?.title}
        </div>
        <div className='row-span-4 flex items-center justify-center rounded-lg bg-[#F7F7F7] p-6'>
          {whoWeAre && <Image className='h-4/5 w-auto' image={whoWeAre.image} />}
        </div>
        <div className='flex items-center text-balance rounded-lg bg-[#F7F7F7] p-6 text-lg font-bold'>
          {whoWeAre?.subtitle}
        </div>
        <div className='flex items-center text-balance rounded-lg bg-[#F7F7F7] p-6'>
          {whoWeAre?.description}
        </div>
        <div className='flex items-center text-balance rounded-lg bg-[#F7F7F7] p-6 text-xl font-extrabold italic text-primary'>
          {whoWeAre?.buttonLabel}
        </div>
      </div>
    </HomeScreenCard>
  );
}
