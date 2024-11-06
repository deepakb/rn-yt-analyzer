import * as React from "react"
import { Animated, Text, TouchableOpacity, View, Dimensions } from "react-native"

import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useTheme } from "@/contexts/ThemeContext"
import { ToastProps } from "@/hooks/use-toast"

type ToastViewProps = Omit<ToastProps, "id">

const SCREEN_WIDTH = Dimensions.get('window').width

export function Toast({
  title,
  description,
  variant = "default",
  action,
  open,
  onOpenChange,
}: ToastViewProps) {
  const { isDark } = useTheme()
  const insets = useSafeAreaInsets()
  
  console.log('Toast rendering:', { title, open }) // Debug log

  return (
    <View
      style={{
        position: "absolute",
        top: insets.top + 10,
        left: 20,
        right: 20,
        width: SCREEN_WIDTH - 40, // Explicit width
        zIndex: 9999,
        alignSelf: 'center', // Center horizontally
      }}
    >
      <View
        className={`
          rounded-lg shadow-lg overflow-hidden
          border border-border dark:border-border-dark
          ${variant === 'default' ? 'bg-white dark:bg-gray-800' : 
            variant === 'destructive' ? 'bg-error dark:bg-error-dark' :
            'bg-success dark:bg-success-dark'}
        `}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View className="flex-row items-center justify-between p-4">
          <View className="flex-1 mr-2">
            {title && (
              <Text 
                className="text-base font-semibold mb-1 text-gray-900 dark:text-gray-100"
                numberOfLines={1}
              >
                {title}
              </Text>
            )}
            {description && (
              <Text 
                className="text-sm text-gray-600 dark:text-gray-300"
                numberOfLines={2}
              >
                {description}
              </Text>
            )}
          </View>
          
          {onOpenChange && (
            <TouchableOpacity
              onPress={() => onOpenChange(false)}
              className="p-2 ml-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="close"
                size={20}
                color={isDark ? "#E5E7EB" : "#374151"}
              />
            </TouchableOpacity>
          )}
        </View>
        {action && (
          <View className="px-4 pb-4 flex-row justify-end">
            {action}
          </View>
        )}
      </View>
    </View>
  )
} 