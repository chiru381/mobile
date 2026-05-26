import { useState } from 'react'

import {
  ActivityIndicator,
  Alert,
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

  const [fileData, setFileData] = useState(null)

  const [loading, setLoading] = useState(false)

  // ================= PICK FILE =================

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
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          quality: 1,
        })

      if (result.canceled) {
        return
      }

      if (result.assets && result.assets.length > 0) {

        const asset = result.assets[0]

        setFileData({
          uri: asset.uri,
          type: asset.mimeType || 'image/jpeg',
          fileName:
            asset.fileName ||
            `upload.${asset.uri.split('.').pop()}`
        })
      }

    } catch (error) {

      console.log(error)

      Alert.alert(
        'Error',
        'Failed to pick file'
      )
    }
  }

  // ================= UPLOAD FILE =================

  const uploadFile = async () => {

    try {

      if (!fileData) {

        Alert.alert(
          'Please select image or video'
        )

        return
      }

      setLoading(true)

      const response =
        await apiService.uploadFile(fileData)

      console.log('UPLOAD RESPONSE:', response)

      Alert.alert(
        'Success',
        'File uploaded successfully'
      )

      // RESET AFTER SUCCESS
      setFileData(null)

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

          <Text style={styles.pickButtonText}>
            Pick Image / Video
          </Text>

        </TouchableOpacity>

        {/* PREVIEW */}

        {
          fileData && (

            <View style={styles.previewContainer}>

              {
                fileData?.type?.includes('image') ? (

                  <Image
                    source={{
                      uri: fileData.uri
                    }}
                    style={styles.image}
                  />

                ) : (

                  <View style={styles.videoBox}>

                    <Ionicons
                      name="videocam"
                      size={50}
                      color={theme.colors.primary}
                    />

                    <Text style={styles.videoText}>
                      Video Selected
                    </Text>

                  </View>
                )
              }

              <Text style={styles.fileName}>
                {fileData.fileName}
              </Text>

              {/* REMOVE BUTTON */}

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => setFileData(null)}
              >

                <Ionicons
                  name="close-circle"
                  size={20}
                  color="#fff"
                />

                <Text style={styles.removeText}>
                  Remove
                </Text>

              </TouchableOpacity>

            </View>
          )
        }

        {/* SHOW ONLY AFTER FILE SELECTED */}

        {
          fileData && (

            <TouchableOpacity
              style={[
                styles.uploadButton,
                loading && styles.disabledButton
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

                    <Text style={styles.uploadButtonText}>
                      Upload File
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

  // ================= PICK BUTTON =================

  pickButton: {
    height: 58,
    borderRadius: 18,

    backgroundColor: theme.colors.primary,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 5,
  },

  pickButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // ================= PREVIEW =================

  previewContainer: {
    marginTop: 24,

    backgroundColor: theme.colors.card,

    borderRadius: 20,
    padding: 16,

    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  image: {
    width: '100%',
    height: 300,
    borderRadius: 16,
  },

  videoBox: {
    height: 220,

    borderRadius: 16,

    backgroundColor: `${theme.colors.primary}10`,

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

    color: theme.colors.subText,
  },

  // ================= REMOVE BUTTON =================

  removeBtn: {
    marginTop: 18,

    backgroundColor: theme.colors.error,

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

  // ================= UPLOAD BUTTON =================

  uploadButton: {
    marginTop: 24,

    backgroundColor: theme.colors.success,

    height: 58,
    borderRadius: 18,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 5,
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