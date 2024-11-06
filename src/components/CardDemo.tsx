import React from 'react'

import { Text, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
]

interface CardDemoProps {
  style?: any
}

export function CardDemo({ style, ...props }: CardDemoProps) {
  const [isEnabled, setIsEnabled] = React.useState(false)

  return (
    <Card style={[{ width: 380 }, style]} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>

      <CardContent>
        <View className="space-y-4">
          {/* Push Notifications Section */}
          <View className="flex-row items-center space-x-4 rounded-md border border-border p-4">
            <Ionicons name="notifications-outline" size={24} color="#666" />
            <View className="flex-1 space-y-1">
              <Text className="text-sm font-medium text-foreground">
                Push Notifications
              </Text>
              <Text className="text-sm text-muted-foreground">
                Send notifications to device.
              </Text>
            </View>
            <Switch value={isEnabled} onValueChange={setIsEnabled} />
          </View>

          {/* Notifications List */}
          <View className="space-y-4">
            {notifications.map((notification, index) => (
              <View key={index} className="flex-row space-x-3 pb-4 last:pb-0">
                <View className="mt-2">
                  <View className="h-2 w-2 rounded-full bg-sky-500" />
                </View>
                <View className="space-y-1">
                  <Text className="text-sm font-medium text-foreground">
                    {notification.title}
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    {notification.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </CardContent>

      <CardFooter>
        <Button
          variant="default"
          className="w-full flex-row items-center justify-center space-x-2"
          onPress={() => console.log('Marked all as read')}
        >
          <Ionicons name="checkmark" size={20} color="white" />
          <Text className="text-white">Mark all as read</Text>
        </Button>
      </CardFooter>
    </Card>
  )
}
