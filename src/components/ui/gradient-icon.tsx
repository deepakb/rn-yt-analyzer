import { View } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { Ionicons } from '@expo/vector-icons'
import MaskedView from '@react-native-masked-view/masked-view'

import { GradientConfig, GradientPreset, gradients } from '@/types/gradient'

interface GradientIconProps {
  name: keyof typeof Ionicons.glyphMap
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  gradient: GradientConfig | GradientPreset
  className?: string
}

const iconSizes = {
  xs: 16, // Small icons like indicators
  sm: 20, // Default for inline icons
  md: 24, // Standard UI elements
  lg: 32, // Featured icons
  xl: 40, // Large featured icons
  '2xl': 48, // Extra large icons
} as const

export function GradientIcon({
  name,
  size = 'md',
  gradient,
  className = '',
}: GradientIconProps) {
  // Handle gradient preset or custom config
  const gradientConfig =
    typeof gradient === 'string' ? gradients[gradient] : gradient

  const iconSize = iconSizes[size]

  return (
    <MaskedView
      maskElement={
        <View
          className={`
          items-center justify-center
          ${className}
        `}
        >
          <Ionicons name={name} size={iconSize} color="black" />
        </View>
      }
    >
      <LinearGradient
        {...gradientConfig}
        className="animate-gradient-x"
        style={{
          height: iconSize,
          width: iconSize,
        }}
      />
    </MaskedView>
  )
}
