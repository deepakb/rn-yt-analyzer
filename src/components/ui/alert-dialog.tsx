import * as React from 'react'
import { createContext, useCallback, useContext, useState } from 'react'

import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { cn } from '@/lib/utils'

// Context for managing dialog state
type AlertDialogContext = {
  open: boolean
  setOpen: (open: boolean) => void
}

const AlertDialogContext = createContext<AlertDialogContext | null>(null)

// Root component
export function AlertDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  )
}
AlertDialog.displayName = 'AlertDialog'

// Trigger component
export function AlertDialogTrigger({
  children,
}: {
  children: React.ReactNode
}) {
  const context = useContext(AlertDialogContext)

  if (!context)
    throw new Error('AlertDialogTrigger must be used within AlertDialog')

  return <Pressable onPress={() => context.setOpen(true)}>{children}</Pressable>
}
AlertDialogTrigger.displayName = 'AlertDialogTrigger'

// Content component
export function AlertDialogContent({
  children,
}: {
  children: React.ReactNode
}) {
  const context = useContext(AlertDialogContext)

  if (!context)
    throw new Error('AlertDialogContent must be used within AlertDialog')

  const handleBackdropPress = useCallback(() => {
    context.setOpen(false)
  }, [])

  return (
    <Modal
      transparent
      visible={context.open}
      animationType="fade"
      onRequestClose={handleBackdropPress}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View className="flex-1 bg-black/50 justify-center items-center">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-lg p-4 w-[85%] max-w-[500px] shadow-lg">
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
AlertDialogContent.displayName = 'AlertDialogContent'

// Header component
export function AlertDialogHeader({ children }: { children: React.ReactNode }) {
  return <View className="mb-4">{children}</View>
}
AlertDialogHeader.displayName = 'AlertDialogHeader'

// Title component
export function AlertDialogTitle({ children }: { children: React.ReactNode }) {
  return <Text className="text-lg font-semibold mb-2">{children}</Text>
}
AlertDialogTitle.displayName = 'AlertDialogTitle'

// Description component
export function AlertDialogDescription({
  children,
}: {
  children: React.ReactNode
}) {
  return <Text className="text-sm text-gray-500 leading-5">{children}</Text>
}
AlertDialogDescription.displayName = 'AlertDialogDescription'

// Footer component
export function AlertDialogFooter({ children }: { children: React.ReactNode }) {
  return <View className="mt-6 flex-row justify-end gap-2">{children}</View>
}
AlertDialogFooter.displayName = 'AlertDialogFooter'

// Action button component
export function AlertDialogAction({
  children,
  onPress,
  className,
}: {
  children: React.ReactNode
  onPress?: () => void
  className?: string
}) {
  const context = useContext(AlertDialogContext)

  const handlePress = () => {
    onPress?.()
    context?.setOpen(false)
  }

  return (
    <Pressable
      className={cn(
        'py-2 px-4 rounded min-w-[80px] items-center bg-primary',
        className
      )}
      onPress={handlePress}
    >
      <Text className="text-primary-foreground font-medium">{children}</Text>
    </Pressable>
  )
}
AlertDialogAction.displayName = 'AlertDialogAction'

// Cancel button component
export function AlertDialogCancel({
  children,
  onPress,
  className,
}: {
  children: React.ReactNode
  onPress?: () => void
  className?: string
}) {
  const context = useContext(AlertDialogContext)

  const handlePress = () => {
    onPress?.()
    context?.setOpen(false)
  }

  return (
    <Pressable
      className={cn(
        'py-2 px-4 rounded min-w-[80px] items-center bg-secondary',
        className
      )}
      onPress={handlePress}
    >
      <Text className="text-secondary-foreground font-medium">{children}</Text>
    </Pressable>
  )
}
AlertDialogCancel.displayName = 'AlertDialogCancel'
