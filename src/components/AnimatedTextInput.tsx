import { useState } from 'react';
import { TextInput, View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

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
    transform: [{
      scale: withSpring(isFocused ? 1.02 : 1)
    }]
  }));

  return (
    <Animated.View 
      className="mb-4 shadow-sm"
      style={animatedStyle}
    >
      <View className="flex-row items-center bg-white rounded-xl overflow-hidden border border-gray-100">
        <View className="pl-4 pr-2">
          <Ionicons 
            name="search" 
            size={20} 
            color={isFocused ? Colors.primary : Colors.text.secondary} 
          />
        </View>
        <TextInput
          className="flex-1 p-4 text-base"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={Colors.text.secondary}
          style={{
            color: Colors.text.primary,
          }}
        />
      </View>
    </Animated.View>
  );
} 