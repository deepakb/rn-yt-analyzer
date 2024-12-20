import React from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

import { Slot } from 'expo-router'

// Optional if using Slot component for customization

interface ButtonProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  onPress?: () => void
  children: React.ReactNode
  asChild?: boolean
  className?: string // Optional additional styles
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  onPress,
  children,
  asChild = false,
  className = '',
}) => {
  // Define the base classes for the button
  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50'

  // Variant styles with explicit text colors
  const variantClasses: Record<string, string> = {
    default: 'bg-blue-500 hover:bg-blue-600',
    destructive: 'bg-red-500 hover:bg-red-600',
    outline: 'border border-gray-300 hover:bg-gray-100',
    secondary: 'bg-gray-500 hover:bg-gray-600',
    ghost: 'bg-transparent hover:bg-gray-100',
    link: 'bg-transparent underline hover:text-blue-600',
  }

  // Text colors for each variant
  const variantTextColors: Record<string, string> = {
    default: 'text-white',
    destructive: 'text-white',
    outline: 'text-gray-700',
    secondary: 'text-white',
    ghost: 'text-gray-700',
    link: 'text-blue-500',
  }

  // Size styles (Tailwind utility classes mapped to NativeWind)
  const sizeClasses: Record<string, string> = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-9 px-3 text-xs',
    lg: 'h-12 px-6 text-lg',
    icon: 'h-10 w-10',
  }

  // Combine all classes
  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(' ')

  // Determine component type (Slot or TouchableOpacity)
  const Component = asChild ? Slot : TouchableOpacity

  // Extract text-specific classes from className
  const customTextClass = className
    .split(' ')
    .find((cls) => cls.startsWith('text-'))

  // Use custom text class if provided, otherwise fall back to variant text color
  const textClass = customTextClass || variantTextColors[variant]

  return (
    <Component
      className={combinedClasses}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-center gap-3">
        {React.Children.map(children, (child) => {
          if (typeof child === 'string') {
            return <Text className={textClass}>{child}</Text>
          }
          return child
        })}
      </View>
    </Component>
  )
}

export default Button
