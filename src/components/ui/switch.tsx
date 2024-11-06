import * as React from 'react'

import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

interface SwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
  style?: ViewStyle
  className?: string
}

const Switch = React.forwardRef<View, SwitchProps>(
  ({ value, onValueChange, disabled, style, className, ...props }, ref) => {
    // Animation value for the thumb position
    const translateX = React.useRef(new Animated.Value(0)).current
    // Track width for calculating thumb position
    const [trackWidth, setTrackWidth] = React.useState(0)

    // Handle track layout to get width
    const onTrackLayout = (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout
      setTrackWidth(width)
    }

    // Animate thumb position when value changes
    React.useEffect(() => {
      Animated.spring(translateX, {
        toValue: value ? trackWidth - 24 : 0, // 24 is thumb diameter
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start()
    }, [value, trackWidth])

    return (
      <Pressable
        ref={ref}
        onPress={() => !disabled && onValueChange(!value)}
        style={[styles.pressable, style]}
        className={[
          'h-6 w-11 rounded-full border-2 border-transparent',
          value ? 'bg-primary' : 'bg-input',
          disabled && 'opacity-50',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        onLayout={onTrackLayout}
        {...props}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
            },
          ]}
          className={[
            'h-5 w-5 rounded-full bg-background shadow-lg',
            value ? 'bg-white' : 'bg-muted',
          ].join(' ')}
        />
      </Pressable>
    )
  }
)

const styles = StyleSheet.create({
  pressable: {
    justifyContent: 'center',
    padding: 2,
  },
  thumb: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

Switch.displayName = 'Switch'

export { Switch }
