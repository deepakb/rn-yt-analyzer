import * as React from 'react'

import {
  Dimensions,
  GestureResponderEvent,
  LayoutChangeEvent,
  Modal,
  Pressable,
  PressableProps,
  Text,
  View,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { useTheme } from '@/contexts/ThemeContext'

type Position = {
  pageX: number
  pageY: number
  width: number
  height: number
}

type DropdownMenuContextType = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerPosition: Position | null
  setTriggerPosition: (position: Position | null) => void
  selectedValue?: string
  setSelectedValue: (value: string) => void
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType | null>(
  null
)

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState<string>()
  const [triggerPosition, setTriggerPosition] = React.useState<Position | null>(
    null
  )

  const contextValue = React.useMemo(
    () => ({
      open,
      setOpen,
      triggerPosition,
      setTriggerPosition,
      selectedValue,
      setSelectedValue,
    }),
    [open, triggerPosition, selectedValue]
  )

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

type DropdownMenuTriggerProps = {
  children: React.ReactElement<PressableProps>
  asChild?: boolean
}

export const DropdownMenuTrigger = React.forwardRef<
  View,
  DropdownMenuTriggerProps
>(({ children, asChild }, ref) => {
  const context = React.useContext(DropdownMenuContext)
  const { isDark } = useTheme()
  if (!context) {
    throw new Error('DropdownMenuTrigger must be used within DropdownMenu')
  }

  const triggerRef = (ref || React.useRef<View>()) as React.RefObject<View>

  const handlePress = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      context.setTriggerPosition({ pageX: x, pageY: y, width, height })
      context.setOpen(true)
    })
  }

  if (asChild && React.isValidElement(children)) {
    return (
      <View ref={triggerRef}>
        {React.cloneElement(children, {
          onPress: (e: GestureResponderEvent) => {
            handlePress()
            // Call the original onPress if it exists
            if (children.props.onPress) {
              children.props.onPress(e)
            }
          },
        } as PressableProps)}
      </View>
    )
  }

  return (
    <View ref={triggerRef}>
      <Pressable
        onPress={handlePress}
        className={`
            flex-row items-center justify-between
            px-3 py-2 rounded-md
            border border-border dark:border-border-dark
            ${isDark ? 'bg-surface-dark' : 'bg-surface'}
          `}
      >
        {typeof children === 'string' ? (
          <Text className={isDark ? 'text-text-dark' : 'text-text'}>
            {children}
          </Text>
        ) : (
          children
        )}
        <Ionicons
          name="chevron-down"
          size={16}
          color={isDark ? '#E5E7EB' : '#374151'}
        />
      </Pressable>
    </View>
  )
})

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

type ContentMeasurements = {
  width: number
  height: number
}

export function DropdownMenuContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const context = React.useContext(DropdownMenuContext)
  const { isDark } = useTheme()
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
  const [contentSize, setContentSize] =
    React.useState<ContentMeasurements | null>(null)
  const [childrenWidth, setChildrenWidth] = React.useState<number>(0)
  const contentRef = React.useRef<View>(null)

  if (!context?.open || !context?.triggerPosition) return null

  const triggerPosition = context.triggerPosition

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setContentSize({ width, height })
  }

  const handleChildrenLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setChildrenWidth(width)
  }

  // Calculate optimal width including padding and content
  const getOptimalWidth = () => {
    // Horizontal padding for the content
    const horizontalPadding = 32

    // Calculate minimum width based on trigger and content
    const minContentWidth = Math.max(
      triggerPosition.width,
      childrenWidth + horizontalPadding
    )

    // Ensure width doesn't exceed screen bounds
    const maxAvailableWidth = screenWidth - 32 // 16px padding on each side

    return {
      width: Math.min(minContentWidth, maxAvailableWidth),
      minWidth: triggerPosition.width,
    }
  }

  // Calculate optimal position
  const getOptimalPosition = () => {
    if (!contentSize)
      return { top: triggerPosition.pageY + triggerPosition.height + 4 }

    const spaceBelow =
      screenHeight - (triggerPosition.pageY + triggerPosition.height)
    const spaceAbove = triggerPosition.pageY
    const padding = 16
    const requiredSpace = contentSize.height + padding

    // Determine vertical position
    let verticalPosition
    if (spaceBelow >= requiredSpace) {
      verticalPosition = {
        top: triggerPosition.pageY + triggerPosition.height + 4,
        maxHeight: spaceBelow - padding,
      }
    } else if (spaceAbove >= requiredSpace) {
      verticalPosition = {
        bottom: screenHeight - triggerPosition.pageY + 4,
        maxHeight: spaceAbove - padding,
      }
    } else {
      verticalPosition = {
        top: triggerPosition.pageY + triggerPosition.height + 4,
        maxHeight: spaceBelow - padding,
      }
    }

    // Calculate horizontal position
    const { width: optimalWidth } = getOptimalWidth()
    const horizontalPosition = {
      left: Math.max(
        16,
        Math.min(triggerPosition.pageX, screenWidth - optimalWidth - 16)
      ),
    }

    return {
      ...horizontalPosition,
      ...verticalPosition,
    }
  }

  return (
    <Modal transparent visible={context.open} animationType="fade">
      <Pressable
        className="flex-1 bg-black/50"
        onPress={() => context.setOpen(false)}
      >
        <View
          ref={contentRef}
          style={[
            {
              position: 'absolute',
              ...getOptimalPosition(),
              ...getOptimalWidth(),
            },
          ]}
          className={`
            rounded-md shadow-lg overflow-hidden
            ${isDark ? 'bg-surface-dark' : 'bg-surface'}
            border border-border dark:border-border-dark
            ${className}
          `}
        >
          <View onLayout={handleLayout} className="p-1">
            <View onLayout={handleChildrenLayout}>{children}</View>
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}

