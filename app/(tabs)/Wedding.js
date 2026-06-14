import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppButton from '../../components/AppButton'
import Card from '../../components/Card'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'

export default function Wedding() {
  const [weddingData] = useState({
    couple: 'Praveen & Nandini',
    date: 'March 15, 2024',
    venue: 'Grand Ballroom, New York',
    videos: 8,
    photos: 234,
    highlights: ['Ceremony', 'Reception', 'Dance', 'Cake Cutting']
  })

  const renderHighlight = (highlight) => (
    <Card
      key={highlight}
      padding="md"
      shadow="sm"
      style={styles.highlightCard}
    >
      <View style={styles.highlightContent}>
        <Ionicons name="play-circle-outline" size={24} color={theme.colors.accent} />
        <Text style={styles.highlightText}>{highlight}</Text>
      </View>
    </Card>
  )

  return (
    <ScreenWrapper scrollable padding="md">
      <Header title="Wedding Movie" subtitle="Capture Every Moment" />

      {/* Wedding Header */}
      <Card padding="lg" shadow="md" style={styles.headerCard}>
        <Text style={styles.coupleName}>💍 {weddingData.couple}</Text>
        <Text style={styles.weddingDate}>{weddingData.date}</Text>
        <Text style={styles.venue}>{weddingData.venue}</Text>
      </Card>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{weddingData.videos}</Text>
          <Text style={styles.statLabel}>Videos</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{weddingData.photos}</Text>
          <Text style={styles.statLabel}>Photos</Text>
        </View>
      </View>

      {/* Highlights */}
      <View style={styles.highlightsSection}>
        <Text style={styles.sectionTitle}>Highlights</Text>
        {weddingData.highlights.map(renderHighlight)}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <AppButton title="Watch Full Movie" fullWidth />
        <AppButton title="Share" variant="secondary" fullWidth />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  headerCard: {
    marginBottom: theme.sizes.lg,
    alignItems: 'center',
  },
  coupleName: {
    fontSize: theme.sizes.h4,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.sizes.sm,
  },
  weddingDate: {
    fontSize: theme.sizes.base,
    color: theme.colors.secondary,
    marginBottom: theme.sizes.xs,
  },
  venue: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.sizes.radiusMd,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.sizes.lg,
    overflow: 'hidden',
  },
  statBox: {
    flex: 1,
    padding: theme.sizes.base,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.border,
  },
  statNumber: {
    fontSize: theme.sizes.h4,
    fontWeight: '700',
    color: theme.colors.accent,
  },
  statLabel: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
    marginTop: theme.sizes.xs,
  },
  highlightsSection: {
    marginBottom: theme.sizes.lg,
  },
  sectionTitle: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.sizes.base,
  },
  highlightCard: {
    marginBottom: theme.sizes.sm,
  },
  highlightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightText: {
    marginLeft: theme.sizes.base,
    fontSize: theme.sizes.base,
    color: theme.colors.text,
    fontWeight: '500',
  },
  actionButtons: {
    gap: theme.sizes.base,
    marginBottom: theme.sizes.xxl,
  },
})