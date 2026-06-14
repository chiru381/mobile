import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppButton from '../components/AppButton'
import Card from '../components/Card'
import Header from '../components/Header'
import ScreenWrapper from '../components/ScreenWrapper'
import AppTextInput from '../components/TextInput'
import { theme } from '../constants/theme'

export default function Profile() {
  // avatar:
  // user.profileImage ||
  // 'https://picsum.photos/200/200'
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
  name: '',
  email: '',
  phone: '',
  bio: '',
  avatar: 'https://picsum.photos/200/200',
})
  const [formData, setFormData] = useState(profile)

  const handleSaveProfile = () => {
    setProfile(formData)
    setIsEditing(false)
    alert('Profile updated successfully')
  }

  const handleLogout = async () => {
  await AsyncStorage.removeItem('token')
  await AsyncStorage.removeItem('user')

  router.replace('/login')
}

  useEffect(() => {
  loadUser()
}, [])

const loadUser = async () => {
  try {
    const userData = await AsyncStorage.getItem('user')

    if (userData) {
      const user = JSON.parse(userData)

      const userProfile = {
        name: user.name || '',
        email: user.email || '',
        phone: user.mobile || '',
        // bio: 'Logged in using MPIN',
        avatar: 'https://picsum.photos/200/200',
      }

      setProfile(userProfile)
      setFormData(userProfile)
    }
  } catch (error) {
    console.log('Load User Error:', error)
  }
}

  return (
    <ScreenWrapper scrollable padding="md">
      <Header
        title="Profile"
        showBack
        onBackPress={() => router.back()}
      />

      {!isEditing ? (
        <>
          {/* Profile Header */}
          <View style={styles.profileHeaderSection}>
            <Image
              source={{ uri: profile.avatar }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileBio}>{profile.bio}</Text>
          </View>

          {/* Profile Info Cards */}
          <Card padding="base" shadow="sm" style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="mail" size={20} color={theme.colors.secondary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{profile.email}</Text>
              </View>
            </View>
          </Card>

          <Card padding="base" shadow="sm" style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="call" size={20} color={theme.colors.secondary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{profile.phone}</Text>
              </View>
            </View>
          </Card>

          

          {/* Edit Button */}
          <AppButton
            title="Edit Profile"
            onPress={() => setIsEditing(true)}
            fullWidth
          />
          <AppButton
  title="Logout"
  onPress={handleLogout}
  variant="secondary"
  fullWidth
/>

          {/* Profile Settings */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingsTitle}>Profile Settings</Text>
            <TouchableOpacity style={styles.settingsOption}>
              <Ionicons name="key" size={20} color={theme.colors.primary} />
              <Text style={styles.settingsText}>Change Password</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.colors.subText}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {/* Edit Form */}
          <AppTextInput
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <AppTextInput
            label="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
          />
          <AppTextInput
            label="Phone"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />
          <AppTextInput
            label="Bio"
            value={formData.bio}
            onChangeText={(text) => setFormData({ ...formData, bio: text })}
            multiline
            numberOfLines={3}
          />

          {/* Action Buttons */}
          <AppButton
            title="Save Profile"
            onPress={handleSaveProfile}
            fullWidth
          />
          <AppButton
            title="Cancel"
            variant="secondary"
            onPress={() => {
              setIsEditing(false)
              setFormData(profile)
            }}
            fullWidth
          />
        </>
      )}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  profileHeaderSection: {
    alignItems: 'center',
    marginBottom: theme.sizes.xl,
    paddingVertical: theme.sizes.lg,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: theme.sizes.base,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  profileName: {
    fontSize: theme.sizes.h4,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.sizes.xs,
  },
  profileBio: {
    fontSize: theme.sizes.base,
    color: theme.colors.subText,
    textAlign: 'center',
  },
  infoCard: {
    marginBottom: theme.sizes.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.sizes.radiusMd,
    backgroundColor: `${theme.colors.secondary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.sizes.base,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: theme.sizes.xs,
    color: theme.colors.subText,
    marginBottom: theme.sizes.xs,
  },
  infoValue: {
    fontSize: theme.sizes.base,
    fontWeight: '600',
    color: theme.colors.text,
  },
  statsCard: {
    marginBottom: theme.sizes.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: theme.sizes.h4,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
    marginTop: theme.sizes.xs,
  },
  settingsSection: {
    marginTop: theme.sizes.xl,
    marginBottom: theme.sizes.xxl,
  },
  settingsTitle: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.sizes.base,
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.sizes.base,
    paddingHorizontal: theme.sizes.sm,
    backgroundColor: theme.colors.card,
    borderRadius: theme.sizes.radiusMd,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.sizes.sm,
  },
  settingsText: {
    flex: 1,
    marginHorizontal: theme.sizes.base,
    fontSize: theme.sizes.base,
    color: theme.colors.text,
    fontWeight: '500',
  },
})