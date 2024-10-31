import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '@/constants/colors';

interface Props {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export function GradientButton({ onPress, title, disabled }: Props) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled}
      className="rounded-lg overflow-hidden"
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <LinearGradient
        colors={[Colors.gradient.start, Colors.gradient.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="px-4 py-3 items-center"
      >
        <Text className="text-white text-base font-semibold">
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
} 