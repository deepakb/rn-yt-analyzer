import { RecoilRoot } from 'recoil';
import { StatusBar } from 'expo-status-bar';
import TabNavigator from '@/navigation/TabNavigator';

export default function RootLayout() {
  return (
    <RecoilRoot>
      <StatusBar style="auto" />
      <TabNavigator />
    </RecoilRoot>
  );
}
