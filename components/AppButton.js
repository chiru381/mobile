import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { theme } from '../constants/theme'

export default function AppButton({ 
  title, 
  onPress, 
  loading = false, 
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon = null
}) {
  const variants = {
    primary: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.primary,
    },
    danger: {
      backgroundColor: theme.colors.error,
      borderColor: theme.colors.error,
    },
    success: {
      backgroundColor: theme.colors.success,
      borderColor: theme.colors.success,
    },
  }

  const sizes = {
    sm: { paddingVertical: 10, paddingHorizontal: 16, fontSize: theme.sizes.sm },
    md: { paddingVertical: 14, paddingHorizontal: 24, fontSize: theme.sizes.base },
    lg: { paddingVertical: 18, paddingHorizontal: 32, fontSize: theme.sizes.h5 },
  }

  const selectedVariant = variants[variant] || variants.primary
  const selectedSize = sizes[size] || sizes.md

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        selectedVariant,
        selectedSize,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            {icon}
            <Text
              style={[
                styles.txt,
                variant === 'secondary' && styles.secondaryTxt,
                { fontSize: selectedSize.fontSize },
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: theme.sizes.radiusMd,
    borderWidth: 1,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
    ...theme.shadows.sm,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  txt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  secondaryTxt: {
    color: theme.colors.primary,
  },
})