import React from 'react'

import { Text, View, ViewProps } from 'react-native'

import { cn } from "@/lib/utils"

interface BadgeProps extends ViewProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
  children: React.ReactNode
}

const Badge = React.forwardRef<View, BadgeProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    // Define variant styles using cn utility
    const variantStyles = {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border-border text-foreground",
    }

    return (
      <View
        ref={ref}
        className={cn(
          "inline-flex flex-row items-center rounded-full border px-2.5 py-0.5",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (typeof child === 'string') {
            return (
              <Text
                className="text-body-xs font-semibold"
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
