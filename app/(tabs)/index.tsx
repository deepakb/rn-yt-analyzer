import { useState } from 'react'

import { ScrollView, Text, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Calendar,
  DateRange,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  GradientBackground,
  GradientPreset,
  GradientText,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Button from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast-action'

const items = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Documentation' },
  { href: '#', label: 'Building Your Application' },
  { href: '#', label: 'Data Fetching' },
  { label: 'Caching and Revalidating' },
]

const ITEMS_TO_DISPLAY = 3

// Add this helper component for color circles
function ColorCircle({
  gradient,
  label,
  isGradient = false,
}: {
  gradient: GradientPreset
  label: string
  isGradient?: boolean
}) {
  return (
    <View className="items-center">
      {isGradient ? (
        <GradientBackground
          gradient={gradient}
          className="w-16 h-16 rounded-full"
        />
      ) : (
        <View
          className={[
            'w-16 h-16 rounded-full',
            gradient === 'primary' && 'bg-primary',
            gradient === 'secondary' && 'bg-secondary',
            gradient === 'success' && 'bg-success',
            gradient === 'warning' && 'bg-warning',
            gradient === 'error' && 'bg-error',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      )}
      <Text className="text-body-xs font-inter-medium mt-2 text-text dark:text-text-dark">
        {label}
      </Text>
    </View>
  )
}

export default function DesignSystemShowcase() {
  const { isDark } = useTheme()
  const { toast } = useToast()

  // Single date selection
  const [date, setDate] = useState<Date>()
  // Range selection
  const [dateRange, setDateRange] = useState<DateRange>()
  // Multiple selection
  const [dates, setDates] = useState<Date[]>([])

  const handleDelete = () => {
    // Handle delete action
    console.log('Deleted')
  }

  // Add this function to test toast
  const showToast = () => {
    console.log('Showing toast...') // Debug log
    toast({
      title: "Test Toast",
      description: "This is a test toast message",
      duration: 3000,
      variant: "default",
    })
  }

  return (
    <ScrollView
      className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background'}`}
      contentContainerClassName="pb-32"
      showsVerticalScrollIndicator={true}
    >
      <View className="px-4 py-6">
        {/* Typography Section */}
        <SectionTitle>Typography</SectionTitle>
        <View className="space-y-4 mb-8">
          <GradientText gradient="primary" variant="display-2xl" weight="bold">
            2XL
          </GradientText>

          <GradientText
            gradient="secondary"
            variant="display-lg"
            weight="semibold"
          >
            LG
          </GradientText>

          <Text
            className={`text-body-lg font-inter-regular ${
              isDark ? 'text-text-dark' : 'text-text'
            }`}
          >
            Regular Body Text LG
          </Text>
        </View>

        {/* Gradients Section */}
        <SectionTitle>Gradients</SectionTitle>
        <View className="flex-row flex-wrap justify-between mb-8">
          <ColorCircle gradient="primary" label="Primary" isGradient />
          <ColorCircle gradient="secondary" label="Secondary" isGradient />
          <ColorCircle gradient="success" label="Success" isGradient />
          <ColorCircle gradient="warning" label="Warning" isGradient />
        </View>

        {/* Colors Section */}
        <SectionTitle>Colors</SectionTitle>
        <View className="flex-row flex-wrap justify-between mb-8">
          <ColorCircle gradient="primary" label="Primary" />
          <ColorCircle gradient="secondary" label="Secondary" />
          <ColorCircle gradient="success" label="Success" />
          <ColorCircle gradient="warning" label="Warning" />
          <ColorCircle gradient="error" label="Error" />
          <View className="h-16 bg-primary" />
        </View>

        {/* Button Section */}
        <SectionTitle>Button</SectionTitle>
        <View className="flex-row flex-wrap justify-between mb-8">
          <Button variant="destructive">
            <Ionicons name={'mail'} size={20} color="white" />
            Login with Email
          </Button>
        </View>

        {/* Avatar Section */}
        <SectionTitle>Avatar</SectionTitle>
        <View className="flex-row flex-wrap justify-between mb-8">
          <Avatar>
            <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
            <AvatarFallback initials="JD" />
          </Avatar>
        </View>

        {/* Accordion Section */}
        <SectionTitle>Accordion</SectionTitle>
        <View className="flex-row flex-wrap justify-between mb-8">
          <Accordion type="single" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                <Text className="text-body-sm text-text dark:text-text-dark">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </Text>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                <Text className="text-body-sm text-text dark:text-text-dark">
                  Yes. It comes with default styles that match your design
                  system.
                </Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </View>

        {/* Alert Section */}
        <SectionTitle>Alert</SectionTitle>
        <View className="space-y-4 mb-8">
          <Alert variant="destructive" icon="alert-circle">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>

          <Alert variant="success" icon="checkmark-circle">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your changes have been saved successfully.
            </AlertDescription>
          </Alert>
        </View>

        {/* Alert Dialog Section */}
        <SectionTitle>Alert Dialog</SectionTitle>
        <View className="space-y-4 mb-8">
          <AlertDialog>
            <AlertDialogTrigger>
              <Text style={{ color: 'red' }}>Delete Account</Text>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <Text>Delete Account?</Text>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <Text>
                    This will permanently delete your account. This action
                    cannot be undone.
                  </Text>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onPress={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </View>

        {/* Badge Section */}
        <SectionTitle>Badge</SectionTitle>
        <View className="flex-row flex-wrap justify-between mb-8">
          {/* Example usage */}
          <Badge variant="default">New</Badge>
          <Badge variant="secondary">In Progress</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="outline">Draft</Badge>

          {/* With custom className */}
          <Badge variant="default" className="bg-success">
            Success
          </Badge>
        </View>

        {/* Breadcrumb Section */}
        <SectionTitle>Breadcrumb</SectionTitle>
        <View className="flex-row flex-wrap justify-between mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </View>

        <SectionTitle>Responsive Breadcrumb</SectionTitle>
        <View className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={items[0].href}>
                  {items[0].label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              {items.length > ITEMS_TO_DISPLAY && (
                <>
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Text>...</Text>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {items.slice(1, -2).map((item, index) => (
                          <DropdownMenuItem
                            key={index}
                            onSelect={() =>
                              console.log(`Navigate to ${item.label}`)
                            }
                          >
                            <Text>{item.label}</Text>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}

              {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
                <BreadcrumbItem key={index}>
                  {item.href ? (
                    <>
                      <BreadcrumbLink href={item.href}>
                        <Text
                          numberOfLines={1}
                          className="max-w-20 md:max-w-none"
                        >
                          {item.label}
                        </Text>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  ) : (
                    <BreadcrumbPage>
                      <Text
                        numberOfLines={1}
                        className="max-w-20 md:max-w-none"
                      >
                        {item.label}
                      </Text>
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </View>

        {/* Sheet Section */}
        <SectionTitle>Sheet</SectionTitle>
        <View className="flex-row flex-wrap gap-4 mb-8">
          {/* Bottom Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Bottom Sheet</Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Bottom Sheet</SheetTitle>
                <SheetDescription>
                  This sheet slides up from the bottom
                </SheetDescription>
              </SheetHeader>
              <View className="py-4">
                <Text className="text-text dark:text-text-dark">
                  Add your content here
                </Text>
              </View>
              <SheetFooter>
                <Button onPress={() => {}}>Action</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Top Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Top Sheet</Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Top Sheet</SheetTitle>
                <SheetDescription>
                  This sheet slides down from the top
                </SheetDescription>
              </SheetHeader>
              <View className="py-4">
                <Text className="text-text dark:text-text-dark">
                  Add your content here
                </Text>
              </View>
              <SheetFooter>
                <Button onPress={() => {}}>Action</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Left Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Left Sheet</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Left Sheet</SheetTitle>
                <SheetDescription>
                  This sheet slides in from the left
                </SheetDescription>
              </SheetHeader>
              <View className="py-4">
                <Text className="text-text dark:text-text-dark">
                  Add your content here
                </Text>
              </View>
              <SheetFooter>
                <Button onPress={() => {}}>Action</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Right Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Right Sheet</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Right Sheet</SheetTitle>
                <SheetDescription>
                  This sheet slides in from the right
                </SheetDescription>
              </SheetHeader>
              <View className="py-4">
                <Text className="text-text dark:text-text-dark">
                  Add your content here
                </Text>
              </View>
              <SheetFooter>
                <Button onPress={() => {}}>Action</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </View>

        {/* Dropdown Menu Section */}
        <SectionTitle>Dropdown Menu</SectionTitle>
        <View className="flex-row flex-wrap justify-between mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Text>Options</Text>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                icon="copy-outline"
                onSelect={() => console.log('Copy')}
              >
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem
                icon="share-outline"
                onSelect={() => console.log('Share')}
              >
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                icon="trash-outline"
                onSelect={() => console.log('Delete')}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </View>

        <View className="h-16 bg-primary" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Text>Open</Text>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                icon="person-outline"
                onSelect={() => console.log('profile')}
              >
                <Text>Profile</Text>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem
                icon="card-outline"
                onSelect={() => console.log('billing')}
              >
                <Text>Billing</Text>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem
                icon="settings-outline"
                onSelect={() => console.log('settings')}
              >
                <Text>Settings</Text>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                icon="people-outline"
                onSelect={() => console.log('team')}
              >
                <Text>Team</Text>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger icon="person-add-outline">
                  <Text>Invite users</Text>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    icon="mail-outline"
                    onSelect={() => console.log('email')}
                  >
                    <Text>Email</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    icon="chatbox-outline"
                    onSelect={() => console.log('message')}
                  >
                    <Text>Message</Text>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              icon="log-out-outline"
              onSelect={() => console.log('logout')}
            >
              <Text className="text-destructive dark:text-destructive-dark">
                Log out
              </Text>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Toast Section */}
        <SectionTitle>Toast</SectionTitle>
        <View className="space-y-4 mb-8">
          {/* Simplified Toast Section for testing */}
          <Button
            variant="default"
            onPress={() => {
              console.log('Button pressed') // Debug log
              showToast()
            }}
          >
            <Text className="text-white">Show Test Toast</Text>
          </Button>
        </View>
      </View>

      {/* Calendar Section */}
      <SectionTitle>Calendar</SectionTitle>

      <SectionTitle>Single Date Selection</SectionTitle>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(date) => setDate(date as Date)}
      />

      <SectionTitle>Range Selection</SectionTitle>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={(range) => setDateRange(range as DateRange)}
      />

      <SectionTitle>Multiple Selection</SectionTitle>
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={(dates) => setDates(dates as Date[])}
      />
    </ScrollView>
  )
}

function SectionTitle({ children }: { children: string }) {
  const { isDark } = useTheme()

  return (
    <Text
      className={`text-2xl font-inter-bold mb-4 ${
        isDark ? 'text-text-dark' : 'text-text'
      }`}
    >
      {children}
    </Text>
  )
}
