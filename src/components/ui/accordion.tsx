import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue,
  interpolate,
  Easing
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
  children: React.ReactNode;
}

interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContext = React.createContext<{
  value: string | string[];
  onValueChange: (value: string) => void;
}>({ value: '', onValueChange: () => {} });

const AccordionItemContext = React.createContext<{
  value: string;
  isOpen: boolean;
}>({ value: '', isOpen: false });

export const Accordion = React.forwardRef<View, AccordionProps>(
  ({ type = "single", defaultValue = "", className = "", children }, ref) => {
    const [value, setValue] = React.useState<string | string[]>(defaultValue);

    const onValueChange = (itemValue: string) => {
      if (type === "single") {
        setValue(itemValue === value ? "" : itemValue);
      } else {
        setValue(old => {
          const oldArray = Array.isArray(old) ? old : [old];
          return oldArray.includes(itemValue)
            ? oldArray.filter(v => v !== itemValue)
            : [...oldArray, itemValue];
        });
      }
    };

    return (
      <AccordionContext.Provider value={{ value, onValueChange }}>
        <View
          ref={ref}
          className={`w-full divide-y divide-border dark:divide-border-dark ${className}`}
        >
          {children}
        </View>
      </AccordionContext.Provider>
    );
  }
);

export const AccordionItem = React.forwardRef<View, AccordionItemProps>(
  ({ value, className = "", children }, ref) => {
    const { value: selectedValue } = React.useContext(AccordionContext);
    const isOpen = Array.isArray(selectedValue) 
      ? selectedValue.includes(value)
      : selectedValue === value;

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <View
          ref={ref}
          className={`w-full border-b border-border dark:border-border-dark ${className}`}
        >
          {children}
        </View>
      </AccordionItemContext.Provider>
    );
  }
);

export const AccordionTrigger = React.forwardRef<TouchableOpacity, AccordionTriggerProps>(
  ({ className = "", children }, ref) => {
    const { isDark } = useTheme();
    const { value, isOpen } = React.useContext(AccordionItemContext);
    const { onValueChange } = React.useContext(AccordionContext);
    const rotation = useSharedValue(0);

    React.useEffect(() => {
      rotation.value = withTiming(isOpen ? 180 : 0, {
        duration: 200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
    }, [isOpen]);

    const iconStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
      <TouchableOpacity
        ref={ref}
        onPress={() => onValueChange(value)}
        className={`
          flex-row items-center justify-between
          w-full py-4 px-4
          ${isDark ? 'bg-surface-dark' : 'bg-surface'}
          ${className}
        `}
        activeOpacity={0.7}
      >
        <View className="flex-1 mr-2">
          <Text 
            className={`
              text-body-md font-inter-medium
              ${isDark ? 'text-text-dark' : 'text-text'}
            `}
          >
            {typeof children === 'string' ? children : null}
          </Text>
        </View>
        <Animated.View style={iconStyle}>
          <Ionicons
            name="chevron-down"
            size={20}
            color={isDark ? '#F3F4F6' : '#1F2937'}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  }
);

export const AccordionContent = React.forwardRef<View, AccordionContentProps>(
  ({ className = "", children }, ref) => {
    const { isOpen } = React.useContext(AccordionItemContext);
    const { isDark } = useTheme();
    const [contentHeight, setContentHeight] = React.useState(0);
    const animatedHeight = useSharedValue(0);

    React.useEffect(() => {
      if (isOpen) {
        animatedHeight.value = withTiming(contentHeight, {
          duration: 200,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
      } else {
        animatedHeight.value = withTiming(0, {
          duration: 200,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
      }
    }, [isOpen, contentHeight]);

    const animatedStyle = useAnimatedStyle(() => ({
      height: animatedHeight.value,
      opacity: interpolate(
        animatedHeight.value,
        [0, contentHeight / 2, contentHeight],
        [0, 0.5, 1]
      ),
    }));

    return (
      <Animated.View style={animatedStyle} className="overflow-hidden w-full">
        <View
          ref={ref}
          onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
          className={`
            w-full px-4 pb-4
            ${isDark ? 'bg-surface-dark' : 'bg-surface'}
            ${className}
          `}
          style={{ position: 'absolute' }}
        >
          {typeof children === 'string' ? (
            <Text 
              className={`
                text-body-sm
                ${isDark ? 'text-text-dark' : 'text-text'}
              `}
            >
              {children}
            </Text>
          ) : children}
        </View>
      </Animated.View>
    );
  }
);

// Add display names
Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent'; 