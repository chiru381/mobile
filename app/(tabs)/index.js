import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Card from '../../components/Card'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'

export default function Home() {
  const router = useRouter()
  const [stats, setStats] = useState({
    memories: 156,
    albums: 12,
    mood: 'Happy',
    notes: 23,
  })

  const features = [
    {
      id: '1',
      title: 'Photo Gallery',
      icon: 'image',
      color: theme.colors.secondary,
      route: '/gallery',
    },
    {
      id: '2',
      title: 'Video Memories',
      icon: 'videocam',
      color: theme.colors.accent,
      route: '/Videos',
    },
    {
      id: '3',
      title: 'Travel Moments',
      icon: 'map',
      color: theme.colors.success,
      route: '/Travel',
    },
    {
      id: '4',
      title: 'Wedding Movies',
      icon: 'heart',
      color: theme.colors.error,
      route: '/Wedding',
    },
    {
      id: '5',
      title: 'Mood Tracker',
      icon: 'happy',
      color: theme.colors.warning,
      route: '/Mood',
    },
    {
      id: '6',
      title: 'Calendar Notes',
      icon: 'calendar',
      color: theme.colors.info,
      route: '/CalendarNotes',
    },
    {
      id: '7',
      title: 'Face Album',
      icon: 'people',
      color: theme.colors.primary,
      route: '/face-album',
    },
    {
      id: '8',
      title: 'Export/Import',
      icon: 'cloud-upload',
      color: theme.colors.primaryLight,
      route: '/export-import',
    },
  ]

  const renderFeature = ({ item }) => (
    <TouchableOpacity
      style={styles.featureCard}
      onPress={() => router.push(item.route)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.featureIconContainer,
          { backgroundColor: `${item.color}20` },
        ]}
      >
        <Ionicons name={item.icon} size={32} color={item.color} />
      </View>
      <Text style={styles.featureTitle}>{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <ScreenWrapper scrollable padding="md">
      <Header title="Dashboard" subtitle="Welcome back!" />

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <Card padding="md" shadow="md">
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.memories}</Text>
              <Text style={styles.statLabel}>Memories</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.albums}</Text>
              <Text style={styles.statLabel}>Albums</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.notes}</Text>
              <Text style={styles.statLabel}>Notes</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Mood Status */}
      <Card
        padding="base"
        shadow="md"
        style={styles.moodCard}
        onPress={() => router.push('/Mood')}
      >
        <View style={styles.moodContent}>
          <Ionicons name="happy" size={40} color={theme.colors.warning} />
          <View style={styles.moodText}>
            <Text style={styles.moodLabel}>How are you feeling?</Text>
            <Text style={styles.moodValue}>{stats.mood}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={theme.colors.subText}
          />
        </View>
      </Card>

      {/* Features Grid */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Your Features</Text>
        <FlatList
          data={features}
          renderItem={renderFeature}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => router.push('/Settings')}
          >
            <Ionicons
              name="settings"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={styles.quickActionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => router.push('/Profile')}
          >
            <Ionicons
              name="person"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={styles.quickActionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => router.push('/About')}
          >
            <Ionicons
              name="information-circle"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={styles.quickActionText}>About</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  statsContainer: {
    marginVertical: theme.sizes.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: theme.sizes.h4,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.sizes.xs,
  },
  statLabel: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.border,
  },
  moodCard: {
    marginVertical: theme.sizes.base,
  },
  moodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moodText: {
    flex: 1,
    marginHorizontal: theme.sizes.base,
  },
  moodLabel: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
    marginBottom: theme.sizes.xs,
  },
  moodValue: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    color: theme.colors.text,
  },
  featuresSection: {
    marginVertical: theme.sizes.lg,
  },
  sectionTitle: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.sizes.base,
  },
  featureCard: {
    alignItems: 'center',
    paddingVertical: theme.sizes.base,
  },
  featureIconContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.sizes.radiusLg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.sizes.sm,
  },
  featureTitle: {
    fontSize: theme.sizes.sm,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  quickActionsSection: {
    marginVertical: theme.sizes.lg,
    marginBottom: theme.sizes.xxl,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: theme.sizes.base,
  },
  quickActionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.sizes.base,
    backgroundColor: theme.colors.card,
    borderRadius: theme.sizes.radiusMd,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  quickActionText: {
    fontSize: theme.sizes.xs,
    color: theme.colors.text,
    marginTop: theme.sizes.xs,
  },
})
