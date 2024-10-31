import { Tabs } from 'expo-router/tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { View, Text } from 'react-native';

function LogoTitle() {
  return (
    <View className="flex-row items-center justify-center">
      <Ionicons 
        name="play-circle" 
        size={28}
        color="#fff" 
        style={{ marginRight: 8 }}
      />
      <Text 
        className="text-white font-bold" 
        style={{ 
          fontSize: 24,
          includeFontPadding: false,
          textAlignVertical: 'center',
        }}
      >
        InsightTube
      </Text>
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.primary,
          height: 100,
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerSafeAreaInsets: { top: 0 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => <LogoTitle />,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: 'Analysis',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 