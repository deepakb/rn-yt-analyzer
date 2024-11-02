import { Tabs } from 'expo-router';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: Platform.OS === 'android' ? 10 : 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter_500Medium',
        },
      }}>
      {tabScreens.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size, focused }) => (
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
                  marginTop: -5
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