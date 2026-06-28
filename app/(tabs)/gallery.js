import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from 'expo-router'
import { VideoView, useVideoPlayer } from 'expo-video'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import ImageViewing from 'react-native-image-viewing'
import Animated, {
  FadeInDown,
} from 'react-native-reanimated'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'
import apiService from '../../utils/apiService'
import { responsive } from '../../utils/responsive'

const VideoThumbnail = ({ uri }) => {

  const player = useVideoPlayer(uri, player => {
    player.pause()
  })

  return (
    <VideoView
      player={player}
      style={{
        width: '100%',
        height: '100%',
      }}
      nativeControls={false}
      allowsFullscreen={false}
    />
  )
}

const FullScreenVideo = ({ uri }) => {

  const player = useVideoPlayer(
    uri,
    player => {
      player.play()
    }
  )

  return (
    <VideoView
      player={player}
      style={{
        width: '100%',
        height: '100%',
      }}
      nativeControls
      fullscreenOptions={{
    enable: true,
  }}
    />
  )
}


export default function Gallery() {

  const [galleryData, setGalleryData] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const toastTimer = useRef(null)
  const [openImages, setOpenImages] = useState(false)

  const [openVideos, setOpenVideos] = useState(false)

  const [imageViewerVisible, setImageViewerVisible] = useState(false)
const [currentImageIndex, setCurrentImageIndex] = useState(0)
const [showSplashModal, setShowSplashModal] =
  useState(false)

const [selectedItem, setSelectedItem] =
  useState(null)

  const [toastVisible,setToastVisible]=
useState(false)

const [toastMessage,setToastMessage]=
useState("")

useEffect(() => {
  return () => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current)
    }
  }
}, [])

