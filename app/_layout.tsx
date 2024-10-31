import { RecoilRoot } from 'recoil';
import { StatusBar } from 'expo-status-bar';
import TabNavigator from '@/navigation/TabNavigator';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { View } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <View />; // or a loading screen
  }

  return (
    <RecoilRoot>
      <StatusBar style="light" />
      <TabNavigator />
    </RecoilRoot>
  );
}
