import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, StyleSheet, Switch, Text, View } from 'react-native'
import Card from '../components/Card'
import Divider from '../components/Divider'
import Header from '../components/Header'
import ScreenWrapper from '../components/ScreenWrapper'
import { theme } from '../constants/theme'

export default function NotificationSettings() {
  const router = useRouter()

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    uploadReminders: true,
    moodReminders: true,
    backupNotifications: true,
    shareNotifications: true,
    holidayReminders: false,
    birthdayReminders: true,
  })

  const toggleNotification = (key) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const notificationOptions = [
    {
      id: '1',
      title: 'Push Notifications',
      description: 'Receive push notifications on your device',
      icon: 'notifications',
      key: 'pushNotifications',
    },
    {
      id: '2',
      title: 'Email Notifications',
      description: 'Receive email updates and summaries',
      icon: 'mail',
      key: 'emailNotifications',
    },
    {
      id: '3',
      title: 'Upload Reminders',
      description: 'Remind you to upload photos and videos',
      icon: 'cloud-upload',
      key: 'uploadReminders',
    },
    {
      id: '4',
      title: 'Mood Check-in',
      description: 'Daily mood tracker reminders',
      icon: 'happy',
      key: 'moodReminders',
    },
    {
      id: '5',
      title: 'Backup Notifications',
      description: 'Get notified about backup status',
      icon: 'cloud',
      key: 'backupNotifications',
    },
    {
      id: '6',
      title: 'Share Notifications',
      description: 'When people share content with you',
      icon: 'share-social',
      key: 'shareNotifications',
    },
    {
      id: '7',
      title: 'Holiday Reminders',
      description: 'Reminders for upcoming holidays',
      icon: 'gift',
      key: 'holidayReminders',
    },
    {
      id: '8',
      title: 'Birthday Reminders',
      description: 'Reminders for birthdays and anniversaries',
      icon: 'cake',
      key: 'birthdayReminders',
    },
  ]

  const renderNotificationOption = ({ item }) => (
    <Card padding="md" shadow="sm" style={styles.notificationCard}>
      <View style={styles.notificationContent}>
        <View style={styles.notificationLeft}>
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={22} color={theme.colors.primary} />
          </View>

          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDescription}>
              {item.description}
            </Text>
          </View>
        </View>

        <Switch
          value={notificationSettings[item.key]}
          onValueChange={() => toggleNotification(item.key)}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor="#fff"
        />
      </View>
    </Card>
  )

  return (
    <ScreenWrapper scrollable padding="md">
      <Header
        title="Notification Settings"
        subtitle="Manage your notifications"
        showBack
        onBackPress={() => router.back()}
      />

      {/* Info Card */}
      <Card padding="lg" shadow="md" style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons
            name="information-circle"
            size={24}
            color={theme.colors.info}
          />
          <Text style={styles.infoText}>
            Customize which notifications you want to receive
          </Text>
        </View>
      </Card>

      {/* Notification Options */}
      <FlatList
        data={notificationOptions}
        renderItem={renderNotificationOption}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Quiet Hours */}
      <Card padding="lg" shadow="md" style={styles.scheduleCard}>
        <Text style={styles.cardTitle}>Quiet Hours</Text>

        <Divider marginVertical="base" />

        <View style={styles.scheduleItem}>
          <Text style={styles.scheduleLabel}>Do Not Disturb</Text>
          <Text style={styles.scheduleTime}>10:00 PM - 8:00 AM</Text>
        </View>

        <Divider marginVertical="base" />

        <Text style={styles.scheduleNote}>
          Notifications will be silenced during quiet hours
        </Text>
      </Card>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  infoCard: {
    marginBottom: theme.sizes.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: theme.sizes.base,
    fontSize: theme.sizes.base,
    color: theme.colors.info,
    flex: 1,
  },
  listContent: {
    paddingVertical: theme.sizes.base,
    marginBottom: theme.sizes.lg,
  },
  notificationCard: {
    marginBottom: theme.sizes.sm,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: theme.sizes.radiusMd,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.sizes.base,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: theme.sizes.base,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.sizes.xs,
  },
  notificationDescription: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
  },
  scheduleCard: {
    marginBottom: theme.sizes.xxl,
  },
  cardTitle: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.sizes.base,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.sizes.sm,
  },
  scheduleLabel: {
    fontSize: theme.sizes.base,
    color: theme.colors.text,
    fontWeight: '500',
  },
  scheduleTime: {
    fontSize: theme.sizes.base,
    color: theme.colors.secondary,
    fontWeight: '600',
  },
  scheduleNote: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
    fontStyle: 'italic',
  },
})