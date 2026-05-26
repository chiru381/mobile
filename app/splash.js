import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { theme } from '../constants/theme'

export default function Splash() {

  const router = useRouter()

  const scaleAnim =
    useRef(new Animated.Value(0.7)).current

  const opacityAnim =
    useRef(new Animated.Value(0)).current

  const translateAnim =
    useRef(new Animated.Value(40)).current

  useEffect(() => {

    Animated.parallel([

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),

      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),

      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),

    ]).start()

    const timer = setTimeout(() => {

      router.replace('/(auth)/login')

    }, 5000)

    return () => clearTimeout(timer)

  }, [])

  return (

    <View style={styles.container}>

      {/* GLOW */}
      <View style={styles.glowCircle} />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: opacityAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: translateAnim },
            ],
          },
        ]}
      >

        <View style={styles.iconBox}>

          <Ionicons
            name="heart"
            size={60}
            color="#fff"
          />

        </View>

        <Text style={styles.appName}>
          Memory
        </Text>

        <Text style={styles.tagline}>
          Preserve Your Precious Moments
        </Text>

      </Animated.View>

      {/* FOOTER */}

      <View style={styles.footer}>

        <Text style={styles.version}>
          v1.0.0
        </Text>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor: theme.colors.bg,

    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',
  },

  glowCircle: {
    position: 'absolute',

    width: 280,
    height: 280,

    borderRadius: 140,

    backgroundColor: `${theme.colors.primary}15`,
  },

  logoContainer: {
    alignItems: 'center',
  },

  iconBox: {
    width: 130,
    height: 130,

    borderRadius: 40,

    backgroundColor: theme.colors.primary,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.35,
    shadowRadius: 15,

    elevation: 12,

    marginBottom: 28,
  },

  appName: {
    fontSize: 42,
    fontWeight: '900',

    color: theme.colors.text,

    letterSpacing: 1,
  },

  tagline: {
    marginTop: 12,

    fontSize: 15,

    color: theme.colors.subText,

    textAlign: 'center',

    paddingHorizontal: 40,

    lineHeight: 24,
  },

  footer: {
    position: 'absolute',
    bottom: 50,
  },

  version: {
    color: theme.colors.subText,
    fontSize: 13,
    fontWeight: '600',
  },

})