import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { theme } from '../constants/theme'

export default function ScreenWrapper({ 
  children, 
  scrollable = true,
  padding = 'base',
  noPadding = false,
  withSafeArea = true 
}) {
  const paddingMap = {
    sm: theme.sizes.sm,
    md: theme.sizes.base,
    lg: theme.sizes.lg,
    xl: theme.sizes.xl,
  }

  const containerPadding = noPadding ? 0 : paddingMap[padding]

  const content = (
    <View style={[styles.container, { padding: containerPadding }]}>
      {children}
    </View>
  )

  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {withSafeArea ? <SafeAreaView>{content}</SafeAreaView> : content}
      </ScrollView>
    )
  }

  return withSafeArea ? (
    <SafeAreaView style={styles.scrollContainer}>{content}</SafeAreaView>
  ) : (
    content
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: theme.colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
})