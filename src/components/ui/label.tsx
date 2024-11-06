import * as React from 'react'

import { Text } from 'react-native'

import { cn } from '../../lib/utils'

export interface LabelProps {
  children?: React.ReactNode
  className?: string
}

const Label = React.forwardRef<Text, LabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className
        )}
        {...props}
      >
        {children}
      </Text>
    )
  }
)

Label.displayName = 'Label'

export { Label }
