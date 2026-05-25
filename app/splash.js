import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { theme } from '../constants/theme'

export default function Splash() {
  const router = useRouter()
  const scaleAnim = useRef(new Animated.Value(0.3)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Animate logo
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/(auth)/login')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <Text style={styles.emoji}>💖</Text>
        <Text style={styles.appName}>Memory</Text>
        <Text style={styles.tagline}>Preserve Your Precious Moments</Text>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.version}>v1.0.0</Text>
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
    paddingHorizontal: theme.sizes.lg,
  },
  logoContainer: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
    marginBottom: theme.sizes.base,
  },
  appName: {
    fontSize: theme.sizes.h1,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.sizes.sm,
  },
  tagline: {
    fontSize: theme.sizes.base,
    color: theme.colors.subText,
    textAlign: 'center',
    marginTop: theme.sizes.md,
  },
  footer: {
    position: 'absolute',
    bottom: theme.sizes.xxl,
  },
  version: {
    color: theme.colors.subText,
    fontSize: theme.sizes.sm,
  },
})