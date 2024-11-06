import * as React from 'react'

import { Text, TouchableOpacity, View, ViewProps } from 'react-native'

import { Link } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'

import { useTheme } from '@/contexts/ThemeContext'

interface BreadcrumbProps extends ViewProps {
  separator?: React.ReactNode
  children: React.ReactNode
  className?: string
}

interface BreadcrumbListProps extends ViewProps {
  children: React.ReactNode
  className?: string
}

interface BreadcrumbItemProps extends ViewProps {
  children: React.ReactNode
  className?: string
}

interface BreadcrumbLinkProps {
  href?: string
  onPress?: () => void
  children: React.ReactNode
  className?: string
}

interface BreadcrumbPageProps {
  children: React.ReactNode
  className?: string
}

interface BreadcrumbSeparatorProps extends ViewProps {
  children?: React.ReactNode
  className?: string
}

interface BreadcrumbEllipsisProps {
  onPress?: () => void
  className?: string
}

export const Breadcrumb = React.forwardRef<View, BreadcrumbProps>(
  ({ separator, className = '', children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={`flex-row items-center ${className}`}
        {...props}
      >
        {children}
      </View>
    )
  }
)

export const BreadcrumbList = React.forwardRef<View, BreadcrumbListProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={`
          flex-row flex-wrap items-center gap-x-2
          ${className}
        `}
        {...props}
      >
        {children}
      </View>
    )
  }
)

export const BreadcrumbItem = React.forwardRef<View, BreadcrumbItemProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={`
          flex-row items-center gap-x-2
          ${className}
        `}
        {...props}
      >
        {children}
      </View>
    )
  }
)

export const BreadcrumbLink = React.forwardRef<
  TouchableOpacity,
  BreadcrumbLinkProps
>(({ href, onPress, className = '', children }, ref) => {
  const { isDark } = useTheme()

  const content = (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      className={`
          active:opacity-70
          ${className}
        `}
    >
      <Text
        className={`
          text-body-sm font-inter-medium
          ${isDark ? 'text-text-muted-dark' : 'text-text-muted'}
        `}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )

  if (href) {
    return (
      <Link href={href as any} asChild>
        {content}
      </Link>
    )
  }

  return content
})

export const BreadcrumbPage = React.forwardRef<Text, BreadcrumbPageProps>(
  ({ className = '', children }, ref) => {
    const { isDark } = useTheme()

    return (
      <Text
        ref={ref}
        className={`
          text-body-sm font-inter-medium
          ${isDark ? 'text-text-dark' : 'text-text'}
          ${className}
        `}
      >
        {children}
      </Text>
    )
  }
)

export const BreadcrumbSeparator = React.forwardRef<
  View,
  BreadcrumbSeparatorProps
>(({ children, className = '', ...props }, ref) => {
  const { isDark } = useTheme()

  return (
    <View ref={ref} className={`flex-row items-center ${className}`} {...props}>
      {children || (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={isDark ? '#9CA3AF' : '#6B7280'}
        />
      )}
    </View>
  )
})

export const BreadcrumbEllipsis = React.forwardRef<
  TouchableOpacity,
  BreadcrumbEllipsisProps
>(({ onPress, className = '' }, ref) => {
  const { isDark } = useTheme()

  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      className={`
          p-1 rounded-md
          active:bg-background-subtle dark:active:bg-background-subtle-dark
          ${className}
        `}
    >
      <Ionicons
        name="ellipsis-horizontal"
        size={16}
        color={isDark ? '#9CA3AF' : '#6B7280'}
      />
    </TouchableOpacity>
  )
})

// Add display names
Breadcrumb.displayName = 'Breadcrumb'
BreadcrumbList.displayName = 'BreadcrumbList'
BreadcrumbItem.displayName = 'BreadcrumbItem'
BreadcrumbLink.displayName = 'BreadcrumbLink'
BreadcrumbPage.displayName = 'BreadcrumbPage'
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis'
