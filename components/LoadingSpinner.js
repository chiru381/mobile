import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { theme } from '../constants/theme'

export default function LoadingSpinner({ size = 'large', color = theme.colors.primary }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.bg,
  },
})
