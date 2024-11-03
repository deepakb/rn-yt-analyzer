import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientTextProps {
  text: string;
  variant: 'sunset' | 'ocean' | 'fire' | 'custom';
  className?: string;
}

const gradientColors = {
  sunset: ['#FF512F', '#DD2476'],
  ocean: ['#2193b0', '#6dd5ed'],
  fire: ['#FFB75E', '#ED8F03', '#EA384D'],
  custom: ['#FF0080', '#7928CA'],
};

export const GradientBackground = ({ text, variant, className = '' }: GradientTextProps) => {
  return (
    <LinearGradient
      colors={gradientColors[variant]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="px-4 py-2 rounded-lg self-center"
    >
      <Text className={`${className} text-white`}>
        {text}
      </Text>
    </LinearGradient>
  );
}; 