import React from 'react'

import { Image, ImageSourcePropType, Text, View } from 'react-native'

import { GradientBackground } from './gradient-background'
import { cn } from "@/lib/utils"

interface AvatarRootProps {
  className?: string
  children: React.ReactNode
}

interface AvatarImageProps {
  source: ImageSourcePropType
  className?: string
}

interface AvatarFallbackProps {
  initials: string
  className?: string
}

const AvatarRoot = React.forwardRef<View, AvatarRootProps>(
  ({ className, children }, ref) => (
    <View
      ref={ref}
      className={cn(
        "relative h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
    >
      {children}
    </View>
  )
)

const AvatarImage = React.forwardRef<Image, AvatarImageProps>(
  ({ className, source }, ref) => (
    <Image
      ref={ref}
      source={source}
      className={cn("aspect-square h-full w-full", className)}
      resizeMode="cover"
    />
  )
)

const AvatarFallback = React.forwardRef<View, AvatarFallbackProps>(
  ({ className, initials }, ref) => (
    <GradientBackground
      ref={ref}
      gradient="primary"
      className={cn("flex-1 items-center justify-center", className)}
    >
      <Text className={cn("text-body-sm font-inter-medium text-white")}>
        {initials}
      </Text>
    </GradientBackground>
  )
)

// Add display names
AvatarRoot.displayName = 'Avatar'
AvatarImage.displayName = 'AvatarImage'
AvatarFallback.displayName = 'AvatarFallback'

export { AvatarRoot as Avatar, AvatarImage, AvatarFallback }
