import { fetchFromApi } from './api';

export async function analyzeVideo(url: string) {
  return fetchFromApi(`analyze?url=${encodeURIComponent(url)}`);
}

export async function searchVideos(query: string) {
  return fetchFromApi(`search?query=${encodeURIComponent(query)}`);
}

export async function getVideoAnalysis(videoId: string) {
  return fetchFromApi(`analysis/${videoId}`);
} 