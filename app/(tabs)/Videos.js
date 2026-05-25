import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppButton from '../../components/AppButton'
import EmptyState from '../../components/EmptyState'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'
import { responsive } from '../../utils/responsive'

export default function Videos() {
  const [videosData] = useState([
    { id: '1', title: 'Birthday Party', thumbnail: 'https://picsum.photos/300/200?random=1', duration: '3:45', date: '2024-05-20' },
    { id: '2', title: 'Vacation Memories', thumbnail: 'https://picsum.photos/300/200?random=2', duration: '5:12', date: '2024-05-19' },
    { id: '3', title: 'Family Gathering', thumbnail: 'https://picsum.photos/300/200?random=3', duration: '2:30', date: '2024-05-18' },
    { id: '4', title: 'Beach Day', thumbnail: 'https://picsum.photos/300/200?random=4', duration: '4:20', date: '2024-05-17' },
  ])

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity style={styles.videoCard} activeOpacity={0.7}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.playOverlay}>
          <Ionicons name="play" size={40} color="#fff" />
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.videoDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <ScreenWrapper scrollable padding="md">
      <Header title="Video Memories" subtitle={`${videosData.length} videos`} />

      {videosData.length > 0 ? (
        <FlatList
          data={videosData}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyState
          icon="videocam-outline"
          title="No Videos"
          message="Record or upload your first video memory"
          action={<AppButton title="Upload Video" onPress={() => {}} fullWidth />}
        />
      )}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: theme.sizes.base,
  },
  videoCard: {
    marginBottom: theme.sizes.base,
    borderRadius: theme.sizes.radiusMd,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: responsive.getWidth(60),
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: theme.sizes.sm,
    right: theme.sizes.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: theme.sizes.sm,
    paddingVertical: theme.sizes.xs,
    borderRadius: theme.sizes.radiusSm,
  },
  durationText: {
    color: '#fff',
    fontSize: theme.sizes.xs,
    fontWeight: '600',
  },
  videoInfo: {
    backgroundColor: theme.colors.card,
    padding: theme.sizes.base,
    borderBottomLeftRadius: theme.sizes.radiusMd,
    borderBottomRightRadius: theme.sizes.radiusMd,
  },
  videoTitle: {
    fontSize: theme.sizes.base,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.sizes.xs,
  },
  videoDate: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
  },
})
