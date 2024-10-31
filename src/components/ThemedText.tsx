import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ThemedTextProps extends TextProps {
  type?: 'title' | 'body';
}

export const ThemedText: React.FC<ThemedTextProps> = ({ type = 'body', style, ...props }) => {
  return (
    <Text
      style={[
        styles[type],
        style,
      ]}
      {...props}
    />
  );
};

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