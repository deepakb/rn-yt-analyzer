import { View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

export interface RecentSearch {
  id: string;
  title: string;
  type: 'video' | 'channel';
  url: string;
}

interface Props {
  searches: RecentSearch[];
  onSearchSelect: (url: string) => void;
}

export function RecentSearches({ searches, onSearchSelect }: Props) {
  if (searches.length === 0) return null;

  return (
    <View className="mb-6">
      <ThemedText type="label" className="mb-2">Recent Searches</ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {searches.map((search) => (
          <TouchableOpacity
            key={search.id}
            onPress={() => onSearchSelect(search.url)}
            className="mr-3 bg-white rounded-lg p-3 flex-row items-center"
            style={{ borderColor: Colors.primary, borderWidth: 1 }}
          >
            <Ionicons
              name={search.type === 'video' ? 'play-circle' : 'people-circle'}
              size={20}
              color={Colors.primary}
              className="mr-2"
            />
            <ThemedText className="max-w-[150px]" numberOfLines={1}>
              {search.title}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
} 