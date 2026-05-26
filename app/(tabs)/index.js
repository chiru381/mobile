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
      {/* Mood Status */}

<Card
  padding="lg"
  shadow="md"
  style={styles.moodCard}
  onPress={() => router.push('/Mood')}
>

  <View style={styles.moodContent}>

    {/* ICON */}

    <View style={styles.moodIconContainer}>

      <Ionicons
        name="happy"
        size={38}
        color={theme.colors.warning}
      />

    </View>

    {/* TEXT */}

    <View style={styles.moodText}>

      <Text style={styles.moodLabel}>
        TODAY'S MOOD
      </Text>

      <Text style={styles.moodValue}>
        {stats.mood}
      </Text>

      <Text style={styles.moodSubText}>
        Tap to track your feelings
      </Text>

    </View>

    {/* RIGHT ICON */}

    <View style={styles.moodArrowBox}>

      <Ionicons
        name="chevron-forward"
        size={22}
        color={theme.colors.subText}
      />

    </View>

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

  // ================= STATS =================

  statsContainer: {
    marginTop: theme.sizes.base,
    marginBottom: theme.sizes.lg,
  },

  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.sizes.sm,
  },

  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 6,
  },

  statLabel: {
    fontSize: 13,
    color: theme.colors.subText,
    fontWeight: '500',
  },

  divider: {
    width: 1,
    height: 45,
    backgroundColor: theme.colors.border,
  },

  // ================= MOOD CARD =================

moodCard: {
  marginBottom: theme.sizes.lg,

  borderRadius: 26,

  backgroundColor: theme.colors.card,

  borderWidth: 1,
  borderColor: `${theme.colors.warning}25`,

  overflow: 'hidden',

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.08,
  shadowRadius: 8,

  elevation: 4,
},

moodContent: {
  flexDirection: 'row',
  alignItems: 'center',

  paddingVertical: 6,
},

// LEFT ICON BOX

moodIconContainer: {
  width: 72,
  height: 72,

  borderRadius: 24,

  backgroundColor: `${theme.colors.warning}18`,

  justifyContent: 'center',
  alignItems: 'center',
},

// TEXT AREA

moodText: {
  flex: 1,
  marginLeft: 18,
},

moodLabel: {
  fontSize: 13,
  fontWeight: '600',

  color: theme.colors.subText,

  marginBottom: 6,

  letterSpacing: 0.3,
},

moodValue: {
  fontSize: 28,
  fontWeight: '800',

  color: theme.colors.text,
},

moodSubText: {
  marginTop: 4,

  fontSize: 13,

  color: theme.colors.subText,
},

// RIGHT ARROW

moodArrowBox: {
  width: 42,
  height: 42,

  borderRadius: 14,

  backgroundColor: theme.colors.bgLight,

  justifyContent: 'center',
  alignItems: 'center',
},

  // ================= FEATURES =================

  featuresSection: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.sizes.base,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  featureCard: {
  width: '48%',
  backgroundColor: theme.colors.card,
  borderRadius: 22,

  paddingVertical: 22,

  alignItems: 'center',

  borderWidth: 1,
  borderColor: theme.colors.border,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },

  shadowOpacity: 0.08,
  shadowRadius: 5,

  elevation: 3,
},

  featureIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
    paddingHorizontal: 8,
    lineHeight: 20,
  },

  // ================= QUICK ACTIONS =================

  quickActionsSection: {
    marginBottom: 30,
  },

  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },

  quickActionBtn: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 18,

    paddingVertical: 18,
    alignItems: 'center',

    marginHorizontal: 4,

    borderWidth: 1,
    borderColor: theme.colors.border,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,

    elevation: 2,
  },

  quickActionText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
  },

})
