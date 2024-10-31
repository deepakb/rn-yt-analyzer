import { useColorScheme } from 'react-native';

export function useTheme() {
  const theme = useColorScheme();
  return theme === 'dark' ? 'dark' : 'light';
} 