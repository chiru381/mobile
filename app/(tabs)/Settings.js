import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, StyleSheet, Switch, Text, View } from 'react-native'
import AppButton from '../../components/AppButton'
import Card from '../../components/Card'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'

export default function Settings() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    notifications: true,
    appLock: true,
    autoBackup: false,
    darkMode: true,
    cloudsync: true,
  })

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  const settingsOptions = [
    {
      id: '1',
      title: 'Notification Settings',
      description: 'Manage push notifications',
      icon: 'notifications',
      onPress: () => router.push('/notification-settings'),
      type: 'screen',
    },
    {
      id: '2',
      title: 'Notifications',
      description: 'Enable or disable notifications',
      icon: 'notifications-outline',
      key: 'notifications',
      type: 'toggle',
    },
    {
      id: '3',
      title: 'App Lock',
      description: 'Enable app lock security',
      icon: 'lock-closed',
      key: 'appLock',
      onPress: () => router.push('/app-lock'),
      type: 'hybrid',
    },
    {
      id: '4',
      title: 'Auto Backup',
      description: 'Automatically backup your memories',
      icon: 'cloud-upload',
      key: 'autoBackup',
      type: 'toggle',
    },
    {
      id: '5',
      title: 'Dark Mode',
      description: 'Enable dark theme',
      icon: 'moon',
      key: 'darkMode',
      type: 'toggle',
    },
    {
      id: '6',
      title: 'Cloud Sync',
      description: 'Sync data across devices',
      icon: 'cloud',
      key: 'cloudsync',
      type: 'toggle',
    },
  ]

  const renderSettingItem = ({ item }) => (
    <Card
      padding="md"
      shadow="sm"
      style={styles.settingCard}
      onPress={item.type === 'screen' ? item.onPress : null}
    >
      <View style={styles.settingContent}>
        <View style={styles.settingLeft}>
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            <Text style={styles.settingDescription}>{item.description}</Text>
          </View>
        </View>
        {item.type === 'toggle' && (
          <Switch
            value={settings[item.key]}
            onValueChange={() => toggleSetting(item.key)}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor="#fff"
          />
        )}
        {item.type === 'screen' && (
          <Ionicons name="chevron-forward" size={24} color={theme.colors.subText} />
        )}
        {item.type === 'hybrid' && (
          <View style={styles.hybridControl}>
            <Switch
              value={settings[item.key]}
              onValueChange={() => toggleSetting(item.key)}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor="#fff"
            />
          </View>
        )}
      </View>
    </Card>
  )

  return (
    <ScreenWrapper scrollable padding="md">
      <Header title="Settings" subtitle="Manage your preferences" />

      {/* Settings List */}
      <FlatList
        data={settingsOptions}
        renderItem={renderSettingItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Danger Zone */}
      <View style={styles.dangerSection}>
        <Text style={styles.dangerTitle}>Danger Zone</Text>
        <AppButton
          title="Clear Cache"
          variant="danger"
          fullWidth
          size="sm"
          onPress={() => alert('Cache cleared')}
        />
        <AppButton
          title="Reset Settings"
          variant="danger"
          fullWidth
          size="sm"
          onPress={() => alert('Settings reset')}
        />
        <AppButton
          title="Logout"
          variant="danger"
          fullWidth
          onPress={() => router.replace('/(auth)/login')}
        />
      </View>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Memory App v1.0.0</Text>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: theme.sizes.base,
  },
  settingCard: {
    marginBottom: theme.sizes.sm,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
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
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: theme.sizes.base,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.sizes.xs,
  },
  settingDescription: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
  },
  hybridControl: {
    marginLeft: theme.sizes.base,
  },
  dangerSection: {
    marginTop: theme.sizes.xxl,
    marginBottom: theme.sizes.xl,
  },
  dangerTitle: {
    fontSize: theme.sizes.base,
    fontWeight: '700',
    color: theme.colors.error,
    marginBottom: theme.sizes.base,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: theme.sizes.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  versionText: {
    color: theme.colors.subText,
    fontSize: theme.sizes.sm,
  },
})