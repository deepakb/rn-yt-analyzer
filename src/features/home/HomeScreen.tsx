import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { AnimatedTextInput } from '@/components/AnimatedTextInput';
import { currentVideoState } from '@/state/atoms/videoState';
import { analyzeVideo } from '@/services/youtube';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';

export default function HomeScreen() {
  const [url, setUrl] = useState('');
  const setCurrentVideo = useSetRecoilState(currentVideoState);
  const insets = useSafeAreaInsets();

  const handleAnalyze = async () => {
    try {
      const videoDetails = await analyzeVideo(url);
      setCurrentVideo(videoDetails);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.content,
        {
          paddingBottom: insets.bottom + 60, // tab bar height
        }
      ]}>
        <ThemedText type="title" style={styles.title}>
          Analyze YouTube Videos here
        </ThemedText>
        <AnimatedTextInput
          placeholder="Enter YouTube URL"
          value={url}
          onChangeText={setUrl}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
}); 