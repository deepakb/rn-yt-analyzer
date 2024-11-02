import '../global.css';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { TabNavigator } from '../src/components/TabNavigator';
import { useLoadFonts } from '@/hooks/useLoadFonts';
import { useEffect } from 'react';

// Keep splash screen visible while fonts are loading
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const { fontsLoaded, fontError } = useLoadFonts();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash screen once fonts are loaded or if there's an error
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Don't render anything until fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

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