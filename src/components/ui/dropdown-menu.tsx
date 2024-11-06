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
          style={[
            {
              position: 'absolute',
              ...getOptimalPosition(),
              ...getOptimalWidth(),
              zIndex: 1,
            },
          ]}
          className={`
            rounded-md shadow-lg overflow-visible
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
  const triggerRef = React.useRef<View>(null)

  const handlePress = () => {
    if (!context || !triggerRef.current) return

    // Log for debugging
    console.log('SubMenu Trigger Pressed')

    triggerRef.current.measureInWindow((x, y, width, height) => {
      // Log measurements
      console.log('Measurements:', { x, y, width, height })

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
    <Pressable
      ref={triggerRef}
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

  if (!context?.isOpen || !context?.position) return null

  const position = context.position

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setContentSize({ width, height })
  }

  const getOptimalDimensions = () => {
    const minWidth = 220
    const padding = 8

    // Calculate available space
    const spaceOnRight = screenWidth - (position.x + position.width)

    // Determine horizontal position
    const left =
      spaceOnRight >= minWidth
        ? position.x + position.width + padding // Show on right
        : position.x - minWidth - padding // Show on left

    // Calculate vertical position
    let top = position.y

    // Adjust if would go off bottom of screen
    if (contentSize && top + contentSize.height > screenHeight - padding) {
      top = screenHeight - contentSize.height - padding
    }

    return {
      position: 'absolute' as const,
      left: Math.max(padding, Math.min(left, screenWidth - minWidth - padding)),
      top: Math.max(padding, top),
      minWidth,
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      elevation: 5,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      zIndex: 2000,
    }
  }

  return (
    <Modal transparent visible={context.isOpen} animationType="none">
      <Pressable style={{ flex: 1 }} onPress={() => context.setIsOpen(false)}>
        <View
          style={getOptimalDimensions()}
          onLayout={handleLayout}
          className={`
            rounded-md overflow-hidden
            border border-border dark:border-border-dark
          `}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="p-1">{children}</View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  )
}
