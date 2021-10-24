import request from '@/api/request';
import { LoginData } from '@/api/auth/types';
import { Profile } from '@/api/profile/types';

export const login = (data: LoginData): Promise<{ token: string }> => request({
  method: 'post',
  url: '/auth/login/',
  data,
});

export const register = (data: LoginData): Promise<{ token: string, user: Profile }> => request({
  method: 'post',
  url: '/auth/login/',
  data,
});
