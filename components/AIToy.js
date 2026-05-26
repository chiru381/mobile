import { Ionicons } from '@expo/vector-icons'
import * as Speech from 'expo-speech'
import { useEffect } from 'react'
import {
    Animated,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { theme } from '../constants/theme'

export default function AIToy({
  message = 'Hello!',
  mood = 'happy',
}) {

  useEffect(() => {

    if (message) {

      Speech.speak(message, {
        language: 'en',
        pitch: 1.1,
        rate: 0.9,
      })

    }

  }, [message])

  const getMoodColor = () => {

    switch (mood) {

      case 'happy':
        return theme.colors.warning

      case 'sad':
        return theme.colors.error

      case 'success':
        return theme.colors.success

      default:
        return theme.colors.primary
    }
  }

  const getIcon = () => {

    switch (mood) {

      case 'happy':
        return 'happy'

      case 'sad':
        return 'sad'

      case 'success':
        return 'checkmark-circle'

      default:
        return 'sparkles'
    }
  }

  return (

    <View style={styles.container}>

      {/* AI Avatar */}

      <Animated.View
        style={[
          styles.avatar,
          {
            backgroundColor: `${getMoodColor()}20`,
          }
        ]}
      >

        <Ionicons
          name={getIcon()}
          size={54}
          color={getMoodColor()}
        />

      </Animated.View>

      {/* Message Box */}

      <View style={styles.messageBox}>

        <Text style={styles.aiName}>
          AI Buddy
        </Text>

        <Text style={styles.message}>
          {message}
        </Text>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  avatar: {
    width: 110,
    height: 110,

    borderRadius: 999,

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 16,

    borderWidth: 3,
    borderColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 6,
  },

  messageBox: {

    width: '100%',

    backgroundColor: theme.colors.card,

    padding: 18,

    borderRadius: 24,

    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  aiName: {
    fontSize: 14,
    fontWeight: '700',

    color: theme.colors.primary,

    marginBottom: 6,
  },

  message: {
    fontSize: 15,
    lineHeight: 24,

    color: theme.colors.text,
  },

})