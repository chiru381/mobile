import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { theme } from '../constants/theme'

export default function ScrollToTopButton({
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Ionicons
        name="arrow-up"
        size={24}
        color="#fff"
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    bottom: 30,
    right: 20,

    width: 55,
    height: 55,

    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor:
      theme.colors.primary,

    ...theme.shadows.lg,
  },
})