import * as React from 'react'
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { useTheme } from '@/contexts/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  Easing,
} from 'react-native-reanimated'

// Context for managing dropdown state
type DropdownMenuContext = {
  open: boolean
  setOpen: (open: boolean) => void
  selectedValue?: string
  setSelectedValue: (value: string) => void
}

const DropdownMenuContext = React.createContext<DropdownMenuContext | null>(null)

// Root component
export function DropdownMenu({ 
  children,
  defaultValue,
}: { 
  children: React.ReactNode
  defaultValue?: string 
}) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(defaultValue)
  
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, selectedValue, setSelectedValue }}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

// Trigger component
export function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  const context = React.useContext(DropdownMenuContext)
  const { isDark } = useTheme()
  
  if (!context) throw new Error('DropdownMenuTrigger must be used within DropdownMenu')
  
  return (
    <Pressable 
      onPress={() => context.setOpen(true)}
      className={`
        flex-row items-center justify-between
        px-3 py-2 rounded-md
        border border-border dark:border-border-dark
        ${isDark ? 'bg-surface-dark' : 'bg-surface'}
      `}
    >
      {children}
      <Ionicons
        name="chevron-down"
        size={16}
        color={isDark ? '#9CA3AF' : '#6B7280'}
      />
    </Pressable>
  )
}

// Content component
export function DropdownMenuContent({ children }: { children: React.ReactNode }) {
  const context = React.useContext(DropdownMenuContext)
  const { isDark } = useTheme()
  
  if (!context) throw new Error('DropdownMenuContent must be used within DropdownMenu')
  
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.95)

  React.useEffect(() => {
    if (context.open) {
      opacity.value = withTiming(1, { duration: 150 })
      scale.value = withTiming(1, { duration: 150 })
    } else {
      opacity.value = withTiming(0, { duration: 100 })
      scale.value = withTiming(0.95, { duration: 100 })
    }
  }, [context.open])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }))

  return (
    <Modal
      transparent
      visible={context.open}
      animationType="none"
      onRequestClose={() => context.setOpen(false)}
    >
      <Pressable 
        className="flex-1 bg-black/50"
        onPress={() => context.setOpen(false)}
      >
        <Animated.View 
          style={[animatedStyle]}
          className={`
            m-2 rounded-lg shadow-lg
            ${isDark ? 'bg-surface-dark' : 'bg-surface'}
          `}
        >
          {children}
        </Animated.View>
      </Pressable>
    </Modal>
  )
}

// Item component
export function DropdownMenuItem({ 
  children,
  value,
  onSelect,
  icon,
  destructive,
}: { 
  children: React.ReactNode
  value?: string
  onSelect?: () => void
  icon?: keyof typeof Ionicons.glyphMap
  destructive?: boolean
}) {
  const context = React.useContext(DropdownMenuContext)
  const { isDark } = useTheme()
  
  if (!context) throw new Error('DropdownMenuItem must be used within DropdownMenu')

  const handlePress = () => {
    if (value) {
      context.setSelectedValue(value)
    }
    onSelect?.()
    context.setOpen(false)
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`
        flex-row items-center gap-2 px-3 py-2
        active:bg-background-subtle dark:active:bg-background-subtle-dark
      `}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color={destructive ? '#EF4444' : isDark ? '#F3F4F6' : '#1F2937'}
        />
      )}
      <Text className={`
        text-body-sm
        ${destructive ? 'text-error' : isDark ? 'text-text-dark' : 'text-text'}
      `}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

// Separator component
export function DropdownMenuSeparator() {
  const { isDark } = useTheme()
  
  return (
    <View className={`
      h-[1px] mx-3 my-1
      ${isDark ? 'bg-border-dark' : 'bg-border'}
    `} />
  )
}

// Label component
export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme()
  
  return (
    <Text className={`
      px-3 py-2 text-body-sm font-inter-medium
      ${isDark ? 'text-text-muted-dark' : 'text-text-muted'}
    `}>
      {children}
    </Text>
  )
} 