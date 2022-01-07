import request from '@/api/request';
import { Profile } from './types';

// eslint-disable-next-line import/prefer-default-export
export const getProfile = (): Promise<{ user: Profile }> => request({
  url: '/profile/',
});
