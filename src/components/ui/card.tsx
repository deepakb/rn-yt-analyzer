import * as React from "react"
import { View, Text, ViewStyle, TextStyle, StyleSheet, StyleProp } from "react-native"

interface CardProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

const Card = React.forwardRef<View, CardProps>(({ style, ...props }, ref) => (
  <View
    ref={ref}
    style={[styles.card, style]}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<View, CardProps>(({ style, ...props }, ref) => (
  <View
    ref={ref}
    style={[styles.cardHeader, style]}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<Text, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ style, ...props }, ref) => (
    <Text
      ref={ref}
      style={[styles.cardTitle, style]}
      {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<Text, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ style, ...props }, ref) => (
    <Text
      ref={ref}
      style={[styles.cardDescription, style]}
      {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<View, CardProps>(({ style, ...props }, ref) => (
  <View
    ref={ref}
    style={[styles.cardContent, style]}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<View, CardProps>(({ style, ...props }, ref) => (
  <View
    ref={ref}
    style={[styles.cardFooter, style]}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: 'white', // or your theme's card background
    borderWidth: 1,
    borderColor: '#e5e5e5', // or your theme's border color
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    padding: 24,
    gap: 6,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666', // or your theme's muted text color
  },
  cardContent: {
    padding: 24,
    paddingTop: 0,
  },
  cardFooter: {
    padding: 24,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} 