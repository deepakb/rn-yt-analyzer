import * as React from "react";
import { Text, StyleSheet, TextProps } from "react-native";

export interface LabelProps extends TextProps {
  children?: React.ReactNode;
}

const Label = React.forwardRef<Text, LabelProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text ref={ref} style={[styles.label, style]} {...props}>
        {children}
      </Text>
    );
  }
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14, // equivalent to text-sm
    fontWeight: "500", // equivalent to font-medium
    lineHeight: 16, // appropriate leading for mobile
    opacity: 1,
  },
});

Label.displayName = "Label";

export { Label }; 