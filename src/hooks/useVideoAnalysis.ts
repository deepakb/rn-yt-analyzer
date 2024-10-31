import { useRecoilState, useRecoilValue } from 'recoil';
import { currentVideoState, videoAnalysisState } from '@/state/atoms/videoState';
import { getVideoAnalysis } from '@/services/youtube';

export function useVideoAnalysis() {
  const video = useRecoilValue(currentVideoState);
  const [analysis, setAnalysis] = useRecoilState(videoAnalysisState);

  const fetchAnalysis = async () => {
    if (!video?.id) return;
    
    try {
      const result = await getVideoAnalysis(video.id);
      setAnalysis(result);
    } catch (error) {
      console.error('Error fetching analysis:', error);
      // Handle error appropriately
    }
  };

  return {
    analysis,
    fetchAnalysis,
    isLoading: !analysis && !!video,
  };
} 