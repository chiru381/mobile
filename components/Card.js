import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { theme } from '../constants/theme'

export default function Card({
  children,
  style,
  onPress,
  shadow = 'md',
  padding = 'md',
  borderRadius = 'md',
}) {
  const paddingMap = {
    sm: theme.sizes.sm,
    md: theme.sizes.base,
    lg: theme.sizes.lg,
    xl: theme.sizes.xl,
  }

  const borderRadiusMap = {
    sm: theme.sizes.radiusSm,
    md: theme.sizes.radiusMd,
    lg: theme.sizes.radiusLg,
    xl: theme.sizes.radiusXl,
  }

  const Component = onPress ? TouchableOpacity : View

  return (
    <Component
      style={[
        styles.card,
        { padding: paddingMap[padding], borderRadius: borderRadiusMap[borderRadius] },
        shadow && theme.shadows[shadow],
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </Component>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginVertical: theme.sizes.sm,
  },
})
