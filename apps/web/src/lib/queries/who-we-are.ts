import { createMutation, createQuery } from 'react-query-kit';
import { ChangeVisibilityDto, EditWhoWeAreDto, WhoWeAreVm } from '@/types';
import http from '../http';

export const useWhoWeAreQuery = createQuery({
  queryKey: ['who-we-are'],
  fetcher: async () => {
    const { data } = await http.get<WhoWeAreVm>('/api/admin/who-we-are');
    return data;
  },
});

export const useEditWhoWeAreMutation = createMutation({
  mutationKey: ['edit-who-we-are'],
  mutationFn: async (props: EditWhoWeAreDto) => {
    const { data } = await http.put<WhoWeAreVm>(`/api/admin/who-we-are`, props);
    return data;
  },
});

export const useChangeWhoWeAreVisibilityMutation = createMutation({
  mutationKey: ['change-who-we-are-visibility'],
  mutationFn: async (props: ChangeVisibilityDto) => {
    const { data } = await http.patch<WhoWeAreVm>(`/api/admin/who-we-are/change-visibility`, props);
    return data;
  },
});
