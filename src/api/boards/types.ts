export type Board = {
  id: number;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: any[]
  starred: boolean;
  count: number;
}

export type BObject = {
  type: 'uploaded',
  id: number;
  name: string;
  size: number;
} | { id: string, type: 'uploading' | 'failed', file: File, progress: number }
