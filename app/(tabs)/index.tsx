import { View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { GradientBackground, GradientText } from '@/components/ui';

// Predefined gradients for demonstration
const gradients = {
  sunset: {
    colors: ['#FF512F', '#DD2476'],
  },
  ocean: {
    colors: ['#2193b0', '#6dd5ed'],
  },
  fire: {
    colors: ['#FFB75E', '#ED8F03', '#EA384D'],
  },
  custom: {
    colors: ['#FF0080', '#7928CA'],
  },
};

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
          gradient={gradients.sunset}
          className="text-2xl font-inter-semibold"
        >
          Sunset Gradient
        </GradientText>

        <GradientText 
          gradient={gradients.ocean}
          className="text-2xl font-inter-semibold"
        >
          Ocean Gradient
        </GradientText>

        <GradientText 
          gradient={gradients.fire}
          className="text-2xl font-inter-semibold"
        >
          Fire Gradient
        </GradientText>

        <GradientText 
          gradient={gradients.custom}
          className="text-2xl font-inter-semibold"
        >
          Custom Gradient
        </GradientText>
      </View>

      {/* Gradient Backgrounds */}
      <View className="space-y-4 w-full px-4">
        <GradientBackground 
          gradient={gradients.sunset}
          className="px-4 py-2"
        >
          <Text className="text-2xl font-inter-semibold text-white">
            Sunset Background
          </Text>
        </GradientBackground>

        <GradientBackground 
          gradient={gradients.ocean}
          className="px-4 py-2"
        >
          <Text className="text-2xl font-inter-semibold text-white">
            Ocean Background
          </Text>
        </GradientBackground>

        <GradientBackground 
          gradient={gradients.fire}
          className="px-4 py-2"
        >
          <Text className="text-2xl font-inter-semibold text-white">
            Fire Background
          </Text>
        </GradientBackground>

        <GradientBackground 
          gradient={gradients.custom}
          className="px-4 py-2"
        >
          <Text className="text-2xl font-inter-semibold text-white">
            Custom Background
          </Text>
        </GradientBackground>
      </View>
    </View>
  );
}