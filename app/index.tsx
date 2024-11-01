import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-bold text-blue-600">
          Hello World!
        </Text>
      </View>
    </SafeAreaView>
  );
} 