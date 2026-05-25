import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../constants/theme'

export default function ScreenWrapper({
  children,
  scrollable = true,
  padding = 'base',
  noPadding = false,
  withSafeArea = true,
}) {
  const paddingMap = {
    sm: theme.sizes.sm,
    md: theme.sizes.base,
    lg: theme.sizes.lg,
    xl: theme.sizes.xl,
  }

  const containerPadding = noPadding ? 0 : paddingMap[padding]

  const content = (
    <View
      style={[
        styles.container,
        {
          padding: containerPadding,
          paddingBottom: 100, // IMPORTANT
        },
      ]}
    >
      {children}
    </View>
  )

  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {content}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },

  scrollContainer: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
})