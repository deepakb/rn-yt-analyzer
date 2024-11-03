import { Tabs } from 'expo-router';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { GradientIcon } from './GradientIcon';
import { GradientText } from './GradientText';
import { gradientColors } from '@/constants/gradients';

const tabScreens = [
  {
    name: 'index',
    title: 'Home',
    icon: {
      focused: 'home',
      unfocused: 'home-outline'
    },
    gradient: 'custom' as const
  },
  {
    name: 'analysis',
    title: 'Analysis',
    icon: {
      focused: 'analytics',
      unfocused: 'analytics-outline'
    },
    gradient: 'custom' as const
  },
  {
    name: 'bookmarks',
    title: 'Bookmarks',
    icon: {
      focused: 'bookmark',
      unfocused: 'bookmark-outline'
    },
    gradient: 'custom' as const
  },
  {
    name: 'account',
    title: 'Account',
    icon: {
      focused: 'person',
      unfocused: 'person-outline'
    },
    gradient: 'custom' as const
  },
] as const;

export function TabNavigator() {
  const { isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#121212' : '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 85 : 60,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        },
        tabBarItemStyle: {
          height: 50,
          paddingBottom: 8,
        },
      }}>
      {tabScreens.map(({ name, title, icon, gradient }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) => (
              focused ? (
                <GradientIcon
                  name={icon.focused}
                  size={24}
                  variant={gradient}
                />
              ) : (
                <GradientIcon
                  name={icon.unfocused}
                  size={24}
                  variant={isDark ? 'inactiveDark' : 'inactive'}
                />
              )
            ),
            tabBarLabel: ({ focused }) => (
              focused ? (
                <GradientText
                  text={title}
                  variant={gradient}
                  className="text-xs font-inter-bold"
                />
              ) : (
                <GradientText
                  text={title}
                  variant={isDark ? 'inactiveDark' : 'inactive'}
                  className="text-xs font-inter-medium"
                />
              )
            ),
          }}
        />
      ))}
    </Tabs>
  );
} 