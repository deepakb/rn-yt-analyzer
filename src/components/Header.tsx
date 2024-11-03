import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  onNotificationPress?: () => void;
}

export function Header({ onNotificationPress }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <View className={`flex-row items-center justify-between px-4 h-14 ${isDark ? 'bg-background-dark' : 'bg-background'}`}>
      {/* Left side - Logo and Title */}
      <View className="flex-row items-center">
        <View className="w-8 h-8 bg-primary rounded-full mr-2" />
        <Text className={`text-xl font-inter-bold ${isDark ? 'text-text-dark' : 'text-text'}`}>
          Orbit
        </Text>
      </View>

      {/* Right side - Theme and Notification icons */}
      <View className="flex-row items-center space-x-4">
        <TouchableOpacity
          onPress={toggleTheme}
          className="p-2"
        >
          <Ionicons 
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={24} 
            color={isDark ? '#F3F4F6' : '#4B5563'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNotificationPress}
          className="p-2"
        >
          <Ionicons 
            name="notifications-outline" 
            size={24} 
            color={isDark ? '#F3F4F6' : '#4B5563'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
} 