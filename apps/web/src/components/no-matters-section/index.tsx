'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useChangeNoMattersVisibilityMutation, useNoMattersQuery } from '@/lib/queries/no-matters';
import { Button } from '@/components/ui/button';
import HomeScreenCard from '../home-screen-card';
import VisibilityButton from '../visibility-button';
import EditNoMatters from './edit-no-matters';

export default function NoMattersSection() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: noMatters, isPending: isNoMattersPending } = useNoMattersQuery();
  const {
    variables,
    isPending: isVisibilityMutationPending,
    mutateAsync: changeVisibility,
  } = useChangeNoMattersVisibilityMutation({
    onSuccess: (data, { visible }) => {
      queryClient.setQueryData(useNoMattersQuery.getKey(), data);
      toast.success(
        visible ? 'No matters section is now visible' : 'No matters section is now hidden',
      );
    },
  });

  return (
    <HomeScreenCard>
      <div className='flex items-center gap-2'>
        <h2 className='font-normal'>Page Content ( No Matters )</h2>
        <VisibilityButton
          isLoading={isNoMattersPending}
          value={isVisibilityMutationPending ? variables.visible : noMatters?.visible || false}
          onChange={(newState) => {
            if (noMatters && newState !== noMatters.visible) {
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
      <EditNoMatters data={noMatters} open={open} onOpenChange={setOpen} />
      <div className='mt-5 grid h-[20rem] grid-rows-[3fr_5fr] gap-5'>
        <div className='flex items-center justify-center text-balance rounded-lg bg-[#F7F7F7] p-6 text-2xl font-extrabold text-primary'>
          {noMatters?.title}
        </div>
        <div className='flex items-center justify-center text-balance rounded-lg bg-[#F7F7F7] p-6 text-lg font-bold'>
          {noMatters?.subtitle}
        </div>
      </div>
    </HomeScreenCard>
  );
}
