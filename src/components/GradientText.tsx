import { Text as RNText } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientVariant } from '@/types/gradient';
import { gradientColors } from '@/constants/gradients';

interface GradientTextProps {
  text: string;
  variant: GradientVariant;
  className?: string;
}

export const GradientText = ({ text, variant, className = '' }: GradientTextProps) => {
  return (
    <MaskedView
      maskElement={
        <RNText className={className} style={{ backgroundColor: 'transparent' }}>
          {text}
        </RNText>
      }
    >
      <LinearGradient
        colors={gradientColors[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <RNText className={className} style={{ opacity: 0 }}>
          {text}
        </RNText>
      </LinearGradient>
    </MaskedView>
  );
}; 