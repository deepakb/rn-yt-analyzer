import * as React from 'react'

import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@/contexts/ThemeContext'

// Types
interface SheetRootProps {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

interface SheetOverlayProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string
}

// Context
type SheetContextType = {
  open: boolean
  onOpenChange: (open: boolean) => void
} | null

const SheetContext = React.createContext<SheetContextType>(null)

const useSheet = () => {
  const context = React.useContext(SheetContext)
  if (!context) {
    throw new Error('useSheet must be used within a Sheet')
  }
  return context
}

// Components
const Sheet = React.forwardRef<View, SheetRootProps>(
  (
    { children, defaultOpen = false, open: controlledOpen, onOpenChange },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
    const isControlled = controlledOpen !== undefined

    const open = isControlled ? controlledOpen : uncontrolledOpen
    const setOpen = React.useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(value)
        }
        onOpenChange?.(value)
      },
      [isControlled, onOpenChange]
    )

    return (
      <SheetContext.Provider value={{ open, onOpenChange: setOpen }}>
        <View ref={ref}>{children}</View>
      </SheetContext.Provider>
    )
  }
)
Sheet.displayName = 'Sheet'

interface SheetTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  children: React.ReactNode
  asChild?: boolean
}

const SheetTrigger = React.forwardRef<TouchableOpacity, SheetTriggerProps>(
  ({ children, asChild, ...props }, ref) => {
    const { onOpenChange } = useSheet()

    const handlePress = React.useCallback(() => {
      onOpenChange(true)
    }, [onOpenChange])

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...children.props,
        onPress: handlePress,
      })
    }

    return (
      <TouchableOpacity
        ref={ref}
        onPress={handlePress}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    )
  }
)
SheetTrigger.displayName = 'SheetTrigger'

const SheetOverlay = React.forwardRef<View, SheetOverlayProps>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = useSheet()
    const opacity = useSharedValue(0)

    React.useEffect(() => {
      opacity.value = withTiming(1, { duration: 200 })
      return () => {
        opacity.value = withTiming(0, { duration: 150 })
      }
    }, [])

    const overlayStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }))

    return (
      <Pressable
        ref={ref}
        onPress={() => onOpenChange(false)}
        className="absolute inset-0"
        {...props}
      >
        <Animated.View
          className={`absolute inset-0 bg-black/80 ${className}`}
          style={overlayStyle}
        />
      </Pressable>
    )
  }
)
SheetOverlay.displayName = 'SheetOverlay'

const SheetContent = React.forwardRef<View, SheetContentProps>(
  ({ side = 'right', className, children, ...props }, ref) => {
    const { open, onOpenChange } = useSheet()
    const { isDark } = useTheme()
    const { width, height } = Dimensions.get('window')
    const insets = useSafeAreaInsets()

    const translateX = useSharedValue(
      side === 'right' ? width : side === 'left' ? -width : 0
    )
    const translateY = useSharedValue(
      side === 'bottom' ? height : side === 'top' ? -height : 0
    )

    // Animation effect
    React.useEffect(() => {
      if (open) {
        translateX.value = withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        })
        translateY.value = withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        })
      } else {
        translateX.value = withTiming(
          side === 'right' ? width : side === 'left' ? -width : 0,
          { duration: 200 }
        )
        translateY.value = withTiming(
          side === 'bottom' ? height : side === 'top' ? -height : 0,
          { duration: 200 }
        )
      }
    }, [open, side, width, height])

    // Animated style for translations
    const contentStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }))

    // Sheet positioning and safe area style
    const sheetStyle = React.useMemo(() => {
      const baseWidth = Math.min(width * 0.75, 350)

      switch (side) {
        case 'left':
          return {
            width: baseWidth,
            height: height - insets.top,
            top: insets.top,
            left: 0,
            paddingLeft: insets.left,
            paddingBottom: insets.bottom,
            position: 'absolute' as const,
          }
        case 'right':
          return {
            width: baseWidth,
            height: height - insets.top,
            top: insets.top,
            right: 0,
            paddingRight: insets.right,
            paddingBottom: insets.bottom,
            position: 'absolute' as const,
          }
        case 'top':
          return {
            position: 'absolute' as const,
            width: '100%',
            maxHeight: height * 0.8,
            top: insets.top,
            left: 0,
            right: 0,
            paddingTop: insets.top + 16,
            paddingHorizontal: Math.max(insets.left, insets.right),
            paddingBottom: 16,
            zIndex: 50,
          }
        case 'bottom':
          return {
            position: 'absolute' as const,
            width: '100%',
            maxHeight: '80%',
            bottom: 0,
            paddingBottom: insets.bottom,
          }
      }
    }, [side, width, height, insets])

    return (
      <Modal
        transparent
        visible={open}
        onRequestClose={() => onOpenChange(false)}
        animationType="none"
        statusBarTranslucent
      >
        <View className="flex-1">
          <SheetOverlay />
          <Animated.View
            ref={ref}
            style={[contentStyle, sheetStyle]}
            className={`
              bg-background dark:bg-background-dark
              shadow-2xl p-6
              ${className}
            `}
            {...props}
          >
            {children}
            <TouchableOpacity
              onPress={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 active:opacity-100"
            >
              <Ionicons
                name="close"
                size={24}
                color={isDark ? '#F3F4F6' : '#1F2937'}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    )
  }
)
SheetContent.displayName = 'SheetContent'

// Rest of the components remain similar but with React Native components
const SheetHeader = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={`flex-col space-y-2 ${className}`} {...props} />
))
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={`flex-row justify-end space-x-2 ${className}`}
    {...props}
  />
))
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  const { isDark } = useTheme()
  return (
    <Text
      ref={ref}
      className={`text-lg font-inter-semibold ${isDark ? 'text-text-dark' : 'text-text'} ${className}`}
      {...props}
    />
  )
})
SheetTitle.displayName = 'SheetTitle'

const SheetDescription = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  const { isDark } = useTheme()
  return (
    <Text
      ref={ref}
      className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted'} ${className}`}
      {...props}
    />
  )
})
SheetDescription.displayName = 'SheetDescription'

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetOverlay,
}
