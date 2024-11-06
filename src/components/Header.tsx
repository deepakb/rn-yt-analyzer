import { TouchableOpacity, View } from 'react-native'

import { OrbitLogo } from '@/components/OrbitLogo'
import { GradientIcon, GradientText } from '@/components/ui'
import { useTheme } from '@/contexts/ThemeContext'
import { GradientConfig } from '@/types/gradient'

interface HeaderProps {
  onNotificationPress?: () => void
}

export function Header({ onNotificationPress }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme()

  // Theme toggle gradients
  const themeGradient: GradientConfig = {
    colors: isDark
      ? ['#FCD34D', '#F59E0B'] // warning gradient for sun
      : ['#2193b0', '#6dd5ed'], // ocean gradient for moon
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  }

  return (
    <View
      className={`
        flex-row items-center justify-between 
        px-lg h-[56px] 
        bg-surface dark:bg-surface-dark
        border-b border-border dark:border-border-dark
      `}
    >
      {/* Left side - Logo and Title */}
      <View className="flex-row items-center space-x-xs">
        <View className="w-8 h-8">
          <OrbitLogo />
        </View>
        <GradientText
          gradient="secondary"
          variant="display-xs"
          weight="bold"
          className="animate-gradient-x"
        >
          Design System
        </GradientText>
      </View>

      {/* Right side - Theme and Notification icons */}
      <View className="flex-row items-center space-x-sm">
        <TouchableOpacity
          onPress={toggleTheme}
          className="
            p-xs rounded-lg 
            active:bg-background-subtle dark:active:bg-background-subtle-dark
            transition-colors duration-200
          "
          accessibilityLabel="Toggle theme"
          accessibilityRole="button"
          accessibilityHint={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <GradientIcon
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size="md"
            gradient={themeGradient}
            className="animate-fade-in"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
