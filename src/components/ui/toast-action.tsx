import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ToastActionProps extends TouchableOpacityProps {
  altText?: string
  children: React.ReactNode
}

export function ToastAction({ 
  altText, 
  children, 
  className = "", 
  ...props 
}: ToastActionProps) {
  return (
    <TouchableOpacity
      className={`
        bg-transparent px-3 py-2 rounded-md
        border border-gray-200 dark:border-gray-700
        active:bg-gray-100 dark:active:bg-gray-800
        ${className}
      `}
      accessibilityLabel={altText}
      {...props}
    >
      <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {children}
      </Text>
    </TouchableOpacity>
  )
} 