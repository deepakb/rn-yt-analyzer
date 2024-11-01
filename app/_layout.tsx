import '../global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { TabNavigator } from '../src/components/TabNavigator';

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <StatusBar 
          style="dark" 
          backgroundColor="transparent" 
          translucent={true} 
        />
        <TabNavigator />
      </View>
    </SafeAreaProvider>
  );
}