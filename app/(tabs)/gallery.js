import { Ionicons } from '@expo/vector-icons'

import { useCallback, useState } from 'react'

import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'


import { useFocusEffect } from 'expo-router'

import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'

import { theme } from '../../constants/theme'

import { responsive } from '../../utils/responsive'

import ImageViewing from 'react-native-image-viewing'
import Animated, {
  FadeInDown,
} from 'react-native-reanimated'
import apiService from '../../utils/apiService'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Gallery() {

  const [galleryData, setGalleryData] = useState([])

  const [loading, setLoading] = useState(true)

  const [openImages, setOpenImages] = useState(false)

  const [openVideos, setOpenVideos] = useState(false)

  const [imageViewerVisible, setImageViewerVisible] = useState(false)
const [currentImageIndex, setCurrentImageIndex] = useState(0)

const saveSplashImage = async (item) => {
  try {

    const storedImages =
      await AsyncStorage.getItem(
        'splashImages'
      )

    const existing =
      storedImages
        ? JSON.parse(storedImages)
        : []

    const updated = [

      ...existing.filter(
        img =>
          img.fileUrl !== item.fileUrl
      ),

      item,

    ].slice(-3)

    await AsyncStorage.setItem(
      'splashImages',
      JSON.stringify(updated)
    )

    alert(
      'Added to Splash Screen'
    )

  } catch (error) {

    console.log(error)

  }
}

  // ================= GET FILES =================

  const getGalleryFiles = async () => {

    try {

      setLoading(true)

      const response = await apiService.getUploads()

      setGalleryData(response.data || [])

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getGalleryFiles()
    }, [])
  )

  // ================= FILTER =================

  const imageData = galleryData.filter(
    item => item.fileType === 'image'
  )

  const imageUrls = imageData.map(item => ({
    uri: item.fileUrl,
  }))

  const videoData = galleryData.filter(
    item => item.fileType === 'video'
  )

  // ================= GRID =================

  const gridColumns = responsive.getGridColumns()

  const imageSize =
    (
      responsive.width
      - theme.sizes.lg * 2
      - theme.sizes.sm * (gridColumns - 1)
    ) / gridColumns

  // ================= RENDER ITEM =================

  const renderGalleryItem = ({ item }) => (
    <Animated.View
  entering={FadeInDown.duration(300)}
>
    <TouchableOpacity
  style={[
    styles.imageWrapper,
    {
      width: imageSize,
      height: imageSize,
    }
  ]}
  activeOpacity={0.8}
  onPress={() => {
    const index = imageData.findIndex(
      img => img._id === item._id
    )

    setCurrentImageIndex(index)
    setImageViewerVisible(true)
  }}
>

  <Image
    source={{
      uri: item.fileUrl
    }}
    style={styles.image}
  />

  {/* Splash Screen Image Button */}

  <TouchableOpacity
  style={styles.splashBtn}
  activeOpacity={0.8}
  onPress={(event) => {

    event.stopPropagation()

    saveSplashImage(item)

  }}
>
  <Ionicons
    name="star"
    size={20}
    color="#FFD700"
  />
</TouchableOpacity>

</TouchableOpacity>
    </Animated.View>
  )

  // ================= MAIN =================

  return (

    <ScreenWrapper scrollable padding="md">

      <Header
        title="Gallery"
        subtitle="Uploaded Files"
      />

      {
        loading ? (

          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
            />
          </View>

        ) : (

          <>

            {/* ================= IMAGES FOLDER ================= */}

            <TouchableOpacity
              style={styles.folderCard}
              activeOpacity={0.8}
              onPress={() => setOpenImages(!openImages)}
            >

              <View style={styles.folderLeft}>

                <View style={styles.folderIconBox}>
                  <Ionicons
                    name="images"
                    size={40}
                    color="#4F8EF7"
                  />
                </View>

                <View>

                  <Text style={styles.folderTitle}>
                    Images
                  </Text>

                  <Text style={styles.folderSubtitle}>
                    {imageData.length} Photos
                  </Text>

                </View>

              </View>

              <Ionicons
                name={
                  openImages
                    ? 'chevron-up'
                    : 'chevron-down'
                }
                size={24}
                color={theme.colors.text}
              />

            </TouchableOpacity>

            {
              openImages && (

                <FlatList
                  data={imageData}
                  renderItem={renderGalleryItem}
                  keyExtractor={(item) => item._id}
                  numColumns={gridColumns}
                  scrollEnabled={false}
                  columnWrapperStyle={styles.columnWrapper}
                />

              )
            }

            {/* ================= VIDEOS FOLDER ================= */}

            <TouchableOpacity
              style={styles.folderCard}
              activeOpacity={0.8}
              onPress={() => setOpenVideos(!openVideos)}
            >

              <View style={styles.folderLeft}>

                <View
                  style={[
                    styles.folderIconBox,
                    {
                      backgroundColor: '#FFE6E6'
                    }
                  ]}
                >
                  <Ionicons
                    name="videocam"
                    size={40}
                    color="#FF4D4D"
                  />
                </View>

                <View>

                  <Text style={styles.folderTitle}>
                    Videos
                  </Text>

                  <Text style={styles.folderSubtitle}>
                    {videoData.length} Videos
                  </Text>

                </View>

              </View>

              <Ionicons
                name={
                  openVideos
                    ? 'chevron-up'
                    : 'chevron-down'
                }
                size={24}
                color={theme.colors.text}
              />

            </TouchableOpacity>

            {
              openVideos && (

                <FlatList
                  data={videoData}
                  renderItem={renderGalleryItem}
                  keyExtractor={(item) => item._id}
                  numColumns={gridColumns}
                  scrollEnabled={false}
                  columnWrapperStyle={styles.columnWrapper}
                />

              )
            }

          </>
        )
      }

      {/* ================= PREVIEW MODAL ================= */}

      {/* <Modal
        visible={!!selectedItem}
        transparent
        animationType="fade"
      >

        <View style={styles.modalContainer}>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedItem(null)}
          >

            <Ionicons
              name="close"
              size={34}
              color="#fff"
            />

          </TouchableOpacity>

          {
            selectedItem && (

              <ScrollView
                style={styles.modalContent}
                contentContainerStyle={
                  styles.modalContentContainer
                }
                scrollEnabled={false}
              >

                {
                  selectedItem.fileType === 'image' ? (

                    <Image
                      source={{
                        uri: selectedItem.fileUrl
                      }}
                      style={styles.modalImage}
                    />

                  ) : (

                    <Video
                      source={{
                        uri: selectedItem.fileUrl
                      }}
                      style={styles.videoPlayer}
                      useNativeControls
                      resizeMode="contain"
                      shouldPlay
                    />

                  )
                }

                <View style={styles.photoDetails}>

                  <Text style={styles.photoDate}>
                    {
                      new Date(
                        selectedItem.createdAt
                      ).toDateString()
                    }
                  </Text>

                </View>

              </ScrollView>
            )
          }

        </View>

      </Modal> */}

      <ImageViewing
  images={imageUrls}
  imageIndex={currentImageIndex}
  visible={imageViewerVisible}
  onRequestClose={() => setImageViewerVisible(false)}
  swipeToCloseEnabled={true}
  doubleTapToZoomEnabled={true}
  presentationStyle="fullScreen"
/>

    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({

  loaderContainer: {
    marginTop: 50,
  },

  folderCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  folderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  folderIconBox: {
    width: 70,
    height: 70,
    borderRadius: 18,

    backgroundColor: '#EAF2FF',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 16,
  },

  folderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },

  folderSubtitle: {
    marginTop: 4,
    color: theme.colors.subText,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  imageWrapper: {
  borderRadius: 18,
  overflow: 'hidden',
  marginBottom: 10,

  backgroundColor: theme.colors.card,

  ...theme.shadows.md,
},

  image: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},

  videoCard: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 999,
  },

  modalContent: {
    width: '100%',
  },

  modalContentContainer: {
    alignItems: 'center',
  },

  modalImage: {
    width: responsive.getWidth(92),
    height: responsive.getWidth(92),
    borderRadius: 20,
  },

  videoPlayer: {
    width: responsive.getWidth(92),
    height: 300,
    borderRadius: 20,
    backgroundColor: '#000',
  },

  photoDetails: {
    marginTop: 20,
    width: '92%',
    backgroundColor: theme.colors.card,
    borderRadius: 18,
    padding: 18,
  },

  photoDate: {
    color: theme.colors.text,
    fontSize: 15,
  },

  splashBtn: {
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: 'rgba(0,0,0,0.5)',
  padding: 6,
  borderRadius: 20,
}

})