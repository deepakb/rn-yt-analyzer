import { useState } from 'react';
import { TextInput } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface AnimatedTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function AnimatedTextInput({ 
  placeholder, 
  value, 
  onChangeText 
}: AnimatedTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    borderWidth: withSpring(isFocused ? 2 : 1),
    borderColor: isFocused ? '#4F46E5' : '#E5E7EB',
  }));

  return (
    <Animated.View 
      className="rounded-lg overflow-hidden bg-white mb-4"
      style={animatedStyle}
    >
      <TextInput
        className="p-4 text-base"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Animated.View>
  );
} 