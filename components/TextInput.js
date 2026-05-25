import { StyleSheet, Text, TextInput, View } from 'react-native'
import { theme } from '../constants/theme'

export default function AppTextInput({
  placeholder,
  value,
  onChangeText,
  label,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  editable = true,
  multiline = false,
  numberOfLines = 1,
  icon = null,
  onIconPress = null,
}) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          error && styles.inputError,
          !editable && styles.disabled,
        ]}
      >
        {icon && <View style={styles.iconLeft}>{icon}</View>}
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
            icon && styles.inputWithIcon,
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.subText}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {onIconPress && (
          <View style={styles.iconRight} onTouchEnd={onIconPress}>
            {/* Icon can be rendered here */}
          </View>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.sizes.md,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.sizes.base,
    fontWeight: '600',
    marginBottom: theme.sizes.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.bgLight,
    borderRadius: theme.sizes.radiusMd,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.sizes.base,
    ...theme.shadows.sm,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.sizes.base,
    paddingVertical: theme.sizes.base,
    paddingHorizontal: theme.sizes.sm,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    marginLeft: -theme.sizes.sm,
  },
  iconLeft: {
    marginRight: theme.sizes.sm,
  },
  iconRight: {
    padding: theme.sizes.sm,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: theme.colors.bg,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.sizes.sm,
    marginTop: theme.sizes.xs,
    marginLeft: theme.sizes.sm,
  },
})
