import { View } from "react-native"

import { useToast } from "@/hooks/use-toast"
import { Toast } from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <View className="relative">
      {toasts.map(({ id, ...props }) => (
        <Toast key={id} {...props} />
      ))}
    </View>
  )
} 