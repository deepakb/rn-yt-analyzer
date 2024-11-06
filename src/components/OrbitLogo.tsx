import { View } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { Ionicons } from '@expo/vector-icons'
import MaskedView from '@react-native-masked-view/masked-view'

import { useTheme } from '@/contexts/ThemeContext'
import { gradients } from '@/types/gradient'

export function OrbitLogo() {
  const { isDark } = useTheme()

  // Use the secondary gradient preset (or any other preset you prefer)
  const gradientConfig = gradients.secondary

  return (
    <MaskedView
      maskElement={
        <View className="w-8 h-8 items-center justify-center">
          <Ionicons name="planet" size={24} color="black" />
        </View>
      }
    >
      <LinearGradient
        {...gradientConfig}
        className="w-8 h-8 animate-gradient-x"
      />
    </MaskedView>
  )
}
