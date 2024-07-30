import { createMutation, createQuery } from 'react-query-kit';
import { CreateSliderDto, EditSliderDto, SliderVm } from '@/types';
import http from '../http';

export const useSlidersQuery = createQuery({
  queryKey: ['sliders'],
  fetcher: async () => {
    const { data } = await http.get<SliderVm[]>('/api/admin/sliders');
    return data;
  },
});

export const useCreateSliderMutation = createMutation({
  mutationKey: ['create-slider'],
  mutationFn: async (props: CreateSliderDto) => {
    const { data } = await http.post<SliderVm>('/api/admin/sliders', props);
    return data;
  },
});

export const useEditSliderMutation = createMutation({
  mutationKey: ['edit-slider'],
  mutationFn: async ({ id, ...props }: EditSliderDto) => {
    const { data } = await http.put<SliderVm>(`/api/admin/sliders/${id}`, props);
    return data;
  },
});
