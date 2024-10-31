import { Text, TextProps, StyleSheet } from 'react-native';

interface ThemedTextProps extends TextProps {
  type?: 'title' | 'body';
}

export function ThemedText({ type = 'body', style, ...props }: ThemedTextProps) {
  return (
    <Text
      style={[
        styles[type],
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11181C',
  },
  body: {
    fontSize: 16,
    color: '#11181C',
  },
}); 