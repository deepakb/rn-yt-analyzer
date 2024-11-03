import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { gradientColors } from '@/constants/gradients';
import { GradientVariant } from '@/types/gradient';

interface GradientIconProps {
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  variant: GradientVariant;
}

export const GradientIcon = ({ name, size, variant }: GradientIconProps) => {
  return (
    <MaskedView
      maskElement={
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons
            name={name}
            size={size}
            color="black"
          />
        </View>
      }
    >
      <LinearGradient
        colors={gradientColors[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height: size, width: size }}
      />
    </MaskedView>
  );
}; 