import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const tabScreens = [
    {
      name: 'index',
      title: 'Home',
      iconName: 'home-outline',
    },
    {
      name: 'analysis',
      title: 'Analysis',
      iconName: 'analytics-outline',
    },
    {
      name: 'bookmarks',
      title: 'Bookmarks',
      iconName: 'bookmark-outline',
    },
    {
      name: 'account',
      title: 'Account',
      iconName: 'person-outline',
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
      }}>
      {tabScreens.map(({ name, title, iconName }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={iconName} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
} 