import { StyleSheet, View } from 'react-native'
import { theme } from '../constants/theme'

export default function Divider({ marginVertical = 'md', color = theme.colors.border }) {
  const marginMap = {
    sm: theme.sizes.sm,
    md: theme.sizes.base,
    lg: theme.sizes.lg,
    xl: theme.sizes.xl,
  }

  return (
    <View
      style={[
        styles.divider,
        {
          marginVertical: marginMap[marginVertical] || marginVertical,
          backgroundColor: color,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
  },
})
