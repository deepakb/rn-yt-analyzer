import { atom } from 'recoil';

export interface VideoDetails {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  transcript?: string[];
}

export const currentVideoState = atom<VideoDetails | null>({
  key: 'currentVideoState',
  default: null,
}); 