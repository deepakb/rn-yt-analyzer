import { View, StyleSheet } from "react-native"

import { useToast } from "@/hooks/use-toast"
import { Toast } from "./toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <View style={styles.container}>
      {toasts.map(({ id, ...props }) => (
        <Toast key={id} {...props} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
    zIndex: 999,
  },
}) 