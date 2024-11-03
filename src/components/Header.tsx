import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { GradientText } from '@/components/GradientText';
import { OrbitLogo } from '@/components/OrbitLogo';
import { GradientIcon } from '@/components/GradientIcon';

interface HeaderProps {
  onNotificationPress?: () => void;
}

export function Header({ onNotificationPress }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <View className={`flex-row items-center justify-between px-4 h-14 ${isDark ? 'bg-background-dark' : 'bg-background'}`}>
      {/* Left side - Logo and Title */}
      <View className="flex-row items-center">
        <OrbitLogo />
        <View className="ml-2">
          <GradientText
            text="Orbit"
            variant="custom"
            className="text-xl font-inter-bold"
          />
        </View>
      </View>

      {/* Right side - Theme and Notification icons */}
      <View className="flex-row items-center space-x-4">
        <TouchableOpacity
          onPress={toggleTheme}
          className="p-2"
        >
          <GradientIcon
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={24}
            variant="ocean"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNotificationPress}
          className="p-2"
        >
          <GradientIcon
            name="notifications-outline"
            size={24}
            variant="ocean"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
} 