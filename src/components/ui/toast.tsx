import * as React from "react"
import { Animated, Text, TouchableOpacity, View } from "react-native"

import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useTheme } from "@/contexts/ThemeContext"
import { ToastProps } from "@/hooks/use-toast"

export function Toast({
  title,
  description,
  variant = "default",
  action,
  open,
  onOpenChange,
}: ToastProps & {
  onOpenChange?: (open: boolean) => void
}) {
  const { isDark } = useTheme()
  const insets = useSafeAreaInsets()
  const opacity = React.useRef(new Animated.Value(0)).current
  const translateY = React.useRef(new Animated.Value(-100)).current

  React.useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [open])

  const variantStyles = {
    default: `bg-background dark:bg-background-dark`,
    destructive: `bg-error dark:bg-error-dark`,
    success: `bg-success dark:bg-success-dark`,
  }

  const textColor = variant === "default" 
    ? isDark ? "text-text-dark" : "text-text"
    : "text-white"

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
        position: "absolute",
        top: insets.top + 10,
        left: 16,
        right: 16,
        zIndex: 50,
      }}
    >
      <View
        className={`
          rounded-lg shadow-lg overflow-hidden
          border border-border dark:border-border-dark
          ${variantStyles[variant]}
        `}
      >
        <View className="flex-row items-center justify-between p-4">
          <View className="flex-1 mr-2">
            {title && (
              <Text className={`text-sm font-semibold mb-1 ${textColor}`}>
                {title}
              </Text>
            )}
            {description && (
              <Text className={`text-sm ${textColor}`}>{description}</Text>
            )}
          </View>
          
          <TouchableOpacity
            onPress={() => onOpenChange?.(false)}
            className="p-2"
          >
            <Ionicons
              name="close"
              size={18}
              color={variant === "default" ? (isDark ? "#E5E7EB" : "#374151") : "#FFFFFF"}
            />
          </TouchableOpacity>
        </View>
        {action && <View className="px-4 pb-4">{action}</View>}
      </View>
    </Animated.View>
  )
} 