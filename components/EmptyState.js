import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../constants/theme'

export default function EmptyState({ 
  icon = 'inbox-outline', 
  title = 'No Data', 
  message = 'Nothing to show here',
  action = null 
}) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={theme.colors.subText} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {action && <View style={styles.actionContainer}>{action}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.sizes.lg,
    paddingVertical: theme.sizes.xxl,
  },
  title: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: theme.sizes.lg,
    marginBottom: theme.sizes.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: theme.sizes.base,
    color: theme.colors.subText,
    textAlign: 'center',
    marginBottom: theme.sizes.lg,
  },
  actionContainer: {
    marginTop: theme.sizes.lg,
    width: '100%',
  },
})
