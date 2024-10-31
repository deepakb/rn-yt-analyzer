import { selector } from 'recoil';
import { currentVideoState } from '../atoms/videoState';

export const videoTitleSelector = selector({
  key: 'videoTitleSelector',
  get: ({ get }) => {
    const video = get(currentVideoState);
    return video ? video.title : 'No video selected';
  },
}); 