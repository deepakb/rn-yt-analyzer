import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { AnimatedTextInput } from '@/components/AnimatedTextInput';
import { currentVideoState } from '@/state/atoms/videoState';
import { analyzeVideo } from '@/services/youtube';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const [url, setUrl] = useState('');
  const setCurrentVideo = useSetRecoilState(currentVideoState);

  const handleAnalyze = async () => {
    try {
      const videoDetails = await analyzeVideo(url);
      setCurrentVideo(videoDetails);
      // Navigate to analysis screen
    } catch (error) {
      // Handle error
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Analyze YouTube Videos here
      </ThemedText>
      <AnimatedTextInput
        placeholder="Enter YouTube URL"
        value={url}
        onChangeText={setUrl}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
}); 