import { View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomeScreen() {
  const { isDark } = useTheme();
  
  return (
    <View className={`flex-1 items-center justify-center ${isDark ? 'bg-background-dark' : 'bg-background'}`}>
      <Text className={`text-3xl font-inter-bold ${isDark ? 'text-text-dark' : 'text-text'}`}>
        Hello World!
      </Text>
    </View>
  );
} 