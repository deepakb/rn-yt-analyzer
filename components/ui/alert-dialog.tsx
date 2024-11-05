import * as React from 'react'
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
} from 'react-native'
import { useCallback, createContext, useContext, useState } from 'react'

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

// Trigger component
export function AlertDialogTrigger({ children }: { children: React.ReactNode }) {
  const context = useContext(AlertDialogContext)
  
  if (!context) throw new Error('AlertDialogTrigger must be used within AlertDialog')
  
  if (typeof children === 'string') {
    return (
      <Pressable onPress={() => context.setOpen(true)}>
        <Text>{children}</Text>
      </Pressable>
    )
  }
  
  return (
    <Pressable onPress={() => context.setOpen(true)}>
      {children}
    </Pressable>
  )
}

// Content component
export function AlertDialogContent({ children }: { children: React.ReactNode }) {
  const context = useContext(AlertDialogContext)
  
  if (!context) throw new Error('AlertDialogContent must be used within AlertDialog')
  
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
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

// Header component
export function AlertDialogHeader({ children }: { children: React.ReactNode }) {
  return <View style={styles.header}>{children}</View>
}

// Title component
export function AlertDialogTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>
}

// Description component
export function AlertDialogDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>
}

// Footer component
export function AlertDialogFooter({ children }: { children: React.ReactNode }) {
  return <View style={styles.footer}>{children}</View>
}

// Action button component
export function AlertDialogAction({ 
  children, 
  onPress,
  style 
}: { 
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}) {
  const context = useContext(AlertDialogContext)
  
  const handlePress = () => {
    onPress?.()
    context?.setOpen(false)
  }

  const content = typeof children === 'string' ? (
    <Text style={styles.actionButtonText}>{children}</Text>
  ) : children

  return (
    <Pressable 
      style={[styles.button, styles.actionButton, style]} 
      onPress={handlePress}
    >
      {content}
    </Pressable>
  )
}

// Cancel button component
export function AlertDialogCancel({ 
  children,
  onPress,
  style
}: { 
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}) {
  const context = useContext(AlertDialogContext)
  
  const handlePress = () => {
    onPress?.()
    context?.setOpen(false)
  }

  const content = typeof children === 'string' ? (
    <Text style={styles.cancelButtonText}>{children}</Text>
  ) : children

  return (
    <Pressable 
      style={[styles.button, styles.cancelButton, style]} 
      onPress={handlePress}
    >
      {content}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: Dimensions.get('window').width * 0.85,
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#2196F3',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '500',
  },
}) 