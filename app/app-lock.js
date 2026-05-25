import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import AppButton from '../components/AppButton'
import Card from '../components/Card'
import Divider from '../components/Divider'
import Header from '../components/Header'
import ScreenWrapper from '../components/ScreenWrapper'
import AppTextInput from '../components/TextInput'
import { theme } from '../constants/theme'

export default function AppLock() {
  const router = useRouter()

  const [appLockSettings, setAppLockSettings] = useState({
    enabled: true,
    method: 'pin',
    pin: '1234',
    biometricEnabled: true,
  })

  const [showPinForm, setShowPinForm] = useState(false)
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')

  const handleToggleAppLock = () => {
    setAppLockSettings((prev) => ({
      ...prev,
      enabled: !prev.enabled,
    }))
  }

  const handleChangeLockMethod = (method) => {
    setAppLockSettings((prev) => ({
      ...prev,
      method,
    }))
  }

  const handleSetPin = () => {
    if (newPin === confirmPin && newPin.length === 4) {
      setAppLockSettings((prev) => ({
        ...prev,
        pin: newPin,
      }))

      setShowPinForm(false)
      setNewPin('')
      setConfirmPin('')
      alert('PIN updated successfully')
    } else {
      alert('PIN must be 4 digits and match')
    }
  }

  return (
    <ScreenWrapper scrollable padding="md">
      <Header
        title="App Lock"
        subtitle="Secure your memories"
        showBack
        onBackPress={() => router.back()}
      />

      {/* Enable App Lock */}
      <Card padding="lg" shadow="md" style={styles.mainCard}>
        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.toggleTitle}>Enable App Lock</Text>
            <Text style={styles.toggleSubtitle}>
              {appLockSettings.enabled ? 'Enabled' : 'Disabled'}
            </Text>
          </View>

          <Switch
            value={appLockSettings.enabled}
            onValueChange={handleToggleAppLock}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor="#fff"
          />
        </View>
      </Card>

      {/* Settings only when enabled */}
      {appLockSettings.enabled && (
        <>
          {/* Lock Methods */}
          <Card padding="lg" shadow="md" style={styles.methodsCard}>
            <Text style={styles.cardTitle}>Lock Method</Text>
            <Divider marginVertical="base" />

            {['pin', 'biometric', 'pattern'].map((method) => {
              const labels = {
                pin: 'PIN Lock (4 digits)',
                biometric: 'Biometric (Fingerprint/Face)',
                pattern: 'Pattern Lock',
              }

              return (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.methodOption,
                    appLockSettings.method === method &&
                      styles.methodOptionSelected,
                  ]}
                  onPress={() => handleChangeLockMethod(method)}
                >
                  <Ionicons
                    name={
                      appLockSettings.method === method
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    size={22}
                    color={
                      appLockSettings.method === method
                        ? theme.colors.primary
                        : theme.colors.subText
                    }
                  />

                  <Text style={styles.methodText}>
                    {labels[method]}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </Card>

          {/* PIN Settings */}
          {appLockSettings.method === 'pin' && (
            <Card padding="lg" shadow="md" style={styles.pinCard}>
              <Text style={styles.cardTitle}>PIN Settings</Text>

              <Text style={styles.currentPin}>
                Current PIN: {appLockSettings.pin}
              </Text>

              {showPinForm ? (
                <>
                  <AppTextInput
                    label="New PIN (4 digits)"
                    placeholder="Enter 4 digits"
                    value={newPin}
                    onChangeText={setNewPin}
                    keyboardType="number-pad"
                    secureTextEntry
                  />

                  <AppTextInput
                    label="Confirm PIN"
                    placeholder="Re-enter PIN"
                    value={confirmPin}
                    onChangeText={setConfirmPin}
                    keyboardType="number-pad"
                    secureTextEntry
                  />

                  <AppButton title="Update PIN" onPress={handleSetPin} fullWidth />
                  <AppButton
                    title="Cancel"
                    variant="secondary"
                    onPress={() => setShowPinForm(false)}
                    fullWidth
                  />
                </>
              ) : (
                <AppButton
                  title="Change PIN"
                  onPress={() => setShowPinForm(true)}
                  fullWidth
                />
              )}
            </Card>
          )}

          {/* Tips */}
          <Card padding="lg" shadow="md" style={styles.tipsCard}>
            <Text style={styles.cardTitle}>Security Tips</Text>

            {[
              'Use a PIN or biometric that only you know',
              'Change your PIN regularly',
              'Keep your device updated',
            ].map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={theme.colors.success}
                />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </Card>
        </>
      )}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  mainCard: { marginBottom: theme.sizes.lg },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  toggleTitle: {
    fontSize: theme.sizes.base,
    fontWeight: '600',
    color: theme.colors.text,
  },

  toggleSubtitle: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
  },

  methodsCard: { marginBottom: theme.sizes.lg },

  cardTitle: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    marginBottom: theme.sizes.base,
    color: theme.colors.text,
  },

  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.sizes.base,
  },

  methodOptionSelected: {
    backgroundColor: `${theme.colors.primary}10`,
    paddingHorizontal: theme.sizes.base,
    borderRadius: theme.sizes.radiusMd,
  },

  methodText: {
    marginLeft: theme.sizes.base,
    fontSize: theme.sizes.base,
    color: theme.colors.text,
  },

  pinCard: { marginBottom: theme.sizes.lg },

  currentPin: {
    fontSize: theme.sizes.base,
    color: theme.colors.secondary,
    marginBottom: theme.sizes.base,
    fontWeight: '600',
  },

  tipsCard: { marginBottom: theme.sizes.xxl },

  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.sizes.base,
  },

  tipText: {
    marginLeft: theme.sizes.base,
    fontSize: theme.sizes.sm,
    color: theme.colors.text,
    flex: 1,
  },
})