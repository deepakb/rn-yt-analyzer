import React from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

import { Slot } from 'expo-router'

import { cn } from "@/lib/utils"

interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  onPress?: () => void
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

const Button = React.forwardRef<TouchableOpacity, ButtonProps>(({
  variant = 'default',
  size = 'default',
  onPress,
  children,
  asChild = false,
  className,
  ...props
}, ref) => {
  const Component = asChild ? Slot : TouchableOpacity

  return (
    <Component
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium active:opacity-80",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          'text-primary underline-offset-4 hover:underline': variant === 'link',
        },
        {
          'h-10 px-4 py-2 text-sm': size === 'default',
          'h-9 rounded-md px-3 text-xs': size === 'sm',
          'h-11 rounded-md px-8 text-base': size === 'lg',
          'h-10 w-10': size === 'icon',
        },
        className
      )}
      onPress={onPress}
      {...props}
    >
      <View className="flex-row items-center justify-center gap-2">
        {React.Children.map(children, (child) => {
          if (typeof child === 'string') {
            return <Text className="font-medium">{child}</Text>
          }
          return child
        })}
      </View>
    </Component>
  )
})

Button.displayName = 'Button'

export default Button
