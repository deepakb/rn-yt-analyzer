import { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { currentVideoState } from '@/state/atoms/videoState';
import { AnimatedTextInput } from '@/components/AnimatedTextInput';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/colors';
import { RecentSearch, RecentSearches } from '@/components/RecentSearches';
import { GradientButton } from '@/components/GradientButton';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { analyzeVideo } from '@/services/youtube';

type AnalysisType = 'video' | 'channel';

export default function HomeScreen() {
  const [url, setUrl] = useState('');
  const [analysisType, setAnalysisType] = useState<AnalysisType>('video');
  const [recentSearches] = useState<RecentSearch[]>([
    { id: '1', title: 'React Native Tutorial', type: 'video', url: 'https://youtube.com/watch?v=123' },
    { id: '2', title: 'Coding Channel', type: 'channel', url: 'https://youtube.com/c/coding' },
  ]);
  const setCurrentVideo = useSetRecoilState(currentVideoState);

  const handleAnalyze = async () => {
    try {
      const videoDetails = await analyzeVideo(url);
      setCurrentVideo(videoDetails);
    } catch (error) {
      console.error('Error analyzing video:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <LinearGradient
        colors={[Colors.gradient.start, Colors.gradient.end]}
        className="absolute top-0 left-0 right-0 h-40 opacity-10"
      />
      <View className="p-6 flex-1">
        {/* Header */}
        <View className="mb-8">
          <ThemedText type="title" className="text-3xl font-bold mb-2">
            YouTube Analyzer
          </ThemedText>
          <ThemedText type="label" className="text-base">
            Analyze videos and channels for deeper insights
          </ThemedText>
        </View>

        {/* Analysis Type Selector */}
        <View className="flex-row bg-white rounded-2xl p-1 mb-6 shadow-sm">
          <TouchableOpacity
            onPress={() => setAnalysisType('video')}
            className={`flex-1 py-3 rounded-xl flex-row justify-center items-center ${
              analysisType === 'video' ? 'bg-primary' : 'bg-transparent'
            }`}
          >
            <Ionicons
              name="analytics"
              size={20}
              color={analysisType === 'video' ? '#fff' : Colors.text.primary}
              className="mr-2"
            />
            <ThemedText
              style={{ 
                color: analysisType === 'video' ? '#fff' : Colors.text.primary,
                fontWeight: '600'
              }}
            >
              Video
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAnalysisType('channel')}
            className={`flex-1 py-3 rounded-xl flex-row justify-center items-center ${
              analysisType === 'channel' ? 'bg-primary' : 'bg-transparent'
            }`}
          >
            <Ionicons
              name="people"
              size={20}
              color={analysisType === 'channel' ? '#fff' : Colors.text.primary}
              className="mr-2"
            />
            <ThemedText
              style={{ 
                color: analysisType === 'channel' ? '#fff' : Colors.text.primary,
                fontWeight: '600'
              }}
            >
              Channel
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View className="mb-6">
          <AnimatedTextInput
            placeholder={`Enter YouTube ${analysisType} URL`}
            value={url}
            onChangeText={setUrl}
          />
          <GradientButton
            title="Analyze Now"
            onPress={handleAnalyze}
            disabled={!url}
          />
        </View>

        {/* Recent Searches */}
        <View>
          <ThemedText type="label" className="text-base font-semibold mb-4">
            Recent Analyses
          </ThemedText>
          <RecentSearches
            searches={recentSearches}
            onSearchSelect={setUrl}
          />
        </View>
      </View>
    </SafeAreaView>
  );
} 