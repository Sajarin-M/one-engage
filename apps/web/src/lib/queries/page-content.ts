import { createMutation, createQuery } from 'react-query-kit';
import { ChangeVisibilityDto, EditPageContentDto, PageContentVm } from '@/types';
import http from '../http';

export const usePageContentQuery = createQuery({
  queryKey: ['page-content'],
  fetcher: async () => {
    const { data } = await http.get<PageContentVm>('/api/admin/page-content');
    return data;
  },
});

export const useEditPageContentMutation = createMutation({
  mutationKey: ['edit-page-content'],
  mutationFn: async (props: EditPageContentDto) => {
    const { data } = await http.put<PageContentVm>(`/api/admin/page-content`, props);
    return data;
  },
});

export const useChangePageContentVisibilityMutation = createMutation({
  mutationKey: ['change-page-content-visibility'],
  mutationFn: async (props: ChangeVisibilityDto) => {
    const { data } = await http.patch<PageContentVm>(
      `/api/admin/page-content/change-visibility`,
      props,
    );
    return data;
  },
});
