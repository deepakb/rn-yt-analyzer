import { Tabs } from 'expo-router';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

const tabScreens = [
    {
      name: 'index',
      title: 'Home',
      icon: {
        focused: 'home',
        unfocused: 'home-outline'
      },
    },
    {
      name: 'analysis',
      title: 'Analysis',
      icon: {
        focused: 'analytics',
        unfocused: 'analytics-outline'
      },
    },
    {
      name: 'bookmarks',
      title: 'Bookmarks',
      icon: {
        focused: 'bookmark',
        unfocused: 'bookmark-outline'
      },
    },
    {
      name: 'account',
      title: 'Account',
      icon: {
        focused: 'person',
        unfocused: 'person-outline'
      },
    },
  ] as const;

export function TabNavigator() {
  const { isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: isDark ? '#9CA3AF' : 'gray',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: isDark ? 'bg-background-dark' : 'bg-background',
          borderTopWidth: 0,
          elevation: 0,
          //height: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          //paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        tabBarItemStyle: {
          height: 50,
          paddingBottom: 8,
        },
        tabBarIconStyle: {
          //marginBottom: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter_500Medium',
          lineHeight: 16,
        },
      }}>
      {tabScreens.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? icon.focused : icon.unfocused}
                size={24} 
                color={color}
              />
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text 
                className={`text-xs ${focused ? 'font-inter-bold' : 'font-inter-medium'}`}
                style={{ 
                  color,
                }}
              >
                {title}
              </Text>
            ),
          }}
        />
      ))}
    </Tabs>
  );
} 