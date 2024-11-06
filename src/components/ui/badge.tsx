import React from 'react'

import { Text, View, ViewProps } from 'react-native'

interface BadgeProps extends ViewProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
  children: React.ReactNode
}

const Badge = React.forwardRef<View, BadgeProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    // Define variant styles
    const variantStyles = {
      default: `bg-primary border-transparent`,
      secondary: `bg-secondary-500 border-transparent`,
      destructive: `bg-error border-transparent`,
      outline: `border-border dark:border-border-dark bg-transparent`,
    }

    // Define text colors for each variant
    const variantTextColors = {
      default: `text-white`,
      secondary: `text-white`,
      destructive: `text-white`,
      outline: `text-text dark:text-text-dark`,
    }

    return (
      <View
        ref={ref}
        className={`
          inline-flex flex-row items-center
          px-2.5 py-0.5
          rounded-full border
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (typeof child === 'string') {
            return (
              <Text
                className={`
                  text-body-xs font-inter-semibold
                  ${variantTextColors[variant]}
                `}
              >
                {child}
              </Text>
            )
          }
          return child
        })}
      </View>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
