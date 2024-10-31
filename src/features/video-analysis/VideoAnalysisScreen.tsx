import { View, Text, StyleSheet } from 'react-native';
import { useVideoAnalysis } from '@/hooks/useVideoAnalysis';

export default function VideoAnalysisScreen() {
  const { analysis, fetchAnalysis, isLoading } = useVideoAnalysis();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text style={styles.title}>Video Analysis</Text>
          <Text>Summary: {analysis?.summary}</Text>
          <Text>Sentiment: {analysis?.sentiment}</Text>
        </View>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
}); 