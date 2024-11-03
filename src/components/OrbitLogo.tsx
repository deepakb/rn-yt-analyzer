import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { gradientColors } from '@/constants/gradients';

export function OrbitLogo() {
  return (
    <MaskedView
      maskElement={
        <View className="w-8 h-8 items-center justify-center">
          <Ionicons name="planet" size={24} />
        </View>
      }
    >
      <LinearGradient
        colors={gradientColors.custom}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-8 h-8"
      >
        <View className="w-8 h-8 opacity-0 items-center justify-center">
          {/* Outer circle */}
          <View className="absolute w-8 h-8 rounded-full border-[2.5px]" />
          {/* Planet icon */}
          <Ionicons name="planet" size={24} />
        </View>
      </LinearGradient>
    </MaskedView>
  );
}