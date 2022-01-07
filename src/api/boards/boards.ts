import request from '@/api/request';
import { Board, BObject } from './types';

export const getStarredBoards = (limit = 5): Promise<{ boards: Board[] }> => request({
  url: `/boards/starred?limit=${limit}`,
});

export const getBoards = (): Promise<{ boards: Board[] }> => request({
  url: '/boards/',
});

export const getBoard = (id: number): Promise<{ board: Board }> => request({
  url: `/boards/${id}`,
});

export const getBoardFiles = (id: number):Promise<{ files: BObject[] }> => request({
  url: `/boards/${id}/files`,
});
