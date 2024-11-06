import { View, ViewProps } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { GradientConfig, GradientPreset, gradients } from '@/types/gradient'

interface GradientBackgroundProps extends ViewProps {
  gradient: GradientConfig | GradientPreset
  variant?: 'primary' | 'secondary' | 'surface' | 'card'
  className?: string
  children?: React.ReactNode
}

const variantClasses = {
  primary: 'rounded-lg shadow-md',
  secondary: 'rounded-xl shadow-lg',
  surface: 'rounded-2xl shadow-xl',
  card: 'rounded-lg shadow-sm',
} as const

export function GradientBackground({
  gradient,
  variant = 'primary',
  className = '',
  children,
  ...props
}: GradientBackgroundProps) {
  // Handle gradient preset or custom config
  const gradientConfig =
    typeof gradient === 'string' ? gradients[gradient] : gradient

  const baseClasses = [
    children ? variantClasses[variant] : '',
    'animate-gradient-x',
    'overflow-hidden',
    className,
  ].join(' ')

  return (
    <LinearGradient
      colors={gradientConfig.colors}
      start={gradientConfig.start ?? { x: 0, y: 0 }}
      end={gradientConfig.end ?? { x: 1, y: 1 }}
      locations={gradientConfig.locations}
      className={baseClasses}
      {...props}
    >
      {children}
    </LinearGradient>
  )
}
