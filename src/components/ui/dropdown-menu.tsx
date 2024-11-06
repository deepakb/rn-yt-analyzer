import * as React from "react"
import { View, Text, Pressable, Modal, Dimensions, PressableProps, GestureResponderEvent, LayoutChangeEvent } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@/contexts/ThemeContext"

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

const DropdownMenuContext = React.createContext<DropdownMenuContextType | null>(null)

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState<string>()
  const [triggerPosition, setTriggerPosition] = React.useState<Position | null>(null)

  const contextValue = React.useMemo(() => ({
    open,
    setOpen,
    triggerPosition,
    setTriggerPosition,
    selectedValue,
    setSelectedValue,
  }), [open, triggerPosition, selectedValue])

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

export const DropdownMenuTrigger = React.forwardRef<View, DropdownMenuTriggerProps>(
  ({ children, asChild }, ref) => {
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
            }
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
  }
)

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
  const [contentSize, setContentSize] = React.useState<ContentMeasurements | null>(null)
  
  if (!context?.open || !context?.triggerPosition) return null
  
  const triggerPosition = context.triggerPosition

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setContentSize({ width, height })
  }

  // Calculate the optimal width
  const getOptimalWidth = () => {
    if (!contentSize) {
      return { minWidth: triggerPosition.width }
    }
    
    const minWidth = Math.max(triggerPosition.width, contentSize.width)
    const maxWidth = Math.min(minWidth, screenWidth - 32) // 32px padding from screen edges
    
    return {
      width: maxWidth,
      minWidth: triggerPosition.width,
    }
  }

  // Calculate optimal position
  const getOptimalPosition = () => {
    const leftPosition = Math.max(16, Math.min(
      triggerPosition.pageX,
      screenWidth - (contentSize?.width || triggerPosition.width) - 16
    ))

    const topPosition = triggerPosition.pageY + triggerPosition.height + 4

    return {
      left: leftPosition,
      top: topPosition,
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
            }
          ]}
          className={`
            rounded-md p-1 shadow-lg overflow-hidden
            ${isDark ? 'bg-surface-dark' : 'bg-surface'}
            border border-border dark:border-border-dark
            ${className}
          `}
        >
          <View onLayout={handleLayout}>
            {children}
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
        px-3 py-2 rounded-sm
        ${isDark ? 'active:bg-muted-dark' : 'active:bg-muted'}
        ${className}
      `}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color={isDark ? '#E5E7EB' : '#374151'}
        />
      )}
      {typeof children === 'string' ? (
        <Text className={`flex-1 ${isDark ? 'text-text-dark' : 'text-text'}`}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

export function DropdownMenuLabel({
  children,
  inset,
}: {
  children: React.ReactNode
  inset?: boolean
}) {
  const { isDark } = useTheme()
  
  return (
    <Text className={`
      px-2 py-1.5 text-sm font-semibold
      ${inset ? 'pl-8' : ''}
      ${isDark ? 'text-text-dark' : 'text-text'}
    `}>
      {children}
    </Text>
  )
}

export function DropdownMenuSeparator() {
  const { isDark } = useTheme()
  
  return (
    <View className={`
      h-px mx-[-4px] my-1
      ${isDark ? 'bg-border-dark' : 'bg-border'}
    `} />
  )
}

export function DropdownMenuShortcut({
  children,
}: {
  children: string
}) {
  const { isDark } = useTheme()
  
  return (
    <Text className={`
      ml-auto text-xs opacity-60
      ${isDark ? 'text-text-dark' : 'text-text'}
    `}>
      {children}
    </Text>
  )
}

export function DropdownMenuGroup({
  children,
}: {
  children: React.ReactNode
}) {
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
  
  const contextValue = React.useMemo(() => ({
    isOpen,
    setIsOpen,
    position,
    setPosition,
  }), [isOpen, position])
  
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
    if (!context) {
      throw new Error('DropdownMenuSubTrigger must be used within DropdownMenuSub')
    }
    
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      // Add a small offset to align with the trigger
      const offset = 4
      context.setPosition({ 
        x: x + offset,
        y: y - offset,
        width,
        height
      })
      context.setIsOpen(true)
    })
  }

  if (!context) return null

  return (
    <View ref={triggerRef}>
      <Pressable
        onPress={handlePress}
        className={`
          flex-row items-center gap-2
          px-2 py-1.5 rounded-sm
          ${isDark ? 'active:bg-muted-dark' : 'active:bg-muted'}
        `}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={16}
            color={isDark ? '#E5E7EB' : '#374151'}
          />
        )}
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
          style={{ marginLeft: 'auto' }}
        />
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
  const [contentSize, setContentSize] = React.useState<ContentMeasurements | null>(null)
  
  if (!context?.isOpen || !context?.position) return null
  
  const position = context.position

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setContentSize({ width, height })
  }

  // Calculate optimal position and size
  const getOptimalPosition = () => {
    if (!contentSize) return { left: position.x + position.width }

    const spaceOnRight = screenWidth - (position.x + position.width)
    const spaceOnLeft = position.x
    const shouldOpenOnLeft = spaceOnRight < contentSize.width && spaceOnLeft > contentSize.width

    // Calculate horizontal position
    const horizontalPosition = shouldOpenOnLeft
      ? { right: screenWidth - position.x + 4 }
      : { left: position.x + position.width - 4 }

    // Calculate vertical position
    const spaceBelow = screenHeight - position.y
    const spaceAbove = position.y
    const shouldOpenUpward = spaceBelow < contentSize.height && spaceAbove > contentSize.height

    const verticalPosition = shouldOpenUpward
      ? { bottom: screenHeight - position.y }
      : { top: position.y }

    return {
      ...horizontalPosition,
      ...verticalPosition,
      maxWidth: Math.min(
        contentSize.width + 32, // Add some padding
        shouldOpenOnLeft ? position.x - 16 : spaceOnRight - 16
      ),
    }
  }

  return (
    <Modal transparent visible={context.isOpen} animationType="fade">
      <Pressable
        className="flex-1 bg-black/50"
        onPress={() => context.setIsOpen(false)}
      >
        <View
          style={[
            {
              position: 'absolute',
              ...getOptimalPosition(),
            }
          ]}
          className={`
            rounded-md p-1 shadow-lg overflow-hidden
            ${isDark ? 'bg-surface-dark' : 'bg-surface'}
            border border-border dark:border-border-dark
          `}
        >
          <View onLayout={handleLayout}>
            {children}
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}