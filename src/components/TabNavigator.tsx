import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Text } from 'react-native';
import HomeIcon from '../svg/home';
import AnalysisIcon from '../svg/analysis';
import BookmarksIcon from '../svg/bookmarks';
import AccountIcon from '../svg/account';

const tabScreens = [
    {
      name: 'index',
      title: 'Home',
      Component: HomeIcon,
    },
    {
      name: 'analysis',
      title: 'Analysis',
      Component: AnalysisIcon,
    },
    {
      name: 'bookmarks',
      title: 'Bookmarks',
      Component: BookmarksIcon,
    },
    {
      name: 'account',
      title: 'Account',
      Component: AccountIcon,
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
        },
      }}>
      {tabScreens.map(({ name, title, Component }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size, focused }) => (
              <Component 
                title={title} 
                width={24} 
                height={24} 
                fill={focused ? '#1E90FF' : '#000'} 
                // opacity={focused ? 1 : 0.8}
              />
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text 
                style={{ 
                  color,
                  fontSize: 12,
                  fontWeight: focused ? '700' : '400',
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