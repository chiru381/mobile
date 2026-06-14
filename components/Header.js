import { Ionicons } from '@expo/vector-icons'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { theme } from '../constants/theme'

export default function Header({
  title,
  subtitle,
  onBackPress,
  rightIcon = null,
  onRightPress = null,
  showBack = false,
}) {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {title}
          </Text>

          {subtitle && (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightIcon && (
        <TouchableOpacity
          onPress={onRightPress}
          activeOpacity={0.8}
          style={styles.profileButton}
        >
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,

    backgroundColor: theme.colors.bgLight,

    borderBottomWidth: 1,
    borderBottomColor:
      theme.colors.border,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  backButton: {
    marginRight: 10,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    color: theme.colors.text,
  },

  subtitle: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
    marginTop: 2,
  },

  profileButton: {
    padding: 2,
  },
})