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

export interface VideoAnalysis {
  summary: string;
  keyPoints: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

export const videoAnalysisState = atom<VideoAnalysis | null>({
  key: 'videoAnalysisState',
  default: null,
}); 