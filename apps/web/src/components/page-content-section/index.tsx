'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  useChangePageContentVisibilityMutation,
  usePageContentQuery,
} from '@/lib/queries/page-content';
import { Button } from '@/components/ui/button';
import HomeScreenCard from '../home-screen-card';
import Image from '../image';
import VisibilityButton from '../visibility-button';
import EditSliderForm from './edit-page-content';

export default function PageContentSection() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: pageContent, isPending: isPageContentPending } = usePageContentQuery();
  const {
    variables,
    isPending: isVisibilityMutationPending,
    mutateAsync: changeVisibility,
  } = useChangePageContentVisibilityMutation({
    onSuccess: (data, { visible }) => {
      queryClient.setQueryData(usePageContentQuery.getKey(), data);
      toast.success(visible ? 'Page content is now visible' : 'Page content is now hidden');
    },
  });

  return (
    <HomeScreenCard>
      <div className='flex items-center gap-2'>
        <h2 className='font-normal'>Page Content</h2>
        <VisibilityButton
          isLoading={isPageContentPending}
          value={isVisibilityMutationPending ? variables.visible : pageContent?.visible || false}
          onChange={(newState) => {
            changeVisibility({ visible: newState });
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
      <EditSliderForm data={pageContent} open={open} onOpenChange={setOpen} />
      <div className='mt-5 grid h-[35rem] grid-cols-[2fr_3fr] grid-rows-[5fr_4fr_6rem] gap-5'>
        <div className='flex items-center text-balance rounded-lg bg-[#F7F7F7] p-6 text-xl font-bold'>
          {pageContent?.title}
        </div>
        <div className='row-span-3 flex items-center justify-center rounded-lg bg-[#F7F7F7] p-6'>
          {pageContent && <Image className='h-2/3 w-auto' image={pageContent.image} />}
        </div>
        <div className='flex items-center text-balance rounded-lg bg-[#F7F7F7] p-6'>
          {pageContent?.subtitle}
        </div>
        <div className='flex items-center text-balance rounded-lg bg-[#F7F7F7] p-6 text-xl font-bold italic text-primary'>
          {pageContent?.buttonLabel}
        </div>
      </div>
    </HomeScreenCard>
  );
}
