import * as React from 'react'

import { Text, View } from 'react-native'

interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card = React.forwardRef<View, CardProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={`rounded-lg border border-border bg-card shadow-sm ${className ?? ''}`}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<View, CardProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={`p-6 space-y-1.5 ${className ?? ''}`}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={`text-2xl font-semibold leading-none tracking-tight ${className ?? ''}`}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={`text-sm text-muted-foreground ${className ?? ''}`}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<View, CardProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={`p-6 pt-0 ${className ?? ''}`} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<View, CardProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={`flex flex-row items-center p-6 pt-0 ${className ?? ''}`}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
