import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppButton from '../components/AppButton'
import EmptyState from '../components/EmptyState'
import Header from '../components/Header'
import ScreenWrapper from '../components/ScreenWrapper'
import { theme } from '../constants/theme'

export default function FaceAlbum() {
  const router = useRouter()

  const [faceAlbumData] = useState([
    { id: '1', name: 'John', photos: 23, thumbnail: 'https://picsum.photos/100/100?random=1' },
    { id: '2', name: 'Sarah', photos: 18, thumbnail: 'https://picsum.photos/100/100?random=2' },
    { id: '3', name: 'Emma', photos: 15, thumbnail: 'https://picsum.photos/100/100?random=3' },
    { id: '4', name: 'Michael', photos: 12, thumbnail: 'https://picsum.photos/100/100?random=4' },
    { id: '5', name: 'Jessica', photos: 21, thumbnail: 'https://picsum.photos/100/100?random=5' },
  ])

  const renderPersonCard = ({ item }) => (
    <TouchableOpacity style={styles.personCard} activeOpacity={0.7}>
      <Image source={{ uri: item.thumbnail }} style={styles.personImage} />

      <View style={styles.personInfo}>
        <Text style={styles.personName}>{item.name}</Text>
        <Text style={styles.personPhotos}>{item.photos} photos</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={theme.colors.subText} />
    </TouchableOpacity>
  )

  return (
    <ScreenWrapper scrollable padding="md">
      <Header
        title="Face Album"
        subtitle={`${faceAlbumData.length} people`}
        showBack
        onBackPress={() => router.back()}
      />

      {faceAlbumData.length > 0 ? (
        <FlatList
          data={faceAlbumData}
          renderItem={renderPersonCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyState
          icon="people-outline"
          title="No Faces"
          message="Start adding people to your face album"
          action={<AppButton title="Add Person" onPress={() => {}} fullWidth />}
        />
      )}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: theme.sizes.base,
  },
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.sizes.radiusMd,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  personImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: theme.sizes.base,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: theme.sizes.base,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.sizes.xs,
  },
  personPhotos: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
  },
})