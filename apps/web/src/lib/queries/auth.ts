import { createMutation } from 'react-query-kit';
import { LoginDto, LoginVm } from '@/types';
import http from '../http';

export const useLoginMutation = createMutation({
  mutationKey: ['login'],
  mutationFn: async (props: LoginDto) => {
    const { data } = await http.post<LoginVm>('/api/admin/auth/login', props);
    return data;
  },
});
