import * as React from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

import { Href, Link } from 'expo-router'

import { cn } from '@/lib/utils'

const buttonVariants = {
  variant: {
    default: 'bg-primary text-primary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'border border-input bg-background text-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    ghost: 'text-foreground hover:bg-accent',
    link: 'text-primary underline-offset-4 hover:underline',
  },
  size: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  },
} as const

interface ButtonProps {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
  onPress?: () => void
  children: React.ReactNode
  href?: Href<string | object>
  className?: string
  disabled?: boolean
}

function Button({
  variant = 'default',
  size = 'default',
  onPress,
  children,
  href,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const buttonClasses = cn(
    'flex-row items-center justify-center rounded-md active:opacity-90',
    'disabled:opacity-50',
    buttonVariants.variant[variant],
    buttonVariants.size[size],
    className
  )

  const content = (
    <>
      {React.Children.map(children, (child) => {
        if (typeof child === 'string') {
          return (
            <Text
              className={cn(
                'text-sm font-medium',
                variant === 'link' && 'underline-offset-4'
              )}
            >
              {child}
            </Text>
          )
        }
        return child
      })}
    </>
  )

  if (href) {
    return (
      <Link href={href} asChild>
        <TouchableOpacity
          className={buttonClasses}
          onPress={onPress}
          disabled={disabled}
          {...props}
        >
          {content}
        </TouchableOpacity>
      </Link>
    )
  }

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {content}
    </TouchableOpacity>
  )
}

Button.displayName = 'Button'

export { Button, buttonVariants, type ButtonProps }
