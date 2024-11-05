import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Avatar, AvatarFallback, AvatarImage, GradientBackground, GradientPreset, GradientText } from '@/components/ui';
import Button from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Add this helper component for color circles
function ColorCircle({ 
  gradient, 
  label, 
  isGradient = false 
}: { 
  gradient: GradientPreset, 
  label: string, 
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
            gradient === 'success' && 'bg-success',
            gradient === 'warning' && 'bg-warning',
            gradient === 'error' && 'bg-error',
          ].filter(Boolean).join(' ')}
        />
      )}
      <Text className="text-body-xs font-inter-medium mt-2 text-text dark:text-text-dark">
        {label}
      </Text>
    </View>
  );
}

export default function DesignSystemShowcase() {
  const { isDark } = useTheme();

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
          <GradientText 
            gradient="primary"
            variant="display-2xl"
            weight="bold"
          >
            2XL
          </GradientText>
          
          <GradientText 
            gradient="secondary"
            variant="display-lg"
            weight="semibold"
          >
            LG
          </GradientText>

          <Text className={`text-body-lg font-inter-regular ${
            isDark ? 'text-text-dark' : 'text-text'
          }`}>
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
          <ColorCircle gradient="success" label="Success" />
          <ColorCircle gradient="warning" label="Warning" />
          <ColorCircle gradient="error" label="Error" />
          <View className="h-16 bg-primary" />
        </View>

        {/* Button Section */}
        <SectionTitle>Button</SectionTitle>
        <View className="flex-row flex-wrap justify-between mb-8">
          <Button variant="destructive">
          <Ionicons
              name={"mail"}
              size={20}
              color="white"
            />
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
              <AccordionTrigger>
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent>
                <Text className="text-body-sm text-text dark:text-text-dark">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </Text>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Is it styled?
              </AccordionTrigger>
              <AccordionContent>
                <Text className="text-body-sm text-text dark:text-text-dark">
                  Yes. It comes with default styles that match your design system.
                </Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </View>

        
      </View>
    </ScrollView>
  );
}

function SectionTitle({ children }: { children: string }) {
  const { isDark } = useTheme();
  
  return (
    <Text className={`text-2xl font-inter-bold mb-4 ${
      isDark ? 'text-text-dark' : 'text-text'
    }`}>
      {children}
    </Text>
  );
}