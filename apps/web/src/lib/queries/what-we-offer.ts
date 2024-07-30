import { createMutation, createQuery } from 'react-query-kit';
import { ChangeVisibilityDto, EditWhatWeOfferDto, WhatWeOfferVm } from '@/types';
import http from '../http';

export const useWhatWeOfferQuery = createQuery({
  queryKey: ['what-we-offer'],
  fetcher: async () => {
    const { data } = await http.get<WhatWeOfferVm>('/api/admin/what-we-offer');
    return data;
  },
});

export const useEditWhatWeOfferMutation = createMutation({
  mutationKey: ['edit-what-we-offer'],
  mutationFn: async (props: EditWhatWeOfferDto) => {
    const { data } = await http.put<WhatWeOfferVm>(`/api/admin/what-we-offer`, props);
    return data;
  },
});

export const useChangeWhatWeOfferVisibilityMutation = createMutation({
  mutationKey: ['change-what-we-offer-visibility'],
  mutationFn: async (props: ChangeVisibilityDto) => {
    const { data } = await http.patch<WhatWeOfferVm>(
      `/api/admin/what-we-offer/change-visibility`,
      props,
    );
    return data;
  },
});
