declare module 'expo-router' {
  import { NavigationContainer } from '@react-navigation/native';
  import { StackNavigationOptions } from '@react-navigation/stack';

  export const Stack: {
    Screen: React.ComponentType<{
      name: string;
      options?: StackNavigationOptions;
      component?: React.ComponentType<any>;
    }>;
  };

  export const Link: React.ComponentType<{
    href: string;
    [key: string]: any;
  }>;

  export const useRouter: () => {
    push: (route: string) => void;
    replace: (route: string) => void;
    back: () => void;
  };
} 