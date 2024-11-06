import { useEffect } from 'react'

import { View } from 'react-native'

import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useLoadFonts } from '@/hooks/useLoadFonts'

import '../global.css'

// Keep splash screen visible while fonts are loading
SplashScreen.preventAutoHideAsync()

// Create a themed container component
function ThemedContainer({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme()

  return (
    <SafeAreaProvider>
      <StatusBar
        style={isDark ? 'light' : 'dark'}
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView
        className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background'}`}
        edges={['top']}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default function RootLayout() {
  const { fontsLoaded, fontError } = useLoadFonts()

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <ThemeProvider>
      <ThemedContainer>
        <Stack
          screenOptions={{
            header: () => (
              <Header
                onNotificationPress={() => console.log('Notification pressed')}
              />
            ),
            headerShown: true,
            contentStyle: {
              paddingBottom: 0,
            },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: true,
            }}
          />
        </Stack>
        <Toaster />
      </ThemedContainer>
    </ThemeProvider>
  )
}
