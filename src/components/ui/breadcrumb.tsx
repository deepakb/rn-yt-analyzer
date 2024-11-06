import * as React from 'react'

import { Text, TouchableOpacity, View, ViewProps } from 'react-native'

import { Link } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'

import { useTheme } from '@/contexts/ThemeContext'
import { cn } from "@/lib/utils"

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
  ({ separator, className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex-row items-center", className)}
        {...props}
      >
        {children}
      </View>
    )
  }
)

export const BreadcrumbList = React.forwardRef<View, BreadcrumbListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex-row flex-wrap items-center gap-x-2", className)}
        {...props}
      >
        {children}
      </View>
    )
  }
)

export const BreadcrumbItem = React.forwardRef<View, BreadcrumbItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex-row items-center gap-x-2", className)}
        {...props}
      >
        {children}
      </View>
    )
  }
)

export const BreadcrumbLink = React.forwardRef<TouchableOpacity, BreadcrumbLinkProps>(
  ({ href, onPress, className, children }, ref) => {
    return (
      <Link href={href as any} asChild>
        <TouchableOpacity
          ref={ref}
          onPress={onPress}
          className={cn("active:opacity-70", className)}
        >
          <Text
            className={cn(
              "text-body-sm font-medium",
              "text-muted-foreground"
            )}
          >
            {children}
          </Text>
        </TouchableOpacity>
      </Link>
    )
  }
)

export const BreadcrumbPage = React.forwardRef<Text, BreadcrumbPageProps>(
  ({ className, children }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          "text-body-sm font-medium",
          "text-foreground",
          className
        )}
      >
        {children}
      </Text>
    )
  }
)

export const BreadcrumbSeparator = React.forwardRef<View, BreadcrumbSeparatorProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <View 
        ref={ref} 
        className={cn("flex-row items-center", className)} 
        {...props}
      >
        {children || (
          <Ionicons
            name="chevron-forward"
            size={16}
            className="text-muted-foreground"
          />
        )}
      </View>
    )
  }
)

export const BreadcrumbEllipsis = React.forwardRef<TouchableOpacity, BreadcrumbEllipsisProps>(
  ({ onPress, className }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        className={cn(
          "p-1 rounded-md",
          "active:bg-muted",
          className
        )}
      >
        <Ionicons
          name="ellipsis-horizontal"
          size={16}
          className="text-muted-foreground"
        />
      </TouchableOpacity>
    )
  }
)

// Add display names
Breadcrumb.displayName = 'Breadcrumb'
BreadcrumbList.displayName = 'BreadcrumbList'
BreadcrumbItem.displayName = 'BreadcrumbItem'
BreadcrumbLink.displayName = 'BreadcrumbLink'
BreadcrumbPage.displayName = 'BreadcrumbPage'
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis'
