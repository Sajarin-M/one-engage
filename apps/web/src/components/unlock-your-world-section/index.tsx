'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  useChangeUnlockYourWorldVisibilityMutation,
  useUnlockYourWorldQuery,
} from '@/lib/queries/unlock-your-world';
import { Button } from '@/components/ui/button';
import HomeScreenCard from '../home-screen-card';
import Image from '../image';
import VisibilityButton from '../visibility-button';
import EditUnlockYourWorld from './edit-unlock-your-world';

export default function UnlockYourWorldSection() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: unlockYourWorld, isPending: isUnlockYourWorldPending } = useUnlockYourWorldQuery();
  const {
    variables,
    isPending: isVisibilityMutationPending,
    mutateAsync: changeVisibility,
  } = useChangeUnlockYourWorldVisibilityMutation({
    onSuccess: (data, { visible }) => {
      queryClient.setQueryData(useUnlockYourWorldQuery.getKey(), data);
      toast.success(
        visible
          ? 'Unlock your world section is now visible'
          : 'Unlock your world section is now hidden',
      );
    },
  });

  return (
    <HomeScreenCard>
      <div className='flex items-center gap-2'>
        <h2 className='font-normal'>Page Content ( UnLock Your World )</h2>
        <VisibilityButton
          isLoading={isUnlockYourWorldPending}
          value={
            isVisibilityMutationPending ? variables.visible : unlockYourWorld?.visible || false
          }
          onChange={(newState) => {
            if (unlockYourWorld && newState !== unlockYourWorld.visible) {
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
      <EditUnlockYourWorld data={unlockYourWorld} open={open} onOpenChange={setOpen} />
      <div className='mt-5 grid h-[25rem] grid-cols-[2fr_3fr] grid-rows-[1fr_6rem_6rem] gap-5'>
        <div className='flex items-center text-balance rounded-lg bg-[#FFA350] p-6 text-2xl font-extrabold text-primary-foreground'>
          {unlockYourWorld?.title}
        </div>
        <div className='row-span-3 flex items-center justify-center rounded-lg bg-[#FFA350] p-6 text-primary-foreground'>
          {unlockYourWorld && <Image className='h-4/5 w-auto' image={unlockYourWorld.image} />}
        </div>
        <div className='flex items-center text-balance rounded-lg bg-[#FFA350] p-6 text-lg font-bold text-primary-foreground'>
          {unlockYourWorld?.buttonLabel}
        </div>
        <div className='flex items-center text-balance rounded-lg bg-[#FFA350] p-6 text-primary-foreground'>
          {unlockYourWorld?.buttonLink}
        </div>
      </div>
    </HomeScreenCard>
  );
}
