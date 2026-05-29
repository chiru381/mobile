import { useState } from 'react'

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import { Ionicons } from '@expo/vector-icons'

import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'

import { theme } from '../../constants/theme'

import apiService from '../../utils/apiService'

export default function Upload() {

  const [fileData, setFileData] = useState([])

  const [loading, setLoading] = useState(false)

  // ================= PICK MULTIPLE FILES =================

  const pickFile = async () => {

    try {

      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (!permissionResult.granted) {

        Alert.alert(
          'Permission Required',
          'Please allow gallery access'
        )

        return
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes:
            ImagePicker.MediaTypeOptions.All,

          allowsMultipleSelection: true,

          quality: 1,
        })

      if (result.canceled) {
        return
      }

      if (
        result.assets &&
        result.assets.length > 0
      ) {

        const files =
          result.assets.map(asset => ({
            uri: asset.uri,

            type:
              asset.mimeType ||
              'image/jpeg',

            fileName:
              asset.fileName ||
              `upload.${asset.uri
                .split('.')
                .pop()}`,
          }))

        setFileData(prev => [
          ...prev,
          ...files,
        ])
      }

    } catch (error) {

      console.log(error)

      Alert.alert(
        'Error',
        'Failed to pick files'
      )
    }
  }

  // ================= REMOVE FILE =================

  const removeFile = index => {

    const updatedFiles =
      [...fileData]

    updatedFiles.splice(index, 1)

    setFileData(updatedFiles)
  }

  // ================= UPLOAD FILES =================

  const uploadFile = async () => {

    try {

      if (fileData.length === 0) {

        Alert.alert(
          'Please select files'
        )

        return
      }

      setLoading(true)

      const uploadPromises =
        fileData.map(file =>
          apiService.uploadFile(file)
        )

      const response =
        await Promise.all(uploadPromises)

      console.log(
        'UPLOAD RESPONSE:',
        response
      )

      Alert.alert(
        'Success',
        'All files uploaded successfully'
      )

      setFileData([])

    } catch (error) {

      console.log(error)

      Alert.alert(
        'Upload Failed',
        error.message
      )

    } finally {

      setLoading(false)
    }
  }

  // ================= RENDER FILE =================

  const renderItem = ({
    item,
    index,
  }) => {

    const isImage =
      item?.type?.includes('image')

    return (

      <View style={styles.previewCard}>

        {
          isImage ? (

            <Image
              source={{
                uri: item.uri,
              }}
              style={styles.image}
            />

          ) : (

            <View style={styles.videoBox}>

              <Ionicons
                name="videocam"
                size={50}
                color={
                  theme.colors.primary
                }
              />

              <Text
                style={styles.videoText}
              >
                Video Selected
              </Text>

            </View>
          )
        }

        <Text
          numberOfLines={1}
          style={styles.fileName}
        >
          {item.fileName}
        </Text>

        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() =>
            removeFile(index)
          }
        >

          <Ionicons
            name="close-circle"
            size={20}
            color="#fff"
          />

          <Text
            style={styles.removeText}
          >
            Remove
          </Text>

        </TouchableOpacity>

      </View>
    )
  }

  return (

    <ScreenWrapper scrollable>

      <Header
        title="Upload"
        subtitle="Upload your memories"
      />

      <View style={styles.container}>

        {/* PICK BUTTON */}

        <TouchableOpacity
          style={styles.pickButton}
          activeOpacity={0.8}
          onPress={pickFile}
        >

          <Ionicons
            name="cloud-upload-outline"
            size={28}
            color="#fff"
          />

          <Text
            style={
              styles.pickButtonText
            }
          >
            Pick Images / Videos
          </Text>

        </TouchableOpacity>

        {/* FILE LIST */}

        {
          fileData.length > 0 && (

            <FlatList
              data={fileData}
              renderItem={renderItem}
              keyExtractor={(
                item,
                index
              ) => index.toString()}
              scrollEnabled={false}
              contentContainerStyle={{
                paddingTop: 20,
              }}
            />
          )
        }

        {/* UPLOAD BUTTON */}

        {
          fileData.length > 0 && (

            <TouchableOpacity
              style={[
                styles.uploadButton,

                loading &&
                  styles.disabledButton,
              ]}
              activeOpacity={0.8}
              onPress={uploadFile}
              disabled={loading}
            >

              {
                loading ? (

                  <ActivityIndicator
                    color="#fff"
                  />

                ) : (

                  <>
                    <Ionicons
                      name="send"
                      size={22}
                      color="#fff"
                    />

                    <Text
                      style={
                        styles.uploadButtonText
                      }
                    >
                      Upload All Files
                    </Text>
                  </>
                )
              }

            </TouchableOpacity>
          )
        }

      </View>

    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  pickButton: {
    height: 58,

    borderRadius: 18,

    backgroundColor:
      theme.colors.primary,

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    gap: 10,
  },

  pickButtonText: {
    color: '#fff',

    fontSize: 16,

    fontWeight: '700',
  },

  previewCard: {
    marginBottom: 20,

    backgroundColor:
      theme.colors.card,

    borderRadius: 20,

    padding: 16,

    borderWidth: 1,

    borderColor:
      theme.colors.border,
  },

  image: {
    width: '100%',

    height: 250,

    borderRadius: 16,
  },

  videoBox: {
    height: 220,

    borderRadius: 16,

    backgroundColor:
      `${theme.colors.primary}10`,

    justifyContent: 'center',

    alignItems: 'center',
  },

  videoText: {
    marginTop: 12,

    fontSize: 18,

    fontWeight: '700',

    color: theme.colors.text,
  },

  fileName: {
    marginTop: 14,

    fontSize: 14,

    color:
      theme.colors.subText,
  },

  removeBtn: {
    marginTop: 18,

    backgroundColor:
      theme.colors.error,

    height: 45,

    borderRadius: 14,

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    gap: 8,
  },

  removeText: {
    color: '#fff',

    fontSize: 15,

    fontWeight: '700',
  },

  uploadButton: {
    marginTop: 24,

    backgroundColor:
      theme.colors.success,

    height: 58,

    borderRadius: 18,

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    gap: 10,
  },

  disabledButton: {
    opacity: 0.7,
  },

  uploadButtonText: {
    color: '#fff',

    fontSize: 16,

    fontWeight: '700',
  },
})