export function DropdownMenuItem({
  children,
  icon,
  onSelect,
  className = '',
}: {
  children: React.ReactNode
  icon?: keyof typeof Ionicons.glyphMap
  onSelect?: () => void
  className?: string
}) {
  const { isDark } = useTheme()
  const context = React.useContext(DropdownMenuContext)

  return (
    <Pressable
      onPress={() => {
        onSelect?.()
        context?.setOpen(false)
      }}
      className={`
        flex-row items-center gap-2
        px-3 py-2 rounded-sm min-h-[40px]
        ${isDark ? 'active:bg-muted-dark' : 'active:bg-muted'}
        ${className}
      `}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color={isDark ? '#E5E7EB' : '#374151'}
          style={{ marginRight: 8 }}
        />
      )}
      <View className="flex-1 flex-row items-center">
        {typeof children === 'string' ? (
          <Text className={`flex-1 ${isDark ? 'text-text-dark' : 'text-text'}`}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </Pressable>
  )
}

export function DropdownMenuLabel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const { isDark } = useTheme()

  return (
    <View className={`px-3 py-2 ${className}`}>
      <Text
        className={`
        text-sm font-medium
        ${isDark ? 'text-text-dark' : 'text-text'}
      `}
      >
        {children}
      </Text>
    </View>
  )
}

export function DropdownMenuSeparator() {
  const { isDark } = useTheme()

  return (
    <View
      className={`
      h-px mx-[-4px] my-1
      ${isDark ? 'bg-border-dark' : 'bg-border'}
    `}
    />
  )
}

export function DropdownMenuShortcut({ children }: { children: string }) {
  const { isDark } = useTheme()

  return (
    <Text
      className={`
      ml-auto text-xs opacity-60
      ${isDark ? 'text-text-dark' : 'text-text'}
    `}
    >
      {children}
    </Text>
  )
}

export function DropdownMenuGroup({ children }: { children: React.ReactNode }) {
  return <View className="py-1">{children}</View>
}

// Sub-menu components
type SubMenuPosition = {
  x: number
  y: number
  width: number
  height: number
}

type SubMenuContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  position: SubMenuPosition | null
  setPosition: (position: SubMenuPosition | null) => void
}

const SubMenuContext = React.createContext<SubMenuContextType | null>(null)

export function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [position, setPosition] = React.useState<SubMenuPosition | null>(null)

  const contextValue = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      position,
      setPosition,
    }),
    [isOpen, position]
  )

  return (
    <SubMenuContext.Provider value={contextValue}>
      {children}
    </SubMenuContext.Provider>
  )
}

