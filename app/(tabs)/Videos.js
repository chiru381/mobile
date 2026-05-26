import { Ionicons } from '@expo/vector-icons'

import { useCallback, useState } from 'react'

import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Video } from 'expo-av'

import { useFocusEffect } from 'expo-router'

import EmptyState from '../../components/EmptyState'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'

import { theme } from '../../constants/theme'

import apiService from '../../utils/apiService'

export default function Videos() {

  const [videosData, setVideosData] = useState([])

  const [loading, setLoading] = useState(true)

  const [selectedVideo, setSelectedVideo] = useState(null)

  // ================= GET VIDEOS =================

  const getVideos = async () => {

    try {

      setLoading(true)

      const response =
        await apiService.getUploads()

      const onlyVideos =
        (response?.data || []).filter(
          item => item.fileType === 'video'
        )

      setVideosData(onlyVideos)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getVideos()
    }, [])
  )

  // ================= RENDER VIDEO =================

  const renderVideoItem = ({ item }) => (

    <TouchableOpacity
      style={styles.videoCard}
      activeOpacity={0.85}
      onPress={() => setSelectedVideo(item)}
    >

      {/* VIDEO THUMB */}

      <View style={styles.thumbnailContainer}>

        <View style={styles.videoThumb}>

          <Ionicons
            name="videocam"
            size={48}
            color="#fff"
          />

        </View>

        {/* PLAY ICON */}

        <View style={styles.playButton}>

          <Ionicons
            name="play"
            size={30}
            color="#fff"
          />

        </View>

      </View>

      {/* INFO */}

      <View style={styles.videoInfo}>

        <Text
          style={styles.videoTitle}
          numberOfLines={1}
        >
          {item.fileName || 'Video File'}
        </Text>

        <Text style={styles.videoDate}>
          {
            item.createdAt
              ? new Date(
                  item.createdAt
                ).toDateString()
              : 'No Date'
          }
        </Text>

      </View>

    </TouchableOpacity>
  )

  return (

    <ScreenWrapper scrollable padding="md">

      <Header
        title="Video Memories"
        subtitle={`${videosData.length} Videos`}
      />

      {
        loading ? (

          <View style={styles.loaderContainer}>

            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
            />

          </View>

        ) : videosData.length > 0 ? (

          <FlatList
            data={videosData}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            contentContainerStyle={
              styles.listContent
            }
          />

        ) : (

          <EmptyState
            icon="videocam-outline"
            title="No Videos"
            message="Upload your first video memory"
          />

        )
      }

      {/* ================= VIDEO MODAL ================= */}

      <Modal
        visible={!!selectedVideo}
        transparent
        animationType="fade"
      >

        <View style={styles.modalContainer}>

          {/* CLOSE */}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedVideo(null)}
          >

            <Ionicons
              name="close"
              size={34}
              color="#fff"
            />

          </TouchableOpacity>

          {
            selectedVideo && (

              <Video
                source={{
                  uri: selectedVideo.fileUrl
                }}
                style={styles.videoPlayer}
                useNativeControls
                resizeMode="contain"
                shouldPlay
                isLooping={false}
              />

            )
          }

        </View>
      </Modal>

    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({

  loaderContainer: {
    marginTop: 60,
  },

  listContent: {
    paddingTop: 14,
    paddingBottom: 120,
  },

  // ================= VIDEO CARD =================

  videoCard: {
    marginBottom: 18,

    borderRadius: 24,

    overflow: 'hidden',

    backgroundColor: theme.colors.card,

    borderWidth: 1,
    borderColor: theme.colors.border,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 4,
  },

  thumbnailContainer: {
    height: 220,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#151515',
  },

  videoThumb: {
    width: 90,
    height: 90,

    borderRadius: 28,

    backgroundColor: 'rgba(255,255,255,0.12)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  playButton: {
    position: 'absolute',

    width: 60,
    height: 60,

    borderRadius: 30,

    backgroundColor: 'rgba(0,0,0,0.45)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  // ================= INFO =================

  videoInfo: {
    padding: 18,
  },

  videoTitle: {
    fontSize: 17,
    fontWeight: '700',

    color: theme.colors.text,
  },

  videoDate: {
    marginTop: 8,

    fontSize: 13,

    color: theme.colors.subText,
  },

  // ================= MODAL =================

  modalContainer: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.96)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,

    zIndex: 999,
  },

  videoPlayer: {
    width: '92%',
    height: 320,

    backgroundColor: '#000',

    borderRadius: 20,
  },

})