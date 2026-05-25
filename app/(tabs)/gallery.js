import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import AppButton from '../../components/AppButton'
import EmptyState from '../../components/EmptyState'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'
import { responsive } from '../../utils/responsive'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [galleryData, setGalleryData] = useState([
    { id: '1', uri: 'https://picsum.photos/400/400?random=1', date: '2024-05-20' },
    { id: '2', uri: 'https://picsum.photos/400/400?random=2', date: '2024-05-19' },
    { id: '3', uri: 'https://picsum.photos/400/400?random=3', date: '2024-05-18' },
    { id: '4', uri: 'https://picsum.photos/400/400?random=4', date: '2024-05-17' },
    { id: '5', uri: 'https://picsum.photos/400/400?random=5', date: '2024-05-16' },
    { id: '6', uri: 'https://picsum.photos/400/400?random=6', date: '2024-05-15' },
  ])

  const gridColumns = responsive.getGridColumns()
  const imageSize = (responsive.width - theme.sizes.lg * 2 - theme.sizes.sm * (gridColumns - 1)) / gridColumns

  const renderGalleryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.imageWrapper, { width: imageSize, height: imageSize }]}
      onPress={() => setSelectedImage(item)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.imageOverlay}>
        <Ionicons name="eye-outline" size={24} color="#fff" />
      </View>
    </TouchableOpacity>
  )

  return (
    <ScreenWrapper scrollable padding="md">
      <Header title="Photo Gallery" subtitle={`${galleryData.length} photos`} />

      {galleryData.length > 0 ? (
        <FlatList
          data={galleryData}
          renderItem={renderGalleryItem}
          keyExtractor={(item) => item.id}
          numColumns={gridColumns}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <EmptyState
          icon="image-outline"
          title="No Photos"
          message="Start capturing your memories"
          action={
            <AppButton title="Upload Photo" onPress={() => {}} fullWidth />
          }
        />
      )}

      {/* Image Preview Modal */}
      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedImage(null)}
          >
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>

          {selectedImage && (
            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={styles.modalContentContainer}
              scrollEnabled={false}
            >
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.modalImage}
              />
              <View style={styles.photoDetails}>
                <Text style={styles.photoDate}>{selectedImage.date}</Text>
                <View style={styles.actionButtons}>
                  <AppButton
                    title="Delete"
                    variant="danger"
                    size="sm"
                    onPress={() => setSelectedImage(null)}
                  />
                  <AppButton
                    title="Share"
                    variant="secondary"
                    size="sm"
                    onPress={() => {}}
                  />
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: theme.sizes.sm,
  },
  flatListContent: {
    paddingVertical: theme.sizes.base,
  },
  imageWrapper: {
    borderRadius: theme.sizes.radiusMd,
    overflow: 'hidden',
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.sizes.base,
  },
  closeButton: {
    position: 'absolute',
    top: theme.sizes.lg,
    right: theme.sizes.lg,
    zIndex: 10,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    maxHeight: '90%',
  },
  modalContentContainer: {
    alignItems: 'center',
  },
  modalImage: {
    width: responsive.getWidth(90),
    height: responsive.getWidth(90),
    borderRadius: theme.sizes.radiusLg,
    marginBottom: theme.sizes.lg,
  },
  photoDetails: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.sizes.radiusLg,
    padding: theme.sizes.lg,
    width: '100%',
  },
  photoDate: {
    color: theme.colors.subText,
    fontSize: theme.sizes.sm,
    marginBottom: theme.sizes.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.sizes.base,
  },
})
