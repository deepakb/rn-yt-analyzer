import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, View } from 'react-native';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

export default function TabLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Configure navigation bar
      NavigationBar.setPositionAsync('absolute');
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('overlay-swipe');
      NavigationBar.setBackgroundColorAsync('transparent');
    }
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <StatusBar 
          style="dark" 
          backgroundColor="transparent" 
          translucent={true} 
        />
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
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
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
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </SafeAreaProvider>
  );
}