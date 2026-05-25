import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppButton from '../../components/AppButton'
import Card from '../../components/Card'
import EmptyState from '../../components/EmptyState'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'

export default function Travel() {
  const [travelData] = useState([
    { id: '1', destination: 'Paris, France', date: '2024-04-15', photos: 45, icon: '🗼' },
    { id: '2', destination: 'Tokyo, Japan', date: '2024-03-20', photos: 67, icon: '🏯' },
    { id: '3', destination: 'New York, USA', date: '2024-02-10', photos: 34, icon: '🗽' },
    { id: '4', destination: 'Dubai, UAE', date: '2024-01-05', photos: 52, icon: '🏙️' },
  ])

  const renderTravelCard = ({ item }) => (
    <TouchableOpacity activeOpacity={0.7}>
      <Card padding="lg" shadow="md" style={styles.travelCard}>
        <View style={styles.travelHeader}>
          <Text style={styles.travelIcon}>{item.icon}</Text>
          <View style={styles.travelInfo}>
            <Text style={styles.destination}>{item.destination}</Text>
            <Text style={styles.travelDate}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.photoCount}>
          <Ionicons name="image-outline" size={16} color={theme.colors.secondary} />
          <Text style={styles.photoCountText}>{item.photos} photos</Text>
        </View>
      </Card>
    </TouchableOpacity>
  )

  return (
    <ScreenWrapper scrollable padding="md">
      <Header title="Travel Memories" subtitle={`${travelData.length} trips`} />

      {travelData.length > 0 ? (
        <FlatList
          data={travelData}
          renderItem={renderTravelCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyState
          icon="map-outline"
          title="No Travel Memories"
          message="Start documenting your adventures"
          action={<AppButton title="Add Trip" onPress={() => {}} fullWidth />}
        />
      )}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: theme.sizes.base,
  },
  travelCard: {
    marginBottom: theme.sizes.base,
  },
  travelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.sizes.base,
  },
  travelIcon: {
    fontSize: 40,
    marginRight: theme.sizes.base,
  },
  travelInfo: {
    flex: 1,
  },
  destination: {
    fontSize: theme.sizes.base,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.sizes.xs,
  },
  travelDate: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
  },
  photoCount: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.sizes.base,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  photoCountText: {
    marginLeft: theme.sizes.sm,
    color: theme.colors.subText,
    fontSize: theme.sizes.sm,
  },
})