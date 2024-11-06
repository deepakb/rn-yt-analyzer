import * as React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const Checkbox = React.forwardRef<TouchableOpacity, CheckboxProps>(
  ({ checked = false, onCheckedChange, disabled = false, style }, ref) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: checked ? 1 : 0,
        duration: 200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      }).start();
    }, [checked]);

    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={disabled ? 1 : 0.7}
        onPress={() => {
          if (!disabled && onCheckedChange) {
            onCheckedChange(!checked);
          }
        }}
        style={[styles.container, style]}
      >
        <View
          style={[
            styles.checkbox,
            checked && styles.checked,
            disabled && styles.disabled,
          ]}
        >
          <Animated.View
            style={[
              styles.checkmarkContainer,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            {checked && (
              <Ionicons 
                name="checkmark-sharp" 
                size={12} 
                color="#FFF" 
              />
            )}
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#000", // border-primary
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#000", // bg-primary
  },
  disabled: {
    opacity: 0.5,
  },
  checkmarkContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

Checkbox.displayName = "Checkbox";

export { Checkbox };