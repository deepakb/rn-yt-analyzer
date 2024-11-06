import { Platform } from 'react-native'

import { Tabs } from 'expo-router'

import { GradientIcon, GradientText } from '@/components/ui'
import { useTheme } from '@/contexts/ThemeContext'
import { GradientConfig } from '@/types/gradient'

const tabScreens = [
  {
    name: 'index',
    title: 'Home',
    icon: {
      focused: 'home',
      unfocused: 'home-outline',
    },
    gradient: 'primary' as const,
  },
  {
    name: 'analysis',
    title: 'Analysis',
    icon: {
      focused: 'analytics',
      unfocused: 'analytics-outline',
    },
    gradient: 'primary' as const,
  },
  {
    name: 'bookmarks',
    title: 'Bookmarks',
    icon: {
      focused: 'bookmark',
      unfocused: 'bookmark-outline',
    },
    gradient: 'primary' as const,
  },
  {
    name: 'account',
    title: 'Account',
    icon: {
      focused: 'person',
      unfocused: 'person-outline',
    },
    gradient: 'primary' as const,
  },
] as const

// Helper function to create muted gradient config
const createMutedGradient = (isDark: boolean): GradientConfig => ({
  colors: [
    isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
    isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
  ],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})

export function TabNavigator() {
  const { isDark } = useTheme()
  const mutedGradient = createMutedGradient(isDark)

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
          borderTopWidth: 1,
          borderTopColor: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)',
          elevation: 0,
          height: Platform.OS === 'ios' ? 85 : 60,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          position: 'absolute',
          bottom: 0,
        },
        tabBarItemStyle: {
          paddingTop: 10,
          height: Platform.OS === 'ios' ? 60 : 50,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: isDark
          ? 'rgb(156, 163, 175)'
          : 'rgb(107, 114, 128)',
      }}
    >
      {tabScreens.map(({ name, title, icon, gradient }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) => (
              <GradientIcon
                name={focused ? icon.focused : icon.unfocused}
                size="md"
                gradient={focused ? gradient : mutedGradient}
                className="transition-opacity duration-200"
              />
            ),
            tabBarLabel: ({ focused }) => (
              <GradientText
                gradient={focused ? gradient : mutedGradient}
                variant={'body-sm'}
                weight={'medium'}
                className="transition-opacity duration-200"
              >
                {title}
              </GradientText>
            ),
          }}
        />
      ))}
    </Tabs>
  )
}