const saveSplashImage = async (item, screenNumber) => {
  try {
    await AsyncStorage.setItem(
      `splashScreen${screenNumber}`,
      JSON.stringify(item)
    );

    setShowSplashModal(false);

    setToastMessage(
      `Splash Screen ${screenNumber} applied successfully`
    );

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setTimeout(() => {
      setToastVisible(true);

      toastTimer.current = setTimeout(() => {
        setToastVisible(false);
      }, 2500);
    }, 250);

  } catch (error) {
    console.log(error);
  }
};



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
  console.log(videoData)

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
  <Animated.View entering={FadeInDown.duration(300)}>
    <TouchableOpacity
      style={[
        styles.imageWrapper,
        {
          width: imageSize,
          height: imageSize,
        },
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
        source={{ uri: item.fileUrl }}
        style={styles.image}
      />

      <TouchableOpacity
        style={styles.splashBtn}
        activeOpacity={0.8}
        onPress={(event) => {
          event.stopPropagation()

          setSelectedItem(item)
          setShowSplashModal(true)
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

  const renderVideoItem = ({ item }) => (

  <Animated.View
    entering={FadeInDown.duration(300)}
  >

    <TouchableOpacity
      style={[
        styles.imageWrapper,
        {
          width: imageSize,
          height: imageSize,
        },
      ]}
      activeOpacity={0.8}
      onPress={() => {
        console.log(
    'Video clicked:',
    item.fileUrl
  )
        setSelectedVideo(
          item.fileUrl
        )

      }}
    >

      <VideoThumbnail
        uri={item.fileUrl}
      />

      <View style={styles.playIcon}>
        <Ionicons
          name="play-circle"
          size={42}
          color="#fff"
        />
      </View>

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
                  renderItem={renderVideoItem}
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

     

      <ImageViewing
  images={imageUrls}
  imageIndex={currentImageIndex}
  visible={imageViewerVisible}
  onRequestClose={() => setImageViewerVisible(false)}
  swipeToCloseEnabled={true}
  doubleTapToZoomEnabled={true}
  presentationStyle="fullScreen"
/>


<Modal
  visible={showSplashModal}
  transparent
  animationType="fade"
  onRequestClose={() =>
    setShowSplashModal(false)
  }
>

  <Pressable
    style={styles.modalOverlay}
    onPress={() =>
      setShowSplashModal(false)
    }
  >

    <TouchableWithoutFeedback
      onPress={() => {}}
    >

      <View style={styles.modalCard}>

        <Text style={styles.modalTitle}>
          Choose Splash Screen
        </Text>

        <Text style={styles.modalSubtitle}>
          Select where you want this image
        </Text>

        {[1,2,3].map(number => (

          <TouchableOpacity
            key={number}
            style={styles.optionButton}
            onPress={() =>
              saveSplashImage(
                selectedItem,
                number
              )
            }
          >

            <Ionicons
              name="image"
              size={22}
              color="#fff"
            />

            <Text style={styles.optionText}>
              Splash Screen {number}
            </Text>

          </TouchableOpacity>

        ))}

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() =>
            setShowSplashModal(false)
          }
        >

          <Text style={styles.cancelText}>
            Cancel
          </Text>

        </TouchableOpacity>

      </View>

    </TouchableWithoutFeedback>

  </Pressable>

</Modal>

<Modal
  visible={!!selectedVideo}
  animationType="slide"
  transparent={false}
  onRequestClose={() =>
    setSelectedVideo(null)
  }
>
  

  <View
    style={{
      flex: 1,
      backgroundColor: '#000',
    }}
  >

    <TouchableOpacity
      onPress={() =>
        setSelectedVideo(null)
      }
      style={{
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Ionicons
        name="close"
        size={35}
        color="#fff"
      />
    </TouchableOpacity>

    {selectedVideo && (
      <FullScreenVideo
        uri={selectedVideo}
      />
    )}

  </View>

</Modal>
    <Modal
  visible={toastVisible}
  transparent
  animationType="fade"
>
  <View style={styles.toast}>
    <View style={styles.toastCard}>

      <View style={styles.successIcon}>
        <Ionicons
          name="checkmark"
          size={32}
          color="#4CAF50"
        />
      </View>

      <View style={styles.toastTextContainer}>
        <Text style={styles.toastTitle}>
          Splash Updated
        </Text>

        <Text style={styles.toastMsg}>
          {toastMessage}
        </Text>
      </View>

    </View>
  </View>
</Modal>
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
},
playIcon: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: 'rgba(0,0,0,0.2)',
},

modalOverlay:{
flex:1,
backgroundColor:'rgba(0,0,0,0.45)',
justifyContent:'center',
padding:25,
},

modalCard:{
backgroundColor:'#fff',
borderRadius:24,
padding:24,
},

modalTitle:{
fontSize:22,
fontWeight:'700',
textAlign:'center',
},

modalSubtitle:{
marginTop:6,
textAlign:'center',
color:'#777',
marginBottom:22,
},

optionButton:{
flexDirection:'row',
alignItems:'center',
justifyContent:'center',
backgroundColor:theme.colors.primary,
paddingVertical:15,
borderRadius:16,
marginBottom:12,
},

optionText:{
color:'#fff',
fontWeight:'700',
fontSize:17,
marginLeft:10,
},

cancelBtn:{
marginTop:10,
paddingVertical:14,
borderRadius:16,
backgroundColor:'#ECECEC',
},

cancelText:{
textAlign:'center',
fontWeight:'700',
fontSize:16,
},

toast: {
  position: 'absolute',

  top: 0,
  bottom: 0,
  left: 0,
  right: 0,

  justifyContent: 'center',
  alignItems: 'center',

  zIndex: 9999,
  elevation: 20,
},

toastTitle:{
fontWeight:'700',
fontSize:17,
marginLeft:12,
},

toastMsg:{
marginLeft:12,
color:'#666',
marginTop:3,
},
toastCard: {
  width: '88%',
  maxWidth: 360,

  backgroundColor: '#FFFFFF',
  borderRadius: 20,

  paddingVertical: 18,
  paddingHorizontal: 20,

  flexDirection: 'row',
  alignItems: 'center',

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.18,
  shadowRadius: 12,

  elevation: 12,
},
successIcon: {
  width: 56,
  height: 56,
  borderRadius: 28,

  backgroundColor: '#EAFBF0',

  justifyContent: 'center',
  alignItems: 'center',
},

toastTextContainer: {
  flex: 1,
  marginLeft: 15,
},

toastTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#1B5E20',
},

toastMsg: {
  marginTop: 5,
  fontSize: 15,
  color: '#555',
  lineHeight: 22,
},
})