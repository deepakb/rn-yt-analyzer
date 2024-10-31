import { Stack } from 'expo-router';
import { RecoilRoot } from 'recoil';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <RecoilRoot>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{
            title: 'InsightTube',
            headerStyle: {
              backgroundColor: '#4F46E5',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack>
    </RecoilRoot>
  );
} 