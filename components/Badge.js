import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../constants/theme'

export default function Badge({ label, variant = 'primary', size = 'md' }) {
  const variants = {
    primary: { bg: theme.colors.primary, text: '#fff' },
    secondary: { bg: theme.colors.secondary, text: '#fff' },
    success: { bg: theme.colors.success, text: '#fff' },
    warning: { bg: theme.colors.warning, text: '#000' },
    error: { bg: theme.colors.error, text: '#fff' },
    info: { bg: theme.colors.info, text: '#fff' },
  }

  const sizes = {
    sm: { padding: theme.sizes.xs, fontSize: theme.sizes.xs },
    md: { padding: theme.sizes.sm, fontSize: theme.sizes.sm },
    lg: { padding: theme.sizes.sm, fontSize: theme.sizes.base },
  }

  const selectedVariant = variants[variant] || variants.primary
  const selectedSize = sizes[size] || sizes.md

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: selectedVariant.bg,
          paddingHorizontal: selectedSize.padding,
          paddingVertical: selectedSize.padding / 2,
        },
      ]}
    >
      <Text style={[styles.text, { color: selectedVariant.text, fontSize: selectedSize.fontSize }]}>
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: theme.sizes.radiusFull,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
})
