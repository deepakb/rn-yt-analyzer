import React from 'react'

import { Text, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

interface AlertProps {
  variant?: 'default' | 'destructive' | 'success' | 'warning'
  icon?: keyof typeof Ionicons.glyphMap
  className?: string
  children: React.ReactNode
}

interface AlertContentProps {
  className?: string
  children: React.ReactNode
}

const Alert = React.forwardRef<View, AlertProps>(
  ({ variant = 'default', icon, className, children }, ref) => {
    const { isDark } = useTheme()

    const variantStyles = {
      default:
        'bg-background-subtle dark:bg-background-subtle-dark border-border dark:border-border-dark',
      destructive:
        'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800',
      success:
        'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800',
      warning:
        'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800',
    }

    const iconColors = {
      default: isDark ? '#F3F4F6' : '#1F2937',
      destructive: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
    }

    return (
      <View
        ref={ref}
        className={cn(
          'relative w-full rounded-lg border p-4',
          variantStyles[variant],
          className
        )}
      >
        {icon && (
          <View className="absolute left-4 top-4">
            <Ionicons name={icon} size={20} color={iconColors[variant]} />
          </View>
        )}
        <View className={cn(icon && 'ml-8')}>
          {React.Children.map(children, (child) => {
            if (typeof child === 'string') {
              return <Text>{child}</Text>
            }
            return child
          })}
        </View>
      </View>
    )
  }
)

const AlertTitle = React.forwardRef<Text, AlertContentProps>(
  ({ className, children }, ref) => {
    if (typeof children !== 'string') {
      console.warn('AlertTitle expects a string child')
      return null
    }

    return (
      <Text
        ref={ref}
        className={cn(
          'text-body-md font-inter-medium',
          'text-text dark:text-text-dark',
          'mb-1',
          className
        )}
      >
        {children}
      </Text>
    )
  }
)

const AlertDescription = React.forwardRef<Text, AlertContentProps>(
  ({ className, children }, ref) => {
    if (typeof children !== 'string') {
      console.warn('AlertDescription expects a string child')
      return null
    }

    return (
      <Text
        ref={ref}
        className={cn(
          'text-body-sm',
          'text-text-muted dark:text-text-muted-dark',
          className
        )}
      >
        {children}
      </Text>
    )
  }
)

Alert.displayName = 'Alert'
AlertTitle.displayName = 'AlertTitle'
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
