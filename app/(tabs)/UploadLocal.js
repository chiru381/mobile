import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
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

export default function UploadLocal() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const pickFiles = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        quality: 1,
      })

    if (!result.canceled) {
      const selectedFiles =
        result.assets.map(asset => ({
          uri: asset.uri,
          type:
            asset.mimeType || 'image/jpeg',
          fileName:
            asset.fileName ||
            `upload.${asset.uri
              .split('.')
              .pop()}`,
        }))

      setFiles(prev => [
        ...prev,
        ...selectedFiles,
      ])
    }
  }

  const uploadLocalFiles = async () => {
    try {
      setLoading(true)

      for (const file of files) {
        const formData = new FormData()

        formData.append('file', {
          uri: file.uri,
          type: file.type,
          name: file.fileName,
        })

        const response = await fetch(
          'http://10.120.135.49:5000/api/upload/uploads',
          {
            method: 'POST',
            body: formData,
          }
        )

        const data =
          await response.json()

        console.log(data)
      }

      Alert.alert(
        'Success',
        'Files uploaded successfully'
      )

      setFiles([])
    } catch (error) {
      console.log(error)

      Alert.alert(
        'Error',
        error.message
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={pickFiles}
      >
        <Text style={styles.btnText}>
          Pick Files
        </Text>
      </TouchableOpacity>

      <FlatList
        data={files}
        keyExtractor={(item, index) =>
          index.toString()
        }
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
          />
        )}
      />

      {files.length > 0 && (
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={uploadLocalFiles}
        >
          {loading ? (
            <ActivityIndicator
              color="#fff"
            />
          ) : (
            <>
              <Ionicons
                name="cloud-upload"
                size={22}
                color="#fff"
              />
              <Text
                style={styles.uploadText}
              >
                Upload Local
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  btn: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    marginTop: 10,
    borderRadius: 10,
  },
  uploadBtn: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})