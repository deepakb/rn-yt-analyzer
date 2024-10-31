import { View, Text, Image, StyleSheet } from 'react-native';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  views: number;
}

export function VideoCard({ title, thumbnail, views }: VideoCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.views}>{views} views</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
  },
  views: {
    marginLeft: 8,
    marginBottom: 8,
    color: '#666',
  },
}); 