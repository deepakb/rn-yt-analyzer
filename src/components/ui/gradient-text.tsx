import { Text as RNText, TextProps } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import MaskedView from '@react-native-masked-view/masked-view'

import { GradientConfig, GradientPreset, gradients } from '@/types/gradient'

interface GradientTextProps extends TextProps {
  children: string
  gradient: GradientConfig | GradientPreset
  variant?:
    | 'display-2xl'
    | 'display-xl'
    | 'display-lg'
    | 'display-md'
    | 'display-sm'
    | 'display-xs'
    | 'body-xl'
    | 'body-lg'
    | 'body-md'
    | 'body-sm'
    | 'body-xs'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  className?: string
}

const fontWeightClasses = {
  regular: 'font-inter-regular',
  medium: 'font-inter-medium',
  semibold: 'font-inter-semibold',
  bold: 'font-inter-bold',
} as const

export function GradientText({
  children,
  gradient,
  variant = 'body-md',
  weight = 'regular',
  className = '',
  ...props
}: GradientTextProps) {
  const gradientConfig =
    typeof gradient === 'string' ? gradients[gradient] : gradient

  const baseClasses = [
    `text-${variant}`,
    fontWeightClasses[weight],
    'text-text dark:text-text-dark',
    className,
  ].join(' ')

  const variantSizes = {
    'display-2xl': 72,
    'display-xl': 60,
    'display-lg': 48,
    'display-md': 36,
    'display-sm': 30,
    'display-xs': 24,
    'body-xl': 20,
    'body-lg': 18,
    'body-md': 16,
    'body-sm': 14,
    'body-xs': 12,
  } as const

  const fontSize = variantSizes[variant]

  return (
    <MaskedView
      maskElement={
        <RNText
          className={baseClasses}
          style={{
            backgroundColor: 'transparent',
            fontSize,
            lineHeight: fontSize * 1.5,
          }}
          {...props}
        >
          {children}
        </RNText>
      }
    >
      <LinearGradient
        colors={gradientConfig.colors}
        start={gradientConfig.start ?? { x: 0, y: 0 }}
        end={gradientConfig.end ?? { x: 1, y: 1 }}
        locations={gradientConfig.locations}
        className="animate-gradient-x"
      >
        <RNText
          className={baseClasses}
          style={{
            opacity: 0,
            fontSize,
            lineHeight: fontSize * 1.5,
          }}
          {...props}
        >
          {children}
        </RNText>
      </LinearGradient>
    </MaskedView>
  )
}
