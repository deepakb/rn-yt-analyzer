import { View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { GradientBackground } from '@/components/GradientBackground';
import { GradientText } from '@/components/GradientText';

export default function HomeScreen() {
  const { isDark } = useTheme();
  
  return (
    <View className={`flex-1 items-center justify-center ${isDark ? 'bg-background-dark' : 'bg-background'}`}>
      {/* Regular text */}
      <Text 
        className={`text-3xl font-inter-bold mb-8 ${
          isDark ? 'text-text-dark' : 'text-text'
        }`}
      >
        Hello World!
      </Text>

      {/* Gradient Texts */}
      <View className="space-y-4 mb-8">
        <GradientText 
          text="Sunset Gradient"
          variant="sunset"
          className="text-2xl font-inter-semibold"
        />

        <GradientText 
          text="Ocean Gradient"
          variant="ocean"
          className="text-2xl font-inter-semibold"
        />

        <GradientText 
          text="Fire Gradient"
          variant="fire"
          className="text-2xl font-inter-semibold"
        />

        <GradientText 
          text="Custom Gradient"
          variant="custom"
          className="text-2xl font-inter-semibold"
        />
      </View>

      {/* Gradient Backgrounds */}
      <View className="space-y-4 w-full px-4">
        <GradientBackground 
          text="Sunset Background"
          variant="sunset"
          className="text-2xl font-inter-semibold"
        />

        <GradientBackground 
          text="Ocean Background"
          variant="ocean"
          className="text-2xl font-inter-semibold"
        />

        <GradientBackground 
          text="Fire Background"
          variant="fire"
          className="text-2xl font-inter-semibold"
        />

        <GradientBackground 
          text="Custom Background"
          variant="custom"
          className="text-2xl font-inter-semibold"
        />
      </View>
    </View>
  );
}