export function DropdownMenuSubTrigger({
  children,
  icon,
}: {
  children: React.ReactNode
  icon?: keyof typeof Ionicons.glyphMap
}) {
  const { isDark } = useTheme()
  const context = React.useContext(SubMenuContext)
  const dropdownContext = React.useContext(DropdownMenuContext)
  const triggerRef = React.useRef<View>(null)

  const handlePress = (e: GestureResponderEvent) => {
    e.stopPropagation()
    if (!context || !triggerRef.current) return

    triggerRef.current.measureInWindow((x, y, width, height) => {
      context.setPosition({
        x,
        y,
        width,
        height,
      })
      context.setIsOpen(true)
    })
  }

  return (
    <View ref={triggerRef}>
      <Pressable
        onPress={handlePress}
        className={`
          flex-row items-center gap-2
          px-3 py-2 rounded-sm min-h-[40px]
          ${isDark ? 'active:bg-muted-dark' : 'active:bg-muted'}
        `}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={16}
            color={isDark ? '#E5E7EB' : '#374151'}
            style={{ marginRight: 8 }}
          />
        )}
        <View className="flex-1 flex-row items-center justify-between">
          {typeof children === 'string' ? (
            <Text className={isDark ? 'text-text-dark' : 'text-text'}>
              {children}
            </Text>
          ) : (
            children
          )}
          <Ionicons
            name="chevron-forward"
            size={16}
            color={isDark ? '#E5E7EB' : '#374151'}
          />
        </View>
      </Pressable>
    </View>
  )
}

export function DropdownMenuSubContent({
  children,
}: {
  children: React.ReactNode
}) {
  const context = React.useContext(SubMenuContext)
  const { isDark } = useTheme()
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
  const [contentSize, setContentSize] =
    React.useState<ContentMeasurements | null>(null)
  const [childrenWidth, setChildrenWidth] = React.useState<number>(0)

  if (!context?.isOpen || !context?.position) return null

  const position = context.position

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setContentSize({ width, height })
  }

  const handleChildrenLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setChildrenWidth(width)
  }

  // Calculate optimal width and position
  const getOptimalDimensions = () => {
    if (!contentSize)
      return {
        left: position.x + position.width,
        top: position.y,
        minWidth: 220,
      }

    // Add padding for content
    const horizontalPadding = 32
    const minWidth = Math.max(220, childrenWidth + horizontalPadding)

    // Calculate available space
    const spaceOnRight = screenWidth - (position.x + position.width)
    const spaceOnLeft = position.x
    const spaceBelow = screenHeight - position.y
    const spaceAbove = position.y

    // Determine horizontal position
    let horizontalPosition
    if (spaceOnRight >= minWidth) {
      // Show on right (preferred)
      horizontalPosition = {
        left: position.x + position.width - 4,
      }
    } else if (spaceOnLeft >= minWidth) {
      // Show on left
      horizontalPosition = {
        right: screenWidth - position.x + 4,
      }
    } else {
      // Not enough space either side, show on right with scroll
      horizontalPosition = {
        left: position.x + position.width - 4,
        maxWidth: spaceOnRight - 16,
      }
    }

    // Determine vertical position
    let verticalPosition
    if (spaceBelow >= contentSize.height) {
      // Show below (preferred)
      verticalPosition = {
        top: position.y,
      }
    } else if (spaceAbove >= contentSize.height) {
      // Show above
      verticalPosition = {
        bottom: screenHeight - position.y,
      }
    } else {
      // Not enough space either way, show below with scroll
      verticalPosition = {
        top: position.y,
        maxHeight: spaceBelow - 16,
      }
    }

    return {
      ...horizontalPosition,
      ...verticalPosition,
      width: minWidth,
      minWidth: 220,
    }
  }

  return (
    <Modal transparent visible={context.isOpen} animationType="fade">
      <Pressable
        className="flex-1 bg-transparent"
        onPress={(e) => {
          e.stopPropagation()
          context.setIsOpen(false)
        }}
      >
        <View
          style={[
            {
              position: 'absolute',
              ...getOptimalDimensions(),
            },
          ]}
          className={`
            rounded-md shadow-lg overflow-hidden
            ${isDark ? 'bg-surface-dark' : 'bg-surface'}
            border border-border dark:border-border-dark
          `}
        >
          <View onLayout={handleLayout} className="p-1">
            <View onLayout={handleChildrenLayout}>{children}</View>
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}
