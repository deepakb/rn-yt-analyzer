import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Fonts } from '@/constants/fonts';

interface ThemedTextProps extends TextProps {
  type?: 'title' | 'body' | 'label';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
}

export const ThemedText: React.FC<ThemedTextProps> = ({ 
  type = 'body', 
  weight = 'regular',
  style, 
  ...props 
}) => {
  return (
    <Text
      style={[
        styles[type],
        { fontFamily: Fonts[weight] },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#11181C',
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    color: '#11181C',
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
}); 