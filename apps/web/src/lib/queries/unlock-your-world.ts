import { createMutation, createQuery } from 'react-query-kit';
import { ChangeVisibilityDto, EditUnlockYourWorldDto, UnlockYourWorldVm } from '@/types';
import http from '../http';

export const useUnlockYourWorldQuery = createQuery({
  queryKey: ['unlock-your-world'],
  fetcher: async () => {
    const { data } = await http.get<UnlockYourWorldVm>('/api/admin/unlock-your-world');
    return data;
  },
});

export const useEditUnlockYourWorldMutation = createMutation({
  mutationKey: ['edit-unlock-your-world'],
  mutationFn: async (props: EditUnlockYourWorldDto) => {
    const { data } = await http.put<UnlockYourWorldVm>(`/api/admin/unlock-your-world`, props);
    return data;
  },
});

export const useChangeUnlockYourWorldVisibilityMutation = createMutation({
  mutationKey: ['change-unlock-your-world-visibility'],
  mutationFn: async (props: ChangeVisibilityDto) => {
    const { data } = await http.patch<UnlockYourWorldVm>(
      `/api/admin/unlock-your-world/change-visibility`,
      props,
    );
    return data;
  },
});
