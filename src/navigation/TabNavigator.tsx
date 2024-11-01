import { Tabs } from 'expo-router/tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function LogoTitle() {
  return (
    <View style={styles.container}>
      <Ionicons 
        name="play-circle" 
        size={28}
        color="#fff" 
        style={styles.icon}
      />
      <Text style={styles.title}>
        InsightTube
      </Text>
    </View>
  );
}

export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: '#9CA3AF',
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
            backgroundColor: '#fff',
            borderTopColor: '#E5E7EB',
            borderTopWidth: 1,
            elevation: 0,
          },
          contentStyle: {
            backgroundColor: Colors.background.light,
          },
          // Make sure content goes edge to edge
          headerSafeAreaInsets: { top: 0 },
        }}
        sceneContainerStyle={{
          backgroundColor: Colors.background.light,
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    includeFontPadding: false,
  },
}); 