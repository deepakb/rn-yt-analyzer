import * as React from 'react'

import { Animated, Easing, TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { cn } from '@/lib/utils'

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

const Checkbox = React.forwardRef<TouchableOpacity, CheckboxProps>(
  ({ checked = false, onCheckedChange, disabled = false, className }, ref) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: checked ? 1 : 0,
        duration: 200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      }).start()
    }, [checked])

    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={disabled ? 1 : 0.7}
        onPress={() => {
          if (!disabled && onCheckedChange) {
            onCheckedChange(!checked)
          }
        }}
        className={cn('p-0.5', className)}
      >
        <View
          className={cn(
            'w-4 h-4 rounded border border-primary bg-transparent items-center justify-center',
            checked && 'bg-primary',
            disabled && 'opacity-50'
          )}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            }}
            className="flex-1 items-center justify-center"
          >
            {checked && (
              <Ionicons name="checkmark-sharp" size={12} color="#FFF" />
            )}
          </Animated.View>
        </View>
      </TouchableOpacity>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
