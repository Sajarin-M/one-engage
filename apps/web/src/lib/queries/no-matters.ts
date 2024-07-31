import { createMutation, createQuery } from 'react-query-kit';
import { ChangeVisibilityDto, EditNoMattersDto, NoMattersVm } from '@/types';
import http from '../http';

export const useNoMattersQuery = createQuery({
  queryKey: ['no-matters'],
  fetcher: async () => {
    const { data } = await http.get<NoMattersVm>('/api/admin/no-matters');
    return data;
  },
});

export const useEditNoMattersMutation = createMutation({
  mutationKey: ['edit-no-matters'],
  mutationFn: async (props: EditNoMattersDto) => {
    const { data } = await http.put<NoMattersVm>(`/api/admin/no-matters`, props);
    return data;
  },
});

export const useChangeNoMattersVisibilityMutation = createMutation({
  mutationKey: ['change-no-matters-visibility'],
  mutationFn: async (props: ChangeVisibilityDto) => {
    const { data } = await http.patch<NoMattersVm>(
      `/api/admin/no-matters/change-visibility`,
      props,
    );
    return data;
  },
